import type { Player } from '@/types/player.interface'

export const MOCK_PLAYERS_DATA: Player[] = [
  // Sold Players
  {
    id: 1,
    name: 'LeBron James',
    position: 'F',
    nbaTeam: 'Los Angeles Lakers',
    photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png',
    stats: { gamesPlayed: 71, pointsPerGame: 25.7, reboundsPerGame: 7.3, assistsPerGame: 7.3 },
    soldInfo: { teamId: 1, price: 75 }
  },
  {
    id: 2,
    name: 'Stephen Curry',
    position: 'G',
    nbaTeam: 'Golden State Warriors',
    photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png',
    stats: { gamesPlayed: 74, pointsPerGame: 26.4, reboundsPerGame: 4.5, assistsPerGame: 5.1 },
    soldInfo: { teamId: 1, price: 80 }
  },
  {
    id: 3,
    name: 'Nikola Jokic',
    position: 'C',
    nbaTeam: 'Denver Nuggets',
    photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png',
    stats: { gamesPlayed: 79, pointsPerGame: 26.4, reboundsPerGame: 12.4, assistsPerGame: 9.0 },
    soldInfo: { teamId: 1, price: 85 }
  },
  {
    id: 6,
    name: 'Jayson Tatum',
    position: 'F',
    nbaTeam: 'Boston Celtics',
    photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628369.png',
    stats: { gamesPlayed: 74, pointsPerGame: 26.9, reboundsPerGame: 8.1, assistsPerGame: 4.9 },
    soldInfo: { teamId: 2, price: 65 }
  },
  {
    id: 7,
    name: 'Luka Doncic',
    position: 'G',
    nbaTeam: 'Dallas Mavericks',
    photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png',
    stats: { gamesPlayed: 70, pointsPerGame: 33.9, reboundsPerGame: 9.2, assistsPerGame: 9.8 },
    soldInfo: { teamId: 2, price: 90 }
  },

  // Available Players
  {
    id: 4,
    name: 'Kevin Durant',
    position: 'F',
    nbaTeam: 'Phoenix Suns',
    photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png',
    stats: { gamesPlayed: 75, pointsPerGame: 27.1, reboundsPerGame: 6.6, assistsPerGame: 5.0 }
  },
  {
    id: 5,
    name: 'Giannis Antetokounmpo',
    position: 'F',
    nbaTeam: 'Milwaukee Bucks',
    photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png',
    stats: { gamesPlayed: 73, pointsPerGame: 30.4, reboundsPerGame: 11.5, assistsPerGame: 6.5 }
  },
  {
    id: 8,
    name: 'Joel Embiid',
    position: 'C',
    nbaTeam: 'Philadelphia 76ers',
    photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203954.png',
    stats: { gamesPlayed: 39, pointsPerGame: 34.7, reboundsPerGame: 11.0, assistsPerGame: 5.6 }
  }
]

