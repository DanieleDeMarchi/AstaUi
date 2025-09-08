/**
 * A complete simulation of the AstaUI backend.
 * It manages its own internal state and mimics the behavior of the REST API
 * and WebSocket server, allowing for full frontend development and testing
 * without a live backend.
 */
import type { AuctionState } from '@/types/auction.interface'
import type { Player } from '@/types/player.interface'
import type { RosterPlayer, Team } from '@/types/team.interface'
import type { WebSocketEvent } from '@/types/websocket.interface'
import { MOCK_PLAYERS_DATA } from '@/api/mock-players'
import { MOCK_TEAMS_DATA } from '@/api/mock-teams'

// Helper to create a deep copy to prevent object reference issues
const deepCopy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj))

class MockBackend {
  private state: AuctionState
  private wsBroadcast: (event: WebSocketEvent) => void = () => {}

  constructor() {
    this.state = this._getInitialState()
    console.log('Mock Backend Initialized.')
  }

  // --- Public Methods (Simulating REST API) ---

  public getFullState(): AuctionState {
    console.log('MOCK BACKEND: GET /api/state called.')
    return deepCopy(this.state)
  }

  // --- Public Methods (Simulating Commissioner Actions) ---

  public startAuction(playerId: number) {
    console.log(`MOCK BACKEND: POST /api/auction/start with playerId: ${playerId}`)
    const player = this.state.players.find((p) => p.id === playerId)
    if (!player || player.soldInfo) {
      console.error('Mock Backend: Cannot start auction for sold or non-existent player.')
      return
    }

    this.state.currentAuction = {
      player: player,
      currentBid: 0,
      leadingTeamId: null
    }

    this._incrementVersionAndBroadcast({
      eventType: 'AUCTION_START',
      payload: { player }
    })
  }

  public placeBid(playerId: number, teamId: number, amount: number) {
    console.log(
      `MOCK BACKEND: POST /api/auction/bid for player ${playerId} with teamId: ${teamId}, amount: ${amount}`
    )
    // VALIDATION: Ensure the bid is for the correct player
    if (
      !this.state.currentAuction.player ||
      this.state.currentAuction.player.id !== playerId ||
      amount <= this.state.currentAuction.currentBid
    ) {
      console.error('Mock Backend: Invalid bid (stale player or low amount).')
      return
    }

    this.state.currentAuction.currentBid = amount
    this.state.currentAuction.leadingTeamId = teamId

    this._incrementVersionAndBroadcast({
      eventType: 'BID_PLACED',
      payload: {
        playerId,
        currentBid: amount,
        leadingTeamId: teamId
      }
    })
  }

  public sellPlayer(playerId: number, winningTeamId: number, price: number) {
    console.log(
      `MOCK BACKEND: POST /api/auction/sell for player ${playerId} to team ${winningTeamId} for ${price}`
    )
    const { player, leadingTeamId, currentBid } = this.state.currentAuction
    // VALIDATION: Ensure we are selling the correct player to the correct team for the correct price
    if (
      !player ||
      player.id !== playerId ||
      leadingTeamId !== winningTeamId ||
      currentBid !== price
    ) {
      console.error('Mock Backend: Cannot sell player, inconsistent state.')
      return
    }

    // Update Player soldInfo
    const soldPlayer = this.state.players.find((p) => p.id === playerId)
    if (soldPlayer) {
      soldPlayer.soldInfo = { teamId: winningTeamId, price }
    }

    // Add player to team roster
    const winningTeam = this.state.teams.find((t) => t.id === winningTeamId)
    const newRosterPlayer: RosterPlayer = {
      playerId: player.id,
      price: price,
      role: player.position.startsWith('G') ? 'G' : player.position.startsWith('F') ? 'F' : 'C',
      isReserve: false
    }
    if (winningTeam) {
      winningTeam.roster.push(newRosterPlayer)
    }

    // Reset auction
    this.state.currentAuction = { player: null, currentBid: 0, leadingTeamId: null }

    this._incrementVersionAndBroadcast({
      eventType: 'PLAYER_SOLD',
      payload: {
        playerId: soldPlayer!.id,
        winningTeamId: winningTeam!.id,
        price: price,
        soldPlayerUpdate: soldPlayer!,
        winningTeamUpdate: winningTeam!
      }
    })
  }

  // --- WebSocket Simulation ---

  public onWebSocket(broadcastCallback: (event: WebSocketEvent) => void) {
    this.wsBroadcast = broadcastCallback
  }

  // --- Private Helpers ---

  private _incrementVersionAndBroadcast(eventData: Omit<WebSocketEvent, 'stateVersion'>) {
    this.state.stateVersion++
    const event: WebSocketEvent = {
      ...eventData,
      stateVersion: this.state.stateVersion
    }
    console.log(
      `MOCK BACKEND: Broadcasting event ${event.eventType}, new version ${event.stateVersion}`
    )
    setTimeout(() => this.wsBroadcast(event), 200) // Simulate network delay
  }

  private _getInitialState(): AuctionState {
    const teams: Team[] = MOCK_TEAMS_DATA.map((t) => ({
      ...t,
      roster: t.roster.map(
        (p) =>
          ({
            playerId: p.playerId,
            price: p.price,
            role: p.role,
            isReserve: p.isReserve
          } as RosterPlayer)
      )
    }))

    return {
      stateVersion: 1,
      players: deepCopy(MOCK_PLAYERS_DATA),
      teams: deepCopy(teams),
      currentAuction: { player: null, currentBid: 0, leadingTeamId: null },
      acquisitions: []
    }
  }
}

export const mockBackendService = new MockBackend()

