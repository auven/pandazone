<template>
  <div class="login">
    <v-header></v-header>
    <el-row>
      <el-col :span="12"><p>欢迎来到熊猫空间</p></el-col>
      <el-col :span="12">
        <el-form label-position="right" label-width="80px" :model="loginForm" :rules="loginRules">
          <el-form-item label="账户" prop="user">
            <el-input v-model="loginForm.user"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="loginForm.pass"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" :disabled="loginBtn" @click="login">登录</el-button>
      </el-col>
    </el-row>


  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/header/header';

  export default {
    data() {
      var checkUser = (rule, value, callback) => {
        let patt = /^[a-zA-Z0-9_]{3,12}$/;
        if (!value) {
          this.checkuser = false;
          this.loginBtn = true;
          return callback(new Error('账户不能为空'));
        }
        if (!patt.test(value)) {
          this.checkuser = false;
          this.loginBtn = true;
          return callback(new Error('请输入数字、字母或下划线（3-12位）'));
        } else {
          this.$http.get('/findUser/' + value).then(response => {
            // success callback
            var result = response.body;
            if (result === '1') {
              return callback(new Error('该账户未注册！'));
            }
            if (result === '-1') {
              this.checkuser = true;
              if (this.checkuser === true && this.checkpass === true) {
                this.loginBtn = false;
              } else {
                this.loginBtn = true;
              }
              callback();
            }
          }, response => {
            // error callback
          });
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          this.checkpass = false;
          this.loginBtn = true;
          callback(new Error('请输入密码'));
        } else if (value.length < 6) {
          this.checkpass = false;
          this.loginBtn = true;
          callback(new Error('密码不少于6位'));
        } else {
          this.checkpass = true;
          if (this.checkuser === true && this.checkpass === true) {
            this.loginBtn = false;
          } else {
            this.loginBtn = true;
          }
          callback();
        }
      };
      return {
        loginForm: {
          user: '',
          pass: ''
        },
        loginRules: {
          user: [
            {validator: checkUser, trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ]
        },
        checkuser: false,
        checkpass: false,
        loginBtn: true
      };
    },
    methods: {
      login() {
        this.$http.post('/dologin', {
          user: this.loginForm.user,
          pass: this.loginForm.pass
        }).then(response => {
          // get status
          response.status;

          // get status text
          response.statusText;

          // get 'Expires' header
          response.headers.get('Expires');

          // get body data
          var result = response.body;
          if (result === '1') {
            alert('登录成功');
          } else {
            alert('密码错误');
          }
        }, response => {
          // error callback
        });
      }
    },
    components: { 'v-header': header }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.login
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: url(/static/images/72019_top.png) top center  no-repeat
</style>
