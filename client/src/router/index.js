import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/channels/:channelId',
    name: 'Channels',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "channels" */ '../views/Channel.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    // catch any other paths and route to not found page
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.user) {
    store.commit('addRedirectPath', to.path)
    next('/login')
  } else {
    next()
  }
})

export default router
