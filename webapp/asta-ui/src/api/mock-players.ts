import type { Player } from '@/types'

// This mock data represents the full player pool for the auction.
export const MOCK_PLAYERS_DATA: Player[] = [
  // Players already on rosters (sold)
  {
    id: 1,
    name: 'LeBron James',
    nbaTeam: 'Los Angeles Lakers',
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
    nbaTeam: 'Golden State Warriors',
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
    nbaTeam: 'Denver Nuggets',
    photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png',
    position: 'C',
    price: 85,
    isReserve: false,
    stats: { gamesPlayed: 79, pointsPerGame: 26.4, reboundsPerGame: 12.4, assistsPerGame: 9.0 },
    fantasyTeamId: 1
  },
  {
    id: 4,
    name: 'Kevin Durant',
    nbaTeam: 'Phoenix Suns',
    photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png',
    position: 'F',
    price: 78,
    isReserve: false,
    stats: { gamesPlayed: 75, pointsPerGame: 27.1, reboundsPerGame: 6.6, assistsPerGame: 5.0 },
    fantasyTeamId: 2
  },

  // Available Players
  {
    id: 5,
    name: 'Giannis Antetokounmpo',
    position: 'F',
    nbaTeam: 'Milwaukee Bucks',
    photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png',
    stats: { gamesPlayed: 73, pointsPerGame: 30.4, reboundsPerGame: 11.5, assistsPerGame: 6.5 }
  },
  {
    id: 6,
    name: 'Jayson Tatum',
    position: 'F',
    nbaTeam: 'Boston Celtics',
    photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628369.png',
    stats: { gamesPlayed: 74, pointsPerGame: 26.9, reboundsPerGame: 8.1, assistsPerGame: 4.9 }
  },
  {
    id: 7,
    name: 'Luka Doncic',
    position: 'G',
    nbaTeam: 'Dallas Mavericks',
    photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png',
    stats: { gamesPlayed: 70, pointsPerGame: 33.9, reboundsPerGame: 9.2, assistsPerGame: 9.8 }
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

