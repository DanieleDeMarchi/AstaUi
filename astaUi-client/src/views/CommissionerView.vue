<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-6">
    <Toast />
    <div v-if="!isLoading" class="max-w-screen-2xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-6 text-gray-800">Commissioner Dashboard</h1>

      <!-- Upper Section: Live Auction Controls -->
      <section class="mb-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Left Side: Auction Status -->
          <div class="">
            <AuctionStatus
              :player="state.currentAuction?.player || null"
              :current-bid="state.currentAuction?.currentBid || 0"
              :leading-team="leadingTeam"
            />
          </div>

          <!-- Right Side: Auction Controls -->
          <div class="bg-white p-4 rounded-lg shadow-md">
            <h2 class="text-2xl font-semibold text-gray-700 mb-4 text-center">Controls</h2>
            <AuctionControls
              :teams="state.teams"
              :player-on-block="state.currentAuction?.player || null"
              :current-bid="state.currentAuction?.currentBid || 0"
              :leading-team-id="state.currentAuction?.leadingTeamId || null"
              @start-auction="handleStartAuction"
              @place-bid="handlePlaceBid"
              @sell-player="handleSellPlayer"
              @cancel-auction="handleCancelAuction"
            />
          </div>
        </div>
      </section>

      <hr class="my-8 border-t-2 border-gray-200" />

      <!-- Lower Section: Team Roster Management -->
      <section>
        <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">Team Rosters</h2>
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div v-for="team in state.teams" :key="team.id">
            <FantasyTeamCard
              :team="team"
              size="full"
              :is-admin-view="true"
              @remove-player="handleRemovePlayer"
            />
          </div>
        </div>
      </section>
    </div>
    <div v-else class="text-center p-20">
      <h2 class="text-2xl font-semibold text-gray-600">Loading Dashboard...</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import AuctionStatus from '@/components/auction/AuctionStatus.vue'
import AuctionControls from '@/components/commissioner/AuctionControls.vue'
import FantasyTeamCard from '@/components/auction/FantasyTeamCard.vue'
import {
  fetchCommissionerState,
  startAuctionApi,
  placeBidApi,
  sellPlayerApi,
  cancelAuctionApi,
  removePlayerApi
} from '@/api/commissioner.api'
import type { Player, FantasyTeam } from '@/types'
import type { CommissionerState } from '@/types/commissioner.interface'

export default defineComponent({
  name: 'CommissionerView',
  components: {
    AuctionStatus,
    AuctionControls,
    FantasyTeamCard,
    Toast
  },
  setup() {
    const toast = useToast()
    return { toast }
  },
  data() {
    return {
      isLoading: true,
      state: {
        currentAuction: null,
        teams: []
      } as CommissionerState
    }
  },
  computed: {
    leadingTeam(): FantasyTeam | undefined {
      const leadingId = this.state.currentAuction?.leadingTeamId
      if (!leadingId) return undefined
      return this.state.teams.find((team) => team.id === leadingId)
    }
  },
  methods: {
    async handleStartAuction(player: Player) {
      this.state = await startAuctionApi(player)
    },
    async handleCancelAuction() {
      this.state = await cancelAuctionApi()
    },
    async handlePlaceBid({ teamId, amount }: { teamId: number; amount: number }) {
      this.state = await placeBidApi(teamId, amount)
    },
    async handleSellPlayer() {
      const team = this.leadingTeam
      const player = this.state.currentAuction?.player
      if (team && player) {
        this.state = await sellPlayerApi()
      }
    },
    async handleRemovePlayer({ teamId, playerId }: { teamId: number; playerId: number }) {
      const playerToRemove = this.state.teams
        .flatMap((t) => t.roster)
        .find((p) => p.id === playerId)

      this.state = await removePlayerApi(teamId, playerId)

      if (playerToRemove) {
        this.toast.add({
          severity: 'success',
          summary: 'Player Removed',
          detail: `${playerToRemove.name} has been successfully removed.`,
          life: 3000
        })
      }
    }
  },
  async mounted() {
    try {
      this.state = await fetchCommissionerState()
    } catch (error) {
      console.error('Failed to load commissioner dashboard:', error)
    } finally {
      this.isLoading = false
    }
  }
})
</script>

