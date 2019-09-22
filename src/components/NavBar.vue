<template>
  <el-menu
    :default-active="$route.path"
    class="navbar"
    mode="horizontal"
    :router="true"
  >
    <el-menu-item class='navbar-item' index='/single_reserve'>单人预约</el-menu-item>
    <el-menu-item class='navbar-item' index='/reservation_record'>预约记录</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'NavBar',
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