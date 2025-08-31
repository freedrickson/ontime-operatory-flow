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
import { NotificationCustomModal } from '@/components/NotificationCustomModal';
import { useNotifications } from '@/hooks/useNotifications';
import { EventType, Role } from '@/types/notifications';

const SettingsPage = () => {
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

  const teamMembers = [
    { name: 'Dr. Sarah Johnson', email: 'sarah@practice.com', role: 'Doctor', initials: 'SJ' },
    { name: 'Mike Chen', email: 'mike@practice.com', role: 'Clinical Lead', initials: 'MC' },
    { name: 'Emma Davis', email: 'emma@practice.com', role: 'Hygienist', initials: 'ED' },
    { name: 'Alex Smith', email: 'alex@practice.com', role: 'Assistant', initials: 'AS' },
    { name: 'Lisa Wong', email: 'lisa@practice.com', role: 'Front Desk', initials: 'LW' }
  ];

  const roleTemplates = [
    { name: 'Doctor', permissions: ['Full Access', 'Patient Records', 'Scheduling'] },
    { name: 'Clinical Lead', permissions: ['Team Management', 'Scheduling', 'Reports'] },
    { name: 'Hygienist', permissions: ['Patient Records', 'Scheduling'] },
    { name: 'Assistant', permissions: ['Basic Access', 'Scheduling'] },
    { name: 'Front Desk', permissions: ['Scheduling', 'Check-in/out', 'Billing'] }
  ];

  const integrations = [
    { name: 'Open Dental PMS', status: 'connected', description: 'Practice management system integration' },
    { name: 'Dentrix', status: 'available', description: 'Alternative PMS integration' },
    { name: 'Eaglesoft', status: 'coming-soon', description: 'PMS integration coming soon' }
  ];

  const faqItems = [
    { 
      question: 'How do I reset my notification preferences?', 
      answer: 'You can reset your notification preferences by going to the Notifications section and clicking "Reset to Defaults".' 
    },
    { 
      question: 'Can I customize notifications for specific events?', 
      answer: 'Yes, you can customize haptic patterns, sounds, and display options for each event type.' 
    },
    { 
      question: 'What devices support notifications?', 
      answer: 'Notifications work on desktop, mobile, and smartwatch devices when properly configured.' 
    }
  ];

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
        <h3 className="text-2xl font-bold mb-4">Notifications</h3>
        <p className="text-muted-foreground mb-6">Configure how and when you receive notifications for different events.</p>
      </div>

      <Card>
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

      <Card>
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
                  const roleDefault = roleDefaults.find(rd => rd.role === 'Doctor'); // Show Doctor as example
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

      <Card>
        <CardHeader>
          <CardTitle>Do Not Disturb</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Enable Do Not Disturb</Label>
            <Switch />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Time</Label>
              <Input type="time" defaultValue="18:00" />
            </div>
            <div>
              <Label>End Time</Label>
              <Input type="time" defaultValue="08:00" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label>Allow Emergency Override</Label>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button>Save Changes</Button>
        <Button variant="outline">Reset to Defaults</Button>
        <Button variant="outline">Send Test Notification</Button>
      </div>
    </div>
  );

  const renderRoles = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Roles & Permissions</h3>
        <p className="text-muted-foreground mb-6">Manage team members and their access levels.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Roster</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.email} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                    {member.initials}
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                  <Badge variant="secondary">{member.role}</Badge>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Role Templates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {roleTemplates.map((role) => (
            <div key={role.name} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Badge variant="outline">{role.name}</Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  {role.permissions.join(", ")}
                </p>
              </div>
              <Button variant="outline" size="sm">Customize Template</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button>Invite New Team Member</Button>
    </div>
  );

  const renderPractice = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Practice Settings</h3>
        <p className="text-muted-foreground mb-6">Configure your practice details and operational settings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Practice Identity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="practiceName">Practice Name</Label>
            <Input 
              id="practiceName" 
              value={practiceSettings.name}
              onChange={(e) => setPracticeSettings(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="logo">Practice Logo</Label>
            <Input id="logo" type="file" accept="image/*" />
          </div>
          <div>
            <Label htmlFor="accentColor">Accent Color</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="accentColor" 
                type="color" 
                value={practiceSettings.accentColor}
                onChange={(e) => setPracticeSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                className="w-20"
              />
              <Input 
                value={practiceSettings.accentColor}
                onChange={(e) => setPracticeSettings(prev => ({ ...prev, accentColor: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wait Time Thresholds</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Green (Good)</Label>
              <div className="text-sm text-muted-foreground mb-2">0-5 minutes</div>
              <div className="flex items-center gap-2">
                <Input type="number" defaultValue="0" className="w-20" />
                <span>to</span>
                <Input type="number" defaultValue="5" className="w-20" />
                <span>min</span>
              </div>
            </div>
            <div>
              <Label>Yellow (Caution)</Label>
              <div className="text-sm text-muted-foreground mb-2">5-10 minutes</div>
              <div className="flex items-center gap-2">
                <Input type="number" defaultValue="5" className="w-20" />
                <span>to</span>
                <Input type="number" defaultValue="10" className="w-20" />
                <span>min</span>
              </div>
            </div>
            <div>
              <Label>Red (Alert)</Label>
              <div className="text-sm text-muted-foreground mb-2">10+ minutes</div>
              <div className="flex items-center gap-2">
                <Input type="number" defaultValue="10" className="w-20" />
                <span>+ min</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lobby Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Number of Lobby Chairs</Label>
            <Slider
              value={[practiceSettings.lobbyChairs]}
              onValueChange={([value]) => setPracticeSettings(prev => ({ ...prev, lobbyChairs: value }))}
              max={50}
              min={1}
              step={1}
              className="mt-2"
            />
            <div className="text-sm text-muted-foreground mt-1">{practiceSettings.lobbyChairs} chairs</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Office Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Opening Time</Label>
              <Input 
                type="time" 
                value={practiceSettings.officeHours.start}
                onChange={(e) => setPracticeSettings(prev => ({ 
                  ...prev, 
                  officeHours: { ...prev.officeHours, start: e.target.value }
                }))}
              />
            </div>
            <div>
              <Label>Closing Time</Label>
              <Input 
                type="time" 
                value={practiceSettings.officeHours.end}
                onChange={(e) => setPracticeSettings(prev => ({ 
                  ...prev, 
                  officeHours: { ...prev.officeHours, end: e.target.value }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button>Save Practice Settings</Button>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Analytics Preferences</h3>
        <p className="text-muted-foreground mb-6">Configure analytics views and reporting preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>KPI Display Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Show Individual Provider Metrics</Label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <Label>Include Benchmark Comparisons</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label>Real-time Updates</Label>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Targets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>On-Time Percentage Target</Label>
            <div className="flex items-center gap-2 mt-2">
              <Slider defaultValue={[85]} max={100} min={50} step={5} className="flex-1" />
              <span className="text-sm font-medium w-12">85%</span>
            </div>
          </div>
          <div>
            <Label>Average Response Time Target (minutes)</Label>
            <div className="flex items-center gap-2 mt-2">
              <Slider defaultValue={[3]} max={10} min={1} step={1} className="flex-1" />
              <span className="text-sm font-medium w-12">3 min</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Default Export Format</Label>
            <Select defaultValue="pdf">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Report</SelectItem>
                <SelectItem value="csv">CSV Data</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Automated Report Schedule</Label>
            <Select defaultValue="weekly">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="none">No Automation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Integrations</h3>
        <p className="text-muted-foreground mb-6">Connect your practice management systems and third-party tools.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Practice Management Systems</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {integrations.map((integration) => (
            <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{integration.name}</p>
                <p className="text-sm text-muted-foreground">{integration.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={integration.status === 'connected' ? 'default' : 'secondary'}
                  className={integration.status === 'connected' ? 'bg-green-500' : ''}
                >
                  {integration.status === 'connected' ? 'Connected' : 
                   integration.status === 'available' ? 'Available' : 'Coming Soon'}
                </Badge>
                {integration.status === 'connected' ? (
                  <Button variant="outline" size="sm">Configure</Button>
                ) : integration.status === 'available' ? (
                  <Button size="sm">Connect</Button>
                ) : null}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Configure API keys and OAuth settings for third-party integrations.
          </p>
          <Button variant="outline">Manage API Keys</Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">User Profile</h3>
        <p className="text-muted-foreground mb-6">Manage your personal information and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
              SJ
            </div>
            <Button variant="outline" size="sm">Change Avatar</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input defaultValue="Sarah" />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input defaultValue="Johnson" />
            </div>
          </div>
          <div>
            <Label>Email</Label>
            <Input defaultValue="sarah@practice.com" />
          </div>
          <div>
            <Label>Phone</Label>
            <Input defaultValue="+1 (555) 123-4567" />
          </div>
          <div>
            <Label>Role</Label>
            <Select defaultValue="doctor">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="clinical-lead">Clinical Lead</SelectItem>
                <SelectItem value="hygienist">Hygienist</SelectItem>
                <SelectItem value="assistant">Assistant</SelectItem>
                <SelectItem value="front-desk">Front Desk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Theme</Label>
            <Select defaultValue="auto">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="auto">Auto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Language</Label>
            <Select defaultValue="en">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Button>Save Profile</Button>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Account & Security</h3>
        <p className="text-muted-foreground mb-6">Manage your account security and login settings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Password & Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline">Change Password</Button>
          <div className="flex items-center justify-between">
            <div>
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Login Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border rounded">
              <div>
                <p className="font-medium">Desktop - Chrome</p>
                <p className="text-sm text-muted-foreground">Today at 9:15 AM</p>
              </div>
              <Badge variant="outline">Current Session</Badge>
            </div>
            <div className="flex justify-between items-center p-3 border rounded">
              <div>
                <p className="font-medium">Mobile - Safari</p>
                <p className="text-sm text-muted-foreground">Yesterday at 6:30 PM</p>
              </div>
              <Button variant="outline" size="sm">Revoke</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Help & Support</h3>
        <p className="text-muted-foreground mb-6">Get help and support for using the On Time app.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <details>
                  <summary className="cursor-pointer font-medium">{item.question}</summary>
                  <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
                </details>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input placeholder="Your name" />
            </div>
            <div>
              <Label>Email</Label>
              <Input placeholder="your@email.com" />
            </div>
          </div>
          <div>
            <Label>Phone (Optional)</Label>
            <Input placeholder="+1 (555) 123-4567" />
          </div>
          <div>
            <Label>Message</Label>
            <Textarea placeholder="Describe your issue or question..." rows={4} />
          </div>
          <Button>Send Message</Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'notifications':
        return renderNotifications();
      case 'roles':
        return renderRoles();
      case 'practice':
        return renderPractice();
      case 'analytics':
        return renderAnalytics();
      case 'integrations':
        return renderIntegrations();
      case 'profile':
        return renderProfile();
      case 'security':
        return renderSecurity();
      case 'support':
        return renderSupport();
      default:
        return renderNotifications();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Settings className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Content Panel */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>

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