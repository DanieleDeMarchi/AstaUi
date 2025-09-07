<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">NBA Players Pool</h1>
      
      <Card>
        <template #content>
          <DataTable 
            :value="players" 
            v-model:filters="filters"
            dataKey="id"
            paginator 
            :rows="10" 
            :rowsPerPageOptions="[5, 10, 25, 50]"
            filterDisplay="menu"
            :globalFilterFields="['name', 'nbaTeam', 'position']"
            removableSort
            stripedRows
            size="small"
          >
            <!-- Header with Global Search -->
            <template #header>
              <div class="flex justify-end">
                <span class="relative">
                  <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                  <InputText v-model="filters['global'].value" placeholder="Search Players" class="pl-10 font-normal w-full md:w-auto"/>
                </span>
              </div>
            </template>
            
            <!-- Player Column -->
            <Column field="name" header="Player" sortable style="min-width: 20rem">
              <template #body="{ data }">
                <div class="flex items-center space-x-3">
                  <img :alt="data.name" :src="data.photoUrl" class="w-8 h-8 rounded-full object-cover bg-gray-200" />
                  <div>
                    <div class="font-bold">{{ data.name }}</div>
                  </div>
                </div>
              </template>
            </Column>

            <!-- Position Column -->
            <Column field="position" header="Position" sortable :filterMenuStyle="{ width: '14rem' }">
               <template #body="{ data }">
                <span :class="['px-2 py-1 rounded-md text-xs font-semibold', getPositionClasses(data.position)]">
                  {{ data.position }}
                </span>
              </template>
              <template #filter="{ filterModel }">
                <Dropdown v-model="filterModel.value" :options="positions" placeholder="Select Position" class="p-column-filter" showClear>
                </Dropdown>
              </template>
            </Column>

            <!-- NBA Team Column -->
            <Column field="nbaTeam" header="NBA Team" sortable :filterMenuStyle="{ width: '14rem' }">
               <template #body="{ data }">
                {{ data.nbaTeam }}
              </template>
              <template #filter="{ filterModel }">
                <Dropdown v-model="filterModel.value" :options="nbaTeams" placeholder="Select Team" class="p-column-filter" showClear>
                </Dropdown>
              </template>
            </Column>

            <!-- Status Column -->
            <Column field="soldInfo" header="Status" sortable dataType="boolean" style="min-width: 10rem">
              <template #body="{ data }">
                <Tag :value="data.soldInfo ? 'Sold' : 'Available'" :severity="data.soldInfo ? 'danger' : 'success'" />
              </template>
               <template #filter="{ filterModel }">
                  <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Select Status" class="p-column-filter" showClear>
                      <template #option="slotProps">
                          <Tag :value="slotProps.option.value ? 'Sold' : 'Available'" :severity="slotProps.option.value ? 'danger' : 'success'" />
                      </template>
                  </Dropdown>
              </template>
            </Column>

            <!-- Sold To Column -->
             <Column field="soldInfo.teamName" header="Sold To" sortable style="min-width: 12rem">
              <template #body="{ data }">
                {{ data.soldInfo?.teamName || '-' }}
              </template>
            </Column>

            <!-- Price Column -->
             <Column field="soldInfo.price" header="Price" sortable dataType="numeric" style="min-width: 8rem">
              <template #body="{ data }">
                {{ data.soldInfo ? `$${data.soldInfo.price}` : '-' }}
              </template>
            </Column>

          </DataTable>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Tag from 'primevue/tag';
import Card from 'primevue/card';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api'; // Corrected import path
import { MOCK_PLAYERS_DATA } from '@/api/mock-players';
import type { Player } from '@/types/player.interface';

export default defineComponent({
  name: 'PlayersView',
  components: {
    DataTable,
    Column,
    InputText,
    Dropdown,
    Tag,
    Card
  },
  data() {
    return {
      players: MOCK_PLAYERS_DATA,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        nbaTeam: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        position: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        soldInfo: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: 'custom' }] },
      },
      positions: ['G', 'F', 'C'],
      // We compute the list of teams dynamically from the player data
      nbaTeams: [...new Set(MOCK_PLAYERS_DATA.map(p => p.nbaTeam))].sort(),
      // true for Sold, false for Available
      statuses: [
        { label: 'Available', value: false },
        { label: 'Sold', value: true }
      ]
    };
  },
  created() {
    // Custom filter function for the 'soldInfo' status
    (this.filters.soldInfo.constraints[0] as any).matchMode = (value: any, filter: boolean | null) => {
      const isSold = !!value; // Does the player have soldInfo?
      // filter is the dropdown value (true for Sold, false for Available)
      if (filter === null || filter === undefined) {
        return true;
      }
      return isSold === filter;
    };
  },
  methods: {
    getPositionClasses(position: string): string {
      switch (position) {
        case 'G': return 'bg-green-100 text-green-800';
        case 'F': return 'bg-yellow-100 text-yellow-800';
        case 'C': return 'bg-blue-100 text-blue-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
  }
});
</script>

