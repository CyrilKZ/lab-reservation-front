<template>
  <div id="app">
    <el-row class = "topbar" type="flex" justify="space-between">
      <el-col :span="10" class="topbar-tittle">
        <div>3D打印预约系统</div>
      </el-col>
      <el-col :span="12" v-if="$route.meta.hasNavbar">
        <navbar></navbar>
      </el-col>
      <el-col :span="2" v-if="$route.meta.hasInfo">
        <el-dropdown :hide-on-click="false" @command="handleCommand" v-model="username">
          <span class="el-dropdown-link" style="cursor: pointer;">
            <i class="el-icon-user-solid"></i>
            {{$store.state.username}}
          </span>
          <el-dropdown-menu  slot="dropdown">
            <el-dropdown-item command="logout">退出</el-dropdown-item>
            <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="changeEmail">修改邮箱</el-dropdown-item>
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
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import PswDialog from './components/PswDialog.vue'
import BreadCrumb from './components/BreadCrumb.vue'

export default {
  name: 'App',
  components: {
    'navbar': NavBar,
    'breadcrumb': BreadCrumb,
    'pswdialog': PswDialog
  },
  data() {
    return {
      username: '',
      showPwdDlg: false,
    }
  },
  methods: {
    handleCommand(command) {
      console.log('aaaa')
      console.log(this.$store.state)
      let token = this.$store.state.token
      console.log(token)
      if(command === 'logout'){
        this.$axios
          .post('accounts/logout', null, {headers: {Authorization: 'JWT ' + token}})
          .then(res=>{
            this.$store.commit('logout')
            this.$router.push('/')
          })
      }
      else if (command === 'changePassword'){
        this.showPwdDlg = true
      }     
      
    },
    closePwdDlg(val){
      this.showPwdDlg = val
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
  border-bottom: solid 1px silver;
  width: 100%;
  max-width: 1080px;
  margin: auto;
  align-items: flex-end;
  margin-bottom: 20px;
  min-width: 720px;
}
.topbar-tittle {
  font-weight: 600;
  font-size: 30px;
  text-align: left;
  margin-left: 20px;
}
</style>
