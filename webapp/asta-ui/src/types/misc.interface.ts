import type { PlayerRole } from './team.interface';

export interface Acquisition {
  id: string; // Unique ID for v-for key
  player: {
    name: string;
    photoUrl: string;
    role: PlayerRole;
  };
  team: {
    name: string;
    coachPhotoUrl: string;
  };
  price: number;
}