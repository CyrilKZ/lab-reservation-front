<template>
  <div class="breadcrumb">
    <i class = "el-icon-caret-right" v-if="routeList.length !== 0" style="display: inline-block"></i>
    <el-breadcrumb separator="/" style = "display: inline-block; margin-left: 2px">
      <el-breadcrumb-item v-for="(item) in routeList" :key="item.path">
        <router-link :to="{path: item.path, query: item.query}">{{item.title}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',
  computed: {
    routeList(){
      return this.$store.state.routeList
    }
  },
  watch: {
    $route(to, from){
      let routeList = []
      console.log(to.name)
      if(to.name === 'LogIn' || to.name === 'Register'){
        //do nothing
      }
      else if(to.name === 'SingleReserve' || to.name === 'ReservationRecord' || to.name === 'ReserveSuccess'){
        routeList.push({
          path: to.path,
          query: to.query,
          title: to.meta.title
        })
      }
      else{
        routeList = this.$store.state.routeList
        let index = routeList.findIndex((elem) => (elem.path === to.path))
        if(index !== -1){
          routeList.splice(index + 1, routeList.length - index - 1)
        }
        else{
          routeList.push({
            path: to.path,
            query: to.query,
            title: to.meta.title
          })
        }
      }
      this.$store.commit('setRouteList', routeList) 
    }
  }
}
</script>

<style scoped>
  .breadcrumb {
    float: left;
    margin-bottom: 20px;
  }
</style>