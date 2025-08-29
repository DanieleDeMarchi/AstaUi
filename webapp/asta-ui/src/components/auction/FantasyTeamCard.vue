<template>
  <Card class="w-full bg-white shadow-lg">
    <!-- Header with coach and team info -->
    <template #header>
      <div class="flex items-center justify-between p-4 bg-gray-50">
        <div class="flex items-center space-x-4">
          <img 
            :src="team.coachPhotoUrl" 
            :alt="team.coachName"
            class="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <h3 class="text-xl font-bold text-gray-800">{{ team.name }}</h3>
            <p class="text-gray-600">Coach: {{ team.coachName }}</p>
          </div>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-green-600">{{ creditsLeft }}</div>
          <div class="text-sm text-gray-500">Credits Left</div>
        </div>
      </div>
    </template>

    <template #content>
      <!-- Roster Table -->
      <div class="overflow-hidden">
        <table class="w-full">
          <thead>
            <tr class="border-b-2 border-gray-200">
              <th class="text-left py-2 px-4 font-semibold text-gray-700">Role</th>
              <th class="text-left py-2 px-4 font-semibold text-gray-700">Player</th>
              <th class="text-left py-2 px-4 font-semibold text-gray-700">Team</th>
              <th class="text-right py-2 px-4 font-semibold text-gray-700">Price</th>
            </tr>
          </thead>
          <tbody>
            <!-- Guard Slots -->
            <tr 
              v-for="(slot, index) in rosterSlots.filter(s => s.role === 'G' && !s.isReserve)" 
              :key="`G-${index}`"
              class="bg-green-50 border-b border-green-100"
            >
              <td class="py-3 px-4">
                <Badge value="G" severity="success" class="bg-green-200 text-green-800" />
              </td>
              <td class="py-3 px-4 font-medium">{{ slot.player?.name || '-' }}</td>
              <td class="py-3 px-4">{{ slot.player?.nbaTeam || '-' }}</td>
              <td class="py-3 px-4 text-right font-semibold">{{ slot.player?.price || '-' }}</td>
            </tr>

            <!-- Forward Slots -->
            <tr 
              v-for="(slot, index) in rosterSlots.filter(s => s.role === 'F' && !s.isReserve)" 
              :key="`F-${index}`"
              class="bg-yellow-50 border-b border-yellow-100"
            >
              <td class="py-3 px-4">
                <Badge value="F" severity="warning" class="bg-yellow-200 text-yellow-800" />
              </td>
              <td class="py-3 px-4 font-medium">{{ slot.player?.name || '-' }}</td>
              <td class="py-3 px-4">{{ slot.player?.nbaTeam || '-' }}</td>
              <td class="py-3 px-4 text-right font-semibold">{{ slot.player?.price || '-' }}</td>
            </tr>

            <!-- Center Slots -->
            <tr 
              v-for="(slot, index) in rosterSlots.filter(s => s.role === 'C' && !s.isReserve)" 
              :key="`C-${index}`"
              class="bg-red-50 border-b border-red-100"
            >
              <td class="py-3 px-4">
                <Badge value="C" severity="danger" class="bg-red-200 text-red-800" />
              </td>
              <td class="py-3 px-4 font-medium">{{ slot.player?.name || '-' }}</td>
              <td class="py-3 px-4">{{ slot.player?.nbaTeam || '-' }}</td>
              <td class="py-3 px-4 text-right font-semibold">{{ slot.player?.price || '-' }}</td>
            </tr>

            <!-- Reserve Slots -->
            <tr 
              v-for="(slot, index) in rosterSlots.filter(s => s.isReserve)" 
              :key="`R-${index}`"
              class="bg-purple-50 border-b border-purple-100"
            >
              <td class="py-3 px-4">
                <Badge :value="slot.role" class="bg-purple-200 text-purple-800" />
              </td>
              <td class="py-3 px-4 font-medium">{{ slot.player?.name || '-' }}</td>
              <td class="py-3 px-4">{{ slot.player?.nbaTeam || '-' }}</td>
              <td class="py-3 px-4 text-right font-semibold">{{ slot.player?.price || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from 'primevue/card'
import Badge from 'primevue/badge'
import type { Team, RosterSlot, PlayerRole } from '@/types/team.interface'

export default defineComponent({
  name: 'FantasyTeamCard',
  components: {
    Card,
    Badge
  },
  props: {
    team: {
      type: Object as () => Team,
      required: true
    }
  },
  computed: {
    creditsLeft(): number {
      const spentCredits = this.team.roster.reduce((total, player) => total + player.price, 0)
      return this.team.totalCredits - spentCredits
    },
    rosterSlots(): RosterSlot[] {
      const slots: RosterSlot[] = []
      
      // Create 4 Guard slots
      for (let i = 0; i < 4; i++) {
        const player = this.team.roster.find(p => p.role === 'G' && !p.isReserve && 
          this.team.roster.filter(pl => pl.role === 'G' && !pl.isReserve).indexOf(p) === i)
        slots.push({ role: 'G', isReserve: false, player })
      }
      
      // Create 4 Forward slots
      for (let i = 0; i < 4; i++) {
        const player = this.team.roster.find(p => p.role === 'F' && !p.isReserve && 
          this.team.roster.filter(pl => pl.role === 'F' && !pl.isReserve).indexOf(p) === i)
        slots.push({ role: 'F', isReserve: false, player })
      }
      
      // Create 2 Center slots
      for (let i = 0; i < 2; i++) {
        const player = this.team.roster.find(p => p.role === 'C' && !p.isReserve && 
          this.team.roster.filter(pl => pl.role === 'C' && !pl.isReserve).indexOf(p) === i)
        slots.push({ role: 'C', isReserve: false, player })
      }
      
      // Create 3 Reserve slots (1 for each role)
      const roles: PlayerRole[] = ['G', 'F', 'C']
      roles.forEach(role => {
        const player = this.team.roster.find(p => p.role === role && p.isReserve)
        slots.push({ role, isReserve: true, player })
      })
      
      return slots
    }
  }
})
</script>