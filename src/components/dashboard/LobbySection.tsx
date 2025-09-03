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
      <div className="p-6 border-b border-white/20">
        <h2 className="text-3xl font-bold text-pure-white mb-6">Lobby</h2>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-muted shadow-sm"></div>
            <span className="text-pure-white/70">Empty</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
            <span className="text-pure-white/70">0-5 min</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></div>
            <span className="text-pure-white/70">5-10 min</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
            <span className="text-pure-white/70">10+ min</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm"></div>
            <span className="text-pure-white/70">Emergency</span>
          </div>
        </div>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-4 gap-4">
          {chairs.map((chair) => (
            <button
              key={chair.id}
              onClick={() => handleChairClick(chair.id)}
              className={`room-tile group relative h-24 p-3 transition-all duration-300 hover:scale-105 active:scale-95 ${
                chair.status !== 'empty' ? 'occupied' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${statusColors[chair.status]} mb-2 mx-auto shadow-sm ${
                chair.status === 'emergency' ? 'animate-pulse' : ''
              } ${
                chair.status === 'waiting-long' ? 'animate-pulse' : ''
              }`}></div>
              <div className="text-xs text-center">
                <div className="font-medium text-pure-white text-[10px]">Chair {chair.id}</div>
                 {chair.patientName && (
                   <div className="font-semibold text-[9px] text-pure-white/90 truncate mt-1">
                     {chair.patientName.length > 12 ? `${chair.patientName.substring(0, 12)}...` : chair.patientName}
                   </div>
                 )}
                 {chair.waitTime !== undefined && chair.waitTime > 0 && (
                   <div className="text-[9px] text-pure-white/60">{chair.waitTime}m</div>
                 )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}