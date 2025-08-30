export type EventType = 
  | 'lobby-wait-time-changed'
  | 'emergency-walk-in'
  | 'room-wait-time-changed' 
  | 'doctor-request-initial'
  | 'doctor-request-wait-time-changed'
  | 'emergency-back-office'
  | 'new-message'
  | 'queue-updated';

export type WaitTimeStatus = 'green' | 'yellow' | 'red';
export type Channel = 'haptic' | 'sound' | 'banner' | 'watch';
export type Domain = 'lobby' | 'back-office' | 'collaboration';

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

export interface NotificationEvent {
  id: EventType;
  name: string;
  description: string;
  domain: Domain;
  canCustomize: boolean;
  adminLocked?: boolean;
  hasWaitTimeStates?: boolean;
}

export interface RoleDefaultProfile {
  role: Role;
  events: Record<EventType, ChannelConfig>;
}

export interface UserNotificationSettings {
  userId: string;
  role: Role;
  customOverrides: Partial<Record<EventType, Partial<ChannelConfig>>>;
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
  domain: 'lobby' | 'back-office';
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