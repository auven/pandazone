<template>
  <div class="footer">
    <div class="footer-wrapper">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="10">
          <p>作者：张剑、高玉婷</p>
          <p>技术实现：vue2.0+nodejs+mongodb</p>
          <p>页面UI：element</p>
        </el-col>
        <el-col :span="6" class="contact">
          <ul>
            <li><a href="https://github.com/auven/pandazone"><i class="icon-github"></i></a></li>
            <li>
              <a href="#"><i class="icon-weixin"></i></a>
              <div class="QRCode"><img src="./WechatIMG2.jpeg"></div>
              <div class="sjx"></div>
            </li>
          </ul>
        </el-col>
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
      .contact
        ul
          list-style: none
          li
            position: relative
            width: 40px
            height: 40px
            float: right
            margin: 0 10px
            &:hover
              .QRCode
                display: block
                opacity: 1
              .sjx
                display: block
                opacity: 1
            a
              display: block
              width: 40px
              height: 40px
              transition: transform .3s
              text-decoration: none
              font-size: 40px
              color: #99A9BF
              &:hover
                color: #324057
                /*这里的transform必须放在被hover的标签上才能生效*/
                transform: scale(1.2)
            .QRCode
              transition: opacity .3s
              /*这里不能是dispaly:none，才能有过度效果*/
              display: none
              opacity: 0
              position: absolute
              width: 100px
              height: 100px
              padding: 10px
              border: 1px solid gray
              border-radius: 5px
              background: #ffffff
              box-shadow: 0 0 6px #99A9BF
              top: -135px
              left: 50%
              transform: translateX(-50%)
              img
                width: 100%
            .sjx
              transition: opacity .3s
              display: none
              opacity: 0
              position: absolute
              top: -15px
              left: 50%
              transform: translateX(-50%)
              width: 0
              height: 0
              border-left: 8px solid transparent
              border-right: 8px solid transparent
              border-top: 10px solid #ffffff
      .copyright
        margin-top: 15px
        text-align: center
</style>
