import { createRouter, createWebHistory } from 'vue-router'
import TestView from '@/views/TestView.vue'
import TeamCarouselTestView from '@/views/TeamCarouselTestView.vue'
import AcquisitionTestView from '@/views/AcquisitionTestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'test',
      component: TestView
    },
    {
      path: '/teams',
      name: 'teams',
      component: TeamCarouselTestView
    },
    {
      path: '/acquisitions',
      name: 'acquisitions',
      component: AcquisitionTestView
    },
  ]
})

export default router