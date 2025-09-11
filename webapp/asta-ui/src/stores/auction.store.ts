import { defineStore } from 'pinia'
import { getMockAuctionState } from '@/api/mock.api'
import { webSocketAPI } from '@/api/websocket'
import type { AuctionState, FantasyTeam, CurrentAuctionData } from '@/types'
import type { WebSocketMessage } from '@/types/websocket'

export const useAuctionStore = defineStore('auction', {
  state: (): AuctionState => ({
    stateVersion: 0,
    acquisitions: [],
    // Corrected: Initialize currentAuction to null
    currentAuction: null,
    teams: []
  }),

  getters: {
    leadingTeam(state): FantasyTeam | undefined {
      if (!state.currentAuction?.leadingTeamId) {
        return undefined
      }
      return state.teams.find((team) => team.id === state.currentAuction?.leadingTeamId)
    }
  },

  actions: {
    async initialize() {
      try {
        const initialState = await getMockAuctionState()
        this.$state = initialState

        // Connect to the WebSocket service to listen for real-time updates
        webSocketAPI.connect((message: WebSocketMessage) => {
          this._handleIncomingEvent(message)
        })
      } catch (error) {
        console.error('Failed to initialize auction state:', error)
      }
    },

    _handleIncomingEvent(message: WebSocketMessage) {
      console.log('Received WebSocket message:', message)

      if (message.stateVersion !== this.stateVersion + 1) {
        console.warn(
          `State mismatch! Local: ${this.stateVersion}, Server: ${message.stateVersion}. Resyncing...`
        )
        // this._resyncState();
        return
      }

      this._applyEvent(message)
    },

    _applyEvent(message: WebSocketMessage) {
      this.stateVersion = message.stateVersion
      const payload = message.payload

      switch (payload.eventType) {
        case 'AUCTION_START':
          // Create the auction object
          this.currentAuction = {
            player: payload.player,
            currentBid: 0,
            leadingTeamId: null
          }
          break

        case 'BID_PLACED':
          // Add a null check for safety
          if (this.currentAuction) {
            this.currentAuction.currentBid = payload.currentBid
            this.currentAuction.leadingTeamId = payload.leadingTeamId
          }
          break

        case 'PLAYER_SOLD':
          // Update the winning team's roster
          this.teams = this.teams.map((team) =>
            team.id === payload.winningTeam.id ? payload.winningTeam : team
          )
          // Add to acquisitions
          this.acquisitions.unshift(payload.acquisition)
          // Reset the auction by setting it to null
          this.currentAuction = null
          break
      }
    }
  }
})

