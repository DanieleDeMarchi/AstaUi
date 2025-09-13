import type { AuctionState, FantasyTeam, Player, Acquisition } from '@/types'
import type { WebSocketMessage, WebSocketEventPayload } from '@/types/websocket'
import { getMockAuctionState } from '@/api/mock.api'
import { MOCK_PLAYERS_DATA } from '@/api/mock-players'

class MockBackendService {
  private state: AuctionState | null = null
  private isInitialized = false
  private messageHandler: ((message: WebSocketMessage) => void) | null = null
  private ready: Promise<void>
  private _resolveReady!: () => void

  constructor() {
    this.ready = new Promise((resolve) => {
      this._resolveReady = resolve
    })
    this._initialize()
  }

  private async _initialize() {
    this.state = await getMockAuctionState()
    this.isInitialized = true
    console.log('Mock Backend Initialized. Access with `astaMock` in the console.')
    this._resolveReady()
  }

  public async getCurrentState(): Promise<AuctionState> {
    await this.ready
    if (!this.state) throw new Error('Mock backend state is not available.')
    return JSON.parse(JSON.stringify(this.state))
  }

  // --- NEW METHOD ---
  public async removePlayerFromTeam(teamId: number, playerId: number) {
    await this.ready
    if (!this.state) return

    const team = this.state.teams.find((t) => t.id === teamId)
    if (team) {
      const playerToRemove = team.roster.find((p) => p.id === playerId)
      if (playerToRemove) {
        // Remove fantasyTeamId from the master player list
        const masterPlayer = MOCK_PLAYERS_DATA.find(p => p.id === playerId);
        if (masterPlayer) {
          delete masterPlayer.fantasyTeamId;
          delete masterPlayer.price;
          delete masterPlayer.isReserve;
        }
      }
      team.roster = team.roster.filter((p) => p.id !== playerId)
    }
  }

  public registerMessageHandler(handler: (message: WebSocketMessage) => void) {
    this.messageHandler = handler
  }

  public async startAuction(playerId: number) {
    await this.ready
    if (!this.state) return
    const player = MOCK_PLAYERS_DATA.find((p) => p.id === playerId && !p.fantasyTeamId)
    if (!player) {
      console.error(`MockBackend: Player with ID ${playerId} not found or is already sold.`)
      return
    }
    this.state.currentAuction = { player, currentBid: 0, leadingTeamId: null }
    this.state.stateVersion++
    this._broadcast({ eventType: 'AUCTION_START', player })
  }

  public async cancelAuction() {
    await this.ready
    if (!this.state) return
    this.state.currentAuction = null
    this.state.stateVersion++
    this._broadcast({ eventType: 'AUCTION_CANCELLED' })
  }

  public async placeBid(teamId: number, amount: number) {
    await this.ready
    if (!this.state || !this.state.currentAuction) return
    const { player, currentBid } = this.state.currentAuction
    if (!player || amount <= currentBid) return
    this.state.currentAuction.currentBid = amount
    this.state.currentAuction.leadingTeamId = teamId
    this.state.stateVersion++
    this._broadcast({ eventType: 'BID_PLACED', currentBid: amount, leadingTeamId: teamId })
  }

  public async sellPlayer() {
    await this.ready
    if (!this.state || !this.state.currentAuction) return
    const { player, currentBid, leadingTeamId } = this.state.currentAuction
    if (!player || !leadingTeamId) return

    const winningTeam = this.state.teams.find((t) => t.id === leadingTeamId)
    if (!winningTeam) return
    
    const rosterLimit = 4;
    const isReserve = winningTeam.roster.filter(p => p.position === player.position && !p.isReserve).length >= rosterLimit;

    const soldPlayer: Player = { ...player, price: currentBid, fantasyTeamId: leadingTeamId, isReserve }

    // Also update the master player list
    const masterPlayer = MOCK_PLAYERS_DATA.find(p => p.id === soldPlayer.id);
    if (masterPlayer) {
        masterPlayer.fantasyTeamId = leadingTeamId;
        masterPlayer.price = currentBid;
        masterPlayer.isReserve = isReserve;
    }

    const updatedTeam: FantasyTeam = { ...winningTeam, roster: [...winningTeam.roster, soldPlayer] }
    this.state.teams = this.state.teams.map((t) => (t.id === updatedTeam.id ? updatedTeam : t))
    const acquisition: Acquisition = {
      id: new Date().toISOString(),
      player: { name: player.name, photoUrl: player.photoUrl, position: player.position },
      team: { name: winningTeam.name, coachPhotoUrl: winningTeam.coachPhotoUrl },
      price: currentBid
    }
    this.state.acquisitions.unshift(acquisition)
    this.state.currentAuction = null
    this.state.stateVersion++
    this._broadcast({ eventType: 'PLAYER_SOLD', winningTeam: updatedTeam, acquisition })
  }

  private _broadcast(payload: WebSocketEventPayload) {
    if (this.messageHandler && this.state) {
      const message: WebSocketMessage = { stateVersion: this.state.stateVersion, payload }
      setTimeout(() => this.messageHandler!(message), 200)
    }
  }
}

export const mockBackendService = new MockBackendService()

