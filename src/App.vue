<template>
  <div id="app">
    <el-row class = "topbar" type="flex" justify="space-between">
      <el-col :span="10" class="topbar-tittle">
        <div>3D打印预约系统</div>
      </el-col>
      <el-col :span="12" v-if="$route.meta.hasNavbar">
        <NavBar>
        </NavBar>
      </el-col>
      <el-col :span="2" v-if="$route.meta.hasInfo">
        <el-dropdown :hide-on-click="false" @command="handleCommand" v-model="username">
          <span class="el-dropdown-link" style="cursor: pointer;">
            <i class="el-icon-user-solid"></i>
            {{$store.state.username}}
          </span>
          <el-dropdown-menu  slot="dropdown">
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    'NavBar': NavBar
  },
  data() {
    return {
      colWidth: 18,
      username: ''
    }
  },
  methods: {
    handleCommand(command) {
      console.log("aaaa");
      console.log(this.$store.state);
    },
    changeColWidth(val) {
      this.colWidth = val;
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
  margin-top: 0px;
  min-width: 720px;
}
.topbar {
  border-bottom: solid 1px silver;
  width: 100%;
  max-width: 1080px;
  margin: auto;
  align-items: flex-end;
  padding-bottom: 10px;
  margin-bottom: 10px;
  min-width: 720px;
}
.topbar-tittle {
  font-weight: 600;
  font-size: 30px;
  text-align: left;
  margin-left: 20px;
}
</style>
