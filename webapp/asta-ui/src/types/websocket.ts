import type { Acquisition, FantasyTeam, Player } from './index'

/**
 * The structure for the payload when a new player is put on the block.
 */
export interface AuctionStartPayload {
  eventType: 'AUCTION_START'
  player: Player // The full player object, including stats
}

/**
 * The structure for the payload when a new bid is placed.
 */
export interface BidPlacedPayload {
  eventType: 'BID_PLACED'
  currentBid: number
  leadingTeamId: number
}

/**
 * The structure for the payload when a player is sold.
 */
export interface PlayerSoldPayload {
  eventType: 'PLAYER_SOLD'
  // The entire updated team object, with the new player in its roster
  winningTeam: FantasyTeam
  // The new acquisition to be added to the top of the list
  acquisition: Acquisition
}

// A discriminated union of all possible event payloads
export type WebSocketEventPayload = AuctionStartPayload | BidPlacedPayload | PlayerSoldPayload

/**
 * The wrapper for any message coming from the WebSocket.
 * It includes the version for synchronization and the specific event payload.
 */
export interface WebSocketMessage {
  stateVersion: number
  payload: WebSocketEventPayload
}
