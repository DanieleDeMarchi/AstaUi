import type { Player } from './player.interface'
import type { RosterPlayer, Team } from './team.interface'

// --- Event Payloads ---

export interface AuctionStartPayload {
  player: Player
}

export interface BidPlacedPayload {
  playerId: number // Explicitly state which player the bid is for
  currentBid: number
  leadingTeamId: number
}

export interface PlayerSoldPayload {
  playerId: number // Explicitly state which player was sold
  winningTeamId: number
  price: number
  // The full player and team objects are included for the client
  // to easily update its state without extra lookups.
  soldPlayerUpdate: Player
  winningTeamUpdate: Team
}

// --- Union Type for all possible events ---

export type WebSocketEvent =
  | {
      stateVersion: number
      eventType: 'AUCTION_START'
      payload: AuctionStartPayload
    }
  | {
      stateVersion: number
      eventType: 'BID_PLACED'
      payload: BidPlacedPayload
    }
  | {
      stateVersion: number
      eventType: 'PLAYER_SOLD'
      payload: PlayerSoldPayload
    }

