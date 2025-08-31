import { useState, useCallback, useMemo } from 'react';
import { 
  EventType, 
  ChannelConfig, 
  Role, 
  NotificationEvent, 
  RoleDefaultProfile,
  UserNotificationSettings,
  WaitTimeThresholds,
  NotificationPreferences,
  HapticPattern,
  SoundStyle
} from '@/types/notifications';

// Mock data for default role profiles
const DEFAULT_ROLE_PROFILES: RoleDefaultProfile[] = [
  {
    role: 'Doctor',
    events: {
      'lobby-wait-0-5': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: false, style: 'Silent', volume: 0 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'lobby-wait-5-10': {
        haptic: { enabled: false, pattern: 'Double Tap' },
        sound: { enabled: true, style: 'Soft Ping', volume: 50 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Double Tap' }
      },
      'lobby-wait-10-plus': {
        haptic: { enabled: true, pattern: 'Urgent Alert' },
        sound: { enabled: true, style: 'Standard Ding', volume: 80 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Urgent Alert' }
      },
      'emergency-walk-in': {
        haptic: { enabled: true, pattern: 'Urgent Alert' },
        sound: { enabled: true, style: 'Urgent Alert', volume: 100 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Urgent Alert' }
      },
      'room-wait-0-5': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: false, style: 'Silent', volume: 0 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'room-wait-5-10': {
        haptic: { enabled: true, pattern: 'Double Tap' },
        sound: { enabled: true, style: 'Standard Ding', volume: 70 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Double Tap' }
      },
      'room-wait-10-plus': {
        haptic: { enabled: true, pattern: 'Urgent Alert' },
        sound: { enabled: true, style: 'Urgent Alert', volume: 90 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Urgent Alert' }
      },
      'doctor-request-0-5': {
        haptic: { enabled: true, pattern: 'Single Tap' },
        sound: { enabled: true, style: 'Soft Ping', volume: 60 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: true, pattern: 'Single Tap' }
      },
      'doctor-request-5-10': {
        haptic: { enabled: true, pattern: 'Double Tap' },
        sound: { enabled: true, style: 'Standard Ding', volume: 80 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Double Tap' }
      },
      'doctor-request-10-plus': {
        haptic: { enabled: true, pattern: 'Urgent Alert' },
        sound: { enabled: true, style: 'Urgent Alert', volume: 100 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Urgent Alert' }
      },
      'emergency-back-office': {
        haptic: { enabled: true, pattern: 'Urgent Alert' },
        sound: { enabled: true, style: 'Urgent Alert', volume: 100 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Urgent Alert' }
      },
      'new-message': {
        haptic: { enabled: true, pattern: 'Single Tap' },
        sound: { enabled: true, style: 'Soft Ping', volume: 60 },
        banner: { enabled: true, style: 'Badge only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'queue-updated': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: true, style: 'Chime', volume: 50 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      }
    }
  },
  {
    role: 'Clinical Lead',
    events: {
      'lobby-wait-0-5': {
        haptic: { enabled: true, pattern: 'Single Tap' },
        sound: { enabled: true, style: 'Soft Ping', volume: 60 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: true, pattern: 'Single Tap' }
      },
      'lobby-wait-5-10': {
        haptic: { enabled: true, pattern: 'Double Tap' },
        sound: { enabled: true, style: 'Standard Ding', volume: 70 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Double Tap' }
      },
      'lobby-wait-10-plus': {
        haptic: { enabled: true, pattern: 'Urgent Alert' },
        sound: { enabled: true, style: 'Urgent Alert', volume: 90 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Urgent Alert' }
      },
      'emergency-walk-in': {
        haptic: { enabled: true, pattern: 'Urgent Alert' },
        sound: { enabled: true, style: 'Urgent Alert', volume: 100 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Urgent Alert' }
      },
      'room-wait-0-5': {
        haptic: { enabled: true, pattern: 'Single Tap' },
        sound: { enabled: true, style: 'Soft Ping', volume: 60 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: true, pattern: 'Single Tap' }
      },
      'room-wait-5-10': {
        haptic: { enabled: true, pattern: 'Double Tap' },
        sound: { enabled: true, style: 'Standard Ding', volume: 75 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Double Tap' }
      },
      'room-wait-10-plus': {
        haptic: { enabled: true, pattern: 'Urgent Alert' },
        sound: { enabled: true, style: 'Urgent Alert', volume: 95 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Urgent Alert' }
      },
      'doctor-request-0-5': {
        haptic: { enabled: true, pattern: 'Single Tap' },
        sound: { enabled: true, style: 'Standard Ding', volume: 70 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Single Tap' }
      },
      'doctor-request-5-10': {
        haptic: { enabled: true, pattern: 'Double Tap' },
        sound: { enabled: true, style: 'Urgent Alert', volume: 85 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Double Tap' }
      },
      'doctor-request-10-plus': {
        haptic: { enabled: true, pattern: 'Urgent Alert' },
        sound: { enabled: true, style: 'Urgent Alert', volume: 100 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Urgent Alert' }
      },
      'emergency-back-office': {
        haptic: { enabled: true, pattern: 'Urgent Alert' },
        sound: { enabled: true, style: 'Urgent Alert', volume: 100 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Urgent Alert' }
      },
      'new-message': {
        haptic: { enabled: true, pattern: 'Single Tap' },
        sound: { enabled: true, style: 'Soft Ping', volume: 65 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Single Tap' }
      },
      'queue-updated': {
        haptic: { enabled: true, pattern: 'Single Tap' },
        sound: { enabled: true, style: 'Chime', volume: 60 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Single Tap' }
      }
    }
  },
  {
    role: 'Front Desk',
    events: {
      'lobby-wait-0-5': {
        haptic: { enabled: true, pattern: 'Single Tap' },
        sound: { enabled: true, style: 'Soft Ping', volume: 70 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Single Tap' }
      },
      'lobby-wait-5-10': {
        haptic: { enabled: true, pattern: 'Double Tap' },
        sound: { enabled: true, style: 'Standard Ding', volume: 75 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Double Tap' }
      },
      'lobby-wait-10-plus': {
        haptic: { enabled: true, pattern: 'Urgent Alert' },
        sound: { enabled: true, style: 'Urgent Alert', volume: 90 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Urgent Alert' }
      },
      'emergency-walk-in': {
        haptic: { enabled: true, pattern: 'Urgent Alert' },
        sound: { enabled: true, style: 'Urgent Alert', volume: 100 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Urgent Alert' }
      },
      'room-wait-0-5': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: false, style: 'Silent', volume: 0 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'room-wait-5-10': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: false, style: 'Silent', volume: 0 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'room-wait-10-plus': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: false, style: 'Silent', volume: 0 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'doctor-request-0-5': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: false, style: 'Silent', volume: 0 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'doctor-request-5-10': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: false, style: 'Silent', volume: 0 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'doctor-request-10-plus': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: false, style: 'Silent', volume: 0 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'emergency-back-office': {
        haptic: { enabled: true, pattern: 'Urgent Alert' },
        sound: { enabled: true, style: 'Urgent Alert', volume: 100 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Urgent Alert' }
      },
      'new-message': {
        haptic: { enabled: true, pattern: 'Single Tap' },
        sound: { enabled: true, style: 'Soft Ping', volume: 70 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Single Tap' }
      },
      'queue-updated': {
        haptic: { enabled: true, pattern: 'Single Tap' },
        sound: { enabled: true, style: 'Chime', volume: 65 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Single Tap' }
      }
    }
  },
  {
    role: 'Hygienist',
    events: {
      'lobby-wait-0-5': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: false, style: 'Silent', volume: 0 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'lobby-wait-5-10': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: false, style: 'Silent', volume: 0 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'lobby-wait-10-plus': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: false, style: 'Silent', volume: 0 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'emergency-walk-in': {
        haptic: { enabled: true, pattern: 'Urgent Alert' },
        sound: { enabled: true, style: 'Urgent Alert', volume: 100 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Urgent Alert' }
      },
      'room-wait-0-5': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: false, style: 'Silent', volume: 0 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'room-wait-5-10': {
        haptic: { enabled: true, pattern: 'Single Tap' },
        sound: { enabled: true, style: 'Standard Ding', volume: 60 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Single Tap' }
      },
      'room-wait-10-plus': {
        haptic: { enabled: true, pattern: 'Double Tap' },
        sound: { enabled: true, style: 'Standard Ding', volume: 80 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Double Tap' }
      },
      'doctor-request-0-5': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: false, style: 'Silent', volume: 0 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'doctor-request-5-10': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: false, style: 'Silent', volume: 0 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'doctor-request-10-plus': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: false, style: 'Silent', volume: 0 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'emergency-back-office': {
        haptic: { enabled: true, pattern: 'Urgent Alert' },
        sound: { enabled: true, style: 'Urgent Alert', volume: 100 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Urgent Alert' }
      },
      'new-message': {
        haptic: { enabled: true, pattern: 'Single Tap' },
        sound: { enabled: true, style: 'Soft Ping', volume: 60 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'queue-updated': {
        haptic: { enabled: true, pattern: 'Single Tap' },
        sound: { enabled: true, style: 'Chime', volume: 55 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      }
    }
  },
  {
    role: 'Assistant',
    events: {
      'lobby-wait-0-5': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: false, style: 'Silent', volume: 0 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'lobby-wait-5-10': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: false, style: 'Silent', volume: 0 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'lobby-wait-10-plus': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: false, style: 'Silent', volume: 0 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'emergency-walk-in': {
        haptic: { enabled: true, pattern: 'Urgent Alert' },
        sound: { enabled: true, style: 'Urgent Alert', volume: 100 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Urgent Alert' }
      },
      'room-wait-0-5': {
        haptic: { enabled: false, pattern: 'Single Tap' },
        sound: { enabled: false, style: 'Silent', volume: 0 },
        banner: { enabled: true, style: 'Banner only' },
        watch: { enabled: false, pattern: 'Single Tap' }
      },
      'room-wait-5-10': {
        haptic: { enabled: true, pattern: 'Single Tap' },
        sound: { enabled: true, style: 'Standard Ding', volume: 60 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Single Tap' }
      },
      'room-wait-10-plus': {
        haptic: { enabled: true, pattern: 'Double Tap' },
        sound: { enabled: true, style: 'Standard Ding', volume: 75 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Double Tap' }
      },
      'doctor-request-0-5': {
        haptic: { enabled: true, pattern: 'Single Tap' },
        sound: { enabled: true, style: 'Soft Ping', volume: 65 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Single Tap' }
      },
      'doctor-request-5-10': {
        haptic: { enabled: true, pattern: 'Double Tap' },
        sound: { enabled: true, style: 'Standard Ding', volume: 75 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Double Tap' }
      },
      'doctor-request-10-plus': {
        haptic: { enabled: true, pattern: 'Urgent Alert' },
        sound: { enabled: true, style: 'Urgent Alert', volume: 90 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Urgent Alert' }
      },
      'emergency-back-office': {
        haptic: { enabled: true, pattern: 'Urgent Alert' },
        sound: { enabled: true, style: 'Urgent Alert', volume: 100 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Urgent Alert' }
      },
      'new-message': {
        haptic: { enabled: true, pattern: 'Single Tap' },
        sound: { enabled: true, style: 'Soft Ping', volume: 65 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Single Tap' }
      },
      'queue-updated': {
        haptic: { enabled: true, pattern: 'Single Tap' },
        sound: { enabled: true, style: 'Chime', volume: 60 },
        banner: { enabled: true, style: 'Both' },
        watch: { enabled: true, pattern: 'Single Tap' }
      }
    }
  }
];

const NOTIFICATION_EVENTS: NotificationEvent[] = [
  {
    id: 'lobby-wait-0-5',
    name: 'Lobby Wait: 0-5 Minutes',
    description: 'Patient waiting 0-5 minutes in lobby (Green)',
    domain: 'lobby',
    canCustomize: true
  },
  {
    id: 'lobby-wait-5-10',
    name: 'Lobby Wait: 5-10 Minutes',
    description: 'Patient waiting 5-10 minutes in lobby (Yellow)',
    domain: 'lobby',
    canCustomize: true
  },
  {
    id: 'lobby-wait-10-plus',
    name: 'Lobby Wait: 10+ Minutes',
    description: 'Patient waiting 10+ minutes in lobby (Red)',
    domain: 'lobby',
    canCustomize: true
  },
  {
    id: 'emergency-walk-in',
    name: 'Emergency Walk-In',
    description: 'Emergency patient arrives in lobby',
    domain: 'lobby',
    canCustomize: false,
    adminLocked: true
  },
  {
    id: 'room-wait-0-5',
    name: 'Room Wait: 0-5 Minutes',
    description: 'Room flagged ready, 0-5 minutes elapsed (Green)',
    domain: 'back-office',
    canCustomize: true
  },
  {
    id: 'room-wait-5-10',
    name: 'Room Wait: 5-10 Minutes',
    description: 'Room ready, 5-10 minutes elapsed (Yellow)',
    domain: 'back-office',
    canCustomize: true
  },
  {
    id: 'room-wait-10-plus',
    name: 'Room Wait: 10+ Minutes',
    description: 'Room ready, 10+ minutes elapsed (Red)',
    domain: 'back-office',
    canCustomize: true
  },
  {
    id: 'doctor-request-0-5',
    name: 'Doctor Request: 0-5 Minutes',
    description: 'Doctor request pending 0-5 minutes (Green)',
    domain: 'back-office',
    canCustomize: true
  },
  {
    id: 'doctor-request-5-10',
    name: 'Doctor Request: 5-10 Minutes',
    description: 'Doctor request pending 5-10 minutes (Yellow)',
    domain: 'back-office',
    canCustomize: true
  },
  {
    id: 'doctor-request-10-plus',
    name: 'Doctor Request: 10+ Minutes',
    description: 'Doctor request pending 10+ minutes (Red)',
    domain: 'back-office',
    canCustomize: true
  },
  {
    id: 'emergency-back-office',
    name: 'Emergency in Back Office',
    description: 'Emergency situation in treatment area',
    domain: 'back-office',
    canCustomize: false,
    adminLocked: true
  },
  {
    id: 'new-message',
    name: 'New Message',
    description: 'New chat message received',
    domain: 'collaboration',
    canCustomize: true
  },
  {
    id: 'queue-updated',
    name: 'Queue Updated',
    description: 'Queue order changed or cleared',
    domain: 'collaboration',
    canCustomize: true
  }
];

const DEFAULT_WAIT_TIME_THRESHOLDS: WaitTimeThresholds[] = [
  {
    domain: 'lobby',
    green: { min: 0, max: 10 },
    yellow: { min: 10, max: 20 },
    red: { min: 20 }
  },
  {
    domain: 'back-office',
    green: { min: 0, max: 5 },
    yellow: { min: 5, max: 10 },
    red: { min: 10 }
  }
];

export const useNotifications = () => {
  const [roleDefaults, setRoleDefaults] = useState<RoleDefaultProfile[]>(DEFAULT_ROLE_PROFILES);
  const [userSettings, setUserSettings] = useState<UserNotificationSettings[]>([]);
  const [waitTimeThresholds, setWaitTimeThresholds] = useState<WaitTimeThresholds[]>(DEFAULT_WAIT_TIME_THRESHOLDS);

  const events = useMemo(() => NOTIFICATION_EVENTS, []);

  const getRoleDefault = useCallback((role: Role) => {
    return roleDefaults.find(profile => profile.role === role);
  }, [roleDefaults]);

  const updateRoleDefault = useCallback((role: Role, eventId: EventType, config: ChannelConfig) => {
    setRoleDefaults(prev => prev.map(profile => 
      profile.role === role
        ? { ...profile, events: { ...profile.events, [eventId]: config } }
        : profile
    ));
  }, []);

  const resetToRoleDefaults = useCallback((role: Role) => {
    const defaultProfile = DEFAULT_ROLE_PROFILES.find(p => p.role === role);
    if (defaultProfile) {
      setRoleDefaults(prev => prev.map(profile => 
        profile.role === role ? defaultProfile : profile
      ));
    }
  }, []);

  const getEventConfig = useCallback((userId: string, role: Role, eventId: EventType): ChannelConfig => {
    const userSetting = userSettings.find(setting => setting.userId === userId);
    const roleDefault = getRoleDefault(role);
    
    if (userSetting?.customOverrides[eventId] && roleDefault) {
      // Merge user overrides with role defaults
      const baseConfig = roleDefault.events[eventId];
      const overrides = userSetting.customOverrides[eventId];
      
      return {
        haptic: { ...baseConfig.haptic, ...overrides?.haptic },
        sound: { ...baseConfig.sound, ...overrides?.sound },
        banner: { ...baseConfig.banner, ...overrides?.banner },
        watch: { ...baseConfig.watch, ...overrides?.watch }
      };
    }
    
    return roleDefault?.events[eventId] || {
      haptic: { enabled: false, pattern: 'Single Tap' },
      sound: { enabled: false, style: 'Silent', volume: 0 },
      banner: { enabled: false, style: 'Banner only' },
      watch: { enabled: false, pattern: 'Single Tap' }
    };
  }, [userSettings, getRoleDefault]);

  const updateUserOverride = useCallback((userId: string, role: Role, eventId: EventType, config: Partial<ChannelConfig>) => {
    setUserSettings(prev => {
      const existingUser = prev.find(setting => setting.userId === userId);
      
      if (existingUser) {
        return prev.map(setting => 
          setting.userId === userId
            ? {
                ...setting,
                customOverrides: {
                  ...setting.customOverrides,
                  [eventId]: { ...setting.customOverrides[eventId], ...config }
                }
              }
            : setting
        );
      } else {
        return [
          ...prev,
          {
            userId,
            role,
            customOverrides: { [eventId]: config },
            doNotDisturb: {
              enabled: false,
              schedule: { start: '18:00', end: '08:00' },
              allowEmergencyOverride: true
            }
          }
        ];
      }
    });
  }, []);

  const previewHaptic = useCallback((pattern: HapticPattern) => {
    if (navigator.vibrate) {
      switch (pattern) {
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
        case 'Heartbeat':
          navigator.vibrate([100, 30, 100, 30, 200]);
          break;
        case 'Urgent Alert':
          navigator.vibrate([300, 100, 300, 100, 300]);
          break;
        default:
          navigator.vibrate(100);
      }
    }
  }, []);

  const previewSound = useCallback((style: SoundStyle, volume: number) => {
    console.log(`Playing ${style} at ${volume}% volume`);
    // In a real app, this would play actual audio
  }, []);

  const previewAll = useCallback((config: ChannelConfig) => {
    if (config.haptic.enabled) {
      previewHaptic(config.haptic.pattern);
    }
    if (config.sound.enabled) {
      previewSound(config.sound.style, config.sound.volume);
    }
    // Banner and watch notifications would show visual feedback in UI
    console.log('Preview all channels:', config);
  }, [previewHaptic, previewSound]);

  return {
    events,
    roleDefaults,
    userSettings,
    waitTimeThresholds,
    getRoleDefault,
    updateRoleDefault,
    resetToRoleDefaults,
    getEventConfig,
    updateUserOverride,
    previewHaptic,
    previewSound,
    previewAll,
    setWaitTimeThresholds
  };
};