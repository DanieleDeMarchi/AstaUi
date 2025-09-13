// --- Player Types ---

export interface PlayerStats {
  gamesPlayed: number
  pointsPerGame: number
  reboundsPerGame: number
  assistsPerGame: number
}

export type PlayerRole = 'G' | 'F' | 'C'

/**
 * Represents a single, unified NBA player object.
 * It contains all possible properties, with auction-specific
 * ones being optional.
 */
export interface Player {
  id: number
  name: string
  /** The player's fantasy role (G, F, C), used for roster construction. */
  position: PlayerRole
  nbaTeam: string
  photoUrl: string
  stats: PlayerStats

  // Properties added when the player is sold and added to a roster
  price?: number
  isReserve?: boolean
  /** A direct reference to the owning team's ID for efficient lookups. */
  fantasyTeamId?: number
}

// --- Team Types ---

/**
 * Represents a single fantasy team. The roster is an array of
 * the unified Player objects.
 */
export interface FantasyTeam {
  id: number
  name: string
  coachName: string
  coachPhotoUrl: string
  totalCredits: number
  roster: Player[] // Roster now uses the main Player type
}

// --- Misc & Acquisition Types ---

/**
 * Represents a historical record of a player being sold to a team.
 * This is a denormalized structure, perfect for display in a list.
 */
export interface Acquisition {
  id: string // Unique ID for v-for key
  player: {
    name: string
    photoUrl: string
    position: PlayerRole // Using 'position' for consistency
  }
  team: {
    name: string
    coachPhotoUrl: string
  }
  price: number
}

// --- Main State & API Types ---

/**
 * Defines the structure for the live, real-time auction details.
 */
export interface CurrentAuctionData {
  /**
   * The full player object for the player currently on the block.
   */
  player: Player | null

  /** The current highest bid amount. */
  currentBid: number

  /** The ID of the team holding the highest bid. */
  leadingTeamId: number | null
}

/**
 * Defines the complete data structure for the auction's state.
 * This object is returned by the `GET /api/state` endpoint and serves as
 * the definitive shape for our Pinia store.
 */
export interface AuctionState {
  /**
   * The sequential version number of the auction state.
   */
  stateVersion: number

  /**
   * A list of the most recent player acquisitions.
   */
  acquisitions: Acquisition[]

  /**
   * The current live auction status.
   */
  currentAuction: CurrentAuctionData | null

  /**
   * A complete list of all fantasy teams with their populated rosters.
   */
  teams: FantasyTeam[]
}

