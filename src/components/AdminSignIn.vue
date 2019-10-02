<template>
  <div>
    <el-card>
      <el-form
        ref="signinform"
        :model="search"
        :rules="rules"
        label-position="right"
        label-width="120px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item prop="id" label="学号/工作证号">
              <el-col :span="16">
                <el-input v-model="search.id" placeholder="填写签到人证件号"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" style="width: 100%" icon="el-icon-search" @click="queryID">查询</el-button>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="24">
          <el-table :data="records">
            <el-table-column prop="id" label="编号" min-width="60" align="center"></el-table-column>
            <el-table-column label="预约时间"  min-width="160" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.submit_time}}</div>
              </template>
            </el-table-column>
            <el-table-column label="使用时间" min-width="160" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.time === 'AM'">{{scope.row.date}},上午</div>
                <div v-if="scope.row.time === 'PM'">{{scope.row.date}},下午</div>
              </template>
            </el-table-column>
            <el-table-column label="使用人" align="center">
              <el-table-column label="姓名" min-width="80" align="center">
                <template slot-scope="scope">
                  <div>{{scope.row.operator.name}}</div>
                </template>
              </el-table-column>
              <el-table-column label="ID" min-width="120" align="center">
                <template slot-scope="scope">
                  <div>{{scope.row.operator.id}}</div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="备注" min-width="70" align="center">
              <template slot-scope="scope">
                <el-popover placement="right" trigger="click" width="120">
                  <div>{{scope.row.note}}</div>
                  <el-button slot="reference" size="small" type="primary" :plain="true" :disabled="!scope.row.note">查看</el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="small" type="primary" :plain="true" @click="signIn(scope.row.id)">签到</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AdminSignIn',
  data() {
    let validator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请填写学号/工作证号'))
      } else {
        let expression = /^20[0-9]{8}$/
        if (!expression.test(value)) {
          callback(new Error('格式错误'))
        }
        callback()
      }
    }
    return {
      search: {
        id: ''
      },
      records: [],
      rules: {
        id: [{ required: true, validator: validator, trigger: 'blur' }]
      }
    }
  },
  methods: {
    queryID(){
      this.$refs['signinform'].validate(valid=>{
        if(valid){
          
          let self = this
          console.log(self.search.id)
          this.$axios.get(
            '/reserve/querysignin', 
            {params: {id: self.search.id}}
          ).then(res=>{
            self.records = res.data
          }).catch(err=>{
            self.records = []
            this.$message.error('查询失败，请重试')
          })
        }
      })
    },
    signIn(id){
      this.$prompt('请输入签到记录的ID以完成签到确认','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[0-9]+/,
        inputErrorMessage: '输入格式错误',
        inputValidator: (value)=>{
          if(parseInt(value) !== parseInt(id)){
            return '输入不一致'
          }
        }
      }).then(({value})=>{
        if(parseInt(value) === parseInt(id)){
          let params = new URLSearchParams()
          params.append('id', id)
          this.$axios.post(
            '/reserve/signin', 
            params
          ).then(res=>{
            let machine = res.data.machine_id
            this.$alert('签到成功，请使用'+machine+'号打印机','提示',{
              confirmButtonText: '确定'
            })
            this.records = []
          }).catch(err=>{
            console.log(err)
            this.$message.error('签到失败，请刷新页面并重试')
          })
        }
      }).catch(()=>{})
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
.form-card {
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