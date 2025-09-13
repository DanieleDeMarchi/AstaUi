<template>
  <div class="w-full relative group">
    <div class="overflow-hidden">
      <div
        ref="track"
        class="flex"
        :style="trackStyle"
        @transitionend="handleTransitionEnd"
      >
        <!-- Duplicate the teams array to create a seamless loop -->
        <div
          v-for="(team, index) in teams.concat(teams)"
          :key="`single-${index}`"
          class="flex-shrink-0 px-2 transition-all duration-500"
          :style="{ width: `${cardWidthPercentage}%` }"
        >
          <FantasyTeamCard :team="team" size="compact" />
        </div>
      </div>
    </div>

    <!-- Manual Controls -->
    <template v-if="teams.length > visibleCards">
      <button
        @click="scrollPrevious"
        class="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 bg-gray-800 bg-opacity-50 text-white rounded-full w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-300 z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        @click="scrollNext"
        class="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 bg-gray-800 bg-opacity-50 text-white rounded-full w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:-translate-x-4 transition-all duration-300 z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import FantasyTeamCard from '@/components/auction/FantasyTeamCard.vue'
import type { FantasyTeam } from '@/types'

export default defineComponent({
  name: 'FantasyTeamCarousel',
  components: {
    FantasyTeamCard
  },
  props: {
    teams: {
      // Corrected: Use the FantasyTeam type
      type: Array as PropType<FantasyTeam[]>,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0,
      intervalId: null as number | null,
      isJumping: false,
      visibleCards: 6,
      resizeObserver: null as ResizeObserver | null
    }
  },
  computed: {
    cardWidthPercentage(): number {
      return 100 / this.visibleCards
    },
    trackStyle() {
      return {
        transition: this.isJumping ? 'none' : 'transform 1s ease-in-out',
        transform: `translateX(-${this.currentIndex * this.cardWidthPercentage}%)`
      }
    }
  },
  methods: {
    updateVisibleCards(width: number) {
      if (width < 250) {
        // Mobile
        this.visibleCards = 1
      } else if (width < 500) {
        // Small tablets
        this.visibleCards = 2
      } else if (width < 750) {
        // Tablets
        this.visibleCards = 3
      } else if (width < 1000) {
        // Small desktops
        this.visibleCards = 4
      } else if (width < 1250) {
        // Small desktops
        this.visibleCards = 5
      } else {
        // Large desktops
        this.visibleCards = 6
      }
      this.resetTimer()
    },
    resetTimer() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
      }
      if (this.teams.length > this.visibleCards) {
        this.startCarousel()
      }
    },
    startCarousel() {
      this.intervalId = window.setInterval(() => {
        this.currentIndex++
      }, 5000)
    },
    scrollNext() {
      this.currentIndex++
      this.resetTimer()
    },
    scrollPrevious() {
      if (this.currentIndex === 0) {
        this.isJumping = true
        this.currentIndex = this.teams.length
        setTimeout(() => {
          this.isJumping = false
          this.currentIndex--
        }, 50)
      } else {
        this.currentIndex--
      }
      this.resetTimer()
    },
    handleTransitionEnd() {
      if (this.currentIndex >= this.teams.length) {
        this.isJumping = true
        this.currentIndex = 0
        setTimeout(() => {
          this.isJumping = false
        }, 50)
      }
    }
  },
  mounted() {
    this.resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const width = entries[0].contentRect.width
        this.updateVisibleCards(width)
      }
    })
    this.resizeObserver.observe(this.$el)
  },
  beforeUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }
})
</script>
