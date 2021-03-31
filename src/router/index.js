import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TodosList from '../views/todos/TodosList.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store/index'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresUnauth: true
    }
  },
  {
    path: '/todos',
    name: 'TodosList',
    component: TodosList,
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      console.log(from)
      if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next({
          path: '/login',
        });
      } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next({
          path: '/todos',
        });
      } else {
        next();
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "about" */ '../views/auth/Login.vue'),
    meta: {
      requiresUnauth: true
    }
  },
  {
    path: '/:notFound(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router