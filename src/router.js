import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '@/layouts/Main'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'products',
      component: MainLayout,
      meta: { authRequired: true, hidden: true },
      children: [
        {
          path: '/products',
          component: () => import('./views/productCatalog'),
        },

        // 404
        {
          path: '/404',
          component: () => import('./views/404'),
        },
      ],
    },

    // Redirect to 404
    {
      path: '*', redirect: '/404', hidden: true,
    },
  ],
})

export default router
