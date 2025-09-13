<template>
  <div class="w-full">
    <div class="space-y-6">
      <!-- Step 1: Player Selection -->
      <div class="space-y-3">
        <h3 class="font-semibold text-gray-800">1. Select Player</h3>
        <PlayerSearch @player-selected="handlePlayerSelected" />
      </div>

      <!-- Step 2: Staging & Status Area -->
      <div class="space-y-3">
        <!-- State 1: Auction is ACTIVE -->
        <div v-if="playerOnBlock" class="p-3 bg-red-50 rounded-lg flex items-center justify-between">
          <div>
            <p class="text-sm text-red-600">Auction in progress for:</p>
            <p class="font-bold text-lg text-red-800">{{ playerOnBlock.name }}</p>
          </div>
          <Button
            label="Cancel Auction"
            icon="pi pi-ban"
            severity="danger"
            @click="$emit('cancel-auction')"
          />
        </div>

        <!-- State 2: A player is STAGED -->
        <div v-else-if="stagedPlayer" class="p-3 bg-blue-50 rounded-lg flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Ready to start auction for:</p>
            <p class="font-bold text-lg text-blue-800">{{ stagedPlayer.name }}</p>
          </div>
          <div class="flex gap-2">
            <Button
              label="Cancel"
              icon="pi pi-times"
              severity="secondary"
              @click="stagedPlayer = null"
            />
            <Button
              label="Start Auction"
              icon="pi pi-play"
              severity="success"
              @click="handleStartAuctionClick"
            />
          </div>
        </div>
        
        <!-- State 3: IDLE -->
        <div v-else class="p-3 bg-gray-50 rounded-lg text-center">
          <div class="h-12">
            <p class="text-gray-500 ">Select a player to begin the auction process.</p>
          </div>
        </div>
      </div>

      <!-- Step 3: Bidding Controls (only active if a player is on block) -->
      <div :class="['space-y-3 border-t pt-3', { 'opacity-50 pointer-events-none': !playerOnBlock }]">
        <h3 class="font-semibold text-gray-800">3. Manage Bidding</h3>
        <div class="flex flex-col sm:flex-row gap-2">
          <Select
            v-model="selectedTeamId"
            :options="teams"
            optionLabel="name"
            optionValue="id"
            placeholder="Select a Team"
            class="w-full sm:flex-grow"
          />
          <span class="max-w-32">
            <InputNumber
              v-model="bidAmount"
              :min="minBid"
              suffix=" cr"
              :maxFractionDigits="0"
              placeholder="Bid Amount"
              :show-buttons="true"
              class="w-full"
              fluid
            />
          </span>
          <Button
            @click="handlePlaceBid"
            :disabled="!selectedTeamId || !bidAmount"
            class="w-full sm:w-20 whitespace-nowrap"
          >
            Bid
          </Button>
        </div>
      </div>

      <!-- Step 4: Sell Player -->
      <div :class="['space-y-3 border-t pt-6', { 'opacity-50 pointer-events-none': !playerOnBlock }]">
        <h3 class="font-semibold text-gray-800">4. Finalize Auction</h3>
        <p class="text-sm text-gray-600">
          Sells <span class="font-bold">{{ playerOnBlock?.name || 'the player' }}</span>
          to <span class="font-bold">{{ leadingTeamName || 'the leading team' }}</span>
          for <span class="font-bold">${{ currentBid }}</span>.
        </p>
        <Button
          label="Sell Player"
          icon="pi pi-check-circle"
          severity="success"
          @click="handleSellPlayer"
          :disabled="!leadingTeamId"
          class="w-full"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import PlayerSearch from '@/components/commissioner/PlayerSearch.vue'
import type { Player, FantasyTeam } from '@/types'

export default defineComponent({
  name: 'AuctionControls',
  components: {
    Select,
    InputNumber,
    Button,
    PlayerSearch
  },
  props: {
    teams: {
      type: Array as PropType<FantasyTeam[]>,
      required: true
    },
    playerOnBlock: {
      type: Object as PropType<Player | null>,
      default: null
    },
    currentBid: {
      type: Number,
      default: 0
    },
    leadingTeamId: {
      type: Number as PropType<number | null>,
      default: null
    }
  },
  emits: ['start-auction', 'place-bid', 'sell-player', 'cancel-auction'],
  data() {
    return {
      stagedPlayer: null as Player | null,
      selectedTeamId: null as number | null,
      bidAmount: 1
    }
  },
  computed: {
    minBid(): number {
      return this.currentBid + 1
    },
    leadingTeamName(): string | undefined {
      return this.teams.find((t) => t.id === this.leadingTeamId)?.name
    }
  },
  methods: {
    handlePlayerSelected(player: Player) {
      this.stagedPlayer = player
    },
    handleStartAuctionClick() {
      if (this.playerOnBlock) {
        alert('Warning: An auction is already in progress. Please sell or cancel the current player first.')
        return
      }
      if (this.stagedPlayer) {
        this.$emit('start-auction', this.stagedPlayer)
        this.stagedPlayer = null
      }
    },
    handlePlaceBid() {
      if (this.selectedTeamId && this.bidAmount) {
        this.$emit('place-bid', {
          teamId: this.selectedTeamId,
          amount: this.bidAmount
        })
      }
    },
    handleSellPlayer() {
      if (this.playerOnBlock && this.leadingTeamId && this.currentBid > 0) {
        this.$emit('sell-player')
      }
    }
  },
  watch: {
    minBid: {
      immediate: true,
      handler(newValue) {
        this.bidAmount = newValue
      }
    }
  }
})
</script>

