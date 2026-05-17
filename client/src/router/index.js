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
  ],
})

router.beforeEach((to, from, next) => {
  const user = store.state.userObject
  const userRank = store.state.userRank

  console.log(store.state.userObject)

  if (to.meta.requiresAuth) {
    if (!user) {
      return next({ name: 'login' })
    } else {
      const allowedRanks = to.meta.allowedRanks || []
      if (allowedRanks.length && !allowedRanks.includes(userRank)) {
        return next({ name: 'home' })
      }
    }
  }
  next()
})

export default router