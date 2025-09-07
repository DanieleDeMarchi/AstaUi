import type { Team } from '@/types/team.interface';

// A more detailed mock with pre-filled rosters for the control panel view
export const MOCK_TEAMS_WITH_PLAYERS: Team[] = [
  {
    id: 1,
    name: 'Thunder Warriors',
    coachName: 'Marco Rossi',
    coachPhotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    totalCredits: 350,
    roster: [
      { id: 1, name: 'LeBron James', nbaTeam: 'LAL', role: 'F', price: 75, isReserve: false },
      { id: 2, name: 'Stephen Curry', nbaTeam: 'GSW', role: 'G', price: 80, isReserve: false },
      { id: 3, name: 'Nikola Jokic', nbaTeam: 'DEN', role: 'C', price: 85, isReserve: false },
    ]
  },
  {
    id: 2,
    name: 'The Annihilators',
    coachName: 'Jane Doe',
    coachPhotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    totalCredits: 400,
    roster: [
      { id: 4, name: 'Kevin Durant', nbaTeam: 'PHX', role: 'F', price: 78, isReserve: false },
      { id: 7, name: 'Luka Doncic', nbaTeam: 'DAL', role: 'G', price: 92, isReserve: false },
      { id: 13, name: 'Jaylen Brown', nbaTeam: 'BOS', role: 'G', price: 55, isReserve: true },
    ]
  },
    {
    id: 3,
    name: 'Dream Team',
    coachName: 'Sam Wilson',
    coachPhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    totalCredits: 380,
    roster: [
       { id: 5, name: 'Giannis Antetokounmpo', nbaTeam: 'MIL', role: 'F', price: 95, isReserve: false },
    ]
  },
  {
    id: 4,
    name: 'Hoop Wizards',
    coachName: 'Alex Ray',
    coachPhotoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face',
    totalCredits: 390,
    roster: []
  },
];

