import React, { useState } from 'react';
import { X, Volume2, Vibrate, Eye, Watch } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface NotificationCustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
}

const hapticOptions = [
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

const soundOptions = [
  'Soft Ping',
  'Standard Ding',
  'Urgent Alert',
  'Chime',
  'Beep Sequence',
  'Silent'
];

const bannerOptions = [
  'Banner only',
  'Badge only',
  'Both'
];

export const NotificationCustomModal: React.FC<NotificationCustomModalProps> = ({
  isOpen,
  onClose,
  eventName
}) => {
  const [hapticStyle, setHapticStyle] = useState('Single Tap');
  const [soundStyle, setSoundStyle] = useState('Standard Ding');
  const [volume, setVolume] = useState([75]);
  const [bannerEnabled, setBannerEnabled] = useState(true);
  const [bannerStyle, setBannerStyle] = useState('Both');
  const [watchEnabled, setWatchEnabled] = useState(false);
  const [watchHaptic, setWatchHaptic] = useState('Single Tap');
  
  const [hapticOpen, setHapticOpen] = useState(false);
  const [soundOpen, setSoundOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [watchOpen, setWatchOpen] = useState(false);

  const handlePreviewHaptic = () => {
    // Simulate haptic feedback if available
    if (navigator.vibrate) {
      switch (hapticStyle) {
        case 'Single Tap':
          navigator.vibrate(100);
          break;
        case 'Double Tap':
          navigator.vibrate([100, 100, 100]);
          break;
        case 'Triple Tap':
          navigator.vibrate([100, 100, 100, 100, 100]);
          break;
        case 'Long Press':
          navigator.vibrate(500);
          break;
        case 'Pulse':
          navigator.vibrate([200, 100, 200, 100, 200]);
          break;
        default:
          navigator.vibrate(100);
      }
    }
  };

  const handlePreviewSound = () => {
    // Simulate sound preview (would integrate with actual audio system)
    console.log(`Playing ${soundStyle} at ${volume[0]}% volume`);
  };

  const handleReset = () => {
    setHapticStyle('Single Tap');
    setSoundStyle('Standard Ding');
    setVolume([75]);
    setBannerEnabled(true);
    setBannerStyle('Both');
    setWatchEnabled(false);
    setWatchHaptic('Single Tap');
  };

  const handleSave = () => {
    // Save notification settings
    console.log('Saving notification settings for:', eventName);
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Haptic Pattern</Label>
                  <Select value={hapticStyle} onValueChange={setHapticStyle}>
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
                    Preview
                  </Button>
                </div>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Sound Style</Label>
                  <Select value={soundStyle} onValueChange={setSoundStyle}>
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
                    Preview
                  </Button>
                </div>
              </div>
              <div>
                <Label>Volume ({volume[0]}%)</Label>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
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
                <Switch checked={bannerEnabled} onCheckedChange={setBannerEnabled} />
              </div>
              {bannerEnabled && (
                <div>
                  <Label>Display Style</Label>
                  <Select value={bannerStyle} onValueChange={setBannerStyle}>
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
                <Switch checked={watchEnabled} onCheckedChange={setWatchEnabled} />
              </div>
              {watchEnabled && (
                <div>
                  <Label>Watch Haptic Pattern</Label>
                  <Select value={watchHaptic} onValueChange={setWatchHaptic}>
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

        {/* Footer */}
        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={handleReset}>
            Reset to Role Default
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