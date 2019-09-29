<template>
  <div>
    <el-card class="reserve-form">
      <div class="sel-sub-title" align="left">使用者信息</div>
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
              <el-col :span="0.5">
                <div
                  align="left"
                  style="font-weight: 500; font-size: 14px; line-height: 42px;"
                >({{index+1}})</div>
              </el-col>
              <el-col :span="10.5">
                <el-form-item prop="name" label="姓名">
                  <el-input
                    type="text"
                    v-model="item.name"
                    placeholder="请输入真实姓名"
                    auto-complete="off"
                    size="small"
                  ></el-input>
                  <div align="left" class="form-tip">输入使用人的姓名</div>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item prop="id" label="ID">
                  <el-input
                    type="text"
                    v-model="item.id"
                    placeholder="请输入学号/工作证号"
                    auto-complete="off"
                    size="small"
                  ></el-input>
                  <div align="left" class="form-tip">输入使用人的学号或工作证件号码</div>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <div align="right">
                  <el-button
                    v-if="leaderInfo.length > 1"
                    type="text"
                    size="small"
                    style="margin-top: 5px; color:red;"
                    @click="removeLeader(index)"
                  >删除</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </div>
      <el-button type="text" @click="addLeader" :disabled="leaderInfo.length >= $store.state.maxRsv">+添加使用者(对应一台打印机)</el-button>
      <div class="sel-sub-title" align="left">预约理由</div>
      <el-form ref="reasonForm" :model="reason" :rules="reasonRule">
        <el-form-item prop="text">
          <el-input
            type="textarea"
            v-model="reason.text"
            placeholder="请输入本次预约的事由（如打印什么模型等）"
            auto-complete="off"
            size="small"
            resize="none"
            :autosize="{minRows: 1}"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="sel-sub-title" align="left" style="margin-top: 20px">选择时间</div>

      <el-form
        :model="dateTime"
        ref="dateTimeForm"
        :rules="dateTimeRules"
        label-position="right"
        label-width="80px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="预约日期" prop="date">
              <el-col :span="12">
                <el-date-picker
                  v-model="dateTime.date"
                  placeholder="选择预约日期"
                  :picker-options="dateOptions"
                  @change="dateChanged"
                  :clearable="false"
                  class="long-picker"
                  size="small"
                  align="left"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
                <div align="left" class="form-tip">注意：只开放90天内的预约</div>
              </el-col>
              <el-col :span="4">
                <el-button
                  type="primary"
                  @click="updateDateInfo"
                  class="long-picker"
                  size="small"
                  :plain="true"
                >刷新可选日期</el-button>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="预约时段" prop="AMPM">
              <div align="left">
                <el-radio-group v-model="dateTime.AMPM" size="small" align="left">
                  <el-radio-button label="上午" :disabled="leaderInfo.length > AMRemain"></el-radio-button>
                  <el-radio-button label="下午" :disabled="leaderInfo.length > PMRemain"></el-radio-button>
                </el-radio-group>
              </div>
              <div align="left" class="form-tip-large">选择上午(08:00-12:00)或下午(13:00-17:00)</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row style="margin-top: 20px">
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
  created() {
    this.updateDateInfo()
  },
  data() {
    let ID_validator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入证件号'))
      } else {
        let expression = /^20[0-9]{8}$/
        if (!expression.test(value)) {
          callback(new Error('证件号格式错误'))
        }
        callback()
      }
    }
    let AMPM_validator = (rule, value, callback)=>{
      if(!value){
        callback(new Error('请选择时段'))
      } else {
        let AMPM = ''
        if(value === '上午'){
          if(this.AMRemain < this.leaderInfo.length){
            callback(new Error('该时段无法预约'+this.leaderInfo.length+'台机器, 请减少数量或重新选择时段'))
          }
        }
        if(value === '下午'){
          if(this.PMRemain < this.leaderInfo.length){
            callback(new Error('该时段无法预约'+this.leaderInfo.length+'台机器, 请减少数量或重新选择时段'))
          }
        }
        callback()
      }
    }
    return {
      leaderInfo: [
        {
          name: '',
          id: ''
        }
      ],
      reason: {
        text: ''
      },
      reasonRule: {
        text: [{ required: true, message: '请输入预约事由', trigger: 'blur' }]
      },
      leaderRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        id: [
          { required: true, message: '请输入证件号', trigger: 'blur' },
          { validator: ID_validator, trigger: 'blur'}
        ]
      },
      dateTimeRules: {
        date: [{ required: true, message: '请选择日期', trigger: 'blur' }],
        AMPM: [
          { required: true, message: '请选择时段', trigger: 'blur' },
          { validator: AMPM_validator, trigger:'blur'}
        ]
      },
      dateTime: {
        date: '',
        AMPM: ''
      },
      dateUnvalid: [],
      dateInfo: [],
      AMRemain: 8,
      PMRemain: 8,
      dateOptions: {
        disabledDate(time) {
          let day = time.getDay()
          return time.getTime() <= Date.now() || day === 6 || day === 0
        }
      },
    }
  },
  methods: {
    clearAll() {
      this.leaderInfo = [
        {
          name: '',
          id: ''
        }
      ]
      this.reason = {
        text: ''
      }
      this.dateTime = {
        date: '',
        AMPM: ''
      }
      this.AMRemain = 8
      this.PMRemain = 8
      this.localUpdateDateInfo()
    },
    addLeader() {
      this.leaderInfo.push({
        name: '',
        id: ''
      })
      this.localUpdateDateInfo()
      if(this.dateTime.AMPM === '上午' && this.AMRemain < this.leaderInfo.length){
        this.$message.error('该时段无法预约'+this.leaderInfo.length+'台机器, 请减少数量或重新选择时段')
        this.dateTime.AMPM === ''
      }
      if(this.dateTime.AMPM === '下午' && this.PMRemain < this.leaderInfo.length){
        this.$message.error('该时段无法预约'+this.leaderInfo.length+'台机器, 请减少数量或重新选择时段')
        this.dateTime.AMPM === ''
      }
    },
    removeLeader(index) {
      this.leaderInfo.splice(index, 1)
      this.localUpdateDateInfo()
    },
    submit() {
      let allValid = true
      for (let i = 0; i < this.leaderInfo.length; ++i) {
        this.$refs['leaderForm'][i].validate(valid => {
          allValid = allValid && valid
        })
      }
      this.$refs['reasonForm'].validate(valid => {
        allValid = allValid && valid
      })
      this.$refs['dateTimeForm'].validate(valid => {
        allValid = allValid && valid
      })
      if(!allValid){
        return
      }
      let AMPM = ''
      if(this.dateTime.AMPM === '上午'){
        AMPM = 'AM'
      }
      else if(this.dateTime.AMPM === '下午'){
        AMPM = 'PM'
      }
      console.log(this.dateTime.date)
      let params = {
        operators: this.leaderInfo,
        date: this.dateTime.date,
        time: AMPM,
        note: this.reason.text
      }
      this.$axios.post('/reserve/submit', params)
        .then(res=>{
          this.$router.push('/success')
        })
        .catch(err=>{
          if(err.response.data === 'Beyond max reserve limit'){
            this.$confirm('您的可用预约数不足，请减少表单中的预约人数或退出','预约失败',{
              confirmButtonText: '修改表单',
              cancelButtonText: '退出预约',
              type: 'error'
            }).then(()=>{

            }).catch(()=>{
              this.$router.push({path:'/single_reserve',query:{no_warning: true}})
            })
          }
          else{
            this.$message.error('预约失败，请检查表单后重试')
          }         
        })
    },
    determineDateValid(time) {
      for (let i = 0; i < this.dateUnvalid.length; ++i) {
        let w = this.dateTranslate(new Date(time))
        if (this.dateUnvalid[i] === w) {  
          return true
        }
      }
      return false
    },
    updateDateInfo() {
      this.dateUnvalid = []
      this.dateInfo = []
      this.dateTime.date = ''
      let today = this.dateTranslate(new Date())
      const self = this
      let params = new URLSearchParams()
      params.append('start', today)
      params.append('length', 90)
      this.$axios.post(
        '/reserve/queryused', 
        params
      ).then(res=>{
        res.data.forEach(item => {
          let itemInfo = {
            date: item['date'],
            AM: parseInt(item['AM']),
            PM: parseInt(item['PM'])
          }
          self.dateInfo.push(itemInfo)
          if(itemInfo.AM + itemInfo.PM === 0 || 
              (itemInfo.AM < self.leaderInfo.length && itemInfo.PM < self.leaderInfo.length)){
            self.dateUnvalid.push(itemInfo.date)
          }
        })
        console.log(this.dateUnvalid)
      }).catch(err=>{
        this.$message.error('查询失败，请重试')
      })

      this.dateOptions = Object.assign({}, this.dateOptions, {
        disabledDate: time => {
          let day = time.getDay()
          let stamp =  time.getTime()
          return (
            day === 0 ||
            day === 6 ||
            self.determineDateValid(time) ||
            stamp <= Date.now() ||
            stamp >= Date.now() + 90 * 24 * 3600 * 1000
          )
        }
      })
    },
    localUpdateDateInfo(){
      this.dateUnvalid = []
      this.dateInfo.forEach(itemInfo=>{
        if(itemInfo.AM + itemInfo.PM === 0 || 
          (itemInfo.AM < this.leaderInfo.length && itemInfo.PM < this.leaderInfo.length)){
          this.dateUnvalid.push(itemInfo.date)
        }
      })
      if (this.dateTime.date && this.determineDateValid(this.dateTime.date)) {
        this.dateTime.date = ''
        this.$message.error('该日期打印机数量不足，请重新选择')
      }
      this.dateOptions = Object.assign({}, this.dateOptions, {
        disabledDate: time => {
          let day = time.getDay()
          let stamp =  time.getTime()
          return (
            day === 0 ||
            day === 6 ||
            this.determineDateValid(time) ||
            stamp <= Date.now() ||
            stamp >= Date.now() + 90 * 24 * 3600 * 1000
          )
        }
      })
    },
    dateChanged(val) {
      if (this.determineDateValid(val)) {
        this.dateTime.date = ''
        this.$message.error('该日期已经被选取，请重新选择')
      }

      const self = this
      this.dateOptions = Object.assign({}, this.dateOptions, {
        disabledDate: time => {
          let day = time.getDay()
          let stamp =  time.getTime()
          return (
            day === 0 ||
            day === 6 ||
            self.determineDateValid(time) ||
            stamp <= Date.now() ||
            stamp >= Date.now() + 90 * 24 * 3600 * 1000
          )
        }
      })

      let info = this.dateInfo.filter(item=>{
        return item['date'] === val
      })[0]
      this.AMRemain = parseInt(info.AM)
      this.PMRemain = parseInt(info.PM)
      console.log(info)
    },
    dateTranslate(date){
      let yyyy = date.getFullYear().toString()
      let m = date.getMonth()+1
      let d = date.getDate()
      let MM = m.toString()
      if(m < 10){
        MM = '0' + MM
      }
      let DD = d.toString()
      if(d < 10){
        DD = '0' + DD
      }
      return yyyy+'-'+MM+'-'+DD
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
  width: 100%;
  min-width: 110px;
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
.form-tip-large {
  font-weight: 400;
  font-size: 12px;
  color: silver;
  margin-bottom: 0;
  padding: 0;
  line-height: 30px;
}
.form-title {
  font-weight: 400;
  font-size: 18px;
  vertical-align: middle;
  line-height: 40px;
}
</style>