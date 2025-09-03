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
    },
    {
      id: '3',
      roomName: 'Room 4',
      patientName: 'Sarah Connor',
      examType: 'Root Canal',
      notes: 'Severe pain, needs immediate attention',
      urgency: 'high',
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
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="hero-text text-pure-white">Doctor Queue</h2>
          <Drawer>
            <DrawerTrigger asChild>
              <div className="ios-card px-4 py-2 cursor-pointer">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-pure-white" />
                  <span className="text-sm font-medium text-pure-white">History</span>
                </div>
              </div>
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
            <div className="text-pure-white/60">
              <p className="text-lg font-medium mb-2">Queue is empty</p>
              <p className="text-sm">No pending requests</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {queueItems.map((item, index) => (
              <div 
                key={item.id} 
                className="ios-card ios-queue-card group relative p-4"
                style={{ 
                  transform: `translateY(${index * -3}px)`,
                  zIndex: queueItems.length - index
                }}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-accent-color/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-accent-color font-bold text-sm">
                      {item.roomName.charAt(item.roomName.length - 1)}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-pure-white text-sm truncate">{item.roomName}</h3>
                      <span className="text-pure-white/50 text-xs">
                        {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    
                    <p className="text-pure-white/90 text-sm font-medium">{item.patientName}</p>
                    <p className="text-pure-white/70 text-xs">{item.examType}</p>
                    
                    {item.notes && (
                      <p className="text-pure-white/60 text-xs mt-2 line-clamp-2">
                        {item.notes}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between mt-3">
                      <span className={`ios-chip ${
                        item.urgency === 'high' ? 'red' :
                        item.urgency === 'medium' ? 'yellow' :
                        'green'
                      }`}>
                        {item.urgency}
                      </span>
                      
                      <button
                        className="px-3 py-1 text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                        onClick={() => handleSwipeLeft(item.id)}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* iOS-style swipe hint */}
                {index === 0 && (
                  <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 text-pure-white/30 text-xs">
                    ← swipe
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}