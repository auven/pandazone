<template>
  <div>
    <v-header></v-header>
    <div class="login">
      <el-row>
        <el-col :span="12"><p>欢迎来到熊猫空间</p></el-col>
        <el-col :span="12">
          <div class="login-body" v-show="login">
            <el-form class="loginForm" label-position="left" label-width="60px" :model="loginForm" :rules="loginRules">
              <el-form-item label="账户" prop="user">
                <el-input v-model="loginForm.user"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="loginForm.pass"></el-input>
              </el-form-item>
            </el-form>
            <el-row class="login-tool">
              <el-col :span="12">
                <el-checkbox label="记住密码" name="type"></el-checkbox>
              </el-col>
              <el-col :span="12" class="forgotPass">
                <router-link to="/recoverPass">忘记密码？</router-link>
              </el-col>
            </el-row>
            <el-button class="loginBtn" type="primary" :disabled="loginBtn" @click="login">登录</el-button>
            <div class="gotoRegister">
              <router-link to="/register">还没有账户？注册？</router-link>
            </div>
          </div>

          <div class="recoverPass" v-show="recoverPass">找回密码</div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/header/header';
  //  import router from '../../router';

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
        login: true,
        recoverPass: false,
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
    watch: {
      '$route': 'checkRoute'
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
      },
      checkRoute() {
        console.log(this.$route.name.toString());
        if (this.$route.name === 'login') {
          this.login = true;
          this.recoverPass = false;
        } else {
          this.login = false;
          this.recoverPass = true;
        }
      }
    },
    components: {'v-header': header}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login
    position: fixed
    width: 100%
    height: 100%
    background: url(/static/images/72019_top.png) top center no-repeat
    .login-body
      box-sizing: border-box
      width: 300px
      margin: 100px auto
      padding: 40px 20px
      background: #ffffff
      .login-tool
        font-size: 12px
        margin: 10px 0
        .el-checkbox > .el-checkbox__label
          font-size: 12px
        .forgotPass
          text-align: right
          a
            text-decoration: none
            color: #58B7FF
            &:hover
              color: #1D8CE0
      .loginBtn
        width: 100%
      .gotoRegister
        margin: 10px 0
        font-size: 12px
        text-align: right
        a
          text-decoration: none
          color: #58B7FF
          &:hover
            color: #1D8CE0
</style>
