import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routeList: [],
    username: '',
    isAdmin: false,
    maxRsv: 0
  },
  mutations: {
    setRouteList (state, val) {
      state.routeList = val
    },
    login (state, val) {
      state.username = val.username
      state.isAdmin = val.isAdmin
      state.maxRsv = val.maxRsv
    },
    logout (state) {
      state.username = ''
      state.routeList = []
      state.isAdmin = false
      state.maxRsv = 0
    }
  },
  plugins: [createPersistedState()]
})
