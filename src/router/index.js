import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import store from '@/store'
import { inisHelper } from '@/utils/helper/index'


let history   = (INIS.route_hash) ? createWebHashHistory() : createWebHistory();

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
      ],
      meta: {
        title: store.state.cocos_config.basic.site.title
      }
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

// 获取缓存中的登录信息
let level = 'user'
let is_login = inisHelper.get.storage('login')
// 判断缓存是否存在且未过期
if (is_login != 'expire' && is_login != false) {
  level = is_login.user.level
  is_login = true
} else is_login = false

router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title ? to.meta.title : defaultTitle
  }

  // 非管理员禁止
  const prohibit = ['option']

  // 判断是否已经登录
  if (!is_login && to.path.indexOf('/auth') != -1) {
    // 未登录
    next({ path: '/' })
  } else if (is_login && level != 'admin' && prohibit.includes(to.name)) {
    // 无权限
    next({ name: 'admin' })
  } else next()
})



export default router
