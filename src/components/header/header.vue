<template>
  <div class="header">
    <el-menu :default-active="activeIndex" class="el-menu-header" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
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
