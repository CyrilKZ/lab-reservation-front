<template>
  <div id="app">
    <el-row class = "topbar" type="flex" justify="space-between">
      <el-col :span="10" class="topbar-tittle">
        <div align='left'>3D打印预约系统</div>
      </el-col>
      <el-col :span="6" v-if="$route.meta.hasNavbar" align='left'>
        <div style="display: inline; color:gray">|</div>
        <el-button type="text" class="navbar-item" @click="goSingleReserve">个人预约</el-button>
        <div style="display: inline; color:gray">|</div>
        <el-button type="text" class="navbar-item" @click="goReserveRecord">预约记录</el-button>
        <div style="display: inline; color:gray">|</div>
      </el-col>
      <el-col :span="2" v-if="$route.meta.hasInfo">
        <el-dropdown :hide-on-click="false" @command="handleCommand" v-model="username">
          <span class="el-dropdown-link" style="cursor: pointer;">
            <i class="el-icon-user-solid"></i>
            {{$store.state.username}}
          </span>
          <el-dropdown-menu  slot="dropdown">
            <el-dropdown-item command="logout">退出</el-dropdown-item>
            <el-dropdown-item command="changePassword">修改账号密码</el-dropdown-item>
            <el-dropdown-item command="changePhone">修改联系电话</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <breadcrumb></breadcrumb>
      </el-col>
    </el-row>
    <pswdialog :dialogFormVisible="showPwdDlg" @set-dialog-visibility="closePwdDlg"></pswdialog>
    <phndialog :dialogFormVisible="showPhnDlg" @set-dialog-visibility="closePhnDlg"></phndialog>
    <router-view/>
  </div>
</template>

<script>
import PswDialog from './components/PswDialog.vue'
import PhnDialog from './components/PhnDialog.vue'
import BreadCrumb from './components/BreadCrumb.vue'

export default {
  name: 'App',
  components: {
    'breadcrumb': BreadCrumb,
    'pswdialog': PswDialog,
    'phndialog': PhnDialog
  },
  data() {
    return {
      username: '',
      showPwdDlg: false,
      showPhnDlg: false
    }
  },
  created() {
    if(this.$route.path === '/' || this.$route.path === 'register'){
      this.$store.commit('logout')
    }
  },
  destroyed() {
    this.$store.commit('logout')
  },
  methods: {
    handleCommand(command) {
      if(command === 'logout'){
        this.$axios
          .post('accounts/logout')
          .then(res=>{
            this.$store.commit('logout')
            this.$router.push('/')
          })
      }
      else if (command === 'changePassword'){
        this.showPwdDlg = true
      }     
      else if (command === 'changePhone'){
        this.showPhnDlg = true
      }
    },
    goSingleReserve(){
      this.$router.push('/single_reserve')
    },
    goReserveRecord(){
      this.$router.push('/reservation_record')
    },
    closePwdDlg(val){
      this.showPwdDlg = val
    },
    closePhnDlg(val){
      this.showPhnDlg = val
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
  margin-top: 0px;
  min-width: 720px;
  max-width: 1080px;
}
.topbar {
  border-bottom: 1px solid silver;
  max-width: 1080px;
  margin: auto;
  align-items: flex-end;
  margin-bottom: 20px;
  min-width: 720px;
  height: 84px;
}
.topbar-tittle {
  font-weight: 600;
  font-size: 30px;
  text-align: left;
  margin-left: 20px;
  line-height: 60px;
}
.navbar-item {
  font-size: 18px;
  color: grey;
  height: 30px;
}
</style>
