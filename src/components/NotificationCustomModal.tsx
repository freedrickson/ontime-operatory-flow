import React, { useState, useEffect } from 'react';
import { Volume2, Vibrate, Eye, Watch, Play } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { EventType, ChannelConfig, Role, HapticPattern, SoundStyle, BannerStyle } from '@/types/notifications';
import { useNotifications } from '@/hooks/useNotifications';

interface NotificationCustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: EventType;
  eventName: string;
  userId?: string;
  role: Role;
  isRoleDefault?: boolean;
}

const hapticOptions: HapticPattern[] = [
  'Single Tap',
  'Double Tap', 
  'Triple Tap',
  'Long Press',
  'Pulse',
  'Heartbeat',
  'Ramp Up',
  'Ramp Down',
  'Morse-Style',
  'Urgent Alert'
];

const soundOptions: SoundStyle[] = [
  'Soft Ping',
  'Standard Ding',
  'Urgent Alert',
  'Chime',
  'Beep Sequence',
  'Silent'
];

const bannerOptions: BannerStyle[] = [
  'Banner only',
  'Badge only',
  'Both'
];

export const NotificationCustomModal: React.FC<NotificationCustomModalProps> = ({
  isOpen,
  onClose,
  eventId,
  eventName,
  userId,
  role,
  isRoleDefault = false
}) => {
  const { 
    getEventConfig, 
    getRoleDefault, 
    updateRoleDefault, 
    updateUserOverride, 
    resetToRoleDefaults,
    previewHaptic,
    previewSound,
    previewAll
  } = useNotifications();

  const [config, setConfig] = useState<ChannelConfig>({
    haptic: { enabled: false, pattern: 'Single Tap' },
    sound: { enabled: false, style: 'Standard Ding', volume: 75 },
    banner: { enabled: true, style: 'Both' },
    watch: { enabled: false, pattern: 'Single Tap' }
  });

  // Load current configuration when modal opens
  useEffect(() => {
    if (isOpen) {
      if (isRoleDefault) {
        const roleDefault = getRoleDefault(role);
        if (roleDefault) {
          setConfig(roleDefault.events[eventId]);
        }
      } else if (userId) {
        const currentConfig = getEventConfig(userId, role, eventId);
        setConfig(currentConfig);
      }
    }
  }, [isOpen, isRoleDefault, userId, role, eventId, getRoleDefault, getEventConfig]);
  
  const [hapticOpen, setHapticOpen] = useState(false);
  const [soundOpen, setSoundOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [watchOpen, setWatchOpen] = useState(false);

  const handleConfigChange = (channel: keyof ChannelConfig, updates: Partial<ChannelConfig[keyof ChannelConfig]>) => {
    setConfig(prev => ({
      ...prev,
      [channel]: { ...prev[channel], ...updates }
    }));
  };

  const handlePreviewHaptic = () => {
    previewHaptic(config.haptic.pattern);
  };

  const handlePreviewSound = () => {
    previewSound(config.sound.style, config.sound.volume);
  };

  const handlePreviewAll = () => {
    previewAll(config);
  };

  const handleReset = () => {
    if (isRoleDefault) {
      resetToRoleDefaults(role);
      const roleDefault = getRoleDefault(role);
      if (roleDefault) {
        setConfig(roleDefault.events[eventId]);
      }
    } else if (userId) {
      // Reset user to role default
      const roleDefault = getRoleDefault(role);
      if (roleDefault) {
        setConfig(roleDefault.events[eventId]);
      }
    }
  };

  const handleSave = () => {
    if (isRoleDefault) {
      updateRoleDefault(role, eventId, config);
    } else if (userId) {
      updateUserOverride(userId, role, eventId, config);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Customize Notification: {eventName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Haptic Section */}
          <Collapsible open={hapticOpen} onOpenChange={setHapticOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <div className="flex items-center gap-3">
                <Vibrate className="h-5 w-5 text-primary" />
                <span className="font-semibold">Haptic</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${hapticOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable Haptic</Label>
                  <Switch 
                    checked={config.haptic.enabled} 
                    onCheckedChange={(enabled) => handleConfigChange('haptic', { enabled })} 
                  />
                </div>
                {config.haptic.enabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Haptic Pattern</Label>
                      <Select 
                        value={config.haptic.pattern} 
                        onValueChange={(pattern: HapticPattern) => handleConfigChange('haptic', { pattern })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {hapticOptions.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button variant="outline" onClick={handlePreviewHaptic}>
                        <Play className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Sound Section */}
          <Collapsible open={soundOpen} onOpenChange={setSoundOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <div className="flex items-center gap-3">
                <Volume2 className="h-5 w-5 text-primary" />
                <span className="font-semibold">Sound</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${soundOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label>Enable Sound</Label>
                <Switch 
                  checked={config.sound.enabled} 
                  onCheckedChange={(enabled) => handleConfigChange('sound', { enabled })} 
                />
              </div>
              {config.sound.enabled && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Sound Style</Label>
                      <Select 
                        value={config.sound.style} 
                        onValueChange={(style: SoundStyle) => handleConfigChange('sound', { style })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {soundOptions.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button variant="outline" onClick={handlePreviewSound}>
                        <Play className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Volume ({config.sound.volume}%)</Label>
                    <Slider
                      value={[config.sound.volume]}
                      onValueChange={([volume]) => handleConfigChange('sound', { volume })}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Banner Section */}
          <Collapsible open={bannerOpen} onOpenChange={setBannerOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-primary" />
                <span className="font-semibold">Banner Notifications</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${bannerOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label>Enable Banner Notifications</Label>
                <Switch 
                  checked={config.banner.enabled} 
                  onCheckedChange={(enabled) => handleConfigChange('banner', { enabled })} 
                />
              </div>
              {config.banner.enabled && (
                <div>
                  <Label>Display Style</Label>
                  <Select 
                    value={config.banner.style} 
                    onValueChange={(style: BannerStyle) => handleConfigChange('banner', { style })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {bannerOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Watch Section */}
          <Collapsible open={watchOpen} onOpenChange={setWatchOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <div className="flex items-center gap-3">
                <Watch className="h-5 w-5 text-primary" />
                <span className="font-semibold">Watch Notifications</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${watchOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label>Enable Watch Notifications</Label>
                <Switch 
                  checked={config.watch.enabled} 
                  onCheckedChange={(enabled) => handleConfigChange('watch', { enabled })} 
                />
              </div>
              {config.watch.enabled && (
                <div>
                  <Label>Watch Haptic Pattern</Label>
                  <Select 
                    value={config.watch.pattern} 
                    onValueChange={(pattern: HapticPattern) => handleConfigChange('watch', { pattern })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {hapticOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Global Preview */}
        <div className="pt-4 border-t">
          <Button variant="outline" onClick={handlePreviewAll} className="w-full">
            <Play className="h-4 w-4 mr-2" />
            Preview All Channels
          </Button>
        </div>

        {/* Footer */}
        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={handleReset}>
            {isRoleDefault ? 'Reset Role Default' : 'Reset to Role Default'}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};