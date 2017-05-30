<template>
  <div v-title data-title="登录">
    <div class="login">
      <el-row>
        <el-col :span="12">
          <div class="welcome">
            <div class="welcome-main">
              <div class="title">熊猫空间</div>
              <div>分享生活，留住感动</div>
            </div>
          </div>
        </el-col>
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
            <el-button class="loginBtn" type="primary" :disabled="loginBtn" @click="loginOK">登录</el-button>
            <div class="gotoRegister">
              <router-link to="/register">还没有账户？注册？</router-link>
            </div>
          </div>

          <div class="recoverPass1" v-show="recoverPass1">
            <el-tabs active-name="first" class="title">
              <el-tab-pane label="验证邮箱" name="first"></el-tab-pane>
            </el-tabs>
            <el-form class="loginForm" label-position="left" label-width="60px" :model="recoverForm1"
                     :rules="recoverRules1" ref="recoverForm1">
              <el-form-item label="账户" prop="user">
                <el-input v-model="recoverForm1.user"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="recoverForm1.email"></el-input>
              </el-form-item>
            </el-form>
            <el-button class="checkEmail" type="primary" :disabled="checkEmailBtn" @click="ceNext">下一步</el-button>
          </div>

          <div class="recoverPass2" v-show="recoverPass2">
            <el-tabs active-name="first" class="title">
              <el-tab-pane label="重置密码" name="first"></el-tab-pane>
            </el-tabs>
            <el-form class="loginForm" label-position="left" label-width="70px" :model="recoverForm2"
                     :rules="recoverRules2" ref="recoverForm2">
              <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="recoverForm2.pass"></el-input>
              </el-form-item>
              <el-form-item label="再次输入" prop="checkPass">
                <el-input type="password" v-model="recoverForm2.checkPass"></el-input>
              </el-form-item>
            </el-form>
            <el-button class="rpBtn" type="primary" :disabled="rpBtn" @click="finish">提交</el-button>
          </div>

          <div class="success" v-show="success">
            <el-row type="flex" class="row-bg" justify="center">
              <el-col :span="6">
                <i class="icon el-icon-circle-check"></i>
              </el-col>
              <el-col :span="10">
                <div class="msg">成功</div>
                <div class="msg1">修改密码成功</div>
              </el-col>
            </el-row>
            <div class="gotoIndex">正在为您跳转...</div>
          </div>

        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import router from '../../router';

  export default {
    props: {
      user: {
        type: Object
      }
    },
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
          return callback(new Error('请输入正确的账号'));
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
      var checkUser1 = (rule, value, callback) => {
        let patt = /^[a-zA-Z0-9_]{3,12}$/;
        if (!value) {
          this.checkuser1 = false;
          this.checkEmailBtn = true;
          return callback(new Error('账户不能为空'));
        }
        if (!patt.test(value)) {
          this.checkuser1 = false;
          this.checkEmailBtn = true;
          return callback(new Error('请输入正确的账号'));
        } else {
          this.$http.get('/findUser/' + value).then(response => {
            // success callback
            var result = response.body;
            if (result === '1') {
              this.checkuser1 = false;
              this.checkEmailBtn = true;
              return callback(new Error('该账户未注册！'));
            }
            if (result === '-1') {
              this.checkuser1 = true;
              this.$refs.recoverForm1.validateField('email');
              if (this.checkemail === true) {
                this.checkEmailBtn = false;
              } else {
                this.checkEmailBtn = true;
              }
              callback();
            }
          }, response => {
            // error callback
          });
        }
      };
      var checkEmail = (rule, value, callback) => {
        let patt = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
        if (!value) {
          this.checkemail = false;
          this.checkEmailBtn = true;
          return callback(new Error('邮箱不能为空'));
        }
        if (!patt.test(value)) {
          this.checkemail = false;
          this.checkEmailBtn = true;
          return callback(new Error('请输入正确的邮箱'));
        } else {
          if (this.checkuser1 === true) {
            this.$http.get('/checkEmail/' + this.recoverForm1.user + '/' + value).then(response => {
              // success callback
              var result = response.body;
              if (result === '-1') {
                this.checkemail = false;
                this.checkEmailBtn = true;
                return callback(new Error('邮箱错误！'));
              }
              if (result === '1') {
                this.checkemail = true;
                this.checkEmailBtn = false;
                return callback();
              }
            }, response => {
              // error callback
            });
          } else {
            return callback(new Error('请检查您的用户名！'));
          }
        }
      };
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          this.rpPass = false;
          this.rpBtn = true;
          callback(new Error('请输入密码'));
        } else if (value.length < 6) {
          this.rpPass = false;
          this.rpBtn = true;
          callback(new Error('密码不少于6位'));
        } else {
          this.rpPass = true;
          if (this.recoverForm2.checkPass !== '') {
            this.$refs.recoverForm2.validateField('checkPass');
            this.rpBtn = !this.rpCkPass;
          }
          callback();
        }
      };
      var validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          this.rpCkPass = false;
          this.rpBtn = true;
          callback(new Error('请再次输入密码'));
        } else if (value !== this.recoverForm2.pass) {
          this.rpCkPass = false;
          this.rpBtn = true;
          callback(new Error('两次输入密码不一致!'));
        } else {
          this.rpCkPass = true;
          this.rpBtn = !this.rpPass;
          callback();
        }
      };
      return {
        login: true,
        recoverPass1: false,
        recoverPass2: false,
        success: false,
        loginForm: {
          user: '',
          pass: ''
        },
        recoverForm1: {
          user: '',
          email: ''
        },
        recoverForm2: {
          pass: '',
          checkPass: ''
        },
        loginRules: {
          user: [
            {validator: checkUser, trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ]
        },
        recoverRules1: {
          user: [
            {validator: checkUser1, trigger: 'blur'}
          ],
          email: [
            {validator: checkEmail, trigger: 'blur'}
          ]
        },
        recoverRules2: {
          pass: [
            {validator: validatePass1, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validateCheckPass, trigger: 'blur'}
          ]
        },
        checkuser: false,
        checkpass: false,
        loginBtn: true,
        checkuser1: false,
        checkemail: false,
        checkEmailBtn: true,
        rpPass: false,
        rpCkPass: false,
        rpBtn: true
      };
    },
    created() {
      this.checkRoute();
    },
    watch: {
      '$route': 'checkRoute'
    },
    methods: {
      loginOK() {
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
          if (result.result === '1') {
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            this.user.loginUser = result.login;
            this.user.showUser = result.login;
            router.push({path: '/'});
          } else {
            this.$message.error('密码错误');
          }
        }, response => {
          // error callback
        });
      },
      checkRoute() {
        console.log(this.$route.name.toString());
        if (this.$route.name === 'login') {
          this.login = true;
          this.recoverPass1 = false;
          this.recoverPass2 = false;
        } else {
          this.login = false;
          this.recoverPass1 = true;
          this.recoverPass2 = false;
        }
      },
      ceNext() {
        console.log(this.checkuser1, this.checkemail);
        this.recoverPass1 = false;
        this.recoverPass2 = true;
      },
      finish() {
        console.log('aaa');
        this.recoverPass2 = false;
        this.success = true;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login
    /*position: fixed*/
    /*width: 100%*/
    /*height: 100%*/
    /*background: url(/static/images/72019_top.png) top center no-repeat*/
    .welcome
      color: #58B7FF
      margin: 100px auto
      position: relative
      .welcome-main
        position: absolute
        left: 50%
        transform: translate(-50%, 0)
        font-size: 20px
        .title
          margin-bottom: 20px
          font-size: 50px
          font-weight: 700
    .login-body, .recoverPass1, .recoverPass2, .success
      box-sizing: border-box
      width: 350px
      margin: 100px auto
      padding: 40px 20px
      background: #ffffff
      border: 1px solid #D3DCE6
      border-radius: 5px
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
      .loginBtn, .checkEmail, .rpBtn
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
    .recoverPass1, .recoverPass2
      padding-top: 20px
      .title
        margin-bottom: 10px
    .success
      .icon
        color: #13CE66
        font-size: 50px
      .msg
        font-size: 25px
      .msg1
        font-size: 12px
        line-height: 25px
        color: #8492A6
      .gotoIndex
        margin: 50px auto
        text-align: center
        color: #58B7FF
</style>
