<template>
  <div class="w-full h-full bg-gray-800 rounded-lg shadow-lg flex flex-col justify-center p-2">
    <div class="p-4 text-center">
      <img
        :src="player.photoUrl"
        :alt="player.name"
        class="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white bg-gray-300"
      />
    </div>

    <div class="text-center space-y-4 mt-2 pb-6">
      <!-- Player Name -->
      <h2 class="text-2xl font-bold text-white">{{ player.name }}</h2>

      <!-- Team Info -->
      <div class="flex items-center justify-center space-x-3">
        <img :src="getTeamLogo(player.nbaTeam)" :alt="player.nbaTeam" class="w-8 h-8" />
        <span class="text-lg font-medium text-gray-100">{{ player.nbaTeam }}</span>
        <Badge :value="player.position" class="ml-2" severity="info" />
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-4 bg-gray-50 rounded-lg gap-2 mx-4">
        <div class="text-center p-1">
          <div class="text-2xl font-bold text-blue-600">{{ player.stats.gamesPlayed }}</div>
          <div class="text-sm text-gray-500">Games</div>
        </div>

        <div class="text-center p-1">
          <div class="text-2xl font-bold text-green-600">{{ player.stats.pointsPerGame }}</div>
          <div class="text-sm text-gray-500">PPG</div>
        </div>

        <div class="text-center p-1">
          <div class="text-2xl font-bold text-purple-600">
            {{ player.stats.reboundsPerGame }}
          </div>
          <div class="text-sm text-gray-500">RPG</div>
        </div>

        <div class="text-center p-1">
          <div class="text-2xl font-bold text-orange-600">
            {{ player.stats.assistsPerGame }}
          </div>
          <div class="text-sm text-gray-500">APG</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Badge from 'primevue/badge'
import type { Player } from '@/types'

export default defineComponent({
  name: 'NbaPlayerCard',
  components: {
    Badge
  },
  props: {
    player: {
      type: Object as () => Player,
      required: true
    }
  },
  methods: {
    getTeamLogo(teamName: string): string {
      // Mock team logo URLs - in real app this would be a proper mapping
      const teamLogos: Record<string, string> = {
        'Los Angeles Lakers': 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg',
        'Golden State Warriors': 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg',
        'Boston Celtics': 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg',
        'Miami Heat': 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg'
      }
      return teamLogos[teamName] || 'https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg'
    }
  }
})
</script>

