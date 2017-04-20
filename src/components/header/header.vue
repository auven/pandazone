<template>
  <div class="header">
    <el-menu :default-active="activeIndex" class="el-menu-header" mode="horizontal" router="true" @select="handleSelect">
      <el-menu-item index="/" class="pandazone">熊猫空间</el-menu-item>
      <el-menu-item index="/user">空间动态</el-menu-item>
      <el-submenu index="/user">
        <template slot="title">我的主页</template>
        <el-menu-item index="/user/1">个人主页</el-menu-item>
        <el-menu-item index="/user/1">说说</el-menu-item>
        <el-menu-item index="/user/2">博客</el-menu-item>
        <el-menu-item index="/user/3">相册</el-menu-item>
        <el-menu-item index="/user/4">留言</el-menu-item>
        <el-menu-item index="/user/5">好友</el-menu-item>
        <el-menu-item index="/user/6">个人档</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
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
    >.el-menu-item, .el-submenu .el-submenu__title
      color: #ffffff
      &:hover
        background: #20A0FF
        border-bottom: 5px solid #99d2fc
      &.is-active
        color: #ffffff
        border-bottom: 5px solid #99d2fc
    .el-submenu.is-active .el-submenu__title, .el-submenu.is-opened .el-submenu__title
      background: #20A0FF
      border-bottom: 5px solid #99d2fc
</style>
