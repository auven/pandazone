<template>
  <div class="register" v-title data-title="注册">
    <el-steps :space="200" :active="active" class="steps">
      <el-step title="步骤 1" description="设置用户名和密码"></el-step>
      <el-step title="步骤 2" description="填写个人信息"></el-step>
      <el-step title="步骤 3" description="完成注册"></el-step>
    </el-steps>

    <div v-show="step1" class="step1">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账户" prop="user">
          <el-input type="text" v-model="ruleForm2.user" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="ruleForm2.email"></el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="submitForm('ruleForm2')">下一步</el-button>
        </el-col>
      </el-row>
    </div>

    <div v-show="step2" class="step2">
      <el-form :model="step2Form" ref="step2Form" label-width="100px" class="step2Form">
        <el-form-item label="头像" prop="avatar">
          <el-upload
            name="avatar"
            class="avatar-uploader"
            action="/uploadTemp"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="step2Form.avatar" :src="step2Form.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="step2Form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生年月" prop="born">
          <el-date-picker type="date" placeholder="选择日期" v-model="step2Form.born" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <div class="block">
            <el-cascader
              :options="cityOptions"
              v-model="selectCity"
              @change="handleChange">
            </el-cascader>
          </div>
        </el-form-item>
        <el-form-item label="兴趣爱好" prop="hobby">
          <el-input type="text" v-model="step2Form.hobby" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签" class="label" prop="label">
          <div>
            <el-tag
              :key="tag"
              v-for="tag in step2Form.label"
              :type="tag.type"
              :closable="true"
              :close-transition="false"
              @close="handleClose(tag)">{{tag.name}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="mini"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新建标签</el-button>
          </div>
        </el-form-item>
        <el-form-item label="个性签名" prop="sign">
          <el-input type="textarea" v-model="step2Form.sign"></el-input>
        </el-form-item>

      </el-form>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
          <el-button type="primary" @click="backToStep1">上一步</el-button>
          <el-button @click="resetForm('step2Form')">重置</el-button>
        </el-col>
        <el-col :span="6">
          <el-button @click="submitStep2">跳过</el-button>
          <el-button type="primary" :disabled="step2NextBtn" @click="submitStep2">下一步</el-button>
        </el-col>
      </el-row>

    </div>

    <div v-show="step3" class="step3">
      <el-form :inline="true" :model="step3Form" :rules="step3Rules" label-width="150px" class="step3Form"
               ref="step3Form">
        <el-form-item label="请输入验证码" prop="captcha">
          <el-input type="text" v-model="step3Form.captcha"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="Captcha" ref="captcha" @click="getCaptcha"></div>
        </el-form-item>
      </el-form>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
          <el-button type="primary" @click="backToStep2">上一步</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" :disabled="step3SbmBtn" @click="submitStep3">提交</el-button>
        </el-col>
      </el-row>
    </div>

    <div v-show="rgsSuccess" class="rgsSuccess">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="3">
          <i class="icon el-icon-circle-check"></i>
        </el-col>
        <el-col :span="6">
          <div class="msg">注册成功</div>
          <div class="msg1">感谢您的注册</div>
        </el-col>
      </el-row>
      <div class="gotoIndex">正在为您跳转...</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  //  在组件里使用路由，引用一下就可以了
  import router from '../../router';

  export default {
    data() {
      var checkUser = (rule, value, callback) => {
        let patt = /^[a-zA-Z0-9_]{3,12}$/;
        if (!value) {
          return callback(new Error('账户不能为空'));
        }
        if (!patt.test(value)) {
          return callback(new Error('请输入数字、字母或下划线（3-12位）'));
        } else {
          this.$http.get('/findUser/' + value).then(response => {
            // success callback
            var result = response.body;
            if (result === '-1') {
              return callback(new Error('该账户已存在！'));
            }
            if (result === '1') {
              callback();
            }
          }, response => {
            // error callback
          });
        }
      };
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('昵称不能为空'));
        } else {
          callback();
        }
      };
      var checkEmail = (rule, value, callback) => {
        let patt = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
        if (!patt.test(value)) {
          return callback(new Error('请输入正确的邮箱'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 6) {
          callback(new Error('密码不少于6位'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var chechkCaptcha = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else {
          this.$http.get('/checkCaptcha').then(response => {
            // success callback
            var result = response.body.result;
            if (this.step3Form.captcha === result) {
              this.step3SbmBtn = false;
              callback();
            } else {
              this.step3SbmBtn = true;
              callback(new Error('验证码错误'));
            }
          }, response => {
            // error callback
          });
        }
      };
      return {
        ruleForm2: {
          user: '',
          name: '',
          pass: '',
          checkPass: '',
          email: ''
        },
        step2Form: {
          avatar: '',
          sex: '男',
          born: '',
          city: '',
          hobby: '',
          label: [],
          sign: ''
        },
        step3Form: {
          captcha: ''
        },
        rules2: {
          user: [
            {validator: checkUser, trigger: 'blur'}
          ],
          name: [
            {validator: checkName, trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          email: [
            {validator: checkEmail, trigger: 'blur'}
          ]
        },
        step3Rules: {
          captcha: [
            {validator: chechkCaptcha, trigger: 'blur'}
          ]
        },
        active: 1,
        step1: true,
        step2: false,
        step3: false,
        rgsSuccess: false,
        imageUrl: '',
        cityOptions: [],
        selectCity: [],
        inputVisible: false,
        inputValue: '',
        step2NextBtn: true,
        captcha: '123',
        step3SbmBtn: true
      };
    },
    created() {
      this.getCitys();
      this.getCaptcha();
    },
    watch: {
      selectCity: function () {
        this.step2Form.city = this.selectCity;
      },
      step2Form: {
        handler: function () {
          this.step2NextBtn = false;
          if (this.selectCity.length !== 0) {
            this.selectCity = this.step2Form.city;
          }
        },
        deep: true
      }
//      'step2Form.name': function () {
//        console.log('改变了');
//      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
//            alert('submit!');
            console.log(this.ruleForm2);
            // 第一步验证成功，进入第二步
            this.step1 = false;
            this.step2 = true;
            this.step3 = false;
            this.active = 2;
            return;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      aaa() {
        console.log(this.$route);
//        this.$route.params.step = 111;
        router.push({path: '/register/111'});
      },
      handleAvatarSuccess(res, file) {
//        this.step2Form.avatar = URL.createObjectURL(file.raw);
        this.step2Form.avatar = file.response.path;
        console.log(file.response);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleChange(value) {
        console.log(value);
      },
      handleClose(tag) {
        this.step2Form.label.splice(this.step2Form.label.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        var types = ['', 'primary', 'gray', 'success', 'warning', 'danger'];
        var type = types[Math.floor(Math.random() * (5 - 0 + 1) + 0)];
        if (inputValue) {
          this.step2Form.label.push({name: inputValue, type: type});
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      backToStep1() {
        this.step1 = true;
        this.step2 = false;
        this.step3 = false;
        this.active = 1;
      },
      submitStep2() {
        console.log(this.step2Form);
        this.step1 = false;
        this.step2 = false;
        this.step3 = true;
        this.active = 3;
      },
      getCitys() {
        this.$http.get('/getCitys').then(response => {
          // success callback
          var citys = response.body;
          var options = [];
          for (var i = 0; i < citys.length; i++) {
            var option = [];
            option.value = citys[i].name;
            option.label = citys[i].name;
            option.children = [];
            for (var j = 0; j < citys[i].city.length; j++) {
              var children = [];
              children.value = citys[i].city[j].name;
              children.label = citys[i].city[j].name;
              option.children.push(children);
            }
            options.push(option);
          }
          this.cityOptions = options;
        }, response => {
          // error callback
        });
      },
      getCaptcha() {
        this.$http.get('/getCaptcha').then(response => {
          // success callback
          this.$refs.captcha.innerHTML = response.body;
          this.$refs.step3Form.resetFields();
          this.step3SbmBtn = true;
        }, response => {
          // error callback
        });
      },
      backToStep2() {
        this.step1 = false;
        this.step2 = true;
        this.step3 = false;
        this.active = 2;
      },
      submitStep3() {
        this.$http.post('/doregister', {
          user: this.ruleForm2.user,
          name: this.ruleForm2.name,
          pass: this.ruleForm2.pass,
          email: this.ruleForm2.email,
          avatar: this.step2Form.avatar,
          sex: this.step2Form.sex,
          born: this.step2Form.born,
          city: this.step2Form.city,
          hobby: this.step2Form.hobby,
          label: this.step2Form.label,
          sign: this.step2Form.sign
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
            this.step1 = false;
            this.step2 = false;
            this.step3 = false;
            this.rgsSuccess = true;
            // 存一个self解决vue的变量在setTimeout内部失效的状况
            var self = this;
            setTimeout(function () {
              router.push({path: '/' + self.ruleForm2.user});
            }, 3000);
          }
        }, response => {
          // error callback
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .register
    box-sizing: border-box
    margin: 50px auto
    padding: 30px
    width: 720px
    background: #ffffff
    border: 1px solid #8492A6
    border-radius: 5px
    .steps
      padding-left: 50px
    .step1
      .demo-ruleForm
        width: 50%
        margin: 50px 0
    .step2
      .step2Form
        width: 60%
        margin: 50px 0
        .avatar-uploader
          background: white
          .el-upload
            border: 1px dashed #d9d9d9
            border-radius: 6px
            cursor: pointer
            position: relative
            overflow: hidden
            &:hover
              border-color: #20a0ff
            .avatar-uploader-icon
              font-size: 28px
              color: #8c939d
              width: 178px
              height: 178px
              line-height: 178px
              text-align: center
            .avatar
              width: 178px
              height: 178px
              display: block
        .label
          .el-tag
            margin: 0 5px
          .el-input
            width: 75px
    .step3
      .step3Form
        margin: 50px auto;
        .Captcha
          border: 1px solid #8492A6
    .rgsSuccess
      margin: 50px auto;
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
