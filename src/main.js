// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './theme/index.css'

import util from './utils/util'
import axios from 'axios'
import store from './store'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(util)
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'

axios.interceptors.response.use(
  function(res){
    return res
  },
  function(error){
    if(error.status === 403){
      ElementUI.Message.error('登陆失效，请重新登录')
      router.replace('/')
      store.commit('logout')
    }
    return Promise.reject(error)
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
