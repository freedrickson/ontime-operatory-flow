import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ChairStatus = 'empty' | 'waiting-short' | 'waiting-medium' | 'waiting-long' | 'emergency';

interface Chair {
  id: string;
  status: ChairStatus;
  patientName?: string;
  waitTime?: number;
}

const statusColors = {
  empty: 'bg-muted',
  'waiting-short': 'bg-green-500',
  'waiting-medium': 'bg-yellow-500', 
  'waiting-long': 'bg-red-500',
  emergency: 'bg-blue-500'
};

export default function LobbySection() {
  const [chairs, setChairs] = useState<Chair[]>([
    { id: '1', status: 'empty' },
    { id: '2', status: 'waiting-short', patientName: 'John Doe', waitTime: 3 },
    { id: '3', status: 'empty' },
    { id: '4', status: 'waiting-medium', patientName: 'Jane Smith', waitTime: 7 },
    { id: '5', status: 'empty' },
    { id: '6', status: 'waiting-long', patientName: 'Bob Wilson', waitTime: 12 },
    { id: '7', status: 'empty' },
    { id: '8', status: 'emergency', patientName: 'Emergency Walk-in', waitTime: 0 },
  ]);

  const handleChairClick = (chairId: string) => {
    // TODO: Open patient assignment dialog
    console.log('Chair clicked:', chairId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Lobby
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-muted"></div>
              <span>Empty</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>0-5 min</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>5-10 min</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>10+ min</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Emergency</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {chairs.map((chair) => (
            <Button
              key={chair.id}
              variant="ghost"
              className="h-16 p-2 flex flex-col items-center justify-center hover:scale-105 transition-transform"
              onClick={() => handleChairClick(chair.id)}
            >
              <div className={`w-8 h-8 rounded-full ${statusColors[chair.status]} mb-1`}></div>
              <div className="text-xs text-center">
                <div>Chair {chair.id}</div>
                {chair.patientName && (
                  <div className="font-medium truncate w-full">{chair.patientName}</div>
                )}
                {chair.waitTime !== undefined && chair.waitTime > 0 && (
                  <div className="text-muted-foreground">{chair.waitTime}m</div>
                )}
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}