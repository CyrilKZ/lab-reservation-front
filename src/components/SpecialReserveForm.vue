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
          <div align="left" class="form-tip" style="color: purple">重要: 请认真填写预约该时段的特殊原因!</div>
        </el-form-item>
      </el-form>
      <div class="sel-sub-title" align="left" style="margin-top: 20px">选择时间</div>

      <el-form
        :model="dateTime"
        ref="dateTimeForm"
        :rules="dateTimeRules"
        label-position="right"
        label-width="100px"
      >
        <el-row>
          <el-col :span="13">
            <el-form-item label="预约时间" prop="time">
              <el-date-picker
                type="datetime"
                v-model="dateTime.time"
                placeholder="选择预约日期"
                :picker-options="dateOptions"
                :clearable="false"
                class="long-picker"
                size="small"
                align="left"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
              <div align="left" class="form-tip">注意：只开放90天内的预约</div>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="使用时长" prop="duration">
              <el-input 
                type="number"
                v-model="dateTime.duration" 
                placeholder="请选择使用时长"
                size="small"
                :min="0"
                :max="6"
              >
              </el-input>  
              <div align="left" class="form-tip">需要使用多少小时</div>
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
  name: 'SpecialReserveForm',
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
    let duration_validator = (rule, value, callback) => {
      if(!value) {
        callback(new Error('请选择时长'))
      } else {
        if(value <= 0 || value > 6){
          callback(new Error('时长应在0-6小时内'))
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
        time: [{ required: true, message: '请选择日期', trigger: 'blur' }],
        duration: [
          { required:true, message: '请选择时长', trigger:'blur'},
          { validator: duration_validator, trigger: 'blur'}
        ]
      },
      dateTime: {
        time:'',
        duration:''
      },
      dateOptions: {
        disabledDate(time) {
          let stamp = time.getTime()
          return (
            stamp <= Date.now() ||
            stamp >= Date.now() + 90 * 24 * 3600 * 1000
          )
        }
      },
    }
  },
  methods: {
    clearAll() {
      this.dateSelected = ''
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
        time: '',
        duration:''
      }
    },
    addLeader() {
      this.leaderInfo.push({
        name: '',
        id: ''
      })
    },
    removeLeader(index) {
      this.leaderInfo.splice(index, 1)
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
      let datetime = this.dateTime.time.split(' ')
      let params = {
        operators: this.leaderInfo,
        date: datetime[0],
        time: datetime[1],
        note: '预计使用时长: ' + this.dateTime.duration + '小时 | 预约事由: ' + this.reason.text
      }
      console.log(params)
      this.$axios.post('/reserve/specialsubmit', params)
        .then(res=> {
          this.$router.push('/pending')
        })
        .catch(err=>{
          console.log(err)
          this.$message.error('提交失败，请检查表单后重试')
        })
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