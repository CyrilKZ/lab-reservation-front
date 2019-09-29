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
    console.log(error)
    console.log(error.response)
    if(error.response.status === 403){
      console.log('login err')
      ElementUI.Message.error('登陆失效，请重新登录')
      router.replace('/')
      store.commit('logout')
    }
    return Promise.reject(error)
  }
)

router.beforeEach((to, from, next) => {
  if(from.name){
    if(to.name === 'SingleReserveForm' && from.name !== 'SingleReserve'){
      next('/single_reserve')
      let routeList = []
      routeList.push({
        path: '/single_reserve',
        query: '',
        title: '个人预约'
      })
      store.commit('setRouteList', routeList)
      return
    }
    if(to.name === 'SpecialReserveForm' && from.name !== 'SingleReserve'){
      next('/single_reserve')
      let routeList = []
      routeList.push({
        path: '/single_reserve',
        query: '',
        title: '个人预约'
      })
      store.commit('setRouteList', routeList)
      return
    }
  }
  console.log(to.query)
  if((from.name === 'SingleReserveForm' || from.name === 'SpecialReserveForm') && 
    !(to.name==='LogIn' || to.name==='ReserveSuccess' || to.name==='ReservePending') &&
    !('no_waning' in to.query && to.query.no_warning)){
    ElementUI.MessageBox.confirm('这样会删除所有的表单数据','确定离开界面?',{
      type: 'warning'
    }).then(()=>{
      next()
    }).catch(()=>{
      return
    })
    return
  }  
  if(to.meta.authType === 'all'){
    next()
  }
  else if(to.meta.authType === 'user'){
    if(store.state.isAdmin){
      ElementUI.Message.error('权限错误，请重新登录')
      store.commit('logout')
      next('/')
    }
    else if(store.state.username === ''){
      console.log(store.state)
      ElementUI.Message.error('登录失效，请重新登录')
      store.commit('logout')
      next('/')
    }
    else{
      next()
    }
  }
  else if(to.meta.authType === 'admin'){
    if(!store.state.isAdmin){
      ElementUI.Message.error('权限错误，请重新登录')
      store.commit('logout')
      next('/')
    }
    else if(store.state.username === ''){
      ElementUI.Message.error('登录失效，请重新登录')
      store.commit('logout')
      next('/')
    }
    else{
      next()
    }
  }
  else{
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
