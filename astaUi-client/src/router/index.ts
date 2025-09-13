import { createRouter, createWebHistory } from 'vue-router'
import TestView from '@/views/TestView.vue'
import PlayerListView from '@/views/PlayerListView.vue'
import ControlPanelView from '@/views/ControlPanelView.vue'
import AuctionView from '@/views/AuctionView.vue'
import CommissionerView from '@/views/CommissionerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AstaUi',
      meta: {
        title: 'AstaUi'
      },      
      component: AuctionView
    },
    {
      path: '/commissioner',
      name: 'Commissioner',
      component: CommissionerView
    },
    {
      path: '/catalog',
      name: 'test',
      meta: {
        title: 'Catalog'
      },      
      component: TestView
    },
    {
      path: '/listone',
      name: 'listone',
      meta: {
        title: 'Listone',
      },
      component: PlayerListView
    },
    {
      path: '/control-panel', // Add the new route
      name: 'control-panel',
      component: ControlPanelView
    }
  ]
})

router.beforeEach((to) => {
  const { title } = to.meta;
  const defaultTitle = 'Default Title';
  document.title = title || to.name || defaultTitle
})

export default router