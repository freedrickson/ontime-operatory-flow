import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type RoomStatus = 'available' | 'in-progress' | 'waiting-doctor' | 'emergency';

interface TreatmentRoom {
  id: string;
  name: string;
  status: RoomStatus;
  patientName?: string;
  examType?: string;
  urgency?: 'low' | 'medium' | 'high';
  notes?: string;
  duration?: number;
}

const statusColors = {
  available: 'bg-muted',
  'in-progress': 'bg-green-500',
  'waiting-doctor': 'bg-yellow-500',
  emergency: 'bg-blue-500'
};

export default function TreatmentRoomsSection() {
  const [rooms, setRooms] = useState<TreatmentRoom[]>([
    { 
      id: '1', 
      name: 'Room 1', 
      status: 'in-progress',
      patientName: 'Alice Johnson',
      examType: 'Comprehensive',
      urgency: 'medium',
      notes: 'Patient reports sensitivity to cold',
      duration: 45
    },
    { 
      id: '2', 
      name: 'Room 2', 
      status: 'waiting-doctor',
      patientName: 'Mark Davis',
      examType: 'Limited Exam',
      urgency: 'high',
      notes: 'Tooth pain, upper right molar',
      duration: 15
    },
    { id: '3', name: 'Room 3', status: 'available' },
    { 
      id: '4', 
      name: 'Room 4', 
      status: 'waiting-doctor',
      patientName: 'Sarah Connor',
      examType: 'Root Canal',
      urgency: 'high',
      notes: 'Severe pain, needs immediate attention',
      duration: 30
    },
  ]);

  const [selectedRoom, setSelectedRoom] = useState<TreatmentRoom | null>(null);

  const handleRoomUpdate = (roomId: string, updates: Partial<TreatmentRoom>) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId ? { ...room, ...updates } : room
    ));
  };

  const urgencyColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  return (
    <div className="h-full">
      <div className="p-6 border-b border-white/20">
        <h2 className="text-3xl font-bold text-pure-white mb-6">Treatment Rooms</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {rooms.map((room) => (
            <Dialog key={room.id}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className={`room-tile h-28 p-3 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 ${
                    room.status !== 'available' ? 'occupied' : ''
                  }`}
                  onClick={() => setSelectedRoom(room)}
                >
                  <div className={`w-8 h-8 rounded ${statusColors[room.status]} mb-2`}></div>
                     <div className="text-center">
                     <div className="font-medium text-pure-white text-[10px]">{room.name}</div>
                     {room.patientName && (
                       <>
                         <div className="text-[9px] text-pure-white/90 truncate mt-1">
                           {room.patientName.length > 10 ? `${room.patientName.substring(0, 10)}...` : room.patientName}
                         </div>
                         <div className="text-[8px] text-pure-white/70 truncate">
                           {room.examType && room.examType.length > 12 ? `${room.examType.substring(0, 12)}...` : room.examType}
                         </div>
                          {room.urgency && (
                            <div className={`ios-chip text-[7px] mt-1 ${
                              room.urgency === 'high' ? 'red' :
                              room.urgency === 'medium' ? 'yellow' :
                              'green'
                            }`}>
                              {room.urgency}
                            </div>
                          )}
                       </>
                     )}
                   </div>
                </Button>
              </DialogTrigger>
              
              {selectedRoom?.id === room.id && (
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Appointment Card - {room.name}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Patient Name</label>
                      <input 
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                        value={selectedRoom.patientName || ''}
                        onChange={(e) => handleRoomUpdate(room.id, { patientName: e.target.value })}
                        placeholder="Enter patient name"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Exam Type</label>
                      <Select 
                        value={selectedRoom.examType || ''} 
                        onValueChange={(value) => handleRoomUpdate(room.id, { examType: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select exam type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="comprehensive">Comprehensive</SelectItem>
                          <SelectItem value="limited">Limited Exam</SelectItem>
                          <SelectItem value="recall">Recall</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Urgency</label>
                      <Select 
                        value={selectedRoom.urgency || ''} 
                        onValueChange={(value: 'low' | 'medium' | 'high') => handleRoomUpdate(room.id, { urgency: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Notes</label>
                      <Textarea 
                        className="mt-1"
                        value={selectedRoom.notes || ''}
                        onChange={(e) => handleRoomUpdate(room.id, { notes: e.target.value })}
                        placeholder="Add notes about the appointment"
                        rows={3}
                      />
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        handleRoomUpdate(room.id, { status: 'in-progress', duration: 0 });
                        setSelectedRoom(null);
                      }}
                    >
                      Start Timer & Activate
                    </Button>
                  </div>
                </DialogContent>
              )}
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
}