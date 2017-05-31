<template>
  <div class="home">
    <div class="home-header">
      <div class="nav-wrapper clearfix">
        <div class="user-avatar"><img :src="user.showUser.avatar"></div>
        <div class="right">
          <div class="user-name">{{ user.showUser.name }}<span class="add-friend jiaguanzhu" v-if="!isFriend && !user.isLoginUser" @click="addFriend"><i class="icon-jiaguanzhu"></i>加关注</span><span class="add-friend yiguanzhu" v-if="isFriend && !eachFocus" @click="dlFriend"><i class="icon-yiguanzhu"></i>已关注</span><span class="add-friend huxiangguanzhu" v-if="isFriend && eachFocus" @click="dlFriend"><i class="icon-huxiangguanzhu"></i>互相关注</span></div>
          <div class="nav" v-show="user.isLoginUser">
            <template>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="个人主页" :name="'/' + user.showUser.user"></el-tab-pane>
                <el-tab-pane label="说说" :name="'/' + user.showUser.user + '/mood'"></el-tab-pane>
                <el-tab-pane label="博客" :name="'/' + user.showUser.user + '/blog'"></el-tab-pane>
                <el-tab-pane label="相册" :name="'/' + user.showUser.user + '/album'"></el-tab-pane>
                <el-tab-pane label="留言" :name="'/' + user.showUser.user + '/message'"></el-tab-pane>
                <el-tab-pane label="好友" :name="'/' + user.showUser.user + '/friends'"></el-tab-pane>
                <el-tab-pane label="个人档" :name="'/' + user.showUser.user + '/profile'"></el-tab-pane>
              </el-tabs>
            </template>
          </div>
          <div class="nav" v-show="!user.isLoginUser">
            <template>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="个人主页" :name="'/' + user.showUser.user"></el-tab-pane>
                <el-tab-pane label="说说" :name="'/' + user.showUser.user + '/mood'"></el-tab-pane>
                <el-tab-pane label="博客" :name="'/' + user.showUser.user + '/blog'"></el-tab-pane>
                <el-tab-pane label="相册" :name="'/' + user.showUser.user + '/album'"></el-tab-pane>
                <el-tab-pane label="留言" :name="'/' + user.showUser.user + '/message'"></el-tab-pane>
              </el-tabs>
            </template>
          </div>
        </div>
      </div>
      <div class="visits"><i class="icon-fangwen"></i><span class="count">今日访问：{{ user.showUser.visits }}</span></div>
    </div>
    <div class="home-body">
      <router-view :user="user"></router-view>
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
      return {
        activeName: '',
        isFriend: false,
        eachFocus: false
      };
    },
    watch: {
      '$route': function () {
        this.setActiveName();
        this.chkFriend();
      }
    },
    created() {
      this.setActiveName();
      this.chkFriend();
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab._props.name, event);
        router.push({path: tab._props.name});
        // tab._props.name获得路径
      },
      setActiveName() {
        this.activeName = this.$route.fullPath;
      },
      chkFriend() {
        var user = this.$route.params.user;
        this.$http.get('/chkFriend?friend=' + user).then(response => {
          // success callback
          var result = response.body;
          if (result.result === '1') {
            this.isFriend = result.isFriend;
            this.eachFocus = result.eachFocus;
          }
        }, response => {
          // error callback
        });
      },
      addFriend() {
        var user = this.$route.params.user;
        this.$http.post('/addFriend', {
          friend: user
        }).then(response => {
          var result = response.body;
          if (result.result === '1') {
            this.$message.success('添加好友成功');

            this.chkFriend();
          }
        }, response => {
          // error callback
        });
      },
      dlFriend() {
        var user = this.$route.params.user;
        this.$http.post('/dlFriend', {
          friend: user
        }).then(response => {
          var result = response.body;
          if (result.result === '1') {
            this.$message.success('删除好友成功');

            this.chkFriend();
          }
        }, response => {
          // error callback
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .home
    .home-header
      position: relative
      width: 960px
      margin: 0 auto
      .nav-wrapper
        padding-top: 200px
        > div
          float: left
          height: 130px
        .user-avatar
          margin-right: 20px
          font-size: 0
          img
            width: 120px
            height: 120px
            border-radius: 2px
            border: #FFF 3px solid
            box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1)
        .right
          position: relative
          width: 600px
          > div
            position: absolute
          .user-name
            bottom: 60px
            color: #1D8CE0
            font-size: 20px
            text-shadow: 1px 1px 1px rgba(0,0,0,.2)
            .add-friend
              display: inline-block
              font-size: 16px
              text-shadow: none
              margin-left: 20px
              padding: 3px 8px
              height: 18px
              line-height: 18px
              text-align: center
              border: 1px solid #d1dbe5
              border-radius: 5px
              cursor: pointer
              &.jiaguanzhu
                color: #58B7FF
                border: 1px solid #58B7FF
              &.yiguanzhu
                color: #F7BA2A
                border: 1px solid #F7BA2A
              &.huxiangguanzhu
                color: #13CE66
                border: 1px solid #13CE66
          .nav
            bottom: -12px
      .visits
        position: absolute
        right: 0
        top: 200px
        height: 30px
        line-height: 30px
        font-size: 16px
        overflow: hidden
        > i
          display: inline-block
          width: 30px
          height: 30px
          margin-right: 5px
          line-height: 30px
          text-align: center
          background: #F7BA2A
          color: #ffffff
          font-size: 25px
          border-radius: 50%
          vertical-align: top /* 解决display:inline-block布局导致错位 */
        .count
          display: inline-block
          vertical-align: top
          color: #475669
    .home-body
      width: 900px
      margin: 30px auto
      border-radius: 5px
      overflow: hidden
</style>
