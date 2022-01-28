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
    },
    {
      path: '/product/:id',
      component: () => import('@/views/goods')
    }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
  },
  {
    path: '/login/callback',
    component: () => import('@/views/login/callback'),
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior () {
    // Vue2.0
    // return {x:0,y:0}
    return { left: 0, top: 0 }
  }
})

export default router
