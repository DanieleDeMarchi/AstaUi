import { defineStore } from 'pinia'
import type { AuctionState } from '@/types/auction.interface'
import type { Team } from '@/types/team.interface'
import type { Player } from '@/types/player.interface'
import type { WebSocketEvent } from '@/types/websocket.interface'
import { auctionService } from '@/service/auction.service'
import { webSocketService } from '@/service/websocket.service'

export const useAuctionStore = defineStore('auction', {
  state: (): AuctionState => ({
    stateVersion: 0,
    players: [],
    teams: [],
    currentAuction: {
      player: null,
      currentBid: 0,
      leadingTeamId: null
    },
    acquisitions: []
  }),

  getters: {
    leadingTeam(state): Team | null {
      if (!state.currentAuction.leadingTeamId) return null
      return state.teams.find((t) => t.id === state.currentAuction.leadingTeamId) || null
    },
    unsoldPlayers(state): Player[] {
      return state.players.filter((p) => !p.soldInfo)
    }
  },

  /**
   * Actions are methods that can be called to modify the state.
   * They can be asynchronous and are the correct place for API calls.
   */
  actions: {
    /**
     * Initializes the store by fetching the initial state and connecting to the WebSocket.
     * This should be called when the main Auction component is mounted.
     */
    async initialize() {
      try {
        const initialState = await auctionService.fetchFullState()
        this.$state = initialState // Directly replaces the entire state
        console.log(`Store initialized to version ${this.stateVersion}.`)

        // Now that we have the initial state, connect to the WebSocket for real-time updates.
        webSocketService.connect()
      } catch (error) {
        console.error('Failed to initialize auction state:', error)
        // Here you might want to set an error state to show in the UI
      }
    },

    /**
     * The main entry point for processing all incoming WebSocket messages.
     * It checks the state version to ensure events are not missed.
     */
    processWebSocketMessage(event: WebSocketEvent) {
      console.log(`Received event type ${event.eventType} with version ${event.stateVersion}. Current store version is ${this.stateVersion}.`)

      // Check if the event is the one we expect next.
      const expectedVersion = this.stateVersion + 1
      if (event.stateVersion === expectedVersion) {
        // The version is correct, so we can apply the update.
        this._applyEvent(event)
        this.stateVersion = event.stateVersion // Update the store's version
      } else if (event.stateVersion > expectedVersion) {
        // We have missed one or more events. Trigger a full re-sync.
        console.warn(`State is out of sync. Expected version ${expectedVersion} but received ${event.stateVersion}. Triggering re-sync.`)
        this._resyncState()
      }
      // If event.stateVersion <= this.stateVersion, it's a duplicate/old event, so we ignore it.
    },

    /**
     * A "private" action to apply the state changes based on the event type.
     * This acts as a reducer, modifying the state for each specific event.
     */
    _applyEvent(event: WebSocketEvent) {
      switch (event.eventType) {
        case 'AUCTION_START':
          // In a real implementation, we would update the state here.
          console.log('Applying AUCTION_START event:', event.payload)
          break
        case 'BID_PLACED':
          console.log('Applying BID_PLACED event:', event.payload)
          break
        case 'PLAYER_SOLD':
          console.log('Applying PLAYER_SOLD event:', event.payload)
          break
      }
    },

    /**
     * A "private" action to handle re-synchronizing the state when an event is missed.
     */
    async _resyncState() {
      console.log('Re-syncing state with the server...')
      try {
        const freshState = await auctionService.fetchFullState()
        this.$state = freshState
        console.log(`Re-sync complete. Store is now at version ${this.stateVersion}.`)
      } catch (error) {
        console.error('Failed to re-sync auction state:', error)
      }
    }
  }
})

