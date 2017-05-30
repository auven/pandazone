<template>
  <div class="profile" v-title data-title="个人档案">
    <el-form :model="profileForm" ref="profileForm" label-width="100px" class="profileForm">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          name="avatar"
          class="avatar-uploader"
          action="/uploadTemp"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="profileForm.avatar" :src="profileForm.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input type="text" v-model="profileForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" v-model="profileForm.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="profileForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生年月" prop="born">
        <el-date-picker type="date" placeholder="选择日期" v-model="profileForm.born" style="width: 100%;"></el-date-picker>
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
        <el-input type="text" v-model="profileForm.hobby" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="标签" class="label" prop="label">
        <div>
          <el-tag
            :key="tag"
            v-for="tag in profileForm.label"
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
        <el-input type="textarea" v-model="profileForm.sign"></el-input>
      </el-form-item>

    </el-form>
    <div class="profile-op" v-show="!cover">
      <el-button @click="resetForm">取消</el-button>
      <el-button type="primary" :disabled="step2NextBtn" @click="submitStep2">更新</el-button>
    </div>
    <div class="cover" v-show="cover">
      <div class="setting">
        <i class="el-icon-edit" @click="canUpdate"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
//  import router from '../../router';

  export default {
    props: {
      user: {
        type: Object
      }
    },
    data() {
      return {
        profileForm: {
          avatar: '',
          name: '',
          email: '',
          sex: '男',
          born: '',
          city: '',
          hobby: '',
          label: [],
          sign: ''
        },
        rgsSuccess: false,
        imageUrl: '',
        cityOptions: [],
        selectCity: [],
        inputVisible: false,
        inputValue: '',
        step2NextBtn: true,
        userProfile: {},
        cover: true
      };
    },
    created() {
      this.getCitys();
      this.getUserProfile();
    },
    watch: {
      selectCity: function () {
        this.profileForm.city = this.selectCity;
      },
      profileForm: {
        handler: function () {
          this.step2NextBtn = false;
          if (this.selectCity.length !== 0) {
            this.selectCity = this.profileForm.city;
          }
        },
        deep: true
      }
//      'profileForm.name': function () {
//        console.log('改变了');
//      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
//        this.profileForm.avatar = URL.createObjectURL(file.raw);
        this.profileForm.avatar = file.response.path;
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
        this.profileForm.label.splice(this.profileForm.label.indexOf(tag), 1);
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
          this.profileForm.label.push({name: inputValue, type: type});
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
        console.log(this.profileForm);
        this.$http.post('/updateProfile', {
          name: this.profileForm.name,
          email: this.profileForm.email,
          avatar: this.profileForm.avatar,
          sex: this.profileForm.sex,
          born: this.profileForm.born,
          city: this.profileForm.city,
          hobby: this.profileForm.hobby,
          label: this.profileForm.label,
          sign: this.profileForm.sign
        }).then(response => {
          // get body data
          var result = response.body;
          if (result.result === '1') {
            this.$message.success('更新成功，头像需刷新网页');
//            router.go(0);
            // 同时更新页面中的user中的数据
            this.user.loginUser.name = this.profileForm.name;
            this.getUserProfile();
            this.cover = true;
          }
        }, response => {
          // error callback
        });
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
      getUserProfile() {
        console.log('getUserProfile');
        this.$http.get('/getUserProfile').then(response => {
          // success callback
          this.userProfile = response.body.user;
          console.log(this.userProfile);
          this.profileForm = Object.assign({}, this.userProfile); // 深拷贝
          // this.profileForm = this.userProfile; // 浅拷贝，当profileForm改变时，userProfile也会改变，这不是我想要的效果，所以应该采用深拷贝
          this.profileForm.label = Object.assign([], JSON.parse(this.userProfile.label));
          this.selectCity = this.profileForm.city.split(',');
        }, response => {
          // error callback
        });
      },
      resetForm() {
        this.cover = true;
        this.profileForm = Object.assign({}, this.userProfile);
        this.profileForm.label = Object.assign([], JSON.parse(this.userProfile.label));
        this.selectCity = this.profileForm.city.split(',');
      },
      canUpdate() {
        this.cover = false;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .profile
    position: relative
    background: #FFFFFF
    overflow: hidden
    .profileForm
      width: 60%
      padding: 50px 0
      margin: 0 auto
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
    .profile-op
      text-align: center
      margin-bottom: 30px
    .cover
      position: absolute
      top: 0
      left: 0
      background: rgba(255,255,255,0.2)
      width: 100%
      height: 100%
      .setting
        margin: 40px 80px
        text-align: right
        font-size: 20px
        color: #8492A6
        i
          cursor: pointer
          &:hover
            color: #20a0ff
</style>
