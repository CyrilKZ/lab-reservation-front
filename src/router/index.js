import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LogIn from '@/components/LogIn'
import Register from '@/components/Register'
import NavBar from '@/components/NavBar'
import SingleReserve from '@/components/SingleReserve'
import MultiReserve from '@/components/MultiReserve'
import ReservationRecord from '@/components/ReservationRecord'
import SingleReserveForm from '@/components/form'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogIn,
      meta:{
        hasNavbar: false,
        hasInfo: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta:{
        hasNavbar: false,
        hasInfo: false
      }
    },
    {
      path: '/single_reserve',
      name: 'SingleReserve',
      component: SingleReserve,
      meta:{
        hasNavbar: true,
        hasInfo: true
      }
    },
    {
      path: '/multi_reserve',
      name: 'MultiReserve',
      component: MultiReserve,
      meta:{
        hasNavbar: true,
        hasInfo: true
      }
    },
    {
      path: '/reservation_record',
      name: 'ReservationRecord',
      component: ReservationRecord,
      meta:{
        hasNavbar: true,
        hasInfo: true
      }
    },
    {
      path: '/single_reserve_form',
      name: 'SingleReserveForm',
      component: SingleReserveForm,
      meta: {
        hasNavbar: true,
        hasInfo: true
      }
    }
  ]
})
