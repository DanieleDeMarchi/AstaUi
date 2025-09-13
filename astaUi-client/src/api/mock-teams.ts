import type { FantasyTeam } from '@/types'

// This mock data represents the state of teams for the Control Panel view.
// Rosters are populated with Player objects, including auction-specific details.
export const MOCK_TEAMS_DATA: FantasyTeam[] = [
  {
    id: 1,
    name: 'Thunder Warriors',
    coachName: 'Marco Rossi',
    coachPhotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    totalCredits: 350,
    roster: [
      {
        id: 1,
        name: 'LeBron James',
        nbaTeam: 'LAL',
        photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png',
        position: 'F',
        price: 75,
        isReserve: false,
        stats: { gamesPlayed: 71, pointsPerGame: 25.7, reboundsPerGame: 7.3, assistsPerGame: 7.3 },
        fantasyTeamId: 1
      },
      {
        id: 2,
        name: 'Stephen Curry',
        nbaTeam: 'GSW',
        photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png',
        position: 'G',
        price: 80,
        isReserve: false,
        stats: { gamesPlayed: 74, pointsPerGame: 26.4, reboundsPerGame: 4.5, assistsPerGame: 5.1 },
        fantasyTeamId: 1
      },
      {
        id: 3,
        name: 'Nikola Jokic',
        nbaTeam: 'DEN',
        photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png',
        position: 'C',
        price: 85,
        isReserve: false,
        stats: { gamesPlayed: 79, pointsPerGame: 26.4, reboundsPerGame: 12.4, assistsPerGame: 9.0 },
        fantasyTeamId: 1
      },
      {
        id: 5,
        name: 'Giannis Antetokounmpo',
        position: 'F',
        nbaTeam: 'Milwaukee Bucks',
        photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png',
        stats: { gamesPlayed: 73, pointsPerGame: 30.4, reboundsPerGame: 11.5, assistsPerGame: 6.5 },
        fantasyTeamId: 1,
        price: 85,
        isReserve: false,
      }
    ]
  },
  {
    id: 2,
    name: 'The Annihilators',
    coachName: 'Jane Doe',
    coachPhotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    totalCredits: 400,
    roster: [
      {
        id: 4,
        name: 'Kevin Durant',
        nbaTeam: 'PHX',
        photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png',
        position: 'F',
        price: 78,
        isReserve: false,
        stats: { gamesPlayed: 75, pointsPerGame: 27.1, reboundsPerGame: 6.6, assistsPerGame: 5.0 },
        fantasyTeamId: 2
      }
    ]
  },
  {
    id: 3,
    name: 'Dream Team',
    coachName: 'Sam Wilson',
    coachPhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    totalCredits: 380,
    roster: []
  },
];

