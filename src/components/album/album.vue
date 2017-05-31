<template>
  <div class="album" v-title data-title="相册">
    <div class="top"><span v-show="user.isLoginUser">我的相册</span><span v-show="!user.isLoginUser">Ta的相册</span></div>
    <div class="album-op" v-if="user.isLoginUser">
      <el-button type="primary" class="upload-img">上传照片</el-button>
      <el-button class="new-album" @click="newAlbum">创建相册</el-button>
    </div>
    <div class="albums">
      <!--v-for要有:key，否则会报warming-->
      <router-link v-for="album in albums" :to="{name: 'albumDetail', params: {user: album.user, albumId: album._id}}" :key="album._id" class="album-item album-item-hook">
        <div class="album-cover">
          <img :src="album.body.cover">
          <i class="el-icon-close" @click.stop.prevent="aaa(album._id)"></i>
          <div class="album-total">{{ album.body.photos.length }}</div>
          <div class="cover-waiting"></div>
        </div>
        <div class="album-name">{{ album.body.name }}</div>
      </router-link>
    </div>
    <div style="text-align: center; margin: 20px" v-if="albums.length === 0">
      尚无相册
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery';
  import router from '../../router';

  export default {
    props: {
      user: {
        type: Object
      }
    },
    data() {
      return {
        albums: []
      };
    },
    watch: {
      albums: function () {
        this.$nextTick(function () {
          this.initImgbox();
        });
      }
    },
    created() {
    },
    mounted() {
      this.getAlbum();
    },
    methods: {
      initImgbox() {
        // 让宽或高撑满整个盒子
        $('.album-item-hook>.album-cover>img').each(function () {
          var imgEl = $(this)[0];
          var imgItem = $(this).parent();
          var imgSrc = $(this)[0].src;
          var timer = null;
          var load = function (src) {
            var imgObj = new Image();
            imgObj.src = src;
            timer = setInterval(function () {
              if (imgObj.complete) {
                clearInterval(timer);
                if (imgObj.width > imgObj.height) {
                  imgEl.height = imgItem.height();
                }
                if (imgObj.width < imgObj.height) {
                  imgEl.width = imgItem.width();
                }
                $(imgItem).find('.cover-waiting').hide();
              }
            }, 80);
          };

          load(imgSrc);
        });
      },
      aaa(id) {
        console.log('点击了关闭', id);
      },
      newAlbum() {
        router.push({name: 'albumNew'});
      },
      getAlbum() {
        // 使用定时的方式来获取props
        var self = this;
        self.pdzTimer.getStatus = setInterval(function () {
          console.log('获取相册数据', self.user.showUser.user);
          if (self.user.loginUser.user) {
            clearInterval(self.pdzTimer.getStatus);
            self.$http.get('/getAlbum?user=' + self.user.showUser.user).then(response => {
              var result = response.body;
              if (result.result === '1') {
                self.albums = result.album;
              }
            }, response => {
              // error callback
            });
          }
        }, 50);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .album
    box-sizing: border-box
    padding: 20px
    overflow: hidden
    background: #ffffff
    .top
      border-bottom: 1px solid #C0CCDA
      margin-bottom: 20px
      span
        display: inline-block
        padding: 12px 30px
        font-size: 16px
        font-weight: 700
        color: #58B7FF
        border-bottom: 3px solid #58B7FF
    .album-op
      padding-left: 15px
    .albums
      margin-top: 15px
      font-size: 0
      .album-item
        display: inline-block
        text-decoration: none
        width: 145px
        margin: 10px
        border-radius: 2px
        border: #FFF 3px solid
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1)
        color: #5e6d82
        transition: all 0.2s ease-in
        &:hover
          box-shadow: 0 0 1px 1px rgba(88, 183, 255, .5)
          .album-cover
            img
              transform: translate(-50%, -50%) scale(1.2)
            .el-icon-close
              opacity: 1
          .album-name
            color: #58B7FF
        .album-cover
          position: relative
          overflow: hidden
          width: 100%
          height: 145px
          color: #FFF
          img
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
            transition: all 0.2s ease-in
          .el-icon-close
            opacity: 0
            display: block
            position: absolute
            width: 20px
            height: 20px
            border-radius: 50%
            box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1)
            background: #fff
            color: #5e6d82
            top: 5px
            right: 5px
            font-size: 12px
            line-height: 20px
            text-align: center
            transition: all 0.2s ease-in
            &:hover
              color: #FF4949
              box-shadow: 0 0 1px 1px rgba(255, 73, 73, .1)
          .album-total
            position: absolute
            bottom: 5px
            right: 5px
            font-size: 26px
            line-height: 1
            font-family: Gulim
          .cover-waiting
            position: absolute
            width: 100%
            height: 100%
            background: #e4e4e4
        .album-name
          width: 100%
          height: 30px
          font-size: 14px
          line-height: 30px
          text-align: center
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
          transition: all 0.2s ease-in
</style>
