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
      this.$router.push('/special_reserve_form')
    },
    goForm(){
      this.$axios.get(
        '/records/queryreserve', 
      ).then(res=>{
        if(res.data.count > 0){
          this.$message.error('您还有未完成的预约，请完成预约后再进行另外的预约')
        }
        else {
          this.$router.push('/single_reserve_form')
        }
      }).catch(err=>{
        this.$message.error('可用记录查询失败，请重试')
        console.log(err)
      })
      
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
    height: 180px;
    font-weight: 400;
    font-size: 12px;
    color: gray;
    margin-bottom: 0;
    padding: 0;
    line-height: 22px;
  }
</style>
