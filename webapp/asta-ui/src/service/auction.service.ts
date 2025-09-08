import type { AuctionState } from '@/types/auction.interface'
import { mockBackendService } from './mock-backend.service'

export const auctionService = {
  /**
   * Fetches the entire current auction state from the mock backend.
   * Simulates a network delay.
   */
  fetchFullState(): Promise<AuctionState> {
    console.log('API SERVICE: Requesting full state from mock backend...')
    return new Promise((resolve) => {
      setTimeout(() => {
        const state = mockBackendService.getFullState()
        resolve(state)
      }, 500) // 500ms delay to simulate network
    })
  }
}

