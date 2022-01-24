import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const routes = [
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import( '../views/About.vue')
  // }
  {
    path: '/',
    component: () => import('@/views/Layout'),
    children: [{
      path: '/',
      component: () => import('@/views/home')
    },
    {
      path: '/category/:id',
      component: () => import('@/views/category')
    },
    {
      path: '/category/sub/:id',
      component: () => import('@/views/category/sub')
    }]
  },
  {
    path: '/product/:id'

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
