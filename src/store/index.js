import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routeList: [],
    username: '',
  },
  mutations: {
    setRouteList (state, val) {
      state.routeList = val
    },
    login (state, val) {
      state.username = val.username
    },
    logout (state) {
      state.username = ''
      state.routeList = []
    }
  },
  plugins: [createPersistedState()]
})
