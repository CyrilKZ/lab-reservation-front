<template>
  <el-container class="register-container">
    <el-header class="register-header">
      <div style="margin:auto">注册</div>
    </el-header>
    <el-main class="register-main">
      <el-form
        ref="usernameRegister"
        :model="registerInfo"
        :rules="rules"
        label-suffix="left"
        label-width="0px"
      >  
        <el-row>
          <el-col :span="5">
            <div align="right" class="register-title">用户名：</div>
          </el-col>
          <el-col :span="19">
            <el-form-item prop="username" :error="registerErrUsrnm">
              <el-input
                type="text"
                v-model="registerInfo.username"
                placeholder="请输入账�?"
                auto-complete="off"
                prefix-icon="el-icon-user-solid"
              ></el-input>
              <div align="left" class="register-tip">5�?30个字符，不能包括特殊字符</div>
            </el-form-item>
          </el-col>
        </el-row>          
               
        <el-row>
          <el-col :span="5">
            <div align="right" class="register-title">密码�?</div>
          </el-col>
          <el-col :span="19">
            <el-form-item prop="enigma" :error="registerErrPswd">
              <el-input
                type="password"
                v-model="registerInfo.enigma"
                placeholder="请输入密�?"
                auto-complete="off"
                prefix-icon="el-icon-lock"
              ></el-input>
              <div align="left" class="register-tip">6�?50个字符，不能包括特殊字符</div>
            </el-form-item>
          </el-col>
        </el-row>
                   
        <el-row>
          <el-col :span="5">
            <div align="right" class="register-title">确认密码�?</div>
          </el-col>
          <el-col :span="19">
            <el-form-item prop="enigma2" :error="registerErrPswd2">
            <el-input
              type="password"
              v-model="registerInfo.enigma2"
              placeholder="请再次输入密�?"
              auto-complete="off"
              prefix-icon="el-icon-lock"
            ></el-input>
            <div align="left" class="register-tip">再次输入在之前输入的密码</div>
            </el-form-item>
          </el-col>
        </el-row>
      
        <el-row>
          <el-col :span="5">
            <div align="right" class="register-title">邮箱�?</div>
          </el-col>
          <el-col :span="19">
            <el-form-item prop="email" :error="registerErrEml">
              <el-input
                type="text"
                v-model="registerInfo.email"
                placeholder="请输入清华大学邮�?"
                auto-complete="off"
                prefix-icon="el-icon-message"
              ></el-input>
              <div align="left" class="register-tip">请输入本人的清华大学邮箱</div>
            </el-form-item>
          </el-col>
        </el-row> 

        <el-row>
          <el-col :span="5">
            <div align="right" class="register-title">联系电话�?</div>
          </el-col>
          <el-col :span="19">
            <el-form-item prop="phone" :error="registerErrPhn">
              <el-input
                type="text"
                v-model="registerInfo.phone"
                placeholder="请输入可以用于通知预约变更的联系电�?"
                auto-complete="off"
                prefix-icon="el-icon-phone-outline"
              ></el-input>
              <div align="left" class="register-tip">请输入本人的联系电话</div>
            </el-form-item>
          </el-col>
        </el-row>      
      </el-form>

      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click="register" style="width: 60%">注册账号</el-button>
        </el-col>
        <el-col :span="12">
          <el-button @click="goLogin" style="width: 60%">返回</el-button>
        </el-col>
      </el-row>      
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Register',
  data() {
    let pswd_validator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密�?'))
      } else {
        callback()
      }
    }
    let pswd2_validator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请确认密�?'))
      } else {
        if (value !== this.registerInfo.enigma) {
          callback(new Error('密码不一�?'))
        }
        callback()
      }
    }
    let email_validator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入邮�?'))
      } else {
        let expression = /^([a-zA-Z0-9]+[-_\.]?)+@([a-zA-Z0-9]+\.)+[a-z]+$/
        if (!expression.test(value)) {
          callback(new Error('邮箱格式错误'))
        }
        callback()
      }
    }
    let phone_validator = (rule, value, callback) => {
      if(!value) {
        callback(new Error('请输入你的联系电�?'))
      } else {
        let expression = /^[0-9]{11}$/
        if(!expression.test(value)) {
          callback(new Error('请输入格式正确的联系电话'))
        }
        callback()
      }
    }
    return {
      registerInfo: {
        username: '',
        enigma: '',
        enigma2: '',
        email: '',
        phone: ''
      },
      registerErrUsrnm: '',
      registerErrPswd: '',
      registerErrPswd2: '',
      registerErrEml: '',
      registerErrPhn: '',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { max: 30, message: '用户名长度不超过30字符', trigger: 'blur' },
          { min: 5, message: '用户名长度不能短�?5字符', trigger: 'blur' }
        ],
        enigma: [
          { validator: pswd_validator, trigger: 'blur' },
          { max: 50, message: '密码长度不超�?50字符', trigger: 'blur' },
          { min: 6, message: '密码长度不能短于6字符', trigger: 'blur' }
        ],
        enigma2: [{ validator: pswd2_validator, trigger: 'blur' }],
        email: [
          { validator: email_validator, trigger: 'blur' },
          { max: 50, message: '邮箱长度不超�?50字符', trigger: 'blur' }
        ],
        phone :[
          { validator: phone_validator, trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    register() {
      this.$refs['usernameRegister'].validate(valid => {
        if (valid) {
          this.registerErrEml = ''
          this.registerErrUsrnm = ''
          this.registerErrPswd = ''
          this.registerErrPswd2 = ''
          this.registerErrPhn = ''
          let params = new URLSearchParams()
          params.append('username', this.registerInfo.username)
          params.append('password', this.registerInfo.enigma)
          params.append('email', this.registerInfo.email)
          params.append('phone', this.registerInfo.phone)
          this.$axios
            .post('/accounts/register', params)
            .then(response => {
              this.$alert('注册成功，请验证邮箱后登�?','成功',{
                confirmButtonText: '确定',
                callback: action=>{
                  this.$router.push('/')
                }
              })            
            })
            .catch(err => {
              this.$message.error('注册失败，请检查表�?')
              if (err.data.result === 1) {
                console.log('reg fail1')
                this.registerErrEml = '注册失败，请使用清华邮箱'
              }
              else if (err.data.result === 2) {
                console.log('reg fail2')
                this.registerErrUsrnm = '注册失败，用户名已被占用'
              }
            })
        }
      })
    },
    goLogin(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.register-container {
  border-radius: 5px;
  background-clip: padding-box;
  margin: 100px auto;
  padding: 20px;
  width: 550px;
  border: 1px solid silver;
  font-weight: 600;
  font-size: 25px;
}
.register-header {
  display: flex;
  text-align: center;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid silver;
}
.register-main {
  font-weight: 400;
  font-size: 18px;
}
.register-title {
  font-weight: 400;
  font-size: 18px;
  vertical-align: middle;
  line-height: 40px;
}
.register-tip {
  font-weight: 400;
  font-size: 16px;
  color: silver;
  margin-bottom: 0;
  padding: 0;
  line-height: 22px;
}
</style>
