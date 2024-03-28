import { createRouter, createWebHistory } from 'vue-router'
import DemoChart from '@/components/DemoChart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'demo',
      component: DemoChart
    }
  ]
})

export default router
