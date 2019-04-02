import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      hidden: true
    }, {
      path: '/home',
      name: 'home',
      component: Home,
      hidden: true,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/readme',
      component: resolve => require(['../components/Home.vue'], resolve),
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/',
          name: '桌面',
          component: resolve => require(['../components/common/Readme.vue'], resolve),
          meta: {
            requireAuth: true
          }
        },
        {
          name: '基础表格示例',
          path: '/example/basetable',
          component: resolve => require(['../components/example/ExaBaseTable.vue'], resolve)
        },
        {
          name: '基础表单示例',
          path: '/example/baseform',
          component: resolve => require(['../components/example/ExaBaseForm.vue'], resolve)
        },
        {
          name: '上传示例',
          path: '/example/upload',
          component: resolve => require(['../components/example/ExaUpload.vue'], resolve)
        },
        {
          name: '图表示例',
          path: '/example/basecharts',
          component: resolve => require(['../components/example/ExaBaseCharts.vue'], resolve)
        },
        {
          name: '拖拽排序示例',
          path: '/example/drag',
          component: resolve => require(['../components/example/ExaDragList.vue'], resolve)
        },
        {
          name: '穿梭框示例',
          path: '/example/transfer',
          component: resolve => require(['../components/example/ExaTransfer.vue'], resolve)
        },
        {
          name: '图片轮播示例',
          path: '/example/carousel',
          component: resolve => require(['../components/example/ExaCarousel.vue'], resolve)
        }
      ]
    }
  ]
})
