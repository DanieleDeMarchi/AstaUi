<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-4xl font-bold text-center mb-12">AstaUI - Components Catalog</h1>

    <!-- Auction Status Section -->
    <div class="mb-16">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">Auction Status</h2>
      <div class="max-w-4xl mx-auto">
        <AuctionStatus 
          :player="selectedPlayerForAuction"
          :current-bid="mockAuction.currentBid"
          :leading-team="mockAuction.leadingTeam"
        />
      </div>
    </div>

    <!-- Commissioner Controls Section -->
    <div class="mb-16">
       <h2 class="text-2xl font-semibold mb-6 text-gray-800">Commissioner Controls</h2>
       <div class="max-w-4xl mx-auto">
          <AuctionControls
            :player="selectedPlayerForAuction"
            :teams="mockTeams"
            :current-bid="mockAuction.currentBid"
            :leading-team="mockAuction.leadingTeam"
            @place-bid="handlePlaceBid"
            @sell-player="handleSellPlayer"
          />
       </div>
    </div>


    <!-- Player Search Section -->
    <div class="mb-16">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">Player Search</h2>
      <div class="max-w-xl mx-auto">
        <PlayerSearch @player-selected="handlePlayerSelected" />
      </div>
    </div>
    
    <!-- NBA Player Card Section -->
    <div class="mb-16">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">NBA Player Card (Example)</h2>
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
import PlayerSearch from '@/components/commissioner/PlayerSearch.vue'
import AuctionStatus from '@/components/auction/AuctionStatus.vue'
import AuctionControls from '@/components/commissioner/AuctionControls.vue'
import type { Player } from '@/types/player.interface'
import type { Team, TeamPlayer } from '@/types/team.interface'

export default defineComponent({
  name: 'TestView',
  components: {
    NbaPlayerCard,
    FantasyTeamCard,
    PlayerSearch,
    AuctionStatus,
    AuctionControls
  },
  data() {
    return {
      selectedPlayerForAuction: null as Player | null,
      mockAuction: {
        currentBid: 55,
        leadingTeam: {
          id: 2,
          name: 'The Annihilators',
          coachName: 'Jane Doe',
          coachPhotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
        } as Partial<Team>
      },
      mockPlayer: {
        id: 1,
        name: 'LeBron James',
        position: 'SF',
        nbaTeam: 'Los Angeles Lakers',
        photoUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png',
        stats: { gamesPlayed: 71, pointsPerGame: 25.7, reboundsPerGame: 7.3, assistsPerGame: 7.3 }
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
      } as Team,
      mockTeams: [
        {
          id: 1,
          name: 'Thunder Warriors',
          coachName: 'Marco Rossi',
          coachPhotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
          totalCredits: 350,
          roster: []
        },
        {
          id: 2,
          name: 'The Annihilators',
          coachName: 'Jane Doe',
          coachPhotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
          totalCredits: 350,
          roster: []
        },
        {
          id: 3,
          name: 'Dream Team',
          coachName: 'Sam Wilson',
          coachPhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
          totalCredits: 350,
          roster: []
        }
      ] as Team[],
    }
  },
  methods: {
    handlePlayerSelected(player: Player) {
      console.log('Player selected for auction:', player)
      this.selectedPlayerForAuction = player
      this.mockAuction.currentBid = 0
      this.mockAuction.leadingTeam = null
    },
    handlePlaceBid({ teamId, amount }: { teamId: number, amount: number }) {
      const team = this.mockTeams.find(t => t.id === teamId)
      if (team) {
        this.mockAuction.leadingTeam = team
        this.mockAuction.currentBid = amount
        console.log(`Bid placed: ${amount} by ${team.name}`)
      }
    },
    handleSellPlayer({ player, team, amount }: { player: Player, team: Team, amount: number }) {
      console.log(`SOLD: ${player.name} to ${team.name} for ${amount}`)
      
      const winningTeam = this.mockTeams.find(t => t.id === team.id)
      if (winningTeam) {
        // This is a simplified mapping. A real app would need a role.
        const newPlayer: TeamPlayer = {
          id: player.id,
          name: player.name,
          nbaTeam: player.nbaTeam.split(' ').pop() || '',
          role: 'F', // Needs to be determined properly
          price: amount,
          isReserve: false
        }
        winningTeam.roster.push(newPlayer)
      }
      
      // Reset auction state
      this.selectedPlayerForAuction = null
      this.mockAuction.currentBid = 0
      this.mockAuction.leadingTeam = null
    }
  }
})
</script>
