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
    <div className="h-full">
      <div className="p-6 border-b border-border/50">
        <h2 className="text-2xl font-bold text-foreground mb-4">Lobby</h2>
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-muted shadow-sm"></div>
            <span className="text-muted-foreground">Empty</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
            <span className="text-muted-foreground">0-5 min</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></div>
            <span className="text-muted-foreground">5-10 min</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
            <span className="text-muted-foreground">10+ min</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm"></div>
            <span className="text-muted-foreground">Emergency</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-4 gap-4">
          {chairs.map((chair) => (
            <button
              key={chair.id}
              onClick={() => handleChairClick(chair.id)}
              className="group relative h-20 p-3 bg-background/80 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-[hsl(var(--accent-color))]/30 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              <div className={`w-10 h-10 rounded-full ${statusColors[chair.status]} mb-2 mx-auto shadow-sm ${
                chair.status === 'emergency' ? 'animate-pulse' : ''
              } ${
                chair.status === 'waiting-long' ? 'animate-pulse' : ''
              }`}></div>
              <div className="text-xs text-center">
                <div className="font-medium text-foreground">Chair {chair.id}</div>
                 {chair.patientName && (
                   <div className="font-semibold text-[10px] text-foreground truncate mt-1 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">{chair.patientName}</div>
                 )}
                 {chair.waitTime !== undefined && chair.waitTime > 0 && (
                   <div className="text-[10px] text-muted-foreground">{chair.waitTime}m</div>
                 )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}