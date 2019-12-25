import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../views/Home';
// import About from '../views/About';

Vue.use(Router);

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/About.vue')
      }
    ]
  })
}
