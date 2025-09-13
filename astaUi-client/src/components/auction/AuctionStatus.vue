<template>
  <Card
    class="h-full"
    :pt="{
      root: { class: 'flex flex-col h-full overflow-hidden' },
      body: { class: 'flex-grow flex flex-col !p-0' },
      content: { class: 'flex-grow flex items-center' }
    }"
  >
    <template #title>
      <div class="text-center text-2xl font-bold text-gray-800 p-4 bg-gray-50 border-b">
        ON THE BLOCK
      </div>
    </template>
    <template #content>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-1 h-full w-full">
        <!-- Left Side: Player Card -->
        <div v-if="player" class="h-full">
          <NbaPlayerCard :player="player" />
        </div>
        <div v-else class="flex items-center justify-center h-full bg-gray-100 rounded-lg min-h-[300px]">
          <p class="text-gray-500 text-xl">Waiting for player selection...</p>
        </div>

        <!-- Right Side: Bidding Info -->
        <div class="space-y-6 text-center">
          <div v-if="player">
            <!-- Current Bid -->
            <div>
              <p class="text-lg text-gray-600 mb-1">Current Bid</p>
              <div class="text-6xl font-bold text-green-600 tracking-tight">
                ${{ currentBid }}
              </div>
            </div>

            <!-- Leading Team -->
            <div>
              <p class="text-lg text-gray-600 mb-2">Leading Team</p>
              <div
                v-if="leadingTeam"
                class="inline-flex items-center space-x-3 bg-gray-100 p-3 rounded-lg"
              >
                <img
                  :src="leadingTeam.coachPhotoUrl"
                  :alt="leadingTeam.coachName"
                  class="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                />
                <span class="text-2xl font-semibold text-gray-800">{{ leadingTeam.name }}</span>
              </div>
              <div v-else class="text-2xl font-semibold text-gray-500">No bids yet</div>
            </div>
          </div>
          <div v-else>
            <p class="text-gray-500 text-lg">Select a player to start the auction.</p>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Card from 'primevue/card'
import NbaPlayerCard from '@/components/auction/NbaPlayerCard.vue'
import type { Player, FantasyTeam } from '@/types'

export default defineComponent({
  name: 'AuctionStatus',
  components: {
    Card,
    NbaPlayerCard
  },
  props: {
    player: {
      type: Object as PropType<Player | null>,
      default: null
    },
    currentBid: {
      type: Number,
      default: 0
    },
    leadingTeam: {
      type: Object as PropType<FantasyTeam | null>,
      default: null
    }
  }
})
</script>

