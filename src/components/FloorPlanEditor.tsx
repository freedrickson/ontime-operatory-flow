import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthProvider";
import { useOrg } from "@/hooks/useOrg";
import { useNavigate } from "react-router-dom";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { supabase } from "@/lib/supabase/client";
import RoomBlock from "./RoomBlock";
import { Room, RoomType } from "@/types/floorplan";
import { Download, Save, RotateCw, Trash2, Eye } from "lucide-react";

const ROOM_TYPES: { [key in RoomType]: { color: string; label: string } } = {
  treatment: { color: "bg-green-500", label: "Treatment Room" },
  sterilization: { color: "bg-blue-500", label: "Sterilization" },
  public: { color: "bg-yellow-500", label: "Lobby Chair" },
  admin: { color: "bg-gray-500", label: "Admin Space" }
};

const GRID_SIZE = 20;

const FloorPlanEditor = () => {
  const { user } = useAuth();
  const { currentOrgId, userOrgs } = useOrg();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addRoom = useCallback((type: RoomType) => {
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
    setRooms(prev => [...prev, newRoom]);
  }, [rooms]);

  const updateRoom = useCallback((id: string, updates: Partial<Room>) => {
    setRooms(prev => prev.map(room => 
      room.id === id 
        ? { ...room, ...updates, x: snapToGrid(updates.x ?? room.x), y: snapToGrid(updates.y ?? room.y) }
        : room
    ));
  }, []);

  const deleteRoom = useCallback((id: string) => {
    setRooms(prev => prev.filter(room => room.id !== id));
    setSelectedRoomId(null);
  }, []);

  const rotateRoom = useCallback((id: string) => {
    setRooms(prev => prev.map(room => 
      room.id === id 
        ? { ...room, rotation: (room.rotation + 90) % 360 }
        : room
    ));
  }, []);

  const snapToGrid = (value: number) => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  };

  const exportAsImage = () => {
    if (!canvasRef.current) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;
    
    // Fill background
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
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
      ctx.fillStyle = ROOM_TYPES[room.type].color.replace('bg-', '#');
      ctx.fillRect(room.x, room.y, room.width, room.height);
      ctx.strokeStyle = '#333';
      ctx.strokeRect(room.x, room.y, room.width, room.height);
      
      // Add text
      ctx.fillStyle = '#fff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(room.name, room.x + room.width/2, room.y + room.height/2);
    });
    
    // Download the image
    const link = document.createElement('a');
    link.download = 'floor-plan.png';
    link.href = canvas.toDataURL();
    link.click();
    
    toast.success("Floor plan exported as image");
  };

  const handleSave = async () => {
    if (!user) {
      // Store floor plan data temporarily and open login dialog
      const data = {
        rooms,
        metadata: {
          exportDate: new Date().toISOString(),
          version: "1.0"
        }
      };
      localStorage.setItem('pendingFloorPlan', JSON.stringify(data));
      setShowLoginDialog(true);
      return;
    }

    if (userOrgs.length === 0) {
      toast.error("You need to be a member of an organization to save floor plans");
      return;
    }

    if (!currentOrgId) {
      toast.error("Please select an organization first");
      return;
    }

    // User is logged in and has org access, save directly
    try {
      const data = {
        rooms,
        metadata: {
          exportDate: new Date().toISOString(),
          version: "1.0"
        }
      };

      const { error } = await supabase
        .from('floor_plans')
        .insert({
          org_id: currentOrgId,
          name: `Floor Plan ${new Date().toLocaleDateString()}`,
          data: data as any,
          created_by: user.id
        });

      if (error) throw error;

      toast.success("Floor plan saved successfully");
    } catch (error: any) {
      toast.error("Failed to save floor plan: " + error.message);
    }
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
      {/* Canvas Area */}
      <div className="flex-1 relative overflow-hidden">
        <div
          ref={canvasRef}
          className="absolute inset-0 bg-muted/20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)
            `,
            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
          }}
        >
          {rooms.map(room => (
            <RoomBlock
              key={room.id}
              room={room}
              isSelected={selectedRoomId === room.id}
              onSelect={() => setSelectedRoomId(room.id)}
              onUpdate={updateRoom}
              snapToGrid={snapToGrid}
              roomConfig={ROOM_TYPES[room.type]}
            />
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-background border-l border-border p-6 space-y-6 overflow-y-auto">
        {/* Room Types */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Room Types</h2>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(ROOM_TYPES).map(([type, config]) => (
              <Button
                key={type}
                variant="outline"
                onClick={() => addRoom(type as RoomType)}
                className="flex flex-col items-center gap-2 h-auto p-4"
              >
                <div className={`w-8 h-6 ${config.color} rounded`} />
                <span className="text-xs text-center">{config.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Selected Room Actions */}
        {selectedRoomId && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-foreground">Selected Room</h2>
            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={() => rotateRoom(selectedRoomId)}
                className="w-full justify-start gap-2"
              >
                <RotateCw size={16} />
                Rotate 90°
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteRoom(selectedRoomId)}
                className="w-full justify-start gap-2"
              >
                <Trash2 size={16} />
                Delete Room
              </Button>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Actions</h2>
          <div className="space-y-2">
            <Button
              variant="default"
              onClick={handleSave}
              className="w-full justify-start gap-2"
            >
              <Save size={16} />
              {user ? 'Save to Organization' : 'Save (Login Required)'}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setRooms([]);
                setSelectedRoomId(null);
                toast.success("Floor plan cleared");
              }}
              className="w-full justify-start gap-2"
            >
              <Trash2 size={16} />
              Clear All
            </Button>
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
              <Download size={16} />
              Export as JSON
            </Button>
          </div>
        </div>

        {/* Mini Preview */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Preview</h2>
          <div className="border border-border rounded-lg p-4 bg-muted/20 aspect-[4/3] relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)
                `,
                backgroundSize: '8px 8px'
              }}
            >
              {rooms.map(room => (
                <div
                  key={room.id}
                  className={`absolute ${ROOM_TYPES[room.type].color} rounded-sm border border-gray-400`}
                  style={{
                    left: `${(room.x / 800) * 100}%`,
                    top: `${(room.y / 600) * 100}%`,
                    width: `${(room.width / 800) * 100}%`,
                    height: `${(room.height / 600) * 100}%`,
                    transform: `rotate(${room.rotation}deg)`
                  }}
                />
              ))}
            </div>
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

      {/* Login Dialog */}
      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        onSuccess={() => {
          setShowLoginDialog(false);
          navigate('/confirm/save?from=/build');
        }}
      />
    </div>
  );
};

export default FloorPlanEditor;