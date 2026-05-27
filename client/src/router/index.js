import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true, allowedRanks: ['admin', 'user'] }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/quests',
      name: 'quests',
      component: () => import('../views/QuestsView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue')
    },
    {
      path: '/editer',
      name: 'editer',
      component: () => import('../views/EditerView.vue')
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () => import('../views/VersionsView.vue')
    },
  ],
})

router.beforeEach((to, from) => {
  const user = store.state.userObject
  const userRank = store.state.userRank

  console.log(store.state.userObject)

  if (to.meta.requiresAuth) {
    if (!user) {
      return { name: 'login' }
    } else {
      const allowedRanks = to.meta.allowedRanks || []
      if (allowedRanks.length && !allowedRanks.includes(userRank)) {
        return { name: 'home' }
      }
    }
  }
  return true
})

export default router