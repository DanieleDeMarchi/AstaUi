<template>
  <Card class="w-full bg-white shadow-lg">
    <template #title>
      <div class="text-center font-bold text-gray-700 p-3 bg-gray-100 border-b">
        Commissioner Controls
      </div>
    </template>
    <template #content>
      <div :class="['p-4 space-y-6', { 'opacity-50 pointer-events-none': !isAuctionActive }]">
        <!-- Place Bid Section -->
        <div class="space-y-3">
          <h3 class="font-semibold text-lg text-gray-800">Place Bid</h3>
          <div class="flex flex-col sm:flex-row gap-4">
            <Dropdown
              v-model="selectedTeamId"
              :options="teams"
              optionLabel="name"
              optionValue="id"
              placeholder="Select a Team"
              class="w-full sm:flex-grow"
            />
            <InputNumber
              v-model="bidAmount"
              :min="minBid"
              mode="currency"
              currency="USD"
              locale="en-US"
              :maxFractionDigits="0"
              placeholder="Bid Amount"
              class="w-full sm:w-48"
            />
            <Button
              label="Place Bid"
              icon="pi pi-gavel"
              @click="handlePlaceBid"
              :disabled="!selectedTeamId || !bidAmount"
              class="w-full sm:w-auto"
            />
          </div>
        </div>

        <!-- Sell Player Section -->
        <div class="space-y-3 border-t pt-6">
          <h3 class="font-semibold text-lg text-gray-800">Finalize Auction</h3>
          <p class="text-sm text-gray-600">
            Sells <span class="font-bold">{{ player?.name || 'the current player' }}</span> 
            to <span class="font-bold">{{ leadingTeam?.name || 'the leading team' }}</span>
            for <span class="font-bold">${{ currentBid }}</span>.
          </p>
          <Button
            label="Sell Player"
            icon="pi pi-check-circle"
            severity="success"
            @click="handleSellPlayer"
            :disabled="!leadingTeam"
            class="w-full"
          />
        </div>
      </div>
       <div v-if="!isAuctionActive" class="text-center text-gray-500 py-8">
          Select a player to activate controls.
        </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Card from 'primevue/card'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import type { Player } from '@/types/player.interface'
import type { Team } from '@/types/team.interface'

export default defineComponent({
  name: 'AuctionControls',
  components: {
    Card,
    Dropdown,
    InputNumber,
    Button
  },
  props: {
    player: {
      type: Object as PropType<Player | null>,
      default: null
    },
    teams: {
      type: Array as PropType<Team[]>,
      required: true
    },
    currentBid: {
      type: Number,
      default: 0
    },
    leadingTeam: {
      type: Object as PropType<Team | null>,
      default: null
    }
  },
  emits: ['place-bid', 'sell-player'],
  data() {
    return {
      selectedTeamId: null as number | null,
      bidAmount: 1
    }
  },
  computed: {
    isAuctionActive(): boolean {
      return !!this.player
    },
    minBid(): number {
      return this.currentBid + 1
    }
  },
  methods: {
    handlePlaceBid() {
      if (this.selectedTeamId && this.bidAmount) {
        this.$emit('place-bid', {
          teamId: this.selectedTeamId,
          amount: this.bidAmount
        })
      }
    },
    handleSellPlayer() {
      if (this.player && this.leadingTeam && this.currentBid > 0) {
        this.$emit('sell-player', {
          player: this.player,
          team: this.leadingTeam,
          amount: this.currentBid
        })
      }
    }
  },
  watch: {
    minBid(newValue) {
      this.bidAmount = newValue
    }
  }
})
</script>
