import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import LogIn from '@/components/LogIn'
import Register from '@/components/Register'
//import NavBar from '@/components/NavBar'
import SingleReserve from '@/components/SingleReserve'
//import MultiReserve from '@/components/MultiReserve'
import ReservationRecord from '@/components/ReservationRecord'
import SingleReserveForm from '@/components/SingleReserveForm'
import ReserveSuccess from '@/components/ReserveSuccess'
import SpecialReserveForm from '@/components/SpecialReserveForm'
import ReservePending from '@/components/ReservePending'
import AdminSignIn from '@/components/AdminSignIn'

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
        title: '填写普通预约表格',
        authType: 'user'
      }
    },{
      path: '/special_reserve_form',
      name: 'SpecialReserveForm',
      component: SpecialReserveForm,
      meta: {
        hasNavbar: true,
        hasInfo: true,
        title: '特殊时段预约申请',
        authType: 'user'
      }
    },{
      path: '/success',
      name: 'ReserveSuccess',
      component: ReserveSuccess,
      meta: {
        hasInfo: true,
        hasNavbar: true,
        title: '提示',
        authType: 'user'
      }
    },{
      path: '/pending',
      name: 'ReservePending',
      component: ReservePending,
      meta: {
        hasInfo: true,
        hasNavbar: true,
        title: '提示',
        authType: 'user'
      }
    },{
      path: '/admin_signin',
      name: 'AdminSignIn',
      component: AdminSignIn,
      meta: {
        hasInfo: false,
        hasNavbar: false,
        title: '签到',
        authType: 'admin'
      }
    }
  ]
})
