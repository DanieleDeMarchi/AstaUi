export interface Player {
  id: number
  name: string
  position: string
  nbaTeam: string
  photoUrl: string
  stats?: PlayerStats // Stats are optional
  soldInfo?: PlayerSoldInfo
}

export interface PlayerStats {
  gamesPlayed: number
  pointsPerGame: number
  reboundsPerGame: number
  assistsPerGame: number
}

/**
 * Information about a player who has been sold.
 * This is stored on the Player object.
 */
export interface PlayerSoldInfo {
  teamId: number // Reference to the team that bought the player
  price: number
}

