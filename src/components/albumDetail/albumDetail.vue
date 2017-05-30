<template>
  <div class="album-detail" v-title data-title="查看相册">
    <div class="top"><span>查看相册</span></div>
    <div class="album-info album-info-hook">
      <div class="album-cover"><img :src="album.body.cover"></div>
      <div class="album-name-desc">
        <div class="album-name">
          <span class="name"><span v-if="isShow">{{ album.body.name }}</span><el-input v-if="!isShow" v-model="name" placeholder="请输入内容"></el-input></span>
          <span class="total">&nbsp;&nbsp;{{ album.body.photos.length }}张</span>
          <div class="album-desc">描述：<span v-if="isShow">{{ album.body.desc }}</span><el-input v-if="!isShow" v-model="desc" type="textarea" placeholder="请输入内容"></el-input></div>
        </div>
        <div class="visits">浏览：1000+</div>
      </div>
    </div>
    <div class="album-detail-op" v-if="user.isLoginUser">
      <el-button type="primary" class="upload-img">上传照片</el-button>
      <el-button class="update-album" @click="updateAlbum" v-if="isShow">编辑相册</el-button>
      <el-button type="primary" class="update-album" @click="updateAlbumSubmit" v-if="!isShow">完成</el-button>
    </div>
    <div class="photos photos-hook">
      <div class="photo-item" v-for="photo in album.body.photos">
        <img :src="photo">
        <div class="photo-op">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="'{ type: \'delete\', id: \'123456\' }'">删除</el-dropdown-item>
              <el-dropdown-item :command="'{ type: \'update\', id: \'123456\' }'">设为封面</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="photo-name">
          照片
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery';
//  import PhotoSwipe from 'photoswipe/dist/photoswipe.min';
//  import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default.min';

  export default {
    props: {
      user: {
        type: Object
      }
    },
    data() {
      return {
        // 里面必须先定义好一些属性，不然会报错
        album: {
          body: {
            name: '',
            cover: '',
            desc: '',
            photos: []
          }
        },
        isShow: true,
        desc: '',
        name: ''
      };
    },
    created() {
      this.getAlbumById();
    },
    watch: {
      album: function () {
        this.$nextTick(function () {
          this.initImgbox();
          this.setPswp('.photos-hook');
        });
      }
    },
    methods: {
      getAlbumById() {
        this.$http.get('/getAlbumById?id=' + this.$route.params.albumId).then(response => {
          var result = response.body;
          if (result.result === '1') {
            this.album = result.album;
          }
        }, response => {
          // error callback
        });
      },
      initImgbox() {
        // 让宽或高撑满整个盒子
        $('.album-info-hook>.album-cover>img').each(function () {
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
                if (imgObj.width >= imgObj.height) {
                  imgEl.height = imgItem.height();
                }
                if (imgObj.width < imgObj.height) {
                  imgEl.width = imgItem.width();
                }
              }
            }, 80);
          };

          load(imgSrc);
        });

        // 让宽或高撑满整个盒子
        $('.photos-hook>.photo-item>img').each(function () {
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
                imgItem.attr('data-size', imgObj.width + 'x' + imgObj.height);
                if (imgObj.width >= imgObj.height) {
                  imgEl.height = imgItem.height();
                }
                if (imgObj.width < imgObj.height) {
                  imgEl.width = imgItem.width();
                }
              }
            }, 80);
          };

          load(imgSrc);
        });
      },
      handleCommand(command) {
        /* eslint no-eval: "error" */
        /* eslint-env browser */
        var obj = window.eval('(' + command + ')');
//        this.$message('click on item ' + command);
        console.log(command, obj);
      },
      updateAlbum() {
        this.isShow = false;
      },
      updateAlbumSubmit() {
        this.isShow = true;
        console.log(this.name, this.desc);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .album-detail
    box-sizing: border-box
    padding: 20px
    overflow: hidden
    background: #ffffff
    color: #5e6d82
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
    .album-info
      box-sizing: border-box
      position: relative
      padding: 0 20px
      min-height: 100px
      margin-bottom: 15px
      .album-cover
        position: absolute
        top: 0
        left: 20px
        width: 80px
        height: 80px
        background: #7c7c7c
        overflow: hidden
      .album-name-desc
        box-sizing: border-box
        display: flex
        width: 100%
        padding-left: 100px
        font-size: 16px
        justify-content: space-between
        .album-name
          width: 80%
          .name
            font-size: 25px
            font-weight: 700
            color: #1F2D3D
            .el-input
              width: 50%
          .album-desc
            margin-top: 10px
            font-size: 14px
            .el-textarea
              width: 80%
              vertical-align: middle
    .photos
      margin-top: 15px
      font-size: 0
      .photo-item
        display: inline-block
        position: relative
        overflow: hidden
        width: 145px
        height: 145px
        background: #7c7c7c
        margin: 10px
        border-radius: 2px
        border: #FFF 3px solid
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1)
        &:hover
          .photo-name
            bottom: 0
          .photo-op
            right: 0
        img
          position: absolute
          top: 50%
          left: 50%
          transform: translate(-50%, -50%)
        .photo-op
          position: absolute
          top: 0
          right: -20px
          transition: all 0.2s ease-in
          .el-dropdown-link
            width: 20px
            height: 20px
            box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1)
            background: #fff
        .photo-name
          position: absolute
          bottom: -20px
          width: 100%
          height: 20px
          background: rgba(0, 0, 0, .4)
          color: #fff
          line-height: 20px
          font-size: 14px
          text-align: center
          transition: all 0.2s ease-in
</style>
