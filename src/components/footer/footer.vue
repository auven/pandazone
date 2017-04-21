<template>
  <div class="footer">
    <div class="footer-wrapper">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="10">
          <p>作者：张剑、高玉婷</p>
          <p>技术实现：vue2.0+nodejs+mongodb</p>
          <p>页面UI：element</p>
        </el-col>
        <el-col :span="6">微信 github</el-col>
      </el-row>
      <div class="copyright">Copyright © 2017</div>
    </div>
  </div>
</template>

<script>
  export default {

  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .footer
    box-sizing: border-box
    width: 90%
    margin: 0 auto;
    padding: 15px
    border-top: 1px solid gray
    font-size: 14px
    .footer-wrapper
      width: 90%
      margin: 0 auto
      .copyright
        margin-top: 15px
        text-align: center
</style>
