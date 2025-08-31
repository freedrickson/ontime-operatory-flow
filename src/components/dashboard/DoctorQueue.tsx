import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { History, GripVertical } from "lucide-react";

interface QueueItem {
  id: string;
  roomName: string;
  patientName: string;
  examType: string;
  notes: string;
  urgency: 'low' | 'medium' | 'high';
  timestamp: Date;
}

export default function DoctorQueue() {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([
    {
      id: '1',
      roomName: 'Room 2',
      patientName: 'Mark Davis',
      examType: 'Limited Exam',
      notes: 'Tooth pain, upper right molar',
      urgency: 'high',
      timestamp: new Date()
    },
    {
      id: '2',
      roomName: 'Room 1',
      patientName: 'Alice Johnson',
      examType: 'Comprehensive',
      notes: 'Patient reports sensitivity to cold',
      urgency: 'medium',
      timestamp: new Date()
    }
  ]);

  const [history, setHistory] = useState<QueueItem[]>([]);

  const handleSwipeLeft = (itemId: string) => {
    const item = queueItems.find(q => q.id === itemId);
    if (item) {
      setHistory(prev => [item, ...prev]);
      setQueueItems(prev => prev.filter(q => q.id !== itemId));
    }
  };

  const urgencyColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  return (
    <div className="h-full flex flex-col bg-background/50 backdrop-blur-sm">
      <div className="p-6 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Doctor Queue</h2>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-background/95 backdrop-blur-lg">
              <DrawerHeader>
                <DrawerTitle className="text-xl font-bold">Completed Items</DrawerTitle>
              </DrawerHeader>
              <div className="p-6">
                <ScrollArea className="h-64">
                  {history.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground text-lg">No completed items yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {history.map((item) => (
                        <div key={item.id} className="p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-foreground">{item.roomName}</div>
                              <div className="text-sm text-muted-foreground">{item.patientName}</div>
                            </div>
                            <Badge 
                              variant={item.urgency === 'high' ? 'destructive' : item.urgency === 'medium' ? 'secondary' : 'default'}
                              className="bg-background/80 backdrop-blur-sm"
                            >
                              {item.urgency}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        {queueItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <p className="text-lg font-medium mb-2">Queue is empty</p>
              <p className="text-sm">No pending requests</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {queueItems.map((item) => (
              <div 
                key={item.id} 
                className="group relative p-4 bg-background/80 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-[hsl(var(--accent-color))]/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer active:scale-[0.98]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-semibold text-foreground text-lg">{item.roomName}</span>
                      <Badge 
                        variant={item.urgency === 'high' ? 'destructive' : item.urgency === 'medium' ? 'secondary' : 'default'}
                        className={`text-xs ${
                          item.urgency === 'high' ? 'animate-pulse bg-red-500/20 border-red-500/30' : 'bg-background/80 backdrop-blur-sm'
                        }`}
                      >
                        {item.urgency}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="font-semibold text-foreground">{item.patientName}</div>
                      <div className="text-sm text-muted-foreground">{item.examType}</div>
                      <div className="text-xs text-muted-foreground italic line-clamp-2">
                        {item.notes}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end ml-4">
                    <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mb-2" />
                    <button
                      className="px-3 py-1 text-xs font-medium text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                      onClick={() => handleSwipeLeft(item.id)}
                    >
                      Clear
                    </button>
                  </div>
                </div>
                
                {/* iOS-style swipe hint */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-60 transition-all duration-300 pointer-events-none">
                  <div className="text-xs text-muted-foreground font-medium">← Swipe</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}