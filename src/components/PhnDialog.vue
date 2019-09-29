<template>
  <el-dialog title="修改电话号码"
             :visible.sync="getVisibility">
    <el-form ref="account" :model="account" :rules="rules" label-position="left" label-width="0px"
             class="demo-ruleForm">
      <el-form-item prop="phone">
        <div align="left">新联系方式</div>
        <el-input type="text" v-model="account.phone" placeholder="请输入新的电话号码"></el-input>
      </el-form-item>
      <el-form-item prop="phone2">
        <div align="left">确认新联系方式</div>
        <el-input type="text" v-model="account.phone2" placeholder="请确认新的电话号码"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%; text-align: center;">
        <el-button style="width: 45%" type="primary" round @click="confirmChange">确认修改</el-button>
        <el-button style="width: 45%" round @click="cancelChange">取消修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'changePhoneDialog'
    },
    canShow: {
      type: Boolean,
      default: false,
    },
    dialogFormVisible: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    let validator_phone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新的联系电话'))
      } else {
        let expression = /^[0-9]{11}$/
        if (!expression.test(value)) {
          callback(new Error('请输入合法的电话号'))
        }
        callback()
      }
    }
    let validator_phone2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请确认新的联系电话'))
      } else {
        if (value !== this.account.phone) {
          callback(new Error('两次输入不一致'))
        }
        callback()
      }
    }
    return {
      account: {
        phone: '',
        phone2: '',
      },
      rules: {
        phone: [
          {validator: validator_phone, trigger: 'blur'},
        ],
        phone2: [
          {validator: validator_phone2, trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    confirmChange() {
      this.$refs['account'].validate(valid => {
        if (valid) {
          let params = new URLSearchParams()
          params.append('phone', this.account.phone)
          this.$axios.post('/accounts/setinfo', params)
            .then(res=>{
              this.$message.success('修改成功!')
              this.getVisibility = false
            })
            .catch(err=>{
              this.$message.error('修改失败，请重试')
            })
        }
      })
    },
    cancelChange() {
      this.getVisibility = false
    }
  },
  watch: {
    'dialogFormVisible': () => {}
  },
  computed: {
    getVisibility: {
      set(val) {
        this.$emit('set-dialog-visibility', val)
        this.$refs['account'].resetFields()
      },
      get() {
        return this.dialogFormVisible
      }
    }
  }
}
</script>

<style scoped>
</style>
