import type {
  AuctionState,
  Player,
  FantasyTeam,
  Acquisition,
  PlayerRole
} from '@/types'

// Re-creating the mock data in a centralized place.
const MOCK_TEAMS_DATA: FantasyTeam[] = [
  {
    id: 1,
    name: 'Thunder Warriors',
    coachName: 'Marco Rossi',
    coachPhotoUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    totalCredits: 350,
    roster: []
  },
  {
    id: 2,
    name: 'The Annihilators',
    coachName: 'Jane Doe',
    coachPhotoUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    totalCredits: 400,
    roster: []
  },
  {
    id: 3,
    name: 'Dream Team',
    coachName: 'Sam Wilson',
    coachPhotoUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    totalCredits: 380,
    roster: []
  },
  {
    id: 4,
    name: 'Hoop Wizards',
    coachName: 'Alex Ray',
    coachPhotoUrl:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face',
    totalCredits: 390,
    roster: []
  },
  {
    id: 5,
    name: 'Net Rippers',
    coachName: 'Maria Garcia',
    coachPhotoUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    totalCredits: 365,
    roster: []
  },
  {
    id: 6,
    name: 'Court Kings',
    coachName: 'David Chen',
    coachPhotoUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    totalCredits: 410,
    roster: []
  }
]

const MOCK_PLAYER_ON_BLOCK: Player = {
  id: 3,
  name: 'Nikola Jokic',
  position: 'C',
  nbaTeam: 'Denver Nuggets',
  photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png',
  stats: {
    gamesPlayed: 79,
    pointsPerGame: 26.4,
    reboundsPerGame: 12.4,
    assistsPerGame: 9.0
  }
}

const MOCK_ACQUISITIONS: Acquisition[] = [
  {
    id: '1',
    player: {
      name: 'LeBron James',
      photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png',
      position: 'F' as PlayerRole
    },
    team: { name: 'Thunder Warriors', coachPhotoUrl: '' },
    price: 75
  },
  {
    id: '2',
    player: {
      name: 'Stephen Curry',
      photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png',
      position: 'G' as PlayerRole
    },
    team: { name: 'Dream Team', coachPhotoUrl: '' },
    price: 80
  },
  {
    id: '3',
    player: {
      name: 'Kevin Durant',
      photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png',
      position: 'F' as PlayerRole
    },
    team: { name: 'Hoop Wizards', coachPhotoUrl: '' },
    price: 78
  },
  {
    id: '4',
    player: {
      name: 'Luka Doncic',
      photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png',
      position: 'G' as PlayerRole
    },
    team: { name: 'The Annihilators', coachPhotoUrl: '' },
    price: 92
  }
]

/**
 * Simulates the `GET /api/state` endpoint.
 * @returns A Promise that resolves to a complete AuctionState object.
 */
export const getMockAuctionState = (): Promise<AuctionState> => {
  const mockState: AuctionState = {
    stateVersion: 1,
    acquisitions: MOCK_ACQUISITIONS,
    currentAuction: null,
    teams: MOCK_TEAMS_DATA
  }

  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockState)
    }, 500)
  })
}

