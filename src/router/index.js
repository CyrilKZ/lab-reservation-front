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
        title: '登录'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        hasNavbar: false,
        hasInfo: false,
        title: '注册'
      }
    },
    {
      path: '/single_reserve',
      name: 'SingleReserve',
      component: SingleReserve,
      meta: {
        hasNavbar: true,
        hasInfo: true,
        title: '个人预约'
      }
    },
    {
      path: '/multi_reserve',
      name: 'MultiReserve',
      component: MultiReserve,
      meta: {
        hasNavbar: true,
        hasInfo: true,
        title: ''
      }
    },
    {
      path: '/reservation_record',
      name: 'ReservationRecord',
      component: ReservationRecord,
      meta: {
        hasNavbar: true,
        hasInfo: true,
        title: '预约记录'
      }
    },
    {
      path: '/single_reserve_form',
      name: 'SingleReserveForm',
      component: SingleReserveForm,
      meta: {
        hasNavbar: true,
        hasInfo: true,
        title: '填写预约表格'
      }
    }
  ]
})
