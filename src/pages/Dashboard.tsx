import React from 'react';
import { AppHeader } from '@/components/layout/AppHeader';
import { useAuth } from '@/context/AuthProvider';
import { useOrg } from '@/hooks/useOrg';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Users, FileText, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const { userOrgs, currentOrgId, getCurrentOrg } = useOrg();
  const navigate = useNavigate();

  const currentOrg = getCurrentOrg();

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="pt-24 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {user.email}
            </h1>
            {currentOrg && (
              <p className="text-muted-foreground">
                You are logged in as {currentOrg.role} in your organization
              </p>
            )}
          </div>

          {userOrgs.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No Organizations</CardTitle>
                <CardDescription>
                  You are not a member of any organization yet. Contact an administrator to request access.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate('/request-access')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Request Organization Access
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Organization
                  </CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Current Org</div>
                  <p className="text-xs text-muted-foreground">
                    Role: {currentOrg?.role || 'None'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Floor Plans
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    Saved floor plans
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Team Members
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userOrgs.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Organization members
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Quick Actions</h2>
            <div className="flex gap-4">
              <Button onClick={() => navigate('/build')}>
                <Plus className="mr-2 h-4 w-4" />
                Create Floor Plan
              </Button>
              <Button variant="outline" onClick={() => navigate('/manage')}>
                <Users className="mr-2 h-4 w-4" />
                Live Dashboard
              </Button>
              <Button variant="outline" onClick={() => navigate('/analyze')}>
                <FileText className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}