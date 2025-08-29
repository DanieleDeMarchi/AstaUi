<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-4xl font-bold text-center mb-12">AstaUI - Components Catalog</h1>
    
    <!-- NBA Player Card Section -->
    <div class="mb-16">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">NBA Player Card</h2>
      <div class="max-w-md mx-auto">
        <NbaPlayerCard :player="mockPlayer" />
      </div>
    </div>
    
    <!-- Fantasy Team Card Section -->
    <div class="mb-16">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">Fantasy Team Card</h2>
      <div class="max-w-2xl mx-auto">
        <FantasyTeamCard :team="mockTeam" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NbaPlayerCard from '@/components/auction/NbaPlayerCard.vue'
import FantasyTeamCard from '@/components/auction/FantasyTeamCard.vue'
import type { Player } from '@/types/player.interface'
import type { Team } from '@/types/team.interface'

export default defineComponent({
  name: 'TestView',
  components: {
    NbaPlayerCard,
    FantasyTeamCard
  },
  data() {
    return {
      mockPlayer: {
        id: 1,
        name: 'LeBron James',
        position: 'SF',
        nbaTeam: 'Los Angeles Lakers',
        photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png',
        stats: {
          gamesPlayed: 71,
          pointsPerGame: 25.7,
          reboundsPerGame: 7.3,
          assistsPerGame: 7.3
        }
      } as Player,
      mockTeam: {
        id: 1,
        name: 'Thunder Warriors',
        coachName: 'Marco Rossi',
        coachPhotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        totalCredits: 350,
        roster: [
          {
            id: 1,
            name: 'LeBron James',
            nbaTeam: 'LAL',
            role: 'F',
            price: 75,
            isReserve: false
          },
          {
            id: 2,
            name: 'Stephen Curry',
            nbaTeam: 'GSW',
            role: 'G',
            price: 80,
            isReserve: false
          },
          {
            id: 3,
            name: 'Nikola Jokic',
            nbaTeam: 'DEN',
            role: 'C',
            price: 85,
            isReserve: false
          },
          {
            id: 4,
            name: 'Jayson Tatum',
            nbaTeam: 'BOS',
            role: 'F',
            price: 65,
            isReserve: false
          },
          {
            id: 5,
            name: 'Damian Lillard',
            nbaTeam: 'MIL',
            role: 'G',
            price: 55,
            isReserve: false
          },
          {
            id: 6,
            name: 'Tyler Herro',
            nbaTeam: 'MIA',
            role: 'G',
            price: 25,
            isReserve: true
          }
        ]
      } as Team
    }
  }
})
</script>