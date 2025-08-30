<template>
  <div class="w-full">
    <AutoComplete
      v-model="selectedPlayer"
      :suggestions="filteredPlayers"
      @complete="search"
      @item-select="onPlayerSelect"
      field="name"
      placeholder="Search for a player (e.g., 'LeBron')"
      class="w-full"
      :min-length=2
      input-class="w-full p-3 text-lg"
      panel-class="w-full md:w-1/2 lg:w-1/3"
    >
      <template #option="slotProps">
        <div class="flex items-center space-x-4">
          <!-- Player Image -->
          <img
            :src="slotProps.option.photoUrl"
            :alt="slotProps.option.name"
            class="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            @error="onImageError"
          />
          <div class="flex-grow">
            <!-- Player Name (First Row) -->
            <div class="text-lg font-bold text-gray-800">
              {{ slotProps.option.name }}
            </div>
            <!-- Position & Team (Second Row) -->
            <div class="flex items-center space-x-2 text-sm text-gray-500 mt-1">
              <span class="font-semibold">{{ slotProps.option.position }}</span>
              <span>|</span>
              <img
                :src="getTeamLogo(slotProps.option.nbaTeam)"
                :alt="slotProps.option.nbaTeam"
                class="w-5 h-5"
              />
              <span>{{ getTeamAbbreviation(slotProps.option.nbaTeam) }}</span>
            </div>
          </div>
        </div>
      </template>
    </AutoComplete>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AutoComplete from 'primevue/autocomplete'
import type { Player } from '@/types/player.interface'
import type { AutoCompleteCompleteEvent, AutoCompleteOptionSelectEvent } from 'primevue/autocomplete'

