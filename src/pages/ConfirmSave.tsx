import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthProvider';
import { useOrg } from '@/hooks/useOrg';
import { supabase } from '@/lib/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Save, ArrowLeft } from 'lucide-react';

export default function ConfirmSave() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentOrgId, userOrgs } = useOrg();
  const [planName, setPlanName] = useState('');
  const [saving, setSaving] = useState(false);

  const fromPath = searchParams.get('from') || '/build';

  if (!user) {
    navigate('/');
    return null;
  }

  if (userOrgs.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="pt-24 p-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>No Organization</CardTitle>
                <CardDescription>
                  You need to be a member of an organization to save floor plans.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  const handleSave = async () => {
    if (!planName.trim()) {
      toast({
        variant: "destructive",
        title: "Name required",
        description: "Please enter a name for your floor plan"
      });
      return;
    }

    if (!currentOrgId) {
      toast({
        variant: "destructive",
        title: "No organization selected",
        description: "Please select an organization"
      });
      return;
    }

    setSaving(true);

    try {
      // Get floor plan data from localStorage (saved during build)
      const floorPlanData = localStorage.getItem('pendingFloorPlan');
      if (!floorPlanData) {
        throw new Error('No floor plan data found');
      }

      const data = JSON.parse(floorPlanData);

      // Save to database
      const { error } = await supabase
        .from('floor_plans')
        .insert({
          org_id: currentOrgId,
          name: planName,
          data: data,
          created_by: user.id
        });

      if (error) throw error;

      // Clear the pending data
      localStorage.removeItem('pendingFloorPlan');

      toast({
        title: "Floor plan saved",
        description: `"${planName}" has been saved to your organization`
      });

      navigate(fromPath);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Save failed",
        description: error.message
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="pt-24 p-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Save className="h-5 w-5" />
                Save Floor Plan
              </CardTitle>
              <CardDescription>
                You're logged in! Save this floor plan to your organization.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="plan-name">Floor Plan Name</Label>
                <Input
                  id="plan-name"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="Enter a name for your floor plan"
                />
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={handleSave} 
                  disabled={saving || !planName.trim()}
                  className="flex-1"
                >
                  {saving ? 'Saving...' : 'Save to Organization'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate(fromPath)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}