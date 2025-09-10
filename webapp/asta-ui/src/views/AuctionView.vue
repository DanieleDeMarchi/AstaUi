<template>
  <div class="min-h-screen bg-gray-900 text-white font-sans overflow-hidden">
    <!-- Header Section: Latest Acquisitions -->
    <header class="w-full">
      <AcquisitionCarousel :acquisitions="acquisitions" />
    </header>

    <!-- Main Section: Current Auction Status -->
    <main
      class="w-full max-w-5xl mx-auto items-center justify-center p-4 overflow-hidden"
    >
      <AuctionStatus
        :player="currentAuction?.player "
        :current-bid="currentAuction?.currentBid"
        :leading-team="leadingTeam"
      />
    
    </main>

    <!-- Footer Section: All Fantasy Teams -->
    <footer class="w-full px-4 pb-4">
      <h2 class="text-lg font-semibold text-gray-300 mb-2 pl-2 uppercase tracking-wider">
        Fantasy Teams
      </h2>
      <FantasyTeamCarousel :teams="teams" />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import AcquisitionCarousel from '@/components/auction/AcquisitionCarousel.vue'
import AuctionStatus from '@/components/auction/AuctionStatus.vue'
import FantasyTeamCarousel from '@/components/auction/FantasyTeamCarousel.vue'
import { useAuctionStore } from '@/stores/auction.store'

export default defineComponent({
  name: 'AuctionView',
  components: {
    AcquisitionCarousel,
    AuctionStatus,
    FantasyTeamCarousel
  },
  computed: {
    /**
     * mapState is a Pinia helper that creates computed properties
     * that are mapped to the store's state and getters.
     * This allows us to use `acquisitions` in the template instead of `auctionStore.acquisitions`.
     */
    ...mapState(useAuctionStore, ['acquisitions', 'currentAuction', 'teams', 'leadingTeam'])
  },
  mounted() {
    // When the component is mounted, we get an instance of the store
    // and call its initialize action directly.
    const auctionStore = useAuctionStore()
    auctionStore.initialize()
  }
})
</script>

