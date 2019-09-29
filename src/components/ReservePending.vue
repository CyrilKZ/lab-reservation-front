<template>
  <div>
    <el-card>
      
      <div class="success-wow">
        <i class="el-icon-success"></i>
        申请提交成功！
      </div>
      <div class="success-info">
        可以在<el-link @click="goRecord" class="success-info">"预约记录"</el-link>界面查看
      </div>    
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ReservePending',
  methods: {
    goRecord(){
      this.$router.push('/reservation_record')
    }
  }
}
</script>

<style scoped>
  .success-wow{
    font-weight: 500;
    line-height: 60px;
    font-size: 24px;
    color: #8cc269;
    margin-bottom: 20px;
  }
  .success-info{
    line-height: 30px;
    font-size: 18px;
  }
</style>