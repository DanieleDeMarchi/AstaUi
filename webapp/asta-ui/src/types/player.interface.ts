export interface Player {
  id: number
  name: string
  position: string
  nbaTeam: string
  photoUrl: string
  stats: PlayerStats
}

export interface PlayerStats {
  gamesPlayed: number
  pointsPerGame: number
  reboundsPerGame: number
  assistsPerGame: number
}