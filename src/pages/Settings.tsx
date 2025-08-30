import { useState } from "react";
import NavigationOverlay from "@/components/NavigationOverlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Bell, Users, Settings as SettingsIcon, BarChart3, Puzzle, User, Shield, HelpCircle } from "lucide-react";

export default function Settings() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("notifications");
  const [practiceSettings, setPracticeSettings] = useState({
    name: "Downtown Dental Practice",
    logo: null,
    accentColor: "#14b8a6",
    waitTimeThresholds: {
      green: { min: 0, max: 5 },
      yellow: { min: 5, max: 10 },
      red: { min: 10, max: 999 }
    },
    emergencyColor: "#3b82f6",
    lobbyChairCount: 12,
    officeHours: {
      monday: { start: "08:00", end: "17:00" },
      tuesday: { start: "08:00", end: "17:00" },
      wednesday: { start: "08:00", end: "17:00" },
      thursday: { start: "08:00", end: "17:00" },
      friday: { start: "08:00", end: "17:00" },
      saturday: { start: "09:00", end: "14:00" },
      sunday: { start: "", end: "" }
    }
  });

  const sidebarSections = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "roles", label: "Roles & Permissions", icon: Users },
    { id: "practice", label: "Practice Settings", icon: SettingsIcon },
    { id: "analytics", label: "Analytics Preferences", icon: BarChart3 },
    { id: "integrations", label: "Integrations", icon: Puzzle },
    { id: "profile", label: "User Profile", icon: User },
    { id: "security", label: "Account & Security", icon: Shield },
    { id: "support", label: "Help & Support", icon: HelpCircle }
  ];

  const roleTemplates = [
    { name: "Doctor", permissions: ["all"], haptic: "Double", sound: "Standard" },
    { name: "Clinical Lead", permissions: ["patient_management", "staff_management"], haptic: "Single", sound: "Soft" },
    { name: "Hygienist", permissions: ["patient_management"], haptic: "Pulse", sound: "Soft" },
    { name: "Assistant", permissions: ["patient_view"], haptic: "Single", sound: "Soft" },
    { name: "Front Desk", permissions: ["scheduling", "patient_management"], haptic: "Long", sound: "Urgent" }
  ];

  const notificationEvents = [
    "Doctor Request",
    "Wait Time Changed", 
    "Emergency Walk-In",
    "New Message",
    "Queue Updated"
  ];

  const notificationChannels = ["Haptic", "Sound", "Banner", "Watch"];

  const teamMembers = [
    { name: "Dr. Sarah Johnson", role: "Doctor", email: "sarah@practice.com", initials: "SJ" },
    { name: "Mike Chen", role: "Clinical Lead", email: "mike@practice.com", initials: "MC" },
    { name: "Lisa Rodriguez", role: "Hygienist", email: "lisa@practice.com", initials: "LR" },
    { name: "Tom Wilson", role: "Assistant", email: "tom@practice.com", initials: "TW" },
    { name: "Emma Davis", role: "Front Desk", email: "emma@practice.com", initials: "ED" }
  ];

  const renderNotifications = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Notification Settings</h3>
        <p className="text-muted-foreground mb-6">Configure how and when team members receive notifications.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Default Profiles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {roleTemplates.map((role) => (
            <div key={role.name} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Badge variant="outline">{role.name}</Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  Haptic: {role.haptic} • Sound: {role.sound}
                </p>
              </div>
              <Button variant="outline" size="sm">Customize</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Event × Channel Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 border-b">Event</th>
                  {notificationChannels.map(channel => (
                    <th key={channel} className="text-center p-2 border-b">{channel}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {notificationEvents.map(event => (
                  <tr key={event}>
                    <td className="p-2 border-b">{event}</td>
                    {notificationChannels.map(channel => (
                      <td key={`${event}-${channel}`} className="text-center p-2 border-b">
                        <Switch />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Device Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Desktop Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications on desktop browsers</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Mobile Notifications</Label>
              <p className="text-sm text-muted-foreground">Push notifications to mobile devices</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Watch Notifications</Label>
              <p className="text-sm text-muted-foreground">Sync with smartwatch devices</p>
            </div>
            <Switch />
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
              <Label>Green (0-5 min)</Label>
              <div className="flex gap-2">
                <Input type="number" placeholder="0" className="flex-1" />
                <Input type="number" placeholder="5" className="flex-1" />
              </div>
            </div>
            <div>
              <Label>Yellow (5-10 min)</Label>
              <div className="flex gap-2">
                <Input type="number" placeholder="5" className="flex-1" />
                <Input type="number" placeholder="10" className="flex-1" />
              </div>
            </div>
            <div>
              <Label>Red (10+ min)</Label>
              <div className="flex gap-2">
                <Input type="number" placeholder="10" className="flex-1" />
                <Input type="number" placeholder="∞" className="flex-1" disabled />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Operational Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="lobbyChairs">Lobby Chair Count</Label>
            <Input 
              id="lobbyChairs" 
              type="number" 
              value={practiceSettings.lobbyChairCount}
              onChange={(e) => setPracticeSettings(prev => ({ ...prev, lobbyChairCount: parseInt(e.target.value) }))}
            />
          </div>
          <div>
            <Label>Office Hours</Label>
            <div className="grid grid-cols-7 gap-2 mt-2">
              {Object.entries(practiceSettings.officeHours).map(([day, hours]) => (
                <div key={day} className="space-y-1">
                  <Label className="text-xs capitalize">{day}</Label>
                  <Input type="time" value={hours.start} className="text-xs" />
                  <Input type="time" value={hours.end} className="text-xs" />
                </div>
              ))}
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
        <p className="text-muted-foreground mb-6">Configure analytics displays and benchmarks.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>KPI Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded">
              <span>On-Time Percentage</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Target: 90%</span>
                <Button variant="ghost" size="sm">⋮</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded">
              <span>Average Response Time</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Target: 2 min</span>
                <Button variant="ghost" size="sm">⋮</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded">
              <span>Patient Satisfaction</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Target: 4.5/5</span>
                <Button variant="ghost" size="sm">⋮</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Export Preferences</CardTitle>
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
          <div className="flex items-center justify-between">
            <div>
              <Label>Include Provider Breakdown</Label>
              <p className="text-sm text-muted-foreground">Show individual provider metrics in exports</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Integrations</h3>
        <p className="text-muted-foreground mb-6">Connect your practice management system and other tools.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Practice Management System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">OD</span>
              </div>
              <div>
                <h4 className="font-medium">Open Dental</h4>
                <p className="text-sm text-muted-foreground">Sync patient schedules and updates</p>
              </div>
            </div>
            <Switch />
          </div>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Additional PMS integrations coming soon. Contact support if you need a specific integration.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">User Profile</h3>
        <p className="text-muted-foreground mb-6">Manage your personal settings and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
              JD
            </div>
            <Button variant="outline">Change Avatar</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john.doe@practice.com" />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
          </div>
          <div>
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
                <SelectItem value="auto">Auto (System)</SelectItem>
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

      <Button>Update Profile</Button>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Account & Security</h3>
        <p className="text-muted-foreground mb-6">Manage your account security and login preferences.</p>
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
                <p className="font-medium">Current Session</p>
                <p className="text-sm text-muted-foreground">Chrome on Windows • 192.168.1.100</p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex justify-between items-center p-3 border rounded">
              <div>
                <p className="font-medium">Mobile App</p>
                <p className="text-sm text-muted-foreground">iPhone • 2 hours ago</p>
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
        <p className="text-muted-foreground mb-6">Get help and find answers to common questions.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <details className="group">
              <summary className="font-medium cursor-pointer hover:text-primary">
                How do I set up notifications for my team?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Navigate to the Notifications section in Settings to configure role-based notification preferences and device settings.
              </p>
            </details>
            <details className="group">
              <summary className="font-medium cursor-pointer hover:text-primary">
                Can I customize wait time thresholds?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Yes, you can adjust the color-coded wait time thresholds in Practice Settings to match your practice standards.
              </p>
            </details>
            <details className="group">
              <summary className="font-medium cursor-pointer hover:text-primary">
                How do I integrate with my PMS?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Currently we support Open Dental integration. Check the Integrations section to enable the connection.
              </p>
            </details>
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
              <Label htmlFor="supportName">Name</Label>
              <Input id="supportName" placeholder="Your name" />
            </div>
            <div>
              <Label htmlFor="supportEmail">Email</Label>
              <Input id="supportEmail" type="email" placeholder="your@email.com" />
            </div>
          </div>
          <div>
            <Label htmlFor="supportPhone">Phone (Optional)</Label>
            <Input id="supportPhone" type="tel" placeholder="+1 (555) 123-4567" />
          </div>
          <div>
            <Label htmlFor="supportMessage">Message</Label>
            <Textarea id="supportMessage" placeholder="Describe your issue or question..." className="min-h-24" />
          </div>
          <Button>Send Message</Button>
        </CardContent>
      </Card>

      {/* Live Chat Widget Placeholder */}
      <div className="fixed bottom-4 right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg cursor-pointer hover:scale-105 transition-transform">
        <HelpCircle className="w-6 h-6" />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "notifications": return renderNotifications();
      case "roles": return renderRoles();
      case "practice": return renderPractice();
      case "analytics": return renderAnalytics();
      case "integrations": return renderIntegrations();
      case "profile": return renderProfile();
      case "security": return renderSecurity();
      case "support": return renderSupport();
      default: return renderNotifications();
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Fixed Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-8">
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
      <div className="pt-24 min-h-screen">
        {/* Header */}
        <header className="border-b border-border p-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </header>

        {/* Two-column layout */}
        <div className="flex max-w-7xl mx-auto">
          {/* Left Sidebar */}
          <div className="w-64 border-r border-border p-6">
            <nav className="space-y-2">
              {sidebarSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Content Panel */}
          <div className="flex-1 p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}