-- Fix security issues

-- 1. Fix the view security definer issue by dropping and recreating without SECURITY DEFINER
drop view if exists public.v_user_orgs;
create view public.v_user_orgs with (security_invoker=true) as
select m.user_id, m.org_id, m.role
from public.org_members m;

-- 2. Fix function search path by updating the set_updated_at function
create or replace function public.set_updated_at()
returns trigger 
language plpgsql 
security definer
set search_path = public
as $$
begin 
  new.updated_at = now(); 
  return new; 
end; 
$$;

-- 3. Enable RLS on the existing operatories table that was missing RLS
alter table public.operatories enable row level security;

-- Create RLS policy for operatories (allow all authenticated users for now)
create policy operatories_all on public.operatories
for all using (auth.uid() is not null) with check (auth.uid() is not null);