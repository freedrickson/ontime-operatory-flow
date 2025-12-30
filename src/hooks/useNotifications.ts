import { useState, useCallback, useMemo } from 'react';
import { 
  CueNeedType,
  EventType, 
  ChannelConfig, 
  Role, 
  CueNeed,
  NotificationEvent, 
  RoleDefaultProfile,
  UserNotificationSettings,
  WaitTimeThresholds,
  NeedGroup,
  NeedGroupId,
  CueCategory,
  HapticPattern,
  SoundStyle
} from '@/types/notifications';

// Need Groups - groups the 3 timer variants together for toggle UI
export const NEED_GROUPS: NeedGroup[] = [
  // Patient Flow
  {
    id: 'ready-to-seat',
    name: 'Ready to Seat',
    category: 'patient-flow',
    cueIds: ['ready-to-seat-0-5', 'ready-to-seat-5-10', 'ready-to-seat-10-plus']
  },
  {
    id: 'ready-for-checkout',
    name: 'Ready for Checkout',
    category: 'patient-flow',
    cueIds: ['ready-for-checkout-0-5', 'ready-for-checkout-5-10', 'ready-for-checkout-10-plus']
  },
  // Doctor
  {
    id: 'hygiene-exam',
    name: 'Hygiene Exam',
    category: 'doctor',
    cueIds: ['hygiene-exam-0-5', 'hygiene-exam-5-10', 'hygiene-exam-10-plus']
  },
  {
    id: 'limited-exam',
    name: 'Limited Exam',
    category: 'doctor',
    cueIds: ['limited-exam-0-5', 'limited-exam-5-10', 'limited-exam-10-plus']
  },
  {
    id: 'start-check',
    name: 'Start/Check',
    category: 'doctor',
    cueIds: ['start-check-0-5', 'start-check-5-10', 'start-check-10-plus']
  },
  // Clinical Support
  {
    id: 'assistant',
    name: 'Assistant',
    category: 'clinical-support',
    cueIds: ['assistant-0-5', 'assistant-5-10', 'assistant-10-plus']
  },
  {
    id: 'room-turnover',
    name: 'Room Turnover',
    category: 'clinical-support',
    cueIds: ['room-turnover-0-5', 'room-turnover-5-10', 'room-turnover-10-plus']
  },
  {
    id: 'sterile-instruments',
    name: 'Sterile Instruments',
    category: 'clinical-support',
    cueIds: ['sterile-instruments-0-5', 'sterile-instruments-5-10', 'sterile-instruments-10-plus']
  },
  {
    id: 'imaging',
    name: 'Imaging',
    category: 'clinical-support',
    cueIds: ['imaging-0-5', 'imaging-5-10', 'imaging-10-plus']
  }
];

// Helper to get category display name
export const getCategoryDisplayName = (category: CueCategory): string => {
  switch (category) {
    case 'patient-flow': return 'Patient Flow';
    case 'doctor': return 'Doctor';
    case 'clinical-support': return 'Clinical Support';
    default: return category;
  }
};

// Helper to create default channel config
const createDefaultConfig = (enabled: boolean, pattern: HapticPattern = 'Single Tap', volume: number = 60): ChannelConfig => ({
  haptic: { enabled, pattern },
  sound: { enabled, style: 'Standard Ding', volume },
  banner: { enabled: true, style: 'Both' },
  watch: { enabled, pattern }
});

// Helper to create all cue configs for a role
const createAllCueConfigs = (enabledGroups: NeedGroupId[]): Record<CueNeedType, ChannelConfig> => {
  const configs: Partial<Record<CueNeedType, ChannelConfig>> = {};
  
  NEED_GROUPS.forEach(group => {
    const isEnabled = enabledGroups.includes(group.id);
    group.cueIds.forEach((cueId, index) => {
      // Index 0 = green (0-5), 1 = yellow (5-10), 2 = red (10+)
      const patterns: HapticPattern[] = ['Single Tap', 'Double Tap', 'Urgent Alert'];
      const volumes = [50, 70, 90];
      configs[cueId] = createDefaultConfig(isEnabled, patterns[index], volumes[index]);
    });
  });
  
  // System cues
  configs['emergency'] = createDefaultConfig(true, 'Urgent Alert', 100);
  configs['new-message'] = createDefaultConfig(false, 'Single Tap', 50);
  configs['queue-updated'] = createDefaultConfig(false, 'Single Tap', 50);
  
  return configs as Record<CueNeedType, ChannelConfig>;
};

