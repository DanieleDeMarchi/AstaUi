<template>
  <div class="min-h-screen bg-gray-900 text-white p-8">
    <div>
      <h1 class="text-4xl font-bold text-center mb-4">AstaUI - Team Carousel</h1>
      <h2 class="text-2xl font-semibold text-center mb-8 text-gray-400">Responsive Layout</h2>
      <p class="text-center text-gray-500 mb-8">Resize your browser window to see the number of cards change.</p>
      <FantasyTeamCarousel :teams="mockTeams" class="max-w-[1500px]" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FantasyTeamCarousel from '@/components/auction/FantasyTeamCarousel.vue'
import type { Team } from '@/types/team.interface'

// Helper function to generate mock teams
const generateMockTeams = (count: number): Team[] => {
  const teams: Team[] = [];
  const teamNames = [
    'Thunder Warriors', 'Cosmic Comets', 'Galaxy Guardians', 'Vortex Vipers', 'Phoenix Phantoms', 
    'Shadow Strikers', 'Titan Titans', 'Rogue Raptors', 'Blaze Dragons', 'Ice Giants'
  ];
  const coachNames = [
    'Marco Rossi', 'Luca Bianchi', 'Giulia Verdi', 'Sofia Neri', 'Alessandro Russo',
    'Chiara Romano', 'Davide Gallo', 'Sara Conti', 'Matteo Greco', 'Elena Moretti'
  ];

  for (let i = 1; i <= count; i++) {
    teams.push({
      id: i,
      name: teamNames[i % teamNames.length],
      coachName: coachNames[i % coachNames.length],
      coachPhotoUrl: `https://i.pravatar.cc/150?u=${i}`,
      totalCredits: 350,
      roster: [
        { id: 1, name: 'LeBron James', nbaTeam: 'LAL', role: 'F', price: Math.floor(Math.random() * 20) + 60, isReserve: false },
        { id: 2, name: 'Stephen Curry', nbaTeam: 'GSW', role: 'G', price: Math.floor(Math.random() * 20) + 60, isReserve: false },
        { id: 3, name: 'Nikola Jokic', nbaTeam: 'DEN', role: 'C', price: Math.floor(Math.random() * 20) + 65, isReserve: false }
      ]
    });
  }
  return teams;
};


export default defineComponent({
  name: 'CarouselTestView',
  components: {
    FantasyTeamCarousel
  },
  data() {
    return {
      mockTeams: generateMockTeams(10) as Team[]
    }
  }
})
</script>

