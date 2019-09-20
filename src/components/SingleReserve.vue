<template>
  <el-card>
    <el-row style="height: 400px">
      <el-col :span="12" class="left-col">
        <div class="button-box">
          <el-button type="primary" class="reserve-bottun" @click="goForm">填写普通申请表单</el-button>
        </div>
        <div class="hint-box">
          *普通预约可以预约工作日上午或下午的3D打印机
        </div>        
      </el-col>
      <el-col :span="12">
        <div class="button-box">
          <el-button class="reserve-bottun" @click="goSpecial">特殊申请通道</el-button>
        </div>
        <div class="hint-box">
          *如果需要预约其他时段，请点击此处
        </div>        
      </el-col>
    </el-row>
  </el-card>  
</template>

<script>
export default {
  name: 'SingleReserve',
  methods: {
    goSpecial(){
      console.log('goSpecial')
    },
    goForm(){
      console.log('goForm')
      this.$router.push('/single_reserve_form')
    }
  }
}
</script>

<style scoped src="../css/style.css">
</style>
<style scoped>
  .reserve-button {
    height: 40px;
    width: 250px
  }
  .left-col{
    border-right-color: silver;
    border-right-style: solid;
    border-right-width: 1px;
  }
  .button-box{
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 200px;
  }
  .hint-box{
    margin-top: 20px;
    font-size: 16px;
    height: 180px;
  }
</style>
