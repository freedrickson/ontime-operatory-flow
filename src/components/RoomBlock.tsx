import { useState, useRef } from "react";
import Draggable from "react-draggable";
import { Room } from "@/types/floorplan";

interface RoomBlockProps {
  room: Room;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (id: string, updates: Partial<Room>) => void;
  snapToGrid: (value: number) => number;
  roomConfig: { color: string; label: string };
}

const RoomBlock = ({ 
  room, 
  isSelected, 
  onSelect, 
  onUpdate, 
  snapToGrid, 
  roomConfig 
}: RoomBlockProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(room.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (_e: any, data: any) => {
    const snappedX = snapToGrid(data.x);
    const snappedY = snapToGrid(data.y);
    onUpdate(room.id, { x: snappedX, y: snappedY });
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleNameSubmit = () => {
    if (editName.trim()) {
      onUpdate(room.id, { name: editName.trim() });
    } else {
      setEditName(room.name);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    } else if (e.key === 'Escape') {
      setEditName(room.name);
      setIsEditing(false);
    }
  };

  return (
    <Draggable
      position={{ x: room.x, y: room.y }}
      onDrag={handleDrag}
      onStop={handleDrag}
      handle=".drag-handle"
    >
      <div
        className={`absolute cursor-move select-none ${
          isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
        }`}
        style={{
          width: room.width,
          height: room.height,
          transform: `rotate(${room.rotation}deg)`,
          transformOrigin: 'center'
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onDoubleClick={handleDoubleClick}
      >
        <div
          className={`drag-handle w-full h-full rounded border-2 border-gray-800 flex items-center justify-center text-white font-medium text-sm transition-all hover:opacity-90 ${roomConfig.color}`}
        >
          {isEditing ? (
            <input
              ref={inputRef}
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleNameSubmit}
              onKeyDown={handleKeyDown}
              className="bg-transparent text-white text-center text-sm font-medium outline-none placeholder-white/70 w-full"
              placeholder="Room name"
            />
          ) : (
            <span className="text-center px-2 leading-tight">
              {room.name}
            </span>
          )}
        </div>
        
        {/* Resize handles */}
        {isSelected && (
          <>
            <div
              className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded cursor-se-resize"
              onMouseDown={(e) => {
                e.stopPropagation();
                const startX = e.clientX;
                const startY = e.clientY;
                const startWidth = room.width;
                const startHeight = room.height;

                const handleMouseMove = (moveEvent: MouseEvent) => {
                  const deltaX = moveEvent.clientX - startX;
                  const deltaY = moveEvent.clientY - startY;
                  const newWidth = Math.max(60, snapToGrid(startWidth + deltaX));
                  const newHeight = Math.max(40, snapToGrid(startHeight + deltaY));
                  onUpdate(room.id, { width: newWidth, height: newHeight });
                };

                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };

                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
            />
          </>
        )}
      </div>
    </Draggable>
  );
};

export default RoomBlock;