import { useAuctionStore } from '@/stores/auction.store'
import type { WebSocketEvent } from '@/types/websocket.interface'
import { mockBackendService } from './mock-backend.service'

/**
 * Manages the WebSocket connection and message handling.
 * This version is modified to connect to our mock backend simulation.
 */
export const webSocketService = {
  isConnected: false,

  /**
   * "Connects" to the mock backend by registering a message handler.
   */
  connect() {
    if (this.isConnected) {
      return
    }

    // Instead of creating a real WebSocket, we subscribe to the mock backend's broadcasts.
    mockBackendService.onWebSocket((event) => {
      console.log('WEBSOCKET SERVICE: Received message from mock backend:', event)
      const auctionStore = useAuctionStore()
      auctionStore.processWebSocketMessage(event)
    })

    this.isConnected = true
    console.log('WebSocket service "connected" to mock backend.')
  },

  disconnect() {
    // In a real app, this would close the connection. Here we can just log it.
    this.isConnected = false
    console.log('WebSocket service "disconnected".')
  }
}

