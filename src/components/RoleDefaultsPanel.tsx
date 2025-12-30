import React, { useState, useEffect } from 'react';
import { Watch, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNotifications, NEED_GROUPS, getCategoryDisplayName } from '@/hooks/useNotifications';
import { Role, NeedGroupId, CueCategory } from '@/types/notifications';

interface RoleDefaultsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role;
}

export const RoleDefaultsPanel: React.FC<RoleDefaultsPanelProps> = ({
  isOpen,
  onClose,
  role
}) => {
  const { getRoleDefault, updateRoleEnabledNeedGroups } = useNotifications();
  const [showCustomize, setShowCustomize] = useState(false);
  const [enabledGroups, setEnabledGroups] = useState<NeedGroupId[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Load current role settings when panel opens
  useEffect(() => {
    if (isOpen) {
      const roleDefault = getRoleDefault(role);
      if (roleDefault?.enabledNeedGroups) {
        setEnabledGroups([...roleDefault.enabledNeedGroups]);
      }
      setShowCustomize(false);
      setHasChanges(false);
    }
  }, [isOpen, role, getRoleDefault]);

  const handleToggleNeedGroup = (groupId: NeedGroupId) => {
    setEnabledGroups(prev => {
      const newGroups = prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId];
      setHasChanges(true);
      return newGroups;
    });
  };

  const handleSave = () => {
    updateRoleEnabledNeedGroups(role, enabledGroups);
    setHasChanges(false);
    setShowCustomize(false);
  };

  const handleCancel = () => {
    // Reset to original values
    const roleDefault = getRoleDefault(role);
    if (roleDefault?.enabledNeedGroups) {
      setEnabledGroups([...roleDefault.enabledNeedGroups]);
    }
    setHasChanges(false);
    setShowCustomize(false);
  };

  // Group needs by category
  const groupedNeeds: Record<CueCategory, typeof NEED_GROUPS> = {
    'patient-flow': NEED_GROUPS.filter(g => g.category === 'patient-flow'),
    'doctor': NEED_GROUPS.filter(g => g.category === 'doctor'),
    'clinical-support': NEED_GROUPS.filter(g => g.category === 'clinical-support')
  };

  // Get enabled needs for summary view
  const enabledNeedsForSummary = NEED_GROUPS.filter(g => enabledGroups.includes(g.id));

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Watch className="h-5 w-5 text-primary" />
            {role} Role - Watch Cues
          </SheetTitle>
          <SheetDescription>
            Configure which cues this role receives on their Apple Watch
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {!showCustomize ? (
            // Summary View
            <>
              {enabledNeedsForSummary.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Watch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No watch cues enabled for this role</p>
                </div>
              ) : (
                <>
                  {/* Group enabled needs by category */}
                  {(['patient-flow', 'doctor', 'clinical-support'] as CueCategory[]).map(category => {
                    const categoryNeeds = enabledNeedsForSummary.filter(g => g.category === category);
                    if (categoryNeeds.length === 0) return null;
                    
                    return (
                      <div key={category} className="space-y-3">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                          {getCategoryDisplayName(category)} Cues
                        </h3>
                        <div className="space-y-2">
                          {categoryNeeds.map(need => (
                            <div 
                              key={need.id} 
                              className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                            >
                              <Watch className="h-4 w-4 text-primary" />
                              <span className="font-medium">{need.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}

              <Separator />

              <Button 
                onClick={() => setShowCustomize(true)} 
                variant="outline" 
                className="w-full"
              >
                Customize
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </>
          ) : (
            // Customize View
            <>
              <Button 
                onClick={() => setShowCustomize(false)} 
                variant="ghost" 
                size="sm"
                className="mb-2"
              >
                <ChevronUp className="h-4 w-4 mr-2" />
                Back to Summary
              </Button>

              {(['patient-flow', 'doctor', 'clinical-support'] as CueCategory[]).map(category => (
                <div key={category} className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {getCategoryDisplayName(category)}
                  </h3>
                  <div className="space-y-2">
                    {groupedNeeds[category].map(need => (
                      <div 
                        key={need.id} 
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Label htmlFor={need.id} className="cursor-pointer flex-1">
                          {need.name}
                        </Label>
                        <Switch
                          id={need.id}
                          checked={enabledGroups.includes(need.id)}
                          onCheckedChange={() => handleToggleNeedGroup(need.id)}
                        />
                      </div>
                    ))}
                  </div>
                  {category !== 'clinical-support' && <Separator />}
                </div>
              ))}

              <Separator />

              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className="flex-1"
                >
                  Save Changes
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
