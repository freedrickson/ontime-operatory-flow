-- Orgs & membership
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create type public.org_role as enum ('OWNER','ADMIN','DOCTOR','STAFF','READONLY');

create table if not exists public.org_members (
  org_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.org_role not null default 'STAFF',
  invited_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  primary key (org_id, user_id)
);

-- Request access like Google Drive (user asks; owner/admin approves)
create table if not exists public.org_access_requests (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  email text not null,
  requested_by uuid references auth.users(id),
  status text not null default 'PENDING', -- PENDING, APPROVED, REJECTED
  created_at timestamptz not null default now(),
  decided_at timestamptz
);

-- Floor plans are ORG-owned
create table if not exists public.floor_plans (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  data jsonb not null,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists t_set_floor_plans_updated_at on public.floor_plans;
create trigger t_set_floor_plans_updated_at before update on public.floor_plans
for each row execute function public.set_updated_at();

-- Audit log (security & compliance)
create table if not exists public.audit_logs (
  id bigserial primary key,
  user_id uuid,
  org_id uuid,
  action text not null,           -- LOGIN, LOGOUT, FLOORPLAN_CREATE, FLOORPLAN_UPDATE, INVITE_SENT, MEMBER_ADDED, ACCESS_REQUEST, ACCESS_APPROVE, etc.
  metadata jsonb,
  ip inet,
  user_agent text,
  created_at timestamptz not null default now()
);

-- Device trust (user-managed device registry)
create table if not exists public.trusted_devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  device_label text not null,      -- e.g., "Derek's Mac Safari"
  device_fingerprint text not null,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz
);

-- Rate limiting table
create table if not exists public.rate_limits (
  id text primary key,
  attempts integer not null default 1,
  expires_at timestamptz not null
);

-- Enable RLS
alter table public.organizations enable row level security;
alter table public.org_members enable row level security;
alter table public.org_access_requests enable row level security;
alter table public.floor_plans enable row level security;
alter table public.audit_logs enable row level security;
alter table public.trusted_devices enable row level security;
alter table public.rate_limits enable row level security;

-- Helper: current user's orgs
create or replace view public.v_user_orgs as
select m.user_id, m.org_id, m.role
from public.org_members m;

-- Policies
-- organizations: member can read; owner/admin can update
create policy org_read on public.organizations
for select using (exists (select 1 from public.org_members m where m.org_id = organizations.id and m.user_id = auth.uid()));

create policy org_update on public.organizations
for update using (exists (select 1 from public.org_members m where m.org_id = organizations.id and m.user_id = auth.uid() and m.role in ('OWNER','ADMIN')))
with check (true);

create policy org_insert on public.organizations
for insert with check (auth.uid() is not null);

-- org_members: members can read roster; owners/admins can manage
create policy org_members_read on public.org_members
for select using (exists (select 1 from public.org_members m where m.org_id = org_members.org_id and m.user_id = auth.uid()));

create policy org_members_manage on public.org_members
for insert with check (exists (select 1 from public.org_members m where m.org_id = org_members.org_id and m.user_id = auth.uid() and m.role in ('OWNER','ADMIN')));

create policy org_members_update on public.org_members
for update using (exists (select 1 from public.org_members m where m.org_id = org_members.org_id and m.user_id = auth.uid() and m.role in ('OWNER','ADMIN')));

create policy org_members_delete on public.org_members
for delete using (exists (select 1 from public.org_members m where m.org_id = org_members.org_id and m.user_id = auth.uid() and m.role in ('OWNER','ADMIN')));

-- access requests: requester can create/read their PENDING; owners/admins of org can read & decide
create policy access_req_insert on public.org_access_requests
for insert with check (true);

create policy access_req_read_own on public.org_access_requests
for select using (requested_by = auth.uid());

create policy access_req_read_org on public.org_access_requests
for select using (exists (select 1 from public.org_members m where m.org_id = org_access_requests.org_id and m.user_id = auth.uid() and m.role in ('OWNER','ADMIN')));

create policy access_req_update_org on public.org_access_requests
for update using (exists (select 1 from public.org_members m where m.org_id = org_access_requests.org_id and m.user_id = auth.uid() and m.role in ('OWNER','ADMIN')))
with check (true);

-- floor_plans: members of the org can read; write limited to DOCTOR/STAFF/ADMIN/OWNER
create policy floor_read on public.floor_plans
for select using (exists (select 1 from public.org_members m where m.org_id = floor_plans.org_id and m.user_id = auth.uid()));

create policy floor_insert on public.floor_plans
for insert with check (exists (select 1 from public.org_members m where m.org_id = floor_plans.org_id and m.user_id = auth.uid() and m.role in ('OWNER','ADMIN','DOCTOR','STAFF')));

create policy floor_update on public.floor_plans
for update using (exists (select 1 from public.org_members m where m.org_id = floor_plans.org_id and m.user_id = auth.uid() and m.role in ('OWNER','ADMIN','DOCTOR','STAFF')))
with check (true);

create policy floor_delete on public.floor_plans
for delete using (exists (select 1 from public.org_members m where m.org_id = floor_plans.org_id and m.user_id = auth.uid() and m.role in ('OWNER','ADMIN')));

-- audit_logs: user can read own org logs; writes via RPC/edge
create policy audit_select on public.audit_logs
for select using (exists (select 1 from public.org_members m where m.org_id = audit_logs.org_id and m.user_id = auth.uid()));

create policy audit_insert on public.audit_logs
for insert with check (auth.uid() is not null);

-- trusted_devices: owner-only
create policy devices_crud on public.trusted_devices
for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- rate_limits: service role only
create policy rate_limits_service on public.rate_limits
for all using (auth.role() = 'service_role');