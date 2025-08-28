export type RoomType = 'treatment' | 'sterilization' | 'public' | 'admin';

export interface Room {
  id: string;
  type: RoomType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  name: string;
}