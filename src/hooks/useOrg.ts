import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthProvider';

export interface Organization {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
}

export interface OrgMember {
  org_id: string;
  user_id: string;
  role: 'OWNER' | 'ADMIN' | 'DOCTOR' | 'STAFF' | 'READONLY';
  invited_by: string;
  created_at: string;
}

export interface UserOrg {
  user_id: string;
  org_id: string;
  role: 'OWNER' | 'ADMIN' | 'DOCTOR' | 'STAFF' | 'READONLY';
}

export const useOrg = () => {
  const { user } = useAuth();
  const [currentOrgId, setCurrentOrgId] = useState<string | null>(null);
  const [userOrgs, setUserOrgs] = useState<UserOrg[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserOrgs();
    } else {
      setUserOrgs([]);
      setCurrentOrgId(null);
      setLoading(false);
    }
  }, [user]);

  const fetchUserOrgs = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('v_user_orgs')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      setUserOrgs(data || []);
      
      // Set current org to first one if not already set
      if (data && data.length > 0 && !currentOrgId) {
        setCurrentOrgId(data[0].org_id);
      }
    } catch (error) {
      console.error('Error fetching user orgs:', error);
    } finally {
      setLoading(false);
    }
  };

  const switchOrg = (orgId: string) => {
    setCurrentOrgId(orgId);
  };

  const getCurrentOrg = () => {
    return userOrgs.find(org => org.org_id === currentOrgId);
  };

  const hasRole = (requiredRoles: string[]) => {
    const currentOrg = getCurrentOrg();
    return currentOrg && requiredRoles.includes(currentOrg.role);
  };

  return {
    currentOrgId,
    userOrgs,
    loading,
    switchOrg,
    getCurrentOrg,
    hasRole,
    refetch: fetchUserOrgs
  };
};