import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

import store from '@/store';

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
    },
    {
      path: '/cart',
      component: () => import('@/views/cart')
    },
    {
      path: '/member/checkout',
      component: () => import('@/views/member/pay/checkout'),
    },
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
// 前置导航守卫
router.beforeEach((to,from,next)=>{
  const profile=store.state.user.profile
  if(!profile.token && to.path.startsWith('/member')) 
    return next('/login?redirectUrl='+encodeURIComponent(to.fullPath));
  next();
})
export default router
