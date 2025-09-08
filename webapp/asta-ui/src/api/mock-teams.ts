import type { Team } from '@/types/team.interface'

// This mock data now adheres to the normalized Team and RosterPlayer interfaces.
// The roster only contains references (playerId) to the full player objects
// which are stored in mock-players.ts.
export const MOCK_TEAMS_DATA: Team[] = [
  {
    id: 1,
    name: 'Thunder Warriors',
    coachName: 'Marco Rossi',
    coachPhotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    totalCredits: 350,
    roster: [
      { playerId: 1, price: 75, role: 'F', isReserve: false },
      { playerId: 2, price: 80, role: 'G', isReserve: false },
      { playerId: 3, price: 85, role: 'C', isReserve: false }
    ]
  },
  {
    id: 2,
    name: 'The Annihilators',
    coachName: 'Jane Doe',
    coachPhotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    totalCredits: 400,
    roster: [
      { playerId: 6, price: 65, role: 'F', isReserve: false },
      { playerId: 7, price: 90, role: 'G', isReserve: false }
    ]
  },
  {
    id: 3,
    name: 'Dream Team',
    coachName: 'Sam Wilson',
    coachPhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    totalCredits: 380,
    roster: [{ playerId: 5, price: 95, role: 'F', isReserve: false }]
  },
  {
    id: 4,
    name: 'Hoop Wizards',
    coachName: 'Alex Ray',
    coachPhotoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face',
    totalCredits: 390,
    roster: []
  }
]
