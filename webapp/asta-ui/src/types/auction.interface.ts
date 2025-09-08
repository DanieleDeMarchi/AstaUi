import type { Acquisition } from './misc.interface'
import type { Player } from './player.interface'
import type { Team } from './team.interface'

/**
 * Represents the state of the player currently being auctioned.
 */
export interface CurrentAuction {
  /** The full player object on the block. Null if no auction is active. */
  player: Player | null
  currentBid: number
  leadingTeamId: number | null
}

/**
 * The root state object for the entire auction application.
 * This is the definitive shape of our Pinia store.
 */
export interface AuctionState {
  /** A version number that increments with each state change, used for synchronization. */
  stateVersion: number
  /** The master list of all players in the pool (sold and unsold). */
  players: Player[]
  /** The list of all fantasy teams. */
  teams: Team[]
  /** The state of the currently active auction. */
  currentAuction: CurrentAuction
  /** A list of the most recent player acquisitions. */
  acquisitions: Acquisition[]
}

