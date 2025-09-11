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
                <!-- <th class="text-left py-2 px-4 font-semibold text-gray-700">Team</th> -->
                <th class="text-right py-2 px-4 font-semibold text-gray-700">Price</th>
                <th v-if="isAdminView" class="text-center py-2 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Combined Roster Slots -->
              <tr 
                v-for="(slot, index) in rosterSlots" 
                :key="`${slot.role}-${index}`"
                :class="getRowClasses(slot)"
              >
                <td class="py-3 pl-4 px-2">
                  <span :class="getRoleIndicatorClasses(slot)" class="px-2 py-1 text-xs font-bold rounded-full">{{ slot.role }}</span>
                </td>
                <td class="py-3 px-2 font-medium">{{ slot.player?.name || '-' }}</td>
                <!-- <td class="py-3 px-2">{{ slot.player?.nbaTeam || '-' }}</td> -->
                <td class="py-3 px-2 text-right font-semibold">{{ slot.player?.price || '-' }}</td>
                <td v-if="isAdminView" class="py-1 px-4 text-center">
                  <Button
                    v-if="slot.player"
                    icon="pi pi-trash"
                    class="p-button-danger p-button-rounded p-button-text"
                    @click="$emit('remove-player', { teamId: team.id, playerId: slot.player.id })"
                  />
                </td>
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
              <!-- Combined Roster Slots -->
              <tr 
                v-for="(slot, index) in rosterSlots" 
                :key="`compact-${slot.role}-${index}`"
                :class="getRowClasses(slot)"
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
import Button from 'primevue/button'
// Corrected: Import all types from the consolidated index file
import type { FantasyTeam, Player, PlayerRole } from '@/types'

// The RosterSlot type is now defined locally as it's specific to this component's presentation logic.
interface RosterSlot {
  role: PlayerRole
  isReserve: boolean
  player?: Player
}

export default defineComponent({
  name: 'FantasyTeamCard',
  components: {
    Card,
    Button
  },
  props: {
    team: {
      // Corrected: Use the FantasyTeam type
      type: Object as PropType<FantasyTeam>,
      required: true
    },
    size: {
      type: String as PropType<'full' | 'compact'>,
      default: 'full'
    },
    isAdminView: {
      type: Boolean,
      default: false
    }
  },
  emits: ['remove-player'],
  methods: {
    getRoleIndicatorClasses(slot: RosterSlot) {
      if (slot.isReserve) {
        return 'bg-purple-200 text-purple-800'
      }
      switch (slot.role) {
        case 'G': return 'bg-green-200 text-green-800'
        case 'F': return 'bg-yellow-200 text-yellow-800'
        case 'C': return 'bg-red-200 text-red-800'
        default: return 'bg-gray-200 text-gray-800'
      }
    },
    getRowClasses(slot: RosterSlot) {
        const baseClasses = 'border-b';
        if (slot.isReserve) {
            return `${baseClasses} bg-purple-50 border-purple-100`
        }
        switch (slot.role) {
            case 'G': return `${baseClasses} bg-green-50 border-green-100`
            case 'F': return `${baseClasses} bg-yellow-50 border-yellow-100`
            case 'C': return `${baseClasses} bg-red-50 border-red-100`
            default: return `${baseClasses} bg-gray-50 border-gray-100`
        }
    }
  },
  computed: {
    creditsLeft(): number {
      // Corrected: Safely handle potentially undefined price
      const spentCredits = this.team.roster.reduce((total, player) => total + (player.price || 0), 0)
      return this.team.totalCredits - spentCredits
    },
    rosterSlots(): RosterSlot[] {
      const slots: RosterSlot[] = []
      
      const addSlots = (role: PlayerRole, count: number, isReserve: boolean) => {
        const playersInRole = this.team.roster.filter(p => p.position === role && p.isReserve === isReserve);
        for (let i = 0; i < count; i++) {
          slots.push({ role, isReserve, player: playersInRole[i] });
        }
      };

      // Add main roster slots
      addSlots('G', 4, false);
      addSlots('F', 4, false);
      addSlots('C', 2, false);

      // Add reserve slots
      addSlots('G', 1, true);
      addSlots('F', 1, true);
      addSlots('C', 1, true);
      
      return slots
    }
  }
})
</script>

