import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    routeList:[],
    username: '',
    userID:'',
    userEmail:'',
    token:''
  },
  mutations: {
    setRouteList(state, val){
      state.routeList = val;
    },
    login(state, val){
      state.username = val.username;
      state.userEmail = val.userEmail;
      state.userID = val.userID;
      state.token = val.token;
      console.log("stored");
    },    
  },
  plugins:[createPersistedState()]
})