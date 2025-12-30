// Cue Categories
export type CueCategory = 'patient-flow' | 'doctor' | 'clinical-support';

// All Cue Need Types with timer variants (0-5 green, 5-10 yellow, 10+ red)
export type CueNeedType = 
  // Patient Flow Needs
  | 'ready-to-seat-0-5'
  | 'ready-to-seat-5-10'
  | 'ready-to-seat-10-plus'
  | 'ready-for-checkout-0-5'
  | 'ready-for-checkout-5-10'
  | 'ready-for-checkout-10-plus'
  // Doctor Needs
  | 'hygiene-exam-0-5'
  | 'hygiene-exam-5-10'
  | 'hygiene-exam-10-plus'
  | 'limited-exam-0-5'
  | 'limited-exam-5-10'
  | 'limited-exam-10-plus'
  | 'start-check-0-5'
  | 'start-check-5-10'
  | 'start-check-10-plus'
  // Clinical Support Needs
  | 'assistant-0-5'
  | 'assistant-5-10'
  | 'assistant-10-plus'
  | 'room-turnover-0-5'
  | 'room-turnover-5-10'
  | 'room-turnover-10-plus'
  | 'sterile-instruments-0-5'
  | 'sterile-instruments-5-10'
  | 'sterile-instruments-10-plus'
  | 'imaging-0-5'
  | 'imaging-5-10'
  | 'imaging-10-plus'
  // System cues
  | 'emergency'
  | 'new-message'
  | 'queue-updated';

// Need Group (for toggle UI - groups the 3 timer variants together)
export type NeedGroupId = 
  // Patient Flow
  | 'ready-to-seat'
  | 'ready-for-checkout'
  // Doctor
  | 'hygiene-exam'
  | 'limited-exam'
  | 'start-check'
  // Clinical Support
  | 'assistant'
  | 'room-turnover'
  | 'sterile-instruments'
  | 'imaging';

export interface NeedGroup {
  id: NeedGroupId;
  name: string;
  category: CueCategory;
  cueIds: CueNeedType[];
}

// Legacy alias for backwards compatibility
export type EventType = CueNeedType;

export type WaitTimeStatus = 'green' | 'yellow' | 'red';
export type Channel = 'haptic' | 'sound' | 'banner' | 'watch';

// Legacy alias
export type Domain = CueCategory;

export type HapticPattern = 
  | 'Single Tap'
  | 'Double Tap'
  | 'Triple Tap'
  | 'Long Press'
  | 'Pulse'
  | 'Heartbeat'
  | 'Ramp Up'
  | 'Ramp Down'
  | 'Morse-Style'
  | 'Urgent Alert';

export type SoundStyle = 
  | 'Soft Ping'
  | 'Standard Ding'
  | 'Urgent Alert'
  | 'Chime'
  | 'Beep Sequence'
  | 'Silent';

export type BannerStyle = 'Banner only' | 'Badge only' | 'Both';

export type Role = 'Doctor' | 'Clinical Lead' | 'Hygienist' | 'Assistant' | 'Front Desk';

export interface ChannelConfig {
  haptic: {
    enabled: boolean;
    pattern: HapticPattern;
  };
  sound: {
    enabled: boolean;
    style: SoundStyle;
    volume: number;
  };
  banner: {
    enabled: boolean;
    style: BannerStyle;
  };
  watch: {
    enabled: boolean;
    pattern: HapticPattern;
  };
}

export interface CueNeed {
  id: CueNeedType;
  name: string;
  description: string;
  category: CueCategory;
  canCustomize: boolean;
  adminLocked?: boolean;
  needGroupId?: NeedGroupId;
  timerLevel?: 'green' | 'yellow' | 'red';
}

// Legacy alias
export type NotificationEvent = CueNeed;

export interface RoleDefaultProfile {
  role: Role;
  events: Record<CueNeedType, ChannelConfig>;
  enabledNeedGroups: NeedGroupId[];
}

export interface UserNotificationSettings {
  userId: string;
  role: Role;
  customOverrides: Partial<Record<CueNeedType, Partial<ChannelConfig>>>;
  enabledNeedGroups?: NeedGroupId[];
  doNotDisturb: {
    enabled: boolean;
    schedule: {
      start: string;
      end: string;
    };
    allowEmergencyOverride: boolean;
  };
}

export interface WaitTimeThresholds {
  category: CueCategory;
  green: { min: number; max: number };
  yellow: { min: number; max: number };
  red: { min: number };
}

export interface NotificationPreferences {
  roleDefaults: RoleDefaultProfile[];
  userSettings: UserNotificationSettings[];
  waitTimeThresholds: WaitTimeThresholds[];
  emergencyColor: string;
}
