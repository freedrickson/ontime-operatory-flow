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
import { RoleDefaultsPanel } from '@/components/RoleDefaultsPanel';
import { useNotifications, getCategoryDisplayName } from '@/hooks/useNotifications';
import { CueNeedType, Role } from '@/types/notifications';

const SettingsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('notifications');
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [roleDefaultsPanelOpen, setRoleDefaultsPanelOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>('Doctor');
  const [selectedEvent, setSelectedEvent] = useState<{
    eventId: CueNeedType;
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

  const openCustomModal = (eventId: CueNeedType, eventName: string, userId?: string, role: Role = 'Doctor', isRoleDefault: boolean = false) => {
    setSelectedEvent({ eventId, eventName, userId, role, isRoleDefault });
    setCustomModalOpen(true);
  };

  const openRoleDefaultsPanel = (role: Role) => {
    setSelectedRole(role);
    setRoleDefaultsPanelOpen(true);
  };

  const closeCustomModal = () => {
    setCustomModalOpen(false);
    setSelectedEvent(null);
  };

  const renderNotifications = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">Cue Notifications</h2>
        <p className="subtitle-text text-muted-foreground mb-8">Configure how and when you receive cues for different needs.</p>
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
                    Default cue settings for {roleProfile.role} role
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openRoleDefaultsPanel(roleProfile.role)}
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
          <CardTitle>Cue Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Cue</th>
                  <th className="text-left p-3">Category</th>
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
                        <Badge variant="secondary" className="capitalize">{getCategoryDisplayName(event.category)}</Badge>
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

  const renderRoles = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">Roles & Permissions</h2>
        <p className="subtitle-text text-muted-foreground mb-8">Manage user roles and their permissions throughout the system.</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle>Staff Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['Doctor', 'Clinical Lead', 'Hygienist', 'Assistant', 'Front Desk'].map((role) => (
              <div key={role} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Badge variant="outline">{role}</Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    {role === 'Doctor' && 'Full access to patient records and treatment planning'}
                    {role === 'Clinical Lead' && 'Manage clinical operations and staff scheduling'}
                    {role === 'Hygienist' && 'Access to preventive care and patient education'}
                    {role === 'Assistant' && 'Support clinical procedures and patient management'}
                    {role === 'Front Desk' && 'Handle appointments, billing, and patient communication'}
                  </p>
                </div>
                <Button variant="outline" size="sm">Edit Permissions</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="bg-[hsl(var(--accent-color))] hover:bg-[hsl(var(--accent-color))]/90">Save Changes</Button>
        <Button variant="outline">Add New Role</Button>
      </div>
    </div>
  );

  const renderPractice = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">Practice Settings</h2>
        <p className="subtitle-text text-muted-foreground mb-8">Configure your practice information and operational preferences.</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="practice-name">Practice Name</Label>
              <Input 
                id="practice-name"
                value={practiceSettings.name}
                onChange={(e) => setPracticeSettings(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accent-color">Accent Color</Label>
              <Input 
                id="accent-color"
                type="color"
                value={practiceSettings.accentColor}
                onChange={(e) => setPracticeSettings(prev => ({ ...prev, accentColor: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lobby-chairs">Lobby Chairs</Label>
            <Slider
              value={[practiceSettings.lobbyChairs]}
              onValueChange={(value) => setPracticeSettings(prev => ({ ...prev, lobbyChairs: value[0] }))}
              max={20}
              min={1}
              step={1}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">{practiceSettings.lobbyChairs} chairs</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle>Office Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="start-time">Opening Time</Label>
              <Input 
                id="start-time"
                type="time"
                value={practiceSettings.officeHours.start}
                onChange={(e) => setPracticeSettings(prev => ({ 
                  ...prev, 
                  officeHours: { ...prev.officeHours, start: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">Closing Time</Label>
              <Input 
                id="end-time"
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

      <div className="flex gap-4">
        <Button className="bg-[hsl(var(--accent-color))] hover:bg-[hsl(var(--accent-color))]/90">Save Changes</Button>
        <Button variant="outline">Reset to Defaults</Button>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">Analytics Preferences</h2>
        <p className="subtitle-text text-muted-foreground mb-8">Control what data is collected and how analytics are displayed.</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle>Data Collection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Wait Time Analytics</Label>
              <p className="text-sm text-muted-foreground">Track patient wait times across lobby and treatment rooms</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Staff Performance Metrics</Label>
              <p className="text-sm text-muted-foreground">Monitor appointment efficiency and response times</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Patient Flow Analysis</Label>
              <p className="text-sm text-muted-foreground">Analyze patient movement and bottlenecks</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle>Dashboard Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Default Time Range</Label>
            <Select defaultValue="week">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Real-time Updates</Label>
              <p className="text-sm text-muted-foreground">Automatically refresh dashboard data</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="bg-[hsl(var(--accent-color))] hover:bg-[hsl(var(--accent-color))]/90">Save Changes</Button>
        <Button variant="outline">Export Data</Button>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">Integrations</h2>
        <p className="subtitle-text text-muted-foreground mb-8">Connect On Time Flow with your existing practice management systems.</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle>Practice Management Systems</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: 'Dentrix', status: 'Connected', description: 'Patient scheduling and records' },
            { name: 'Eaglesoft', status: 'Available', description: 'Comprehensive practice management' },
            { name: 'Open Dental', status: 'Available', description: 'Open-source dental software' },
            { name: 'SoftDent', status: 'Available', description: 'Cloud-based practice management' }
          ].map((integration) => (
            <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">{integration.name}</div>
                <p className="text-sm text-muted-foreground">{integration.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={integration.status === 'Connected' ? 'default' : 'outline'}>
                  {integration.status}
                </Badge>
                <Button variant="outline" size="sm">
                  {integration.status === 'Connected' ? 'Configure' : 'Connect'}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle>Communication Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: 'Microsoft Teams', status: 'Available', description: 'Team messaging and video calls' },
            { name: 'Slack', status: 'Available', description: 'Workplace communication platform' },
            { name: 'Zoom', status: 'Available', description: 'Video conferencing and webinars' }
          ].map((tool) => (
            <div key={tool.name} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">{tool.name}</div>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline">{tool.status}</Badge>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="bg-[hsl(var(--accent-color))] hover:bg-[hsl(var(--accent-color))]/90">Save Changes</Button>
        <Button variant="outline">Add Custom Integration</Button>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">User Profile</h2>
        <p className="subtitle-text text-muted-foreground mb-8">Manage your personal information and preferences.</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" defaultValue="Dr. Sarah" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" defaultValue="Johnson" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="sarah.johnson@smiledental.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
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

      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select defaultValue="system">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
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
          <div className="space-y-2">
            <Label>Time Zone</Label>
            <Select defaultValue="pst">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pst">Pacific Standard Time</SelectItem>
                <SelectItem value="mst">Mountain Standard Time</SelectItem>
                <SelectItem value="cst">Central Standard Time</SelectItem>
                <SelectItem value="est">Eastern Standard Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="bg-[hsl(var(--accent-color))] hover:bg-[hsl(var(--accent-color))]/90">Save Changes</Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">Account & Security</h2>
        <p className="subtitle-text text-muted-foreground mb-8">Manage your account security and privacy settings.</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle>Password & Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Analytics Tracking</Label>
              <p className="text-sm text-muted-foreground">Allow anonymous usage analytics to improve the product</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Marketing Communications</Label>
              <p className="text-sm text-muted-foreground">Receive updates about new features and improvements</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Session Timeout</Label>
              <p className="text-sm text-muted-foreground">Automatically log out after period of inactivity</p>
            </div>
            <Select defaultValue="30">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 min</SelectItem>
                <SelectItem value="30">30 min</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="bg-[hsl(var(--accent-color))] hover:bg-[hsl(var(--accent-color))]/90">Update Password</Button>
        <Button variant="outline">Download Account Data</Button>
        <Button variant="destructive">Delete Account</Button>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">Help & Support</h2>
        <p className="subtitle-text text-muted-foreground mb-8">Get help with On Time Flow and contact our support team.</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Describe your issue..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message" 
              placeholder="Please provide details about your issue or question..."
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select defaultValue="normal">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle>Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="text-left">
                <div className="font-medium">User Guide</div>
                <p className="text-sm text-muted-foreground">Complete documentation</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="text-left">
                <div className="font-medium">Video Tutorials</div>
                <p className="text-sm text-muted-foreground">Step-by-step walkthroughs</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="text-left">
                <div className="font-medium">FAQ</div>
                <p className="text-sm text-muted-foreground">Common questions</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="text-left">
                <div className="font-medium">Feature Requests</div>
                <p className="text-sm text-muted-foreground">Suggest improvements</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="bg-[hsl(var(--accent-color))] hover:bg-[hsl(var(--accent-color))]/90">Send Message</Button>
        <Button variant="outline">Schedule Call</Button>
      </div>
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
    <div className="relative min-h-screen bg-background">
      {/* Fixed Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-8 bg-background/80 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-foreground">
            On Time Flow
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

      <RoleDefaultsPanel
        isOpen={roleDefaultsPanelOpen}
        onClose={() => setRoleDefaultsPanelOpen(false)}
        role={selectedRole}
      />
    </div>
  );
};

export default SettingsPage;