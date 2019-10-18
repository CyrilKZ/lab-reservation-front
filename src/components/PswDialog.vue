<template>
  <el-dialog title="修改密码"
             :visible.sync="getVisibility">
    <el-form ref="account" :model="account" :rules="rules" label-position="left" label-width="0px"
             class="demo-ruleForm">
      <el-form-item prop="old_enigma" :error="errorMsg">
        <div align="left">原密�?</div>
        <el-input type="password" v-model="account.old_enigma" placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item prop="new_enigma">
        <div align="left">新密�?</div>
        <el-input type="password" v-model="account.new_enigma" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item prop="new_enigma2">
        <div align="left">确认新密�?</div>
        <el-input type="password" v-model="account.new_enigma2" placeholder="请确认新密码"></el-input>
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
      default: 'changePasswordDialog'
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
    let validator_enigma2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请确认密�?'))
      } else {
        if (value !== this.account.new_enigma) {
          callback(new Error('两次密码不一�?'))
        }
        callback()
      }
    }
    return {
      account: {
        old_enigma: '',
        new_enigma: '',
        new_enigma2: '',
      },
      errorMsg: '',
      rules: {
        old_enigma: [
          {required: true, message: '请输入原密码', trigger: 'blur' },
          { max: 50, message: '输入长度不超�?50字符', trigger: 'blur' },
          { min: 5, message: '输入长度不能短于5字符', trigger: 'blur' }
        ],
        new_enigma: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          { max: 50, message: '密码长度不超�?50字符', trigger: 'blur' },
          { min: 5, message: '密码长度不能短于5字符', trigger: 'blur' }
        ],
        new_enigma2: [
          {required: true, validator: validator_enigma2, trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    confirmChange() {
      this.$refs['account'].validate(valid => {
        if (valid) {
          this.errorMsg = ''
          let params = new URLSearchParams()
          params.append('oldpwd', this.account.old_enigma)
          params.append('newpwd', this.account.new_enigma)
          this.$axios.post('/accounts/setpwd', params)
            .then(res=>{
              this.$message.success('修改成功,请重新登�?')
              this.getVisibility = false
              this.$store.commit('logout')
              this.$router.push('/')
            })
            .catch(err=>{
              this.$message.error('密码错误，请重试')
              this.errorMsg = '请重新输入密�?'
              this.account.old_enigma = ''
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
