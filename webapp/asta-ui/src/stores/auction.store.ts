import { defineStore } from 'pinia'
import { getMockAuctionState } from '@/api/mock.api'
import type { AuctionState, FantasyTeam } from '@/types'

export const useAuctionStore = defineStore('auction', {
  /**
   * Defines the initial state of the store.
   * It's an empty shell that matches our AuctionState type.
   */
  state: (): AuctionState => ({
    stateVersion: 0,
    acquisitions: [],
    currentAuction: {
      player: null,
      currentBid: 0,
      leadingTeamId: null
    },
    teams: []
  }),

  /**
   * Getters are like computed properties for the store.
   * They derive state without modifying it.
   */
  getters: {
    /**
     * Finds and returns the full FantasyTeam object for the leading bidder.
     * Components can use this without needing to do the find logic themselves.
     */
    leadingTeam(state): FantasyTeam | undefined {
      if (!state.currentAuction?.leadingTeamId) {
        return undefined
      }
      return state.teams.find((team) => team.id === state.currentAuction?.leadingTeamId)
    }
  },

  /**
   * Actions are methods that can modify the state.
   */
  actions: {
    /**
     * Fetches the initial state from the API and populates the store.
     * This is the main entry point for initializing the application's data.
     */
    async initialize() {
      try {
        const initialState = await getMockAuctionState()
        // The $state property is a powerful Pinia feature that allows us
        // to replace the entire state object at once.
        this.$state = initialState
      } catch (error) {
        console.error('Failed to initialize auction state:', error)
        // Here you could set an error state to show a message in the UI
      }
    }
  }
})

