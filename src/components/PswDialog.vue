<template>
  <el-dialog title="修改密码"
             :visible.sync="getVisibility">
    <el-form ref="account" :model="account" :rules="rules" label-position="left" label-width="0px"
             class="demo-ruleForm">
      <el-form-item prop="old_password" :error="errorMsg">
        <div align="left">原密码</div>
        <el-input type="password" v-model="account.old_password" placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item prop="new_password">
        <div align="left">新密码</div>
        <el-input type="password" v-model="account.new_password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item prop="new_password2">
        <div align="left">确认新密码</div>
        <el-input type="password" v-model="account.new_password2" placeholder="请确认新密码"></el-input>
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
      let validator_password2 = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请确认密码'))
        } else {
          if (value !== this.account.new_password) {
            callback(new Error('两次密码不一致'))
          }
          callback()
        }
      };
      return {
        account: {
          old_password: '',
          new_password: '',
          new_password2: '',
        },
        errorMsg: '',
        rules: {
          old_password: [
            {required: true, message: '请输入原密码', trigger: 'blur'}
          ],
          new_password: [
            {required: true, message: '请输入新密码', trigger: "blur"}
          ],
          new_password2: [
            {required: true, validator: validator_password2, trigger: "blur"}
          ]
        },
      }
    },
    methods: {
      confirmChange() {
        this.$refs['account'].validate(valid => {
          if (valid) {
            //post, then
            
          }
        })
      },
      cancelChange() {
        this.getVisibility = false;
      }
    },
    watch: {
      'dialogFormVisible': () => {
      }
    },
    computed: {
      getVisibility: {
        set(val) {
          this.$emit('set-dialog-visibility', val);
          this.$refs['account'].resetFields();
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
