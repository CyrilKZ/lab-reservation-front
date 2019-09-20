<template>
  <el-menu
    :default-active="activeIndex"
    class="navbar"
    mode="horizontal"
    router
    @select="handleSelect"
  >
    <el-menu-item class='navbar-item' index='./single_reserve'>单人预约</el-menu-item>
    <el-menu-item class='navbar-item' index='./reservation_record'>预约记录</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'NavBar',
  created() {
    if(this.$route.path === '/single_reserve_form'){
      this.activeIndex = './single_reserve'
    }
    else{
      this.activeIndex = '.' + this.$route.path
    }    
  },
  data() {
    return {
      activeIndex: '.' + this.$route.path,
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
    }
  }
}
</script>

<style scoped>
.navbar {
  border-bottom: 0px;
  align-content: flex-end;
  align-items: flex-end;
  align-self: flex-end;
  display: flex;
  height: 50px;
}
.navbar-item {
  font-size: 20px;
  align-self: center;
  align-items: center;
  align-content: center;
  text-align: center;
  vertical-align: middle;
  height: 50px;
}
</style>