// A more extensive list for searching
const MOCK_PLAYERS: Player[] = [
  { id: 1, name: 'LeBron James', position: 'SF', nbaTeam: 'Los Angeles Lakers', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png', stats: { gamesPlayed: 71, pointsPerGame: 25.7, reboundsPerGame: 7.3, assistsPerGame: 7.3 } },
  { id: 2, name: 'Stephen Curry', position: 'PG', nbaTeam: 'Golden State Warriors', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png', stats: { gamesPlayed: 74, pointsPerGame: 26.4, reboundsPerGame: 4.5, assistsPerGame: 5.1 } },
  { id: 3, name: 'Nikola Jokic', position: 'C', nbaTeam: 'Denver Nuggets', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png', stats: { gamesPlayed: 79, pointsPerGame: 26.4, reboundsPerGame: 12.4, assistsPerGame: 9.0 } },
  { id: 4, name: 'Kevin Durant', position: 'PF', nbaTeam: 'Phoenix Suns', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png', stats: { gamesPlayed: 75, pointsPerGame: 27.1, reboundsPerGame: 6.6, assistsPerGame: 5.0 } },
  { id: 5, name: 'Giannis Antetokounmpo', position: 'PF', nbaTeam: 'Milwaukee Bucks', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png', stats: { gamesPlayed: 73, pointsPerGame: 30.4, reboundsPerGame: 11.5, assistsPerGame: 6.5 } },
  { id: 6, name: 'Jayson Tatum', position: 'SF', nbaTeam: 'Boston Celtics', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628369.png', stats: { gamesPlayed: 74, pointsPerGame: 26.9, reboundsPerGame: 8.1, assistsPerGame: 4.9 } },
  { id: 7, name: 'Luka Doncic', position: 'PG', nbaTeam: 'Dallas Mavericks', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png', stats: { gamesPlayed: 70, pointsPerGame: 33.9, reboundsPerGame: 9.2, assistsPerGame: 9.8 } },
  { id: 8, name: 'Joel Embiid', position: 'C', nbaTeam: 'Philadelphia 76ers', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203954.png', stats: { gamesPlayed: 39, pointsPerGame: 34.7, reboundsPerGame: 11.0, assistsPerGame: 5.6 } },
  { id: 9, name: 'Damian Lillard', position: 'PG', nbaTeam: 'Milwaukee Bucks', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203081.png', stats: { gamesPlayed: 73, pointsPerGame: 24.3, reboundsPerGame: 4.4, assistsPerGame: 7.0 } },
  { id: 10, name: 'Anthony Edwards', position: 'SG', nbaTeam: 'Minnesota Timberwolves', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1630162.png', stats: { gamesPlayed: 79, pointsPerGame: 25.9, reboundsPerGame: 5.4, assistsPerGame: 5.1 } },
  { id: 11, name: 'Shai Gilgeous-Alexander', position: 'PG', nbaTeam: 'Oklahoma City Thunder', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628983.png', stats: { gamesPlayed: 75, pointsPerGame: 30.1, reboundsPerGame: 5.5, assistsPerGame: 6.2 } },
  { id: 12, name: 'Victor Wembanyama', position: 'C', nbaTeam: 'San Antonio Spurs', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1641705.png', stats: { gamesPlayed: 71, pointsPerGame: 21.4, reboundsPerGame: 10.6, assistsPerGame: 3.9 } },
  { id: 13, name: 'Jaylen Brown', position: 'SG', nbaTeam: 'Boston Celtics', photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1627759.png', stats: { gamesPlayed: 70, pointsPerGame: 23.0, reboundsPerGame: 5.5, assistsPerGame: 3.6 } },
];

const TEAM_DATA: Record<string, { abbr: string; logo: string }> = {
  'Los Angeles Lakers': { abbr: 'LAL', logo: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg' },
  'Golden State Warriors': { abbr: 'GSW', logo: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg' },
  'Boston Celtics': { abbr: 'BOS', logo: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg' },
  'Denver Nuggets': { abbr: 'DEN', logo: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg' },
  'Phoenix Suns': { abbr: 'PHX', logo: 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg' },
  'Milwaukee Bucks': { abbr: 'MIL', logo: 'https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg' },
  'Dallas Mavericks': { abbr: 'DAL', logo: 'https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg' },
  'Philadelphia 76ers': { abbr: 'PHI', logo: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg' },
  'Minnesota Timberwolves': { abbr: 'MIN', logo: 'https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg' },
  'Oklahoma City Thunder': { abbr: 'OKC', logo: 'https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg' },
  'San Antonio Spurs': { abbr: 'SAS', logo: 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg' },
  // Fallback
  'Default': { abbr: 'NBA', logo: 'https://cdn.nba.com/logos/leagues/logo-nba.svg' }
};

export default defineComponent({
  name: 'PlayerSearch',
  components: {
    AutoComplete
  },
  emits: ['player-selected'],
  data() {
    return {
      selectedPlayer: null as Player | null | string,
      filteredPlayers: [] as Player[],
      allPlayers: MOCK_PLAYERS
    }
  },
  methods: {
    search(event: AutoCompleteCompleteEvent) {
      if (!event.query || event.query.length < 2) {
        this.filteredPlayers = []
        return
      }
      
      const query = event.query.toLowerCase()
      this.filteredPlayers = this.allPlayers
        .filter(player => player.name.toLowerCase().includes(query))
        .slice(0, 10)
    },
    onPlayerSelect(event: AutoCompleteOptionSelectEvent) {
      this.$emit('player-selected', event.value)
      // Clear the input and suggestions after selection for a cleaner UI
      this.selectedPlayer = null;
      this.filteredPlayers = [];
    },
    getTeamLogo(teamName: string): string {
      return TEAM_DATA[teamName]?.logo || TEAM_DATA['Default'].logo
    },
    getTeamAbbreviation(teamName: string): string {
      return TEAM_DATA[teamName]?.abbr || TEAM_DATA['Default'].abbr
    },
    onImageError(event: Event) {
      (event.target as HTMLImageElement).src = 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=N/A';
    }
  }
})
</script>