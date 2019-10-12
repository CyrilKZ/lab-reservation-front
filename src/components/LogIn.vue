<template>
  <el-container class="login-container">
    <el-header class="login-header">
      <div style="margin:auto">用户登录</div>
    </el-header>
    <el-main class="login-main">
      <el-form
        ref="usernameLogin"
        :model="loginInfo"
        :rules="rules"
        label-suffix="left"
        label-width="0px"
      >
        <el-form-item prop="username" :error="loginErrUsrnm">
          <div align="left" class="login-main">账号</div>
          <el-input
            type="text"
            v-model="loginInfo.username"
            placeholder="请输入账号"
            auto-complete="off"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="Passwort" :error="loginErrPswd">
          <div align="left" class="login-main">密码</div>
          <el-input
            type="password"
            v-model="loginInfo.Passwort"
            placeholder="请输入密码"
            auto-complete="off"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click="login" style="width: 60%">登录</el-button>
        </el-col>
        <el-col :span="12">
          <el-button @click="goRegister" style="width: 60%">注册</el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'LogIn',
  data() {
    return {
      loginInfo: {
        username: '',
        Passwort: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { max: 30, message: '长度不超过30字符', trigger: 'blur' }
        ],
        Passwort: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { max: 50, message: '长度不超过50字符', trigger: 'blur' }
        ]
      },
      loginErrUsrnm: '',
      loginErrPswd: ''
    }
  },
  methods: {
    login() {
      this.$refs['usernameLogin'].validate(valid => {
        if (valid) {
          this.loginErr = ''
          let params = new URLSearchParams()
          params.append('username', this.loginInfo.username)
          params.append('password', this.loginInfo.Passwort)
          console.log(params)
          this.$axios
            .post('/accounts/login', params)
            .then(response => {
              let resdata = {
                username: this.loginInfo.username,
                isAdmin: response.data.admin,
                maxRsv: response.data.max_reserve
              }
              this.$store.commit('login', resdata)
              if(resdata.isAdmin){
                this.$router.push('/admin_signin')
              }
              else{
                this.$router.push('/single_reserve')
              }            
              console.log(resdata)
            })
            .catch(err => {
              this.$message.error('密码错误或账户不存在')
            })
        }
      })
    },
    goRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.login-container {
  border-radius: 5px;
  background-clip: padding-box;
  margin: 100px auto;
  padding: 20px;
  width: 400px;
  border: 1px solid silver;
  font-weight: 600;
  font-size: 25px;
}
.login-header {
  display: flex;
  text-align: center;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid silver;
}
.login-main {
  font-weight: 400;
  font-size: 18px;
}
</style>
