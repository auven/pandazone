<template>
  <div class="status">
    <div class="status-user">
      <div class="avatar">
        <img :src="statu.avatar">
      </div>
      <div class="info">
        <div class="name"><a href="#">{{ statu.name }}</a></div>
        <div class="time">{{ statu.time }}</div>
      </div>
    </div>
    <div class="status-body">
      <div class="moodBody">
        <div class="text">说说内容</div>
        <div class="imgBox">图片</div>
      </div>
    </div>
    <div class="status-op">
      <i class="icon-dianzan"></i>
      <i class="icon-pinglun"></i>
    </div>
    <div class="thumbs-up">
      <i class="icon-dianzan"></i>
      <a href="#">点赞人</a>、
      <a href="#">点赞人</a>、
      <a href="#">点赞人</a>、
      <a href="#">点赞人</a>共<span>6</span>人觉得很赞
    </div>
    <div class="comment">
      <div class="item">
        <div class="avatar"><img src="./WechatIMG2.jpeg"></div>
        <div class="wrap">
          <div class="content"><a href="#" class="name">张剑</a>&nbsp;：哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
          <div class="time">时间</div>
        </div>
      </div>
      <div class="item">
        <div class="avatar"><img src="./WechatIMG2.jpeg"></div>
        <div class="wrap">
          <div class="content"><a href="#" class="name">张剑</a>&nbsp;：哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
          <div class="time">时间</div>
        </div>
      </div>
      <div class="item">
        <div class="avatar"><img src="./WechatIMG2.jpeg"></div>
        <div class="wrap">
          <div class="content"><a href="#" class="name">张剑</a>&nbsp;：哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
          <div class="time">时间</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      statu: {
        type: Object
      }
    },
    data() {
      return {

      };
    },
    methods: {

    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .status
    box-sizing: border-box
    margin: 20px 0
    padding: 16px
    overflow: hidden
    width: 590px
    background: #ffffff
    font-size: 13px
    font-weight: 700
    color: #5e6d82
    .status-user
      overflow: hidden
      margin-bottom: 12px
      > div
        float: left
      .avatar
        margin-right: 10px
        img
          width: 50px
          height: 50px
          border-radius: 50%
      .info
        font-size: 15px
        > div
          height: 25px
          line-height: 25px
        .name
          a
            color: #5e6d82
            text-decoration: none
            &:hover
              color: #1F2D3D
              text-decoration: underline
        .time
          font-size: 13px
          font-weight: normal
          color: #99a9bf
    .status-body
      font-size: 15px
      font-weight: normal
      .moodBody
        .text
          margin-bottom: 12px
    .status-op
      margin-bottom: 10px
      text-align: right
      border-bottom: 1px solid #eaeefb
      height: 40px
      line-height: 40px
      font-size: 22px
      color: #99a9bf
      > i:nth-child(1)
        display: inline-block
        margin-right: 20px
      i
        cursor: pointer
        &:hover
          color: #324057
    .thumbs-up
      margin-bottom: 10px
      line-height: 20px
      font-size: 13px
      color: #58B7FF
      .icon-dianzan
        display: inline-block
        margin-right: 7px
        height: 20px
        line-height: 20px
        text-align: center
        width: 20px
        border-radius: 50%
        background: #58B7FF
        color: #ffffff
      a
        color: #58B7FF
        text-decoration: none
        &:hover
          text-decoration: underline
    .comment
      font-size: 13px
      line-height: 1.33
      > div
        margin: 10px 0
      .item
        overflow: hidden
        > div
          float: left
        .avatar
          margin-right: 10px
          img
            width: 30px
            height: 30px
            border-radius: 50%
        .wrap
          width: 518px
          .content
            font-weight: normal
            .name
                color: #58B7FF
                text-decoration: none
                font-weight: 700
                &:hover
                  text-decoration: underline
          .time
            font-size: 13px
            font-weight: normal
            color: #99a9bf
</style>
