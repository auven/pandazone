<template>
  <div class="header">
    <el-menu :default-active="activeIndex" class="el-menu-header" mode="horizontal" :router="true"
             @select="handleSelect">
      <el-menu-item index="/" class="pandazone">熊猫空间</el-menu-item>
      <el-menu-item :index="'/' + user.loginUser.user" v-show="isLogin"><span v-show="user.isLoginUser">我的空间</span><span
        v-show="!user.isLoginUser">返回我的空间</span></el-menu-item>
      <el-submenu index="" v-show="isLogin">
        <template slot="title"><span v-show="user.isLoginUser">我的主页</span><span v-show="!user.isLoginUser">Ta的主页</span>
        </template>
        <el-menu-item :index="'/' + user.showUser.user">个人主页</el-menu-item>
        <el-menu-item :index="'/' + user.showUser.user + '/mood'">说说</el-menu-item>
        <el-menu-item :index="'/' + user.showUser.user + '/blog'">博客</el-menu-item>
        <el-menu-item :index="'/' + user.showUser.user + '/album'">相册</el-menu-item>
        <el-menu-item :index="'/' + user.showUser.user + '/message'">留言</el-menu-item>
        <el-menu-item :index="'/' + user.showUser.user + '/friends'" v-show="user.isLoginUser">好友</el-menu-item>
        <el-menu-item :index="'/' + user.showUser.user + '/profile'" v-show="user.isLoginUser">个人档</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="header-info" v-show="isLogin">
      <router-link :to="'/' + user.loginUser.user + '/profile'">
        <img :src="user.loginUser.avatar">
      </router-link>
      <router-link class="name" :to="'/' + user.loginUser.user">
        <span>{{ user.loginUser.name }}</span>
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
    props: {
      user: {
        type: Object
      }
    },
    watch: {
      '$route': function () {
        this.checkLogin();
//        为什么我把fetchData放在这里？因为如果在父组件中变化，不会同步到子组件中
        this.changeActiveIndex();
      }
    },
    data() {
      return {
        activeIndex: '/',
        isLogin: false
      };
    },
    created() {
      this.checkLogin();
      this.changeActiveIndex();
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      checkLogin() {
        console.log('路由变化');
        var user = this.$route.params['user'] || '';
        this.$http.get('/checkLogin?user=' + user).then(response => {
          // success callback
          var result = response.body;
          if (result.result === '-1') {
            this.isLogin = false;

            if (this.$route.fullPath !== '/register' && this.$route.fullPath !== '/login' && this.$route.fullPath !== '/recoverPass') {
              this.$message.warning('您还未登录');
              console.log('this.pdzTimer.getStatus: ' + this.pdzTimer.getStatus);
              // 清除定时器
              if (this.pdzTimer.getStatus) {
                clearInterval(this.pdzTimer.getStatus);
              }
              if (this.pdzTimer.setEditor) {
                clearInterval(this.pdzTimer.setEditor);
              }
              router.push({name: 'login'});
            }
          }
          if (result.result === '1') {
            this.isLogin = true;
            this.user.loginUser = result.login;
            this.user.showUser = (result.isLoginUser) ? result.login : result.user;
            this.user.isLoginUser = result.isLoginUser;
          }
          if (result.result === '-2') {
            if (this.$route.params['user'] !== '') {
              this.$message.error('用户' + user + '不存在，访问失败');
            }
            router.push({name: '404'});
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
    position: fixed
    z-index: 100
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
        /*border-bottom: 5px solid #99d2fc*/
        &:first-child
          border-bottom: none
      /*.el-submenu.is-active .el-submenu__title, */
      .el-submenu.is-opened .el-submenu__title
        background: #20A0FF
        border-bottom: 5px solid #99d2fc
      .el-submenu.is-active.is-opened .el-menu-item.is-active
        color: #48576a;
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