// Doctor only receives Doctor Cues by default
const DOCTOR_ENABLED_GROUPS: NeedGroupId[] = ['hygiene-exam', 'limited-exam', 'start-check'];

// Clinical Lead receives all cues
const CLINICAL_LEAD_ENABLED_GROUPS: NeedGroupId[] = [
  'ready-to-seat', 'ready-for-checkout',
  'hygiene-exam', 'limited-exam', 'start-check',
  'assistant', 'room-turnover', 'sterile-instruments', 'imaging'
];

// Front Desk receives Patient Flow cues
const FRONT_DESK_ENABLED_GROUPS: NeedGroupId[] = ['ready-to-seat', 'ready-for-checkout'];

// Hygienist receives Clinical Support cues
const HYGIENIST_ENABLED_GROUPS: NeedGroupId[] = ['assistant', 'room-turnover', 'sterile-instruments', 'imaging'];

// Assistant receives Clinical Support cues
const ASSISTANT_ENABLED_GROUPS: NeedGroupId[] = ['assistant', 'room-turnover', 'sterile-instruments', 'imaging'];

// Default role profiles
const DEFAULT_ROLE_PROFILES: RoleDefaultProfile[] = [
  {
    role: 'Doctor',
    enabledNeedGroups: DOCTOR_ENABLED_GROUPS,
    events: createAllCueConfigs(DOCTOR_ENABLED_GROUPS)
  },
  {
    role: 'Clinical Lead',
    enabledNeedGroups: CLINICAL_LEAD_ENABLED_GROUPS,
    events: createAllCueConfigs(CLINICAL_LEAD_ENABLED_GROUPS)
  },
  {
    role: 'Front Desk',
    enabledNeedGroups: FRONT_DESK_ENABLED_GROUPS,
    events: createAllCueConfigs(FRONT_DESK_ENABLED_GROUPS)
  },
  {
    role: 'Hygienist',
    enabledNeedGroups: HYGIENIST_ENABLED_GROUPS,
    events: createAllCueConfigs(HYGIENIST_ENABLED_GROUPS)
  },
  {
    role: 'Assistant',
    enabledNeedGroups: ASSISTANT_ENABLED_GROUPS,
    events: createAllCueConfigs(ASSISTANT_ENABLED_GROUPS)
  }
];

// Cue needs (notification events)
const CUE_NEEDS: CueNeed[] = [
  // Patient Flow - Ready to Seat
  {
    id: 'ready-to-seat-0-5',
    name: 'Ready to Seat: 0-5 min',
    description: 'Patient ready to be seated (Green)',
    category: 'patient-flow',
    canCustomize: true,
    needGroupId: 'ready-to-seat',
    timerLevel: 'green'
  },
  {
    id: 'ready-to-seat-5-10',
    name: 'Ready to Seat: 5-10 min',
    description: 'Patient waiting to be seated (Yellow)',
    category: 'patient-flow',
    canCustomize: true,
    needGroupId: 'ready-to-seat',
    timerLevel: 'yellow'
  },
  {
    id: 'ready-to-seat-10-plus',
    name: 'Ready to Seat: 10+ min',
    description: 'Patient waiting too long to be seated (Red)',
    category: 'patient-flow',
    canCustomize: true,
    needGroupId: 'ready-to-seat',
    timerLevel: 'red'
  },
  // Patient Flow - Ready for Checkout
  {
    id: 'ready-for-checkout-0-5',
    name: 'Ready for Checkout: 0-5 min',
    description: 'Patient ready for checkout (Green)',
    category: 'patient-flow',
    canCustomize: true,
    needGroupId: 'ready-for-checkout',
    timerLevel: 'green'
  },
  {
    id: 'ready-for-checkout-5-10',
    name: 'Ready for Checkout: 5-10 min',
    description: 'Patient waiting for checkout (Yellow)',
    category: 'patient-flow',
    canCustomize: true,
    needGroupId: 'ready-for-checkout',
    timerLevel: 'yellow'
  },
  {
    id: 'ready-for-checkout-10-plus',
    name: 'Ready for Checkout: 10+ min',
    description: 'Patient waiting too long for checkout (Red)',
    category: 'patient-flow',
    canCustomize: true,
    needGroupId: 'ready-for-checkout',
    timerLevel: 'red'
  },
  // Doctor - Hygiene Exam
  {
    id: 'hygiene-exam-0-5',
    name: 'Hygiene Exam: 0-5 min',
    description: 'Doctor needed for hygiene exam (Green)',
    category: 'doctor',
    canCustomize: true,
    needGroupId: 'hygiene-exam',
    timerLevel: 'green'
  },
  {
    id: 'hygiene-exam-5-10',
    name: 'Hygiene Exam: 5-10 min',
    description: 'Doctor needed for hygiene exam (Yellow)',
    category: 'doctor',
    canCustomize: true,
    needGroupId: 'hygiene-exam',
    timerLevel: 'yellow'
  },
  {
    id: 'hygiene-exam-10-plus',
    name: 'Hygiene Exam: 10+ min',
    description: 'Doctor needed for hygiene exam (Red)',
    category: 'doctor',
    canCustomize: true,
    needGroupId: 'hygiene-exam',
    timerLevel: 'red'
  },
  // Doctor - Limited Exam
  {
    id: 'limited-exam-0-5',
    name: 'Limited Exam: 0-5 min',
    description: 'Doctor needed for limited exam (Green)',
    category: 'doctor',
    canCustomize: true,
    needGroupId: 'limited-exam',
    timerLevel: 'green'
  },
  {
    id: 'limited-exam-5-10',
    name: 'Limited Exam: 5-10 min',
    description: 'Doctor needed for limited exam (Yellow)',
    category: 'doctor',
    canCustomize: true,
    needGroupId: 'limited-exam',
    timerLevel: 'yellow'
  },
  {
    id: 'limited-exam-10-plus',
    name: 'Limited Exam: 10+ min',
    description: 'Doctor needed for limited exam (Red)',
    category: 'doctor',
    canCustomize: true,
    needGroupId: 'limited-exam',
    timerLevel: 'red'
  },
  // Doctor - Start/Check
  {
    id: 'start-check-0-5',
    name: 'Start/Check: 0-5 min',
    description: 'Doctor needed for start/check (Green)',
    category: 'doctor',
    canCustomize: true,
    needGroupId: 'start-check',
    timerLevel: 'green'
  },
  {
    id: 'start-check-5-10',
    name: 'Start/Check: 5-10 min',
    description: 'Doctor needed for start/check (Yellow)',
    category: 'doctor',
    canCustomize: true,
    needGroupId: 'start-check',
    timerLevel: 'yellow'
  },
  {
    id: 'start-check-10-plus',
    name: 'Start/Check: 10+ min',
    description: 'Doctor needed for start/check (Red)',
    category: 'doctor',
    canCustomize: true,
    needGroupId: 'start-check',
    timerLevel: 'red'
  },
  // Clinical Support - Assistant
  {
    id: 'assistant-0-5',
    name: 'Assistant: 0-5 min',
    description: 'Assistant needed (Green)',
    category: 'clinical-support',
    canCustomize: true,
    needGroupId: 'assistant',
    timerLevel: 'green'
  },
  {
    id: 'assistant-5-10',
    name: 'Assistant: 5-10 min',
    description: 'Assistant needed (Yellow)',
    category: 'clinical-support',
    canCustomize: true,
    needGroupId: 'assistant',
    timerLevel: 'yellow'
  },
  {
    id: 'assistant-10-plus',
    name: 'Assistant: 10+ min',
    description: 'Assistant needed (Red)',
    category: 'clinical-support',
    canCustomize: true,
    needGroupId: 'assistant',
    timerLevel: 'red'
  },
  // Clinical Support - Room Turnover
  {
    id: 'room-turnover-0-5',
    name: 'Room Turnover: 0-5 min',
    description: 'Room turnover needed (Green)',
    category: 'clinical-support',
    canCustomize: true,
    needGroupId: 'room-turnover',
    timerLevel: 'green'
  },
  {
    id: 'room-turnover-5-10',
    name: 'Room Turnover: 5-10 min',
    description: 'Room turnover needed (Yellow)',
    category: 'clinical-support',
    canCustomize: true,
    needGroupId: 'room-turnover',
    timerLevel: 'yellow'
  },
  {
    id: 'room-turnover-10-plus',
    name: 'Room Turnover: 10+ min',
    description: 'Room turnover needed (Red)',
    category: 'clinical-support',
    canCustomize: true,
    needGroupId: 'room-turnover',
    timerLevel: 'red'
  },
  // Clinical Support - Sterile Instruments
  {
    id: 'sterile-instruments-0-5',
    name: 'Sterile Instruments: 0-5 min',
    description: 'Sterile instruments needed (Green)',
    category: 'clinical-support',
    canCustomize: true,
    needGroupId: 'sterile-instruments',
    timerLevel: 'green'
  },
  {
    id: 'sterile-instruments-5-10',
    name: 'Sterile Instruments: 5-10 min',
    description: 'Sterile instruments needed (Yellow)',
    category: 'clinical-support',
    canCustomize: true,
    needGroupId: 'sterile-instruments',
    timerLevel: 'yellow'
  },
  {
    id: 'sterile-instruments-10-plus',
    name: 'Sterile Instruments: 10+ min',
    description: 'Sterile instruments needed (Red)',
    category: 'clinical-support',
    canCustomize: true,
    needGroupId: 'sterile-instruments',
    timerLevel: 'red'
  },
  // Clinical Support - Imaging
  {
    id: 'imaging-0-5',
    name: 'Imaging: 0-5 min',
    description: 'Imaging needed (Green)',
    category: 'clinical-support',
    canCustomize: true,
    needGroupId: 'imaging',
    timerLevel: 'green'
  },
  {
    id: 'imaging-5-10',
    name: 'Imaging: 5-10 min',
    description: 'Imaging needed (Yellow)',
    category: 'clinical-support',
    canCustomize: true,
    needGroupId: 'imaging',
    timerLevel: 'yellow'
  },
  {
    id: 'imaging-10-plus',
    name: 'Imaging: 10+ min',
    description: 'Imaging needed (Red)',
    category: 'clinical-support',
    canCustomize: true,
    needGroupId: 'imaging',
    timerLevel: 'red'
  },
  // System cues
  {
    id: 'emergency',
    name: 'Emergency',
    description: 'Emergency situation',
    category: 'clinical-support',
    canCustomize: false,
    adminLocked: true
  },
  {
    id: 'new-message',
    name: 'New Message',
    description: 'New chat message received',
    category: 'clinical-support',
    canCustomize: true
  },
  {
    id: 'queue-updated',
    name: 'Queue Updated',
    description: 'Queue order changed or cleared',
    category: 'clinical-support',
    canCustomize: true
  }
];

const DEFAULT_WAIT_TIME_THRESHOLDS: WaitTimeThresholds[] = [
  {
    category: 'patient-flow',
    green: { min: 0, max: 5 },
    yellow: { min: 5, max: 10 },
    red: { min: 10 }
  },
  {
    category: 'doctor',
    green: { min: 0, max: 5 },
    yellow: { min: 5, max: 10 },
    red: { min: 10 }
  },
  {
    category: 'clinical-support',
    green: { min: 0, max: 5 },
    yellow: { min: 5, max: 10 },
    red: { min: 10 }
  }
];

export const useNotifications = () => {
  const [roleDefaults, setRoleDefaults] = useState<RoleDefaultProfile[]>(DEFAULT_ROLE_PROFILES);
  const [userSettings, setUserSettings] = useState<UserNotificationSettings[]>([]);
  const [waitTimeThresholds, setWaitTimeThresholds] = useState<WaitTimeThresholds[]>(DEFAULT_WAIT_TIME_THRESHOLDS);

  const events = useMemo(() => CUE_NEEDS, []);
  const needGroups = useMemo(() => NEED_GROUPS, []);

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

  const updateRoleEnabledNeedGroups = useCallback((role: Role, enabledGroups: NeedGroupId[]) => {
    setRoleDefaults(prev => prev.map(profile => {
      if (profile.role !== role) return profile;
      
      // Update enabled groups and regenerate configs
      const newConfigs = createAllCueConfigs(enabledGroups);
      return {
        ...profile,
        enabledNeedGroups: enabledGroups,
        events: newConfigs
      };
    }));
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
  }, []);

  const previewAll = useCallback((config: ChannelConfig) => {
    if (config.haptic.enabled) {
      previewHaptic(config.haptic.pattern);
    }
    if (config.sound.enabled) {
      previewSound(config.sound.style, config.sound.volume);
    }
    console.log('Preview all channels:', config);
  }, [previewHaptic, previewSound]);

  return {
    events,
    needGroups,
    roleDefaults,
    userSettings,
    waitTimeThresholds,
    getRoleDefault,
    updateRoleDefault,
    updateRoleEnabledNeedGroups,
    resetToRoleDefaults,
    getEventConfig,
    updateUserOverride,
    previewHaptic,
    previewSound,
    previewAll,
    setWaitTimeThresholds,
    getCategoryDisplayName
  };
};
