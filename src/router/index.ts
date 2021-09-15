import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/List.vue')
  },
  {
    path: '/soureh/:id/:name',
    name: 'Show',
    component: () => import('../views/Show.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory("/"),
  routes
})

export default router
