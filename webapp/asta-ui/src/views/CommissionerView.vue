<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-6">
    <div class="max-w-screen-2xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-6 text-gray-800">Commissioner Dashboard</h1>

      <!-- Upper Section: Live Auction Controls -->
      <section class="mb-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Left Side: Auction Status -->
          <div class="">
            <AuctionStatus
              :player="mockAuction.player"
              :current-bid="mockAuction.currentBid"
              :leading-team="leadingTeam"
            />
          </div>

          <!-- Right Side: Auction Controls -->
          <div class="bg-white p-4 rounded-lg shadow-md">
            <h2 class="text-2xl font-semibold text-gray-700 mb-4 text-center">Controls</h2>
            <AuctionControls
              :teams="mockTeams"
              :player-on-block="mockAuction.player"
              :current-bid="mockAuction.currentBid"
              :leading-team-id="mockAuction.leadingTeamId"
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
          <div v-for="team in mockTeams" :key="team.id">
            <FantasyTeamCard :team="team" size="full" :is-admin-view="true" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuctionStatus from '@/components/auction/AuctionStatus.vue'
import AuctionControls from '@/components/commissioner/AuctionControls.vue'
import FantasyTeamCard from '@/components/auction/FantasyTeamCard.vue'
import { MOCK_TEAMS_DATA } from '@/api/mock-teams'
import type { Player, FantasyTeam } from '@/types'

export default defineComponent({
  name: 'CommissionerView',
  components: {
    AuctionStatus,
    AuctionControls,
    FantasyTeamCard
  },
  data() {
    return {
      mockTeams: MOCK_TEAMS_DATA,
      mockAuction: {
        player: null as Player | null,
        currentBid: 0,
        leadingTeamId: null as number | null
      }
    }
  },
  computed: {
    leadingTeam(): FantasyTeam | undefined {
      if (!this.mockAuction.leadingTeamId) return undefined
      return this.mockTeams.find((team) => team.id === this.mockAuction.leadingTeamId)
    }
  },
  methods: {
    handleStartAuction(player: Player) {
      console.log('COMMISSIONER VIEW: Start auction for', player)
      this.mockAuction.player = player
      this.mockAuction.currentBid = 0
      this.mockAuction.leadingTeamId = null
    },
    handleCancelAuction() {
      console.log('COMMISSIONER VIEW: Cancel auction')
      this.mockAuction.player = null
      this.mockAuction.currentBid = 0
      this.mockAuction.leadingTeamId = null
    },
    handlePlaceBid({ teamId, amount }: { teamId: number; amount: number }) {
      console.log(`COMMISSIONER VIEW: Bid of ${amount} for team ${teamId}`)
      this.mockAuction.leadingTeamId = teamId
      this.mockAuction.currentBid = amount
    },
    handleSellPlayer() {
      console.log('COMMISSIONER VIEW: Sell player')
      const team = this.leadingTeam
      const player = this.mockAuction.player
      if (team && player) {
        const soldPlayer = { ...player, price: this.mockAuction.currentBid, fantasyTeamId: team.id }
        team.roster.push(soldPlayer)
      }
      this.mockAuction.player = null
      this.mockAuction.currentBid = 0
      this.mockAuction.leadingTeamId = null
    }
  }
})
</script>

