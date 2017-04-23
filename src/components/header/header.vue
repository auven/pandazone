<template>
  <div class="header">
    <el-menu :default-active="activeIndex" class="el-menu-header" mode="horizontal" router="true"
             @select="handleSelect">
      <el-menu-item index="/" class="pandazone">熊猫空间</el-menu-item>
      <el-menu-item index="/" v-show="isLogin">空间动态</el-menu-item>
      <el-submenu index="" v-show="isLogin">
        <template slot="title">我的主页</template>
        <el-menu-item index="/user">个人主页</el-menu-item>
        <el-menu-item index="/user/mood">说说</el-menu-item>
        <el-menu-item index="/user/blog">博客</el-menu-item>
        <el-menu-item index="/user/album">相册</el-menu-item>
        <el-menu-item index="/user/message">留言</el-menu-item>
        <el-menu-item index="/user/friends">好友</el-menu-item>
        <el-menu-item index="/user/profile">个人档</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="header-info" v-show="isLogin">
      <router-link to="/register">
        <img src="/avatar/auven.jpg">
      </router-link>
      <router-link class="name" to="/register">
        <span>{{ login }}</span>
      </router-link>
      <span class="exit" @click="exit"><i class="icon-tuichu"></i>退出</span>
    </div>
    <div class="lgORrg" v-show="!isLogin">
      <router-link to="/login">登录</router-link>
      <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import router from '../../router';

  export default {
    watch: {
      '$route': function () {
        this.fetchData();
        this.changeActiveIndex();
      }
    },
    data() {
      return {
        activeIndex: '/',
        isLogin: false,
        login: ''
      };
    },
    created() {
      this.fetchData();
      this.changeActiveIndex();
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      fetchData() {
        console.log('路由变化');
        this.$http.get('/getSession/login').then(response => {
          // success callback
          var result = response.body;
          if (result.success === '-1') {
            this.isLogin = false;
          }
          if (result.success === '1') {
            this.isLogin = true;
            this.login = result.body;
          }
        }, response => {
          // error callback
        });
      },
      exit() {
        this.$http.post('/exit', {}).then(response => {
          var result = response.body;
          if (result === '1') {
            this.$message({
              message: '退出成功',
              type: 'success'
            });
            this.login = '';
            router.push({path: '/login'});
          } else {
            this.$message.error('退出失败');
          }
        }, response => {
          // error callback
        });
      },
      changeActiveIndex() {
        console.log(this.$route.fullPath);
        var route = this.$route.fullPath;
        var len = route.match(/\//g).length;
        if (len > 2) {
          this.activeIndex = route.slice(0, route.lastIndexOf('/'));
        } else {
          this.activeIndex = route;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header
    width: 100%
    .el-menu-header
      color: #ffffff
      background: #20A0FF
      .pandazone
        font-size: 18px
        font-weight: 700
      > .el-menu-item, .el-submenu .el-submenu__title
        color: #ffffff
        &:hover
          background: #20A0FF
          border-bottom: 5px solid #99d2fc
        &.is-active
          color: #ffffff
          border-bottom: 5px solid #99d2fc
        &:first-child
          border-bottom: none
      .el-submenu.is-active .el-submenu__title, .el-submenu.is-opened .el-submenu__title
        background: #20A0FF
        border-bottom: 5px solid #99d2fc
    .header-info, .lgORrg
      display: flex
      align-items: center
      position: absolute
      top: 0
      right: 20px
      height: 60px
      line-height: 60px
      font-size: 16px
      img
        display: block
        width: 40px
        height: 40px
        border-radius: 50%
      .name, .exit, a
        margin: 0 10px
        cursor: pointer
        color: rgba(255, 255, 255, .8)
        text-decoration: none
        &:hover
          color: rgba(255, 255, 255, 1)
</style>
