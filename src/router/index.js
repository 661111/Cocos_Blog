import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/Base.vue'),
      children: [
        {
          title:'首页',
          name: 'index',
          path: '/',
          component: () => import('@/views/pages/Index.vue')
        },
        {
          title:'相册',
          name:'photos',
          path:'/photos',
          component:  ()  =>  import('@/views/pages/Photos.vue')
        }
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   // component: () => import('../views/AboutView.vue')
    // }
    {
      // 404 路由
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/pages/404.vue'),
      // meta: {
      //   title:"404",
      //   content: 'edgavsnfjkqvdmsfjkesbv'
      // }
    }
  ]
})

export default router
