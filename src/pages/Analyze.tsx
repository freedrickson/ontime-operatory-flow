import { useState } from "react";
import NavigationOverlay from "@/components/NavigationOverlay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Download, 
  FileText, 
  Clock, 
  AlertTriangle, 
  Users, 
  TrendingUp,
  History,
  BarChart3,
  PieChart
} from "lucide-react";

interface Metric {
  label: string;
  value: string | number;
  percentage?: number;
  trend?: 'up' | 'down' | 'stable';
  color?: string;
}

interface TeamMember {
  name: string;
  role: string;
  signalsCount: number;
  clearsCount: number;
  avgResponseTime: string;
  efficiency: number;
}

export default function Analyze() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Mock data for metrics
  const keyMetrics: Metric[] = [
    { 
      label: 'On-Time %', 
      value: '87%', 
      percentage: 87, 
      trend: 'up',
      color: 'text-green-600'
    },
    { 
      label: 'Avg Doctor Response', 
      value: '4.2 min', 
      trend: 'down',
      color: 'text-blue-600'
    },
    { 
      label: 'Red Alerts Today', 
      value: 12, 
      trend: 'up',
      color: 'text-red-600'
    },
    { 
      label: 'Emergency Patients', 
      value: 3, 
      trend: 'stable',
      color: 'text-orange-600'
    }
  ];

  const teamData: TeamMember[] = [
    {
      name: 'Dr. Smith',
      role: 'Dentist',
      signalsCount: 8,
      clearsCount: 15,
      avgResponseTime: '3.8 min',
      efficiency: 92
    },
    {
      name: 'Sarah Johnson',
      role: 'Hygienist',
      signalsCount: 22,
      clearsCount: 18,
      avgResponseTime: '2.1 min',
      efficiency: 89
    },
    {
      name: 'Dr. Wilson',
      role: 'Dentist',
      signalsCount: 5,
      clearsCount: 12,
      avgResponseTime: '4.7 min',
      efficiency: 85
    },
    {
      name: 'Lisa Chen',
      role: 'Assistant',
      signalsCount: 15,
      clearsCount: 20,
      avgResponseTime: '1.9 min',
      efficiency: 95
    }
  ];

  const bottleneckData = [
    { location: 'Room 2', frequency: 18, avgDelay: '8.3 min' },
    { location: 'Sterilization', frequency: 12, avgDelay: '12.1 min' },
    { location: 'Lobby', frequency: 8, avgDelay: '6.2 min' },
    { location: 'Room 1', frequency: 5, avgDelay: '4.7 min' }
  ];

  const handleExport = (format: 'pdf' | 'csv') => {
    // TODO: Implement actual export functionality
    console.log(`Exporting as ${format.toUpperCase()}`);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Fixed Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-8">
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
      <div className="pt-24">
        {/* Header */}
        <header className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground">Analytics & Reporting</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => handleExport('csv')}>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" onClick={() => handleExport('pdf')}>
                <FileText className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">
                    <History className="w-4 h-4 mr-2" />
                    History
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Archived Cases & Cleared Queues</DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4">
                    <ScrollArea className="h-64">
                      <p className="text-muted-foreground text-center py-8">
                        Historical data will be displayed here
                      </p>
                    </ScrollArea>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Time Range Selector */}
          <Tabs value={selectedTimeRange} onValueChange={setSelectedTimeRange} className="w-full">
            <TabsList>
              <TabsTrigger value="day">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
              <TabsTrigger value="quarter">Quarter</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTimeRange} className="space-y-6">
              {/* Key Metrics Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {keyMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {metric.label}
                      </CardTitle>
                      {getTrendIcon(metric.trend || 'stable')}
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl font-bold ${metric.color}`}>
                        {metric.value}
                      </div>
                      {metric.percentage && (
                        <Progress 
                          value={metric.percentage} 
                          className="mt-2"
                        />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Role-Based Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Team Performance Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Team Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Signals</TableHead>
                          <TableHead>Clears</TableHead>
                          <TableHead>Avg Response</TableHead>
                          <TableHead>Efficiency</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teamData.map((member, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{member.name}</div>
                                <div className="text-sm text-muted-foreground">{member.role}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{member.signalsCount}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{member.clearsCount}</Badge>
                            </TableCell>
                            <TableCell>{member.avgResponseTime}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Progress value={member.efficiency} className="w-16" />
                                <span className="text-sm">{member.efficiency}%</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Bottleneck Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Bottleneck Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bottleneckData.map((bottleneck, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{bottleneck.location}</div>
                            <div className="text-sm text-muted-foreground">
                              {bottleneck.frequency} delays this week
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-red-600">{bottleneck.avgDelay}</div>
                            <div className="text-xs text-muted-foreground">avg delay</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Response Time Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                      <div className="text-center text-muted-foreground">
                        <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                        <p>Chart will be displayed here</p>
                        <p className="text-sm">Response time trends over time</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="w-5 h-5 mr-2" />
                      Patient Flow Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                      <div className="text-center text-muted-foreground">
                        <PieChart className="w-12 h-12 mx-auto mb-2" />
                        <p>Chart will be displayed here</p>
                        <p className="text-sm">Patient distribution by urgency</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Summary Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">142</div>
                      <div className="text-sm text-muted-foreground">Patients Seen On-Time</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">3.8 min</div>
                      <div className="text-sm text-muted-foreground">Avg Wait Time</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">98%</div>
                      <div className="text-sm text-muted-foreground">Patient Satisfaction</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}