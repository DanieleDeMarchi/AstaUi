import type {
  AuctionState,
  FantasyTeam,
  Player,
  Acquisition
} from '@/types'
import type {
  WebSocketMessage,
  WebSocketEventPayload
} from '@/types/websocket'
import { getMockAuctionState } from '@/api/mock.api'
import { MOCK_PLAYERS_DATA } from '@/api/mock-players'

/**
 * A singleton service that simulates the entire backend.
 * It holds the "true" state and can broadcast WebSocket events.
 */
class MockBackendService {
  private state: AuctionState | null = null
  private isInitialized = false
  private messageHandler: ((message: WebSocketMessage) => void) | null = null

  // A promise that resolves when the async constructor logic is complete
  private ready: Promise<void>
  private _resolveReady!: () => void

  constructor() {
    // Set up the promise that other methods will await
    this.ready = new Promise((resolve) => {
      this._resolveReady = resolve
    })
    this._initialize()
  }

  private async _initialize() {
    this.state = await getMockAuctionState()
    this.isInitialized = true
    console.log('Mock Backend Initialized. Access with `astaMock` in the console.')
    // Resolve the promise, signaling that the service is ready
    this._resolveReady()
  }

  public async getCurrentState(): Promise<AuctionState> {
    await this.ready // Wait for initialization to complete
    if (!this.isInitialized || !this.state) {
      throw new Error('Mock backend state is not available or not initialized.')
    }
    // Return a deep copy to prevent direct mutation from outside
    return JSON.parse(JSON.stringify(this.state))
  }

  // Called by the WebSocket service to listen for events
  public registerMessageHandler(handler: (message: WebSocketMessage) => void) {
    this.messageHandler = handler
  }

  // --- Public methods to be called from the console ---

  public async startAuction(playerId: number) {
    await this.ready // Wait for initialization to complete
    if (!this.isInitialized || !this.state) {
      console.error('MockBackend is not ready yet.')
      return
    }

    const player = MOCK_PLAYERS_DATA.find((p) => p.id === playerId)
    if (!player) {
      console.error(`MockBackend: Player with ID ${playerId} not found.`)
      return
    }

    this.state.currentAuction = {
      player,
      currentBid: 0,
      leadingTeamId: null
    }
    this.state.stateVersion++

    this._broadcast({
      eventType: 'AUCTION_START',
      player
    })
  }

  public async cancelAuction() {
    await this.ready
    if (!this.isInitialized || !this.state) {
      console.error('MockBackend is not ready yet.')
      return
    }

    if(!this.state.currentAuction) {
      console.error('No player on sale.')
      return
    }

    this.state.currentAuction = null
    this.state.stateVersion++
  }

  public async placeBid(teamId: number, amount: number) {
    await this.ready
    if (!this.isInitialized || !this.state) {
      console.error('MockBackend is not ready yet.')
      return
    }

    if(!this.state.currentAuction) {
      console.error('No player on sale.')
      return
    }

    const { player, currentBid } = this.state.currentAuction
    if (!player) {
      console.error('MockBackend: No auction in progress.')
      return
    }
    if (amount <= currentBid) {
      console.error(`MockBackend: Bid of ${amount} is not higher than current bid of ${currentBid}.`)
      return
    }

    this.state.currentAuction.currentBid = amount
    this.state.currentAuction.leadingTeamId = teamId
    this.state.stateVersion++

    this._broadcast({
      eventType: 'BID_PLACED',
      currentBid: amount,
      leadingTeamId: teamId
    })
  }

  public async sellPlayer() {
    await this.ready
    if (!this.isInitialized || !this.state) {
      console.error('MockBackend is not ready yet.')
      return
    }

    if(!this.state.currentAuction) {
      console.error('No player on sale.')
      return
    }

    const { player, currentBid, leadingTeamId } = this.state.currentAuction
    if (!player || !leadingTeamId) {
      console.error('MockBackend: Cannot sell player, no leading bid.')
      return
    }

    const winningTeam = this.state.teams.find((t) => t.id === leadingTeamId)
    if (!winningTeam) return

    const isReserve = winningTeam.roster.filter((p) => p.position === player.position).length >= 4

    const soldPlayer: Player = {
      ...player,
      price: currentBid,
      fantasyTeamId: leadingTeamId,
      isReserve: isReserve,
    }

    console.log("Team before update", this.state.teams)

    const updatedTeam: FantasyTeam = {
      ...winningTeam,
      roster: [...winningTeam.roster, soldPlayer]
    }

    this.state.teams = this.state.teams.map((t) => (t.id === updatedTeam.id ? updatedTeam : t))

    console.log("Team after update", this.state.teams)

    const acquisition: Acquisition = {
      id: new Date().toISOString(),
      player: {
        name: player.name,
        photoUrl: player.photoUrl,
        position: player.position
      },
      team: {
        name: winningTeam.name,
        coachPhotoUrl: winningTeam.coachPhotoUrl
      },
      price: currentBid
    }
    this.state.acquisitions.unshift(acquisition)

    this.state.currentAuction = { player: null, currentBid: 0, leadingTeamId: null }
    this.state.stateVersion++

    this._broadcast({
      eventType: 'PLAYER_SOLD',
      winningTeam: updatedTeam,
      acquisition
    })
  }

  // --- Private helpers ---

  private _broadcast(payload: WebSocketEventPayload) {
    if (this.messageHandler && this.state) {
      const message: WebSocketMessage = {
        stateVersion: this.state.stateVersion,
        payload
      }
      setTimeout(() => {
        this.messageHandler!(message)
      }, 500)
    }
  }
}

export const mockBackendService = new MockBackendService()

