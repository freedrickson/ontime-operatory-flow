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
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">Doctor Queue</h2>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="sm">
              <History className="w-4 h-4 mr-2" />
              History
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Completed Items</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <ScrollArea className="h-64">
                {history.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No completed items yet</p>
                ) : (
                  <div className="space-y-2">
                    {history.map((item) => (
                      <Card key={item.id} className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{item.roomName}</div>
                            <div className="text-sm text-muted-foreground">{item.patientName}</div>
                          </div>
                          <Badge className={urgencyColors[item.urgency]}>
                            {item.urgency}
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <ScrollArea className="flex-1 p-4">
        {queueItems.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No items in queue</p>
        ) : (
          <div className="space-y-3">
            {queueItems.map((item) => (
              <Card key={item.id} className="relative group cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium">{item.roomName}</span>
                        <Badge className={urgencyColors[item.urgency]}>
                          {item.urgency}
                        </Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="font-medium">{item.patientName}</div>
                        <div className="text-muted-foreground">{item.examType}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2">
                          {item.notes}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={() => handleSwipeLeft(item.id)}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}