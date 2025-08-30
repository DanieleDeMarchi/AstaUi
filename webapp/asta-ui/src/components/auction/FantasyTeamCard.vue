<template>
  <!-- Full Size Layout -->
  <template v-if="size === 'full'">
    <Card class="w-full bg-white shadow-lg h-full flex flex-col"
    pt:root:class="overflow-hidden"
    pt:body:class="!p-0">
      <!-- Header with coach and team info -->
      <template #header>
        <div class="flex items-center justify-between p-4">
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
                  <span :class="getRoleIndicatorClasses(slot)" class="px-2 py-1 text-xs font-bold rounded-full">{{ slot.role }}</span>
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
                   <span :class="getRoleIndicatorClasses(slot)" class="px-2 py-1 text-xs font-bold rounded-full">{{ slot.role }}</span>
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
                   <span :class="getRoleIndicatorClasses(slot)" class="px-2 py-1 text-xs font-bold rounded-full">{{ slot.role }}</span>
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
                  <span :class="getRoleIndicatorClasses(slot)" class="px-2 py-1 text-xs font-bold rounded-full">{{ slot.role }}</span>
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

  <!-- Compact Size Layout -->
  <template v-else>
    <Card class="w-full bg-white shadow-lg h-full flex flex-col"
    :ptOptions="{ mergeProps: true }"
    pt:root:class="overflow-hidden"
    pt:body:class="!p-0">
      <template #header>
        <!-- Compact Header -->
        <div class="p-1.5 border-b border-gray-200">
           <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3 overflow-hidden">
              <img 
                :src="team.coachPhotoUrl" 
                :alt="team.coachName"
                class="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div class="truncate">
                <h3 class="text-md font-bold text-gray-800 truncate">{{ team.name }}</h3>
                <p class="text-xs text-gray-500 truncate">{{ team.coachName }}</p>
              </div>
            </div>
            <div class="text-right pl-2">
              <div class="text-lg font-bold text-green-600">{{ creditsLeft }}</div>
              <div class="text-xs text-gray-500">Credits</div>
            </div>
          </div>
        </div>
      </template>

      <template #content>
        <!-- Roster Table -->
        <div class="overflow-hidden p-0.5">
          <table class="w-full">
            <thead>
              <tr class="border-b-2 border-gray-200">
                <th class="text-left py-1 px-1 font-semibold text-sm text-gray-700">Pos</th>
                <th class="text-left py-1 px-1 font-semibold text-sm text-gray-700">Player</th>
                <th class="text-right py-1 px-1 font-semibold text-sm text-gray-700">Price</th>
              </tr>
            </thead>
            <tbody>
              <!-- Guard Slots -->
              <tr 
                v-for="(slot, index) in rosterSlots.filter(s => s.role === 'G' && !s.isReserve)" 
                :key="`G-${index}`"
                class="bg-green-50 border-b border-green-100"
              >
                <td class="py-1 px-1 text-center">
                   <span :class="getRoleIndicatorClasses(slot)" class="w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full">{{ slot.role }}</span>
                </td>
                <td class="py-1 px-1 font-medium text-sm">{{ slot.player?.name || '-' }}</td>
                <td class="py-1 px-1 text-right font-semibold text-sm">{{ slot.player?.price || '-' }}</td>
              </tr>

              <!-- Forward Slots -->
              <tr 
                v-for="(slot, index) in rosterSlots.filter(s => s.role === 'F' && !s.isReserve)" 
                :key="`F-${index}`"
                class="bg-yellow-50 border-b border-yellow-100"
              >
                <td class="py-1 px-1 text-center">
                  <span :class="getRoleIndicatorClasses(slot)" class="w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full">{{ slot.role }}</span>
                </td>
                <td class="py-1 px-1 font-medium text-sm">{{ slot.player?.name || '-' }}</td>
                <td class="py-1 px-1 text-right font-semibold text-sm">{{ slot.player?.price || '-' }}</td>
              </tr>

              <!-- Center Slots -->
              <tr 
                v-for="(slot, index) in rosterSlots.filter(s => s.role === 'C' && !s.isReserve)" 
                :key="`C-${index}`"
                class="bg-red-50 border-b border-red-100"
              >
                <td class="py-1 px-1 text-center">
                  <span :class="getRoleIndicatorClasses(slot)" class="w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full">{{ slot.role }}</span>
                </td>
                <td class="py-1 px-1 font-medium text-sm">{{ slot.player?.name || '-' }}</td>
                <td class="py-1 px-1 text-right font-semibold text-sm">{{ slot.player?.price || '-' }}</td>
              </tr>

              <!-- Reserve Slots -->
              <tr 
                v-for="(slot, index) in rosterSlots.filter(s => s.isReserve)" 
                :key="`R-${index}`"
                class="bg-purple-50 border-b border-purple-100 "
              >
                <td class="py-1 px-1 text-center">
                  <span :class="getRoleIndicatorClasses(slot)" class="w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full">{{ slot.role }}</span>
                </td>
                <td class="py-1 px-1 font-medium text-sm">{{ slot.player?.name || '-' }}</td>
                <td class="py-1 px-1 text-right font-semibold text-sm">{{ slot.player?.price || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </Card>
  </template>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Card from 'primevue/card'
import type { Team, RosterSlot, PlayerRole } from '@/types/team.interface'

export default defineComponent({
  name: 'FantasyTeamCard',
  components: {
    Card
  },
  props: {
    team: {
      type: Object as PropType<Team>,
      required: true
    },
    size: {
      type: String as PropType<'full' | 'compact'>,
      default: 'full'
    }
  },
  methods: {
    getRoleIndicatorClasses(slot: RosterSlot) {
      if (slot.isReserve) {
        return 'bg-purple-200 text-purple-800';
      }
      switch (slot.role) {
        case 'G': return 'bg-green-200 text-green-800';
        case 'F': return 'bg-yellow-200 text-yellow-800';
        case 'C': return 'bg-red-200 text-red-800';
        default: return 'bg-gray-200 text-gray-800';
      }
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
    },
    rosterSummary() {
      const filledGuards = this.team.roster.filter(p => p.role === 'G' && !p.isReserve).length;
      const filledForwards = this.team.roster.filter(p => p.role === 'F' && !p.isReserve).length;
      const filledCenters = this.team.roster.filter(p => p.role === 'C' && !p.isReserve).length;
      const filledReserves = this.team.roster.filter(p => p.isReserve).length;
      
      // Assuming roster structure is 4G, 4F, 2C, 3 Reserves
      return {
        guards: { filled: filledGuards, total: 4 },
        forwards: { filled: filledForwards, total: 4 },
        centers: { filled: filledCenters, total: 2 },
        reserves: { filled: filledReserves, total: 3 }
      }
    }
  }
})
</script>

