<template>
  <el-menu
    :default-active="$route.path"
    class="navbar"
    mode="horizontal"
    router
    @select="handleSelect"
  >
    <el-menu-item class="navbar-item" index="./single_reserve"><div style="align-self: flex-end;">单人预约</div></el-menu-item>
    <el-menu-item class="navbar-item" index="./multi_reserve">群体预约</el-menu-item>
    <el-menu-item class="navbar-item" index="./reservation_record">预约记录</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      activeIndex: "/single_reserve"
    };
  },
  methods: {
    handleSelect(key, keyPath) {}
  }
};
</script>

<style scoped>
.navbar {
  border-bottom: 0px;
  align-content: flex-end;
  align-items: flex-end;
  align-self: flex-end;
  display: flex;
  height: 40px;
}
.navbar-item {
  font-size: 20px;
  align-self: flex-end;
  align-items: flex-end;
  align-content: flex-end;
  text-align: center;
  vertical-align: bottom;
  height: 40px;
}
</style>