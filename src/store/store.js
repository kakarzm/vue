import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      userface: ''
    },
    routes: []
  },
  getters: {
    getUser () {
      let str = window.sessionStorage.getItem('user')
      if (str === null || str === undefined) {
        return '未登录'
      } else {
        console.info('get user===' + str)
        return JSON.parse(str)
      }
    }
  },
  mutations: {
    initMenu (state, menus) {
      state.routes = menus
    },
    setUser (state, user) {
      console.info('覆盖user:' + JSON.stringify(user))
      state.user = user
      window.sessionStorage.setItem('user', JSON.stringify(user))
    },
    logout (state) {
      state.user = null
      window.sessionStorage.removeItem('user')
      state.routes = []
    }
  },
  actions: {
    setUser (context, obj) {
      context.commit('setUser', obj)
    }
  }
})
