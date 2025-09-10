<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-8">
    <Toast />
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">Commissioner Control Panel</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div v-for="team in teams" :key="team.id">
          <FantasyTeamCard 
            :team="team"
            :is-admin-view="true"
            size="full"
            @remove-player="handleRemovePlayer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import FantasyTeamCard from '@/components/auction/FantasyTeamCard.vue';
import { MOCK_TEAMS_DATA } from '@/api/mock-teams'; // Using mock data
import type { FantasyTeam } from '@/types';

export default defineComponent({
  name: 'ControlPanelView',
  components: {
    FantasyTeamCard,
    Toast
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      teams: [] as FantasyTeam[]
    };
  },
  created() {
    // In a real app, this would be an API call. We deep copy to allow modification.
    this.teams = JSON.parse(JSON.stringify(MOCK_TEAMS_DATA)); 
  },
  methods: {
    handleRemovePlayer({ teamId, playerId }: { teamId: number, playerId: number }) {
      const team = this.teams.find(t => t.id === teamId);
      if (team) {
        const playerIndex = team.roster.findIndex(p => p.id === playerId);
        if (playerIndex > -1) {
          const removedPlayer = team.roster[playerIndex];
          team.roster.splice(playerIndex, 1);
          
          this.toast.add({ 
            severity: 'success', 
            summary: 'Player Removed', 
            detail: `${removedPlayer.name} has been removed from ${team.name}.`, 
            life: 3000 
          });
        }
      }
    }
  }
});
</script>

