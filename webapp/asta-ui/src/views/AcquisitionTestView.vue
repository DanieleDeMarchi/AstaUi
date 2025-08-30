<template>
  <div class="min-h-screen bg-gray-900 text-white p-8 flex flex-col">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold">Acquisitions Tracker</h1>
      <p class="text-gray-400 mt-2">Simulates players being sold and added to the feed.</p>
    </div>

    <div class="w-full max-w-6xl mx-auto text-center mb-8">
      <button 
        @click="addAcquisition"
        class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Simulate New Player Sale
      </button>
    </div>
    
    <!-- The Carousel Component -->
    <div class="mt-auto">
       <h2 class="text-lg font-semibold text-gray-300 mb-2 pl-2">LATEST ACQUISITIONS (Last 20)</h2>
       <AcquisitionsCarousel :acquisitions="latestAcquisitions" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AcquisitionsCarousel from '@/components/auction/AcquisitionCarousel.vue'
import type { Acquisition } from '@/types/misc.interface'
import type { PlayerRole } from '@/types/team.interface'

// Mock Data for Simulation
const MOCK_PLAYERS = [
  { name: 'Nikola Jokic', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png', role: 'C' as PlayerRole },
  { name: 'Stephen Curry', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png', role: 'G' as PlayerRole },
  { name: 'LeBron James', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png', role: 'F' as PlayerRole },
  { name: 'Kevin Durant', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png', role: 'F' as PlayerRole },
  { name: 'Giannis Antetokounmpo', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png', role: 'F' as PlayerRole },
  { name: 'Luka Doncic', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png', role: 'G' as PlayerRole },
  { name: 'Joel Embiid', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203954.png', role: 'C' as PlayerRole },
];

const MOCK_TEAMS = [
  { name: 'Thunder Warriors', coachPhotoUrl: 'https://i.pravatar.cc/150?u=1' },
  { name: 'Cosmic Comets', coachPhotoUrl: 'https://i.pravatar.cc/150?u=2' },
  { name: 'Galaxy Guardians', coachPhotoUrl: 'https://i.pravatar.cc/150?u=3' },
  { name: 'Vortex Vipers', coachPhotoUrl: 'https://i.pravatar.cc/150?u=4' },
];

export default defineComponent({
  name: 'AcquisitionsTestView',
  components: {
    AcquisitionsCarousel
  },
  data() {
    return {
      latestAcquisitions: [] as Acquisition[]
    }
  },
  methods: {
    addAcquisition() {
      // Pick random player and team
      const player = MOCK_PLAYERS[Math.floor(Math.random() * MOCK_PLAYERS.length)];
      const team = MOCK_TEAMS[Math.floor(Math.random() * MOCK_TEAMS.length)];
      
      const newAcquisition: Acquisition = {
        id: new Date().getTime().toString(), // Unique ID
        player: player,
        team: team,
        price: Math.floor(Math.random() * 80) + 1 // Random price from 1 to 80
      };
      
      // Add the new acquisition to the beginning of the array
      this.latestAcquisitions.unshift(newAcquisition);

      // Keep only the last 20 acquisitions
      if (this.latestAcquisitions.length > 20) {
        this.latestAcquisitions.pop();
      }
    }
  },
  mounted() {
    // Add a few initial acquisitions to start with
    this.addAcquisition();
    this.addAcquisition();
    this.addAcquisition();
    this.addAcquisition();
  }
})
</script>

