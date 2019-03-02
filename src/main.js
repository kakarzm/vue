// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store/store'
import ElementUI, { Notification } from 'element-ui'
import '../theme/index.css'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import VueQuillEditor from 'vue-quill-editor'
import {getRequest, postRequest, deleteRequest, putRequest} from './utils/api.js'
import {initMenu, isNotNullORBlank} from './utils/utils'
import './utils/filter_utils'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(router)
Vue.use(ElementUI)
Vue.use(Vueaxios, axios)
Vue.use(VueQuillEditor)

Vue.prototype.HOST = '/server'
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.prototype.$notify = Notification
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.isNotNullORBlank = isNotNullORBlank

router.beforeEach((to, from, next) => {
  // Notification.success({
  //   title: '路由跳转',
  //   message: from.name + '-->' + to.name,
  //   type: 'success'
  // })
  if (to.name === 'Login') {
    next()
    return
  }
  let u = store.getters.getUser
  if (u === '未登录') {
    if (to.meta.requireAuth || to.name == null) {
      next({path: '/', query: {redirect: to.path}})
    } else {
      next()
    }
  } else {
    initMenu(router, store)
    next()
  }
}
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
