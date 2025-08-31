import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { 
  Settings, 
  Bell, 
  Users, 
  Building, 
  BarChart3, 
  Plug, 
  User, 
  Shield, 
  HelpCircle,
  Volume2,
  Vibrate,
  Eye,
  Smartphone
} from 'lucide-react';
import NavigationOverlay from '@/components/NavigationOverlay';
import { NotificationCustomModal } from '@/components/NotificationCustomModal';
import { useNotifications } from '@/hooks/useNotifications';
import { EventType, Role } from '@/types/notifications';

const SettingsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('notifications');
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    eventId: EventType;
    eventName: string;
    userId?: string;
    role: Role;
    isRoleDefault: boolean;
  } | null>(null);
  
  const { events, roleDefaults } = useNotifications();
  
  const [practiceSettings, setPracticeSettings] = useState({
    name: 'Smile Dental Practice',
    accentColor: '#168076',
    lobbyChairs: 12,
    officeHours: {
      start: '08:00',
      end: '17:00'
    }
  });

  const sidebarItems = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'roles', label: 'Roles & Permissions', icon: Users },
    { id: 'practice', label: 'Practice Settings', icon: Building },
    { id: 'analytics', label: 'Analytics Preferences', icon: BarChart3 },
    { id: 'integrations', label: 'Integrations', icon: Plug },
    { id: 'profile', label: 'User Profile', icon: User },
    { id: 'security', label: 'Account & Security', icon: Shield },
    { id: 'support', label: 'Help & Support', icon: HelpCircle },
  ];

  const openCustomModal = (eventId: EventType, eventName: string, userId?: string, role: Role = 'Doctor', isRoleDefault: boolean = false) => {
    setSelectedEvent({ eventId, eventName, userId, role, isRoleDefault });
    setCustomModalOpen(true);
  };

  const closeCustomModal = () => {
    setCustomModalOpen(false);
    setSelectedEvent(null);
  };

  const renderNotifications = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">Notifications</h2>
        <p className="subtitle-text text-muted-foreground mb-8">Configure how and when you receive notifications for different events.</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle>Role Default Profiles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roleDefaults.map((roleProfile) => (
              <div key={roleProfile.role} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Badge variant="outline">{roleProfile.role}</Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    Default notification settings for {roleProfile.role} role
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openCustomModal('doctor-request-0-5', `${roleProfile.role} Defaults`, undefined, roleProfile.role, true)}
                >
                  Edit Defaults
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle>Event Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Event</th>
                  <th className="text-left p-3">Domain</th>
                  <th className="text-center p-3">
                    <div className="flex items-center justify-center gap-1">
                      <Vibrate className="h-4 w-4" />
                      <span className="text-xs">Haptic</span>
                    </div>
                  </th>
                  <th className="text-center p-3">
                    <div className="flex items-center justify-center gap-1">
                      <Volume2 className="h-4 w-4" />
                      <span className="text-xs">Sound</span>
                    </div>
                  </th>
                  <th className="text-center p-3">
                    <div className="flex items-center justify-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span className="text-xs">Banner</span>
                    </div>
                  </th>
                  <th className="text-center p-3">
                    <div className="flex items-center justify-center gap-1">
                      <Smartphone className="h-4 w-4" />
                      <span className="text-xs">Watch</span>
                    </div>
                  </th>
                  <th className="text-center p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => {
                  const roleDefault = roleDefaults.find(rd => rd.role === 'Doctor');
                  const config = roleDefault?.events[event.id];
                  
                  return (
                    <tr key={event.id} className="border-b">
                      <td className="p-3">
                        <div>
                          <div className="font-medium">{event.name}</div>
                          <div className="text-xs text-muted-foreground">{event.description}</div>
                          {event.adminLocked && (
                            <Badge variant="destructive" className="text-xs mt-1">Admin Locked</Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant="secondary" className="capitalize">{event.domain}</Badge>
                      </td>
                      <td className="text-center p-3">
                        <div className={`w-2 h-2 rounded-full mx-auto ${
                          config?.haptic.enabled ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                      </td>
                      <td className="text-center p-3">
                        <div className={`w-2 h-2 rounded-full mx-auto ${
                          config?.sound.enabled ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                      </td>
                      <td className="text-center p-3">
                        <div className={`w-2 h-2 rounded-full mx-auto ${
                          config?.banner.enabled ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                      </td>
                      <td className="text-center p-3">
                        <div className={`w-2 h-2 rounded-full mx-auto ${
                          config?.watch.enabled ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                      </td>
                      <td className="text-center p-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openCustomModal(event.id, event.name, 'user-1', 'Doctor', false)}
                          disabled={!event.canCustomize}
                        >
                          Customize
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="bg-[hsl(var(--accent-color))] hover:bg-[hsl(var(--accent-color))]/90">Save Changes</Button>
        <Button variant="outline">Reset to Defaults</Button>
        <Button variant="outline">Send Test Notification</Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'notifications':
        return renderNotifications();
      default:
        return (
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">
              {sidebarItems.find(item => item.id === activeSection)?.label}
            </h2>
            <p className="subtitle-text text-muted-foreground">
              This section is coming soon. Configure your {activeSection} settings here.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Fixed Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-8 bg-background/80 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-foreground">
            On Time
          </div>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-lg font-medium hover:opacity-70 transition-all duration-300 text-foreground"
          >
            MENU
          </button>
        </div>
      </header>

      {/* Navigation Overlay */}
      <NavigationOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />

      {/* Main Content */}
      <main className="pt-24">
        {/* Hero Header Section */}
        <section className="px-8 py-16 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <h1 className="section-title text-foreground mb-6">
              Settings
            </h1>
            <p className="subtitle-text text-muted-foreground max-w-2xl">
              Configure notifications, manage roles, and customize your practice settings.
            </p>
          </div>
        </section>

        {/* Settings Layout */}
        <div className="flex min-h-[calc(100vh-320px)]">
          {/* Sidebar */}
          <div className="w-80 border-r bg-card/50 backdrop-blur-sm">
            <nav className="p-8">
              <ul className="space-y-4">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-300 font-medium text-lg flex items-center gap-4 ${
                          activeSection === item.id 
                            ? 'bg-[hsl(var(--accent-color))] text-white shadow-lg' 
                            : 'hover:bg-muted/50 text-foreground'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="max-w-6xl">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>

      {selectedEvent && (
        <NotificationCustomModal
          isOpen={customModalOpen}
          onClose={closeCustomModal}
          eventId={selectedEvent.eventId}
          eventName={selectedEvent.eventName}
          userId={selectedEvent.userId}
          role={selectedEvent.role}
          isRoleDefault={selectedEvent.isRoleDefault}
        />
      )}
    </div>
  );
};

export default SettingsPage;