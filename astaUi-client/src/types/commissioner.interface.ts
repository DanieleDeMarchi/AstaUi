import type { FantasyTeam, Player, CurrentAuctionData } from '@/types'

/**
 * Defines the complete data structure required by the CommissionerView.
 * This is the shape of the data that will be fetched from the API and
 * managed in the component's local state.
 */
export interface CommissionerState {
  currentAuction: CurrentAuctionData | null
  teams: FantasyTeam[]
}
