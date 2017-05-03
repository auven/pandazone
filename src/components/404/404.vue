<template>
    <div class="wrapper">
      <div id="container">
        <img class="png" src="./404.png" />
        <img class="png msg" src="./404_msg.png" />
        <p><a href="/"><img class="png" src="./404_to_index.png" /></a> </p>
      </div>

      <div id="cloud" class="png"></div>
    </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /*这里的scoped是使得这里的样式只作用于这个组件*/
  .wrapper
    position: fixed
    top: 0
    left: 0
    z-index: 101
    width: 100%
    height: 100%
    background: url("./error_bg.jpg") repeat-x scroll 0 0 #67ACE4
    #container
      margin: 0 auto
      padding-top: 50px
      text-align: center
      width: 560px
      img
        border: medium none
        margin-bottom: 50px
      .error
        height: 200px
        position: relative
      .error img
        bottom: -50px
        position: absolute
        right: -50px
      .msg
        margin-bottom: 65px
    #cloud
      background: url("./error_cloud.png") repeat-x scroll 0 0 transparent
      bottom: 0
      height: 170px
      position: absolute
      width: 100%
</style>
