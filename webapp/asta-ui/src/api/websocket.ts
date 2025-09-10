import type { WebSocketMessage } from '@/types/websocket'
import { mockBackendService } from '@/api/mock-backend.service'

/**
 * Manages the WebSocket connection and message handling.
 * In development, it connects to our mock backend service.
 * In production, this would be a real WebSocket client.
 */
class WebSocketAPI {
  public connect(messageHandler: (message: WebSocketMessage) => void): void {
    console.log('WebSocketAPI: Connecting...')

    // In a real app, this would be:
    // const ws = new WebSocket('ws://localhost:8000/ws');
    // ws.onmessage = (event) => {
    //   const message = JSON.parse(event.data);
    //   messageHandler(message);
    // };

    // For our mock setup, we just register our handler.
    mockBackendService.registerMessageHandler(messageHandler)

    console.log('WebSocketAPI: Connection established (mocked).')
  }
}

// Export a singleton instance
export const webSocketAPI = new WebSocketAPI()
