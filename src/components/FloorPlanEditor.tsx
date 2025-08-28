import { useState, useRef, useCallback } from "react";
import { Download, Save, RotateCw, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import RoomBlock from "./RoomBlock";
import { RoomType, Room } from "@/types/floorplan";

const ROOM_TYPES: { [key in RoomType]: { color: string; label: string } } = {
  treatment: { color: "bg-green-500", label: "Treatment Room" },
  sterilization: { color: "bg-blue-500", label: "Sterilization" },
  public: { color: "bg-yellow-500", label: "Public Space" },
  admin: { color: "bg-gray-500", label: "Admin Space" }
};

const GRID_SIZE = 20;

const FloorPlanEditor = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addRoom = (type: RoomType) => {
    const newRoom: Room = {
      id: `room-${Date.now()}`,
      type,
      x: 100,
      y: 100,
      width: 120,
      height: 80,
      rotation: 0,
      name: `${ROOM_TYPES[type].label} ${rooms.filter(r => r.type === type).length + 1}`
    };
    setRooms([...rooms, newRoom]);
    toast.success("Room added");
  };

  const updateRoom = useCallback((id: string, updates: Partial<Room>) => {
    setRooms(prev => prev.map(room => 
      room.id === id ? { ...room, ...updates } : room
    ));
  }, []);

  const deleteRoom = (id: string) => {
    setRooms(prev => prev.filter(room => room.id !== id));
    setSelectedRoom(null);
    toast.success("Room deleted");
  };

  const rotateRoom = (id: string) => {
    updateRoom(id, { 
      rotation: (rooms.find(r => r.id === id)?.rotation || 0) + 90 
    });
  };

  const snapToGrid = (value: number) => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  };

  const exportAsImage = () => {
    if (!canvasRef.current) return;
    
    // Create a canvas element to draw the floor plan
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;
    
    // Draw grid background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1;
    
    for (let x = 0; x <= canvas.width; x += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= canvas.height; y += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw rooms
    rooms.forEach(room => {
      ctx.save();
      ctx.translate(room.x + room.width/2, room.y + room.height/2);
      ctx.rotate((room.rotation * Math.PI) / 180);
      
      // Room background
      const colors = {
        treatment: '#10b981',
        sterilization: '#3b82f6',
        public: '#eab308',
        admin: '#6b7280'
      };
      
      ctx.fillStyle = colors[room.type];
      ctx.fillRect(-room.width/2, -room.height/2, room.width, room.height);
      
      // Room border
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 2;
      ctx.strokeRect(-room.width/2, -room.height/2, room.width, room.height);
      
      // Room text
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(room.name, 0, 4);
      
      ctx.restore();
    });

    // Download the image
    const link = document.createElement('a');
    link.download = 'floor-plan.png';
    link.href = canvas.toDataURL();
    link.click();
    
    toast.success("Floor plan exported as image");
  };

  const exportAsJSON = () => {
    const data = {
      rooms,
      metadata: {
        exportDate: new Date().toISOString(),
        version: "1.0"
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'floor-plan.json';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success("Floor plan exported as JSON");
  };

  return (
    <div className="flex h-[calc(100vh-73px)]">
      {/* Side Panel */}
      <div className="w-80 bg-muted/30 border-r border-border p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Room Types</h2>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(ROOM_TYPES).map(([type, config]) => (
              <Button
                key={type}
                variant="outline"
                onClick={() => addRoom(type as RoomType)}
                className="justify-start gap-3 h-12"
              >
                <div className={`w-4 h-4 rounded ${config.color}`} />
                <Plus size={16} />
                {config.label}
              </Button>
            ))}
          </div>
        </div>

        {selectedRoom && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Room Actions</h2>
            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={() => rotateRoom(selectedRoom)}
                className="w-full justify-start gap-2"
              >
                <RotateCw size={16} />
                Rotate
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteRoom(selectedRoom)}
                className="w-full justify-start gap-2"
              >
                <Trash2 size={16} />
                Delete
              </Button>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold mb-4">Export</h2>
          <div className="space-y-2">
            <Button
              variant="outline"
              onClick={exportAsImage}
              className="w-full justify-start gap-2"
            >
              <Download size={16} />
              Export as Image
            </Button>
            <Button
              variant="outline"
              onClick={exportAsJSON}
              className="w-full justify-start gap-2"
            >
              <Save size={16} />
              Export as JSON
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="mb-2">Instructions:</p>
          <ul className="space-y-1 text-xs">
            <li>• Click room types to add them</li>
            <li>• Drag rooms to position them</li>
            <li>• Click rooms to select and edit</li>
            <li>• Double-click to rename</li>
            <li>• Rooms snap to grid automatically</li>
          </ul>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative overflow-hidden">
        <div
          ref={canvasRef}
          className="absolute inset-0 bg-background"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)
            `,
            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
          }}
          onClick={() => setSelectedRoom(null)}
        >
          {rooms.map(room => (
            <RoomBlock
              key={room.id}
              room={room}
              isSelected={selectedRoom === room.id}
              onSelect={() => setSelectedRoom(room.id)}
              onUpdate={updateRoom}
              snapToGrid={snapToGrid}
              roomConfig={ROOM_TYPES[room.type]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloorPlanEditor;