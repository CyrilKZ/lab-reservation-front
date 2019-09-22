<template>
  <div>
    <el-card class="reserve-form">
      <div class="sel-sub-title" align="left">负责人信息</div>   
      <div v-for="(item, index) in leaderInfo" :key="index"> 
        <el-row>
          <el-form
            ref="leaderForm"
            :model="item"
            :rules="leaderRules"
            label-position="right"
            label-width="60px"
          >          
            <el-row>
              <el-col :span="11">
                <el-form-item prop="name" label="姓名:">
                  <el-input
                    type="text"
                    v-model="item.name"
                    placeholder="请输入真实姓名"
                    auto-complete="off"
                    size="small"
                  ></el-input>
                  <div align="left" class="form-tip">输入本次预约负责人的姓名</div>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item prop="id" label="ID:">
                  <el-input
                    type="text"
                    v-model="item.id"
                    placeholder="请输入学号/工作证号"
                    auto-complete="off"
                    size="small"
                  ></el-input>
                  <div align="left" class="form-tip">输入本次预约负责人的学号或工作证件号码</div>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button v-if="leaderInfo.length > 1" type="text" size="small" style="margin-top: 5px; color:red;" @click="removeLeader(index)">删除</el-button>
              </el-col>
            </el-row>          
          </el-form>  
      </el-row>  
      </div>  
      <el-button type="text" @click="addLeader">+添加负责人(对应一台打印机)</el-button>
      <div class="sel-sub-title" align="left">选择时间</div>
      <el-row>
        <el-col :span="14">
          <el-date-picker
            v-model="dateSelected"
            placeholder="选择预约日期(注意：只开放180天内的预约)"
            :picker-options="dateOptions"
            @change="dateChanged"
            :clearable="false"
            class="long-picker"
            size="small"
          ></el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            @click="updateDateInfo"
            class="long-picker"
            size="small"
            :plain="true"
          >刷新可选日期</el-button>
        </el-col>
        <el-col :span="7">
          <el-radio-group v-model="AMPMRadio" size="small">
            <el-radio-button label="上午" :disabled="AMDisabled"></el-radio-button>
            <el-radio-button label="下午" :disabled="PMDisabled"></el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row style="margin-top: 60px">
        <el-col :span="12">
          <el-button type="primary" style="width: 80%" @click="submit">提交</el-button>
        </el-col>
        <el-col :span="12">
          <el-button style="width: 80%" @click="clearAll">清空</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ReserveForm',
  data() {
    return {
      dateSelected: '',
      leaderInfo: [{
        name: '',
        id: ''
      }],
      leaderRules: {
        name: [{required: true, message:'请输入姓名', trigger: 'blur'}],
        id: [{required: true, message:'请输入姓名', trigger: 'blur'}]
      },
      dateUnvalid: [],
      AMPMRadio: '',
      AMDisabled: false,
      PMDisabled: false,
      dateOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now()
        }
      }
    }
  },
  methods: {
    clearAll(){
      this.dateSelected = ''
      this.leaderInfo = [{
        name: '',
        id: ''
      }]
      this.AMPMRadio = ''
      this.AMDisabled = false
      this.PMDisabled = false
    },
    addLeader(){
      this.leaderInfo.push({
        name:'',
        id:''
      })
    },
    removeLeader(index){
      this.leaderInfo.splice(index, 1)
    },
    submit(){
      let allValid = true
      for (let i = 0; i < this.leaderInfo.length; ++i){
        const refStr = 'leaderForm'
        console.log(this.$refs)
        this.$refs[refStr][i].validate(valid=>{
          allValid = allValid && valid
        })
      }
      console.log(allValid)
    },
    determineDateValid(time) {
      for (let i = 0; i < this.dateUnvalid.length; ++i) {
        if (this.dateUnvalid[i].getTime() === time.getTime()) {
          console.log(true)
          return true
        }
      }
      return false
    },
    updateDateInfo() {
      this.dateUnvalid = []
      this.dateSelected = ''
      //post here
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
      const self = this
      this.dateOptions = Object.assign({}, this.dateOptions, {
        disabledDate: time => {
          return (
            self.determineDateValid(time) ||
            time.getTime() <= Date.now() ||
            time.getTime() >= Date.now() + 180 * 24 * 3600 * 1000
          )
        }
      })
    },
    dateChanged(val) {
      if (this.determineDateValid(val)) {
        this.dateSelected = ''
        this.$message.error('该日期已经被选取，请重新选择')
      }

      const self = this
      this.dateOptions = Object.assign({}, this.dateOptions, {
        disabledDate: time => {
          return (
            self.determineDateValid(time) ||
            time.getTime() <= Date.now() ||
            time.getTime() >= Date.now() + 180 * 24 * 3600 * 1000
          )
        }
      })
    }
  }
}
</script>

<style scoped>
.sel-sub-title {
  margin-top: 10px;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}
.long-picker {
  min-width: 110px;
  width: 100%;
}
.short-picker {
  width: 100%;
}
.form-input-tip {
  font-size: 16px;
  vertical-align: middle;
}
.reserve-form {
  width: 720px;
  margin: auto;
  padding: 0 0px 0 0px;
}
.form-tip {
  font-weight: 400;
  font-size: 12px;
  color: silver;
  margin-bottom: 0;
  padding: 0;
  line-height: 22px;
}
.form-title {
  font-weight: 400;
  font-size: 18px;
  vertical-align: middle;
  line-height: 40px;
}
</style>