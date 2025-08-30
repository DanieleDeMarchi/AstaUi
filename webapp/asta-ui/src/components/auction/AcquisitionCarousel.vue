<template>
  <div class="w-full relative group bg-gray-800 rounded-lg p-2 shadow-inner">
    <div class="overflow-hidden">
      <TransitionGroup
        name="acquisition"
        tag="div"
        class="flex"
        :style="trackStyle"
        appear
      >
        <div
          v-for="acquisition in acquisitions"
          :key="acquisition.id"
          class="flex-shrink-0 px-2"
          :style="{ width: `${cardWidthPercentage}%` }"
        >
          <!-- Acquisition Card -->
          <div class="bg-gray-700 rounded-md p-2 h-full flex items-center space-x-3 text-white">
            <!-- Player Image -->
            <img 
              :src="acquisition.player.photoUrl" 
              :alt="acquisition.player.name" 
              class="w-12 h-12 rounded-full object-cover border-2 flex-shrink-0" 
              :class="roleColor(acquisition.player.role)"
            >
            
            <!-- Info Column -->
            <div class="flex flex-col h-full flex-grow min-w-0">
              <p class="font-bold text-base truncate">{{ acquisition.player.name }}</p>
              
              <div class="flex items-center space-x-1 text-green-400">
                <span class="font-semibold">{{ acquisition.price }}cr</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <p class="font-semibold text-gray-300 truncate">{{ acquisition.team.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- Manual Controls -->
    <template v-if="acquisitions.length > visibleCards">
      <button 
        @click="scrollPrevious"
        class="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-3 bg-gray-900 bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        @click="scrollNext"
        class="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-3 bg-gray-900 bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Acquisition } from '@/types/misc.interface'
import type { PlayerRole } from '@/types/team.interface'

export default defineComponent({
  name: 'AcquisitionsCarousel',
  props: {
    acquisitions: {
      type: Array as PropType<Acquisition[]>,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0,
      visibleCards: 4,
      resizeObserver: null as ResizeObserver | null
    }
  },
  computed: {
    cardWidthPercentage(): number {
      return 100 / this.visibleCards
    },
    trackStyle() {
      return {
        transition: 'transform 0.5s ease-in-out',
        transform: `translateX(-${this.currentIndex * this.cardWidthPercentage}%)`
      }
    }
  },

  watch: {
    acquisitions: {
      handler() {
        this.currentIndex = 0;
      },
      deep: true
    }
  },
  methods: {
    updateVisibleCards(width: number) {
      if (width < 400) {
        this.visibleCards = 1
      } else if (width < 800) {
        this.visibleCards = 2
      } else if (width < 1200) {
        this.visibleCards = 3
      } else if (width < 1600) {
        this.visibleCards = 4
      } else {
        this.visibleCards = 5
      }
    },
    scrollNext() {
      const maxIndex = this.acquisitions.length - this.visibleCards
      if (this.currentIndex < maxIndex) {
        this.currentIndex++
      }
    },
    scrollPrevious() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
    roleColor(role: PlayerRole): string {
      const colors: Record<PlayerRole, string> = {
        'G': 'border-green-400',
        'F': 'border-yellow-400',
        'C': 'border-red-400'
      }
      return colors[role]
    }
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(entries => {
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
  }
})
</script>

<style scoped>
/* Acquisition enter/leave transitions */
.acquisition-enter-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.acquisition-leave-active {
  transition: all 0.3s ease-out;
}

.acquisition-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.acquisition-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.acquisition-move {
  transition: transform 0.5s ease-in-out;
}
</style>