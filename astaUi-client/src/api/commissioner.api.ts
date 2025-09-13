import { mockBackendService } from './mock-backend.service'
import type { CommissionerState } from '@/types/commissioner.interface'
import type { Player } from '@/types'

// Helper to extract the commissioner-specific state from the main state.
// CORRECTED: This function is now async to handle the async backend call.
const getCommissionerState = async (): Promise<CommissionerState> => {
  // CORRECTED: We now await the state, which is guaranteed to be non-null.
  const fullState = await mockBackendService.getCurrentState()
  return {
    currentAuction: fullState.currentAuction,
    teams: fullState.teams
  }
}

export const fetchCommissionerState = async (): Promise<CommissionerState> => {
  console.log('API CALL: Fetching commissioner state')
  await new Promise((res) => setTimeout(res, 200)) // simulate network delay
  return await getCommissionerState()
}

export const startAuctionApi = async (player: Player): Promise<CommissionerState> => {
  console.log(`API CALL: Starting auction for player ${player.id}`)
  await mockBackendService.startAuction(player.id)
  await new Promise((res) => setTimeout(res, 200))
  return await getCommissionerState()
}

export const placeBidApi = async (teamId: number, amount: number): Promise<CommissionerState> => {
  console.log(`API CALL: Placing bid of ${amount} for team ${teamId}`)
  await mockBackendService.placeBid(teamId, amount)
  await new Promise((res) => setTimeout(res, 200))
  return await getCommissionerState()
}

export const sellPlayerApi = async (): Promise<CommissionerState> => {
  console.log('API CALL: Selling player')
  await mockBackendService.sellPlayer()
  await new Promise((res) => setTimeout(res, 200))
  return await getCommissionerState()
}

export const cancelAuctionApi = async (): Promise<CommissionerState> => {
  console.log('API CALL: Cancelling auction')
  await mockBackendService.cancelAuction()
  await new Promise((res) => setTimeout(res, 200))
  return await getCommissionerState()
}

export const removePlayerApi = async (teamId: number, playerId: number): Promise<CommissionerState> => {
    console.log(`API CALL: Removing player ${playerId} from team ${teamId}`)
    await mockBackendService.removePlayerFromTeam(teamId, playerId)
    await new Promise((res) => setTimeout(res, 200))
    return getCommissionerState()
  }

