import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LogIn from '@/components/LogIn'
import Register from '@/components/Register'
import NavBar from '@/components/NavBar'
import SingleReserve from '@/components/SingleReserve'
import MultiReserve from '@/components/MultiReserve'
import ReservationRecord from '@/components/ReservationRecord'
import SingleReserveForm from '@/components/SingleReserveForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogIn,
      meta: {
        hasNavbar: false,
        hasInfo: false,
        title: '登录',
        authType: 'all'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        hasNavbar: false,
        hasInfo: false,
        title: '注册',
        authType: 'all'
      }
    },
    {
      path: '/single_reserve',
      name: 'SingleReserve',
      component: SingleReserve,
      meta: {
        hasNavbar: true,
        hasInfo: true,
        title: '个人预约',
        authType: 'user'
      }
    },
    {
      path: '/multi_reserve',
      name: 'MultiReserve',
      component: MultiReserve,
      meta: {
        hasNavbar: true,
        hasInfo: true,
        title: '',
        authType: 'admin'
      }
    },
    {
      path: '/reservation_record',
      name: 'ReservationRecord',
      component: ReservationRecord,
      meta: {
        hasNavbar: true,
        hasInfo: true,
        title: '预约记录',
        authType: 'user'
      }
    },
    {
      path: '/single_reserve_form',
      name: 'SingleReserveForm',
      component: SingleReserveForm,
      meta: {
        hasNavbar: true,
        hasInfo: true,
        title: '填写预约表格',
        authType: 'user'
      }
    }
  ]
})
