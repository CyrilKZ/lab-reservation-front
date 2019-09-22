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
                placeholder="请输入账号"
                auto-complete="off"
                prefix-icon="el-icon-user-solid"
              ></el-input>
              <div align="left" class="register-tip">5到30个字符，不能包括特殊字符</div>
            </el-form-item>
          </el-col>
        </el-row>          
               
        <el-row>
          <el-col :span="5">
            <div align="right" class="register-title">密码：</div>
          </el-col>
          <el-col :span="19">
            <el-form-item prop="password" :error="registerErrPswd">
              <el-input
                type="password"
                v-model="registerInfo.password"
                placeholder="请输入密码"
                auto-complete="off"
                prefix-icon="el-icon-lock"
              ></el-input>
              <div align="left" class="register-tip">6到50个字符，不能包括特殊字符</div>
            </el-form-item>
          </el-col>
        </el-row>
                   
        <el-row>
          <el-col :span="5">
            <div align="right" class="register-title">确认密码：</div>
          </el-col>
          <el-col :span="19">
            <el-form-item prop="password2" :error="registerErrPswd2">
            <el-input
              type="password"
              v-model="registerInfo.password2"
              placeholder="请再次输入密码"
              auto-complete="off"
              prefix-icon="el-icon-lock"
            ></el-input>
            <div align="left" class="register-tip">再次输入在之前输入的密码</div>
            </el-form-item>
          </el-col>
        </el-row>
      
        <el-row>
          <el-col :span="5">
            <div align="right" class="register-title">邮箱：</div>
          </el-col>
          <el-col :span="19">
            <el-form-item prop="email" :error="registerErrEml">
              <el-input
                type="text"
                v-model="registerInfo.email"
                placeholder="请输入清华大学邮箱"
                auto-complete="off"
                prefix-icon="el-icon-message"
              ></el-input>
              <div align="left" class="register-tip">请输入本人的清华大学邮箱</div>
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
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    let pswd2_validator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请确认密码'))
      } else {
        if (value !== this.registerInfo.password) {
          callback(new Error('密码不一致'))
        }
        callback()
      }
    }
    let email_validator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入邮箱'))
      } else {
        let expression = /^([a-zA-Z0-9]+[-_\.]?)+@([a-zA-Z0-9]+\.)+[a-z]+$/
        if (!expression.test(value)) {
          callback(new Error('邮箱格式错误'))
        }
        callback()
      }
    }
    return {
      registerInfo: {
        username: '',
        password: '',
        password2: '',
        email: ''
      },
      registerErrUsrnm: '',
      registerErrPswd: '',
      registerErrPswd2: '',
      registerErrEml: '',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { max: 30, message: '用户名长度不超过30字符', trigger: 'blur' },
          { min: 5, message: '用户名长度不能短于5字符', trigger: 'blur' }
        ],
        password: [
          { validator: pswd_validator, trigger: 'blur' },
          { max: 50, message: '密码长度不超过50字符', trigger: 'blur' },
          { min: 6, message: '密码长度不能短于6字符', trigger: 'blur' }
        ],
        password2: [{ validator: pswd2_validator, trigger: 'blur' }],
        email: [
          { validator: email_validator, trigger: 'blur' },
          { max: 50, message: '邮箱长度不超过50字符', trigger: 'blur' }
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
          let params = new URLSearchParams()
          params.append('username', this.registerInfo.username)
          params.append('password', this.registerInfo.password)
          params.append('email', this.registerInfo.email)
          this.$axios
            .post('/accounts/register', params)
            .then(response => {
              console.log(response)               
              this.$confirm('注册成功，是否登录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
              })
                .then(() => {
                  let login = new URLSearchParams()
                  login.append('username', this.registerInfo.username)
                  login.append('password', this.registerInfo.password)
                  console.log(login)
                  this.$axios
                    .post('/accounts/login', login)
                    .then(response => {
                      let resdata = {
                        username: this.registerInfo.username,
                        isAdmin: response.data.admin
                      }
                      this.$store.commit('login', resdata)
                      this.$router.push('/single_reserve')
                    })
                    .catch(err => {
                      console.log(err)
                      this.$message.error('登陆失败，请重试')
                    })
                })
                .catch(() => {
                  this.$router.go(-1)
                })              
            })
            .catch(err => {
              this.$message.error('注册失败，请检查表单')
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
