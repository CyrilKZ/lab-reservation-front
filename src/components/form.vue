<template>
 <el-card>
   <el-row>
     <el-col :span="12">
       <el-date-picker v-model="dateSelected" placeholder="请选择预约日期" :picker-options="dateOptions" @change="dateChanged"></el-date-picker>
       <div>form</div>
     </el-col>
     <el-col :span="12">
       
     </el-col>
   </el-row>
 </el-card>
</template>

<script>
export default {
  name:'ReserveForm',
  data(){
    return {
      dateSelected: '',
      morning: false,
      name:'',
      id:'',
      dateUnvalid:[],

      dateOptions:{
        disabledDate(time){
          return time.getTime() <= Date.now()
        }
      }
    }
  },
  methods:{
    determineDateValid(time){
      for(let i = 0 ; i < this.dateUnvalid.length; ++i){
        if(this.dateUnvalid[i].getTime() === time.getTime()){
          console.log(true)
          return true
        }
      }
      return false
    },

    dateChanged(val){
      //console.log(val)
      //this.dateUnvalid.push(val)
      //console.log(val)
      let date = new Date()
      date.setFullYear(2019)
      date.setMonth(7)
      date.setDate(30)
      date.setHours(0)
      date.setMinutes(0)
      date.setSeconds(0)
      date.setMilliseconds(0)
      console.log(date)
      this.dateUnvalid.push(date)

      console.log(this.dateSelected)
      if(this.determineDateValid(val)){
        this.dateSelected = ''
        this.$message.error('该日期已经被选取，请重新选择')
      }

      const self = this
      this.options = Object.assign({}, this.dateOptions, {
        disabledDate: (time)=>{
          return self.determineDateValid(time) || time.getTime() <= Date.now()
        }
      })
    }
  }
  
}
</script>

<style scoped>

</style>