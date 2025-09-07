export interface Player {
  id: number
  name: string
  position: string
  nbaTeam: string
  photoUrl: string
  stats: PlayerStats
  // New property to track auction status
  soldInfo?: {
    teamId: number
    teamName: string
    price: number
  }
}

export interface PlayerStats {
  gamesPlayed: number
  pointsPerGame: number
  reboundsPerGame: number
  assistsPerGame: number
}
