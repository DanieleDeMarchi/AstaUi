export type PlayerRole = 'G' | 'F' | 'C'

/**
 * Represents a player within a team's roster in our normalized Pinia state.
 * It only contains a reference to the player's ID and auction-specific details.
 */
export interface RosterPlayer {
  playerId: number // Reference to the main Player object
  price: number
  role: PlayerRole
  isReserve: boolean
}

/**
 * Represents a single fantasy team in our normalized Pinia state.
 * The roster contains only references (IDs) to players.
 */
export interface Team {
  id: number
  name: string
  coachName: string
  coachPhotoUrl: string
  totalCredits: number
  roster: RosterPlayer[]
}

