<template>
  <div class="home">
    <div class="home-header">
      <div class="nav-wrapper">
        <div class="left"><img :src="user.showUser.avatar"></div>
        <div class="right">
          <div class="user-name">{{ user.showUser.name }}</div>
          <div class="nav">
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
        </div>
      </div>
      <div class="visits">{{ user.showUser.visits }}</div>
    </div>
    <div class="home-body">
      <router-view></router-view>
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
        activeName: ''
      };
    },
    watch: {
      '$route': 'setActiveName'
    },
    created() {
      this.setActiveName();
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab._props.name, event);
        router.push({path: tab._props.name});
        // tab._props.name获得路径
      },
      setActiveName() {
        this.activeName = this.$route.fullPath;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
