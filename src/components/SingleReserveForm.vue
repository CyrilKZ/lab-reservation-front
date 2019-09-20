<template>
 <el-card>
   <div class="sel-sub-title" align='left'>选择时间</div>
   <el-row type="flex">    
     <el-col :span="12">
       <el-date-picker v-model="dateSelected" placeholder="请选择预约日期" :picker-options="dateOptions" @change="dateChanged" class="long-picker"></el-date-picker>
     </el-col>
     <el-col :span="6">
       <el-radio-group v-model="AMPMRadio">
         <el-radio-button label="上午" :disabled="AMDisabled"></el-radio-button>
         <el-radio-button label="下午" :disabled="PMDisabled"></el-radio-button>
       </el-radio-group>
     </el-col>
     <el-col :span="6">
       
     </el-col>
   </el-row>
   <div style="font-size: 16px;" align='left'>注意：只开放180天以内的预约</div>
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
      AMPMRadio:'',
      AMDisabled: false,
      PMDisabled: false,
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
      date.setMonth(9)
      date.setDate(30)
      date.setHours(0)
      date.setMinutes(0)
      date.setSeconds(0)
      date.setMilliseconds(0)
      console.log(date)
      this.dateUnvalid.push(date)

      console.log(Date.now())
      console.log(this.dateSelected)
      if(this.determineDateValid(val)){
        this.dateSelected = ''
        this.$message.error('该日期已经被选取，请重新选择')
      }

      const self = this
      this.dateOptions = Object.assign({}, this.dateOptions, {
        disabledDate: (time)=>{
          return self.determineDateValid(time) || time.getTime() <= Date.now() || time.getTime() >= Date.now() + 180 * 24 * 3600 * 1000
        }
      })
    }
  }
  
}
</script>

<style scoped>
  .sel-sub-title{
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .long-picker{
    min-width: 200px;
    width: 100%;
  }
  .short-picker{
    max-width: 600px;
    width: 100%;
  }
</style>