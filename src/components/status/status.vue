<template>
  <div class="status">
    <div class="status-user">
      <div class="avatar">
        <img :src="status.avatar">
      </div>
      <div class="info">
        <div class="name">
          <router-link :to="'/' + status.user">{{ status.name }}</router-link>
        </div>
        <div class="time">{{ this.moment(status.time).format('YYYY年MM月DD日 HH:mm') }}</div>
      </div>
    </div>
    <div class="status-body">
      <div class="moodBody" v-if="status.type === 'mood'">
        <div class="text">{{ status.body.text }}</div>
        <div :class="imgBoxClass + ' mood-img-box-hook'" v-if="status.body.img.length > 0">
          <div class="imgItem" v-for="img in status.body.img">
            <img :src="img">
          </div>
        </div>
      </div>
    </div>
    <div class="status-op">
      <i class="icon-dianzan"></i>
      <i class="icon-pinglun"></i>
    </div>
    <div class="thumbs-up">
      <i class="icon-dianzan"></i>
      <span v-for="user in status.thumbsUp"><router-link :to="'/' + user.user">{{ user.name }}</router-link><span
        v-if="status.thumbsUp.indexOf(user) !== status.thumbsUp.length - 1">、</span></span>
      共<span>{{ status.thumbsUp.length }}</span>人觉得很赞

    </div>
    <div class="comment">
      <div class="item" v-for="comment in status.comments">
        <div class="avatar"><img :src="comment.avatar"></div>
        <div class="wrap">
          <div class="content">
            <router-link :to="'/' + comment.user" class="name">{{ comment.name }}</router-link>&nbsp;：{{ comment.content
            }}

          </div>
          <div class="time">{{ comment.time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "moment" }] */
  export default {
    props: {
      status: {
        type: Object
      }
    },
    data() {
      return {};
    },
    created() {
    },
    mounted() {
    },
    computed: {
      imgBoxClass: function () {
        if (this.status.body.img.length === 1) {
          return 'imgBox-1';
        }
        if (this.status.body.img.length === 2) {
          return 'imgBox-2';
        }
        if (this.status.body.img.length === 3) {
          return 'imgBox-3';
        }
      }
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
        .imgBox-1
          .imgItem
            overflow: hidden
            img
                max-width: 100%
                max-height: 300px
        .imgBox-2
          .imgItem
            overflow: hidden
            display: inline-block
            box-sizing: border-box
            border: 2px solid #ffffff
            width: 40%
            position: relative
            img
              position: absolute
              top: 50%
              left: 50%
              transform: translate(-50%, -50%)
        .imgBox-3
          .imgItem
            overflow: hidden
            display: inline-block
            box-sizing: border-box
            border: 2px solid #ffffff
            width: 33.3333%
            position: relative
            img
              position: absolute
              top: 50%
              left: 50%
              transform: translate(-50%, -50%)
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
