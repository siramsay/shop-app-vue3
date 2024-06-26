import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShoplistView from "@/views/ShoplistView.vue";
//import ShoppingView from '../views/ShoppingView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shoplist',
      component: ShoplistView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/shopping',
      name: 'shopping',
      //component: ShoppingView
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ShoppingView.vue')
    }
  ]
})

export default router
