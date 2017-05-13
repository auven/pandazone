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
        <div class="time">{{ status.time }}</div>
      </div>
    </div>
    <div class="status-body">
      <div class="moodBody" v-if="status.type === 'mood'">
        <div class="text">{{ status.body.text }}</div>
        <div :class="imgBoxClass + ' img-box-hook'" v-if="status.body.img.length > 0">
          <div class="imgItem" v-for="img in status.body.img">
            <img :src="img">
          </div>
          <!--<img class="preview-img" v-for="(img, index) in status.body.img" :src="img" height="100" @click="$preview.open(index, status.body.img)">-->
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
  import PhotoSwipe from 'photoswipe/dist/photoswipe.min';
  import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default.min';
  import $ from 'jquery';

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
      // 放在这里才能取到dom
      this.initImgbox();
      this.setPswp();
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
      initImgbox() {
        // 让图片盒子里的每张图片外框宽高相等
        $('.img-box-hook>.imgItem').each(function () {
          if ($(this).parent().attr('class').indexOf('1') === -1) {
            $(this).height($(this).width());
          }
        });

        // 让宽或高撑满整个盒子
        $('.img-box-hook>.imgItem>img').each(function () {
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
                // 图片加载完成
                // 必须添加上图片的尺寸
                imgItem.attr('data-size', imgObj.width + 'x' + imgObj.height);
                // 只有一张图片的不用处理
                if (imgItem.parent().attr('class').indexOf('1') !== -1) {
                  return;
                }
                if (imgObj.width > imgObj.height) {
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
      setPswp() {
        var initPhotoSwipeFromDOM = function (gallerySelector) {
          // 解析来自DOM元素幻灯片数据（URL，标题，大小...）
          // (children of gallerySelector)
          var parseThumbnailElements = function (el) {
            var thumbElements = el.childNodes;
            var numNodes = thumbElements.length;
            var items = [];
            var figureEl;
            var size;
            var item;
            var imgEl;

            for (var i = 0; i < numNodes; i++) {
              figureEl = thumbElements[i]; // <div class='imgItem'> element

              // 仅包括元素节点
              if (figureEl.nodeType !== 1) {
                continue;
              }
              imgEl = figureEl.children[0];

              size = figureEl.getAttribute('data-size').split('x');

              // 创建幻灯片对象
              item = {
                src: imgEl.getAttribute('src'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
              };

              item.el = figureEl; // 保存<div class='imgItem'>
              items.push(item);
            }

            return items;
          };

          // 查找最近的父节点
          var closest = function closest(el, fn) {
            return el && (fn(el) ? el : closest(el.parentNode, fn));
          };

          // 当用户点击缩略图触发
          var onThumbnailsClick = function (e) {
            console.log('anbc');
            e = e || window.event;
            console.log(e);
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            // 这里获取的就是我们点击的图片
            var eTarget = e.target || e.srcElement;
            console.log(eTarget);

            // find root element of slide
            var clickedListItem = closest(eTarget, function (el) {
              return (el.tagName && el.tagName.toUpperCase() === 'DIV');
            });
            console.log(clickedListItem);

            if (!clickedListItem) {
              return;
            }

            // find index of clicked item by looping through all child nodes
            // alternatively, you may define index via data- attribute
            var clickedGallery = clickedListItem.parentNode;            // 被点击的图片集盒子
            var childNodes = clickedListItem.parentNode.childNodes;     // 被点击的图片集
            var numChildNodes = childNodes.length;
            var nodeIndex = 0;
            var index;
            console.log(clickedGallery, childNodes);

            for (var i = 0; i < numChildNodes; i++) {
              if (childNodes[i].nodeType !== 1) {
                continue;
              }

              if (childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
              }
              nodeIndex++;
            }

            if (index >= 0) {
              // open PhotoSwipe if valid index found
              openPhotoSwipe(index, clickedGallery);
            }
            return false;
          };

          // 添加路由
          // parse picture index and gallery index from URL (#&pid=1&gid=2)
          var photoswipeParseHash = function () {
            var hash = window.location.hash.substring(1);
            var params = {};

            if (hash.length < 5) {
              return params;
            }

            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
              if (!vars[i]) {
                continue;
              }
              var pair = vars[i].split('=');
              if (pair.length < 2) {
                continue;
              }
              params[pair[0]] = pair[1];
            }

            if (params.gid) {
              params.gid = parseInt(params.gid, 10);
            }

            return params;
          };

          var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0];
            console.log(pswpElement);
            var gallery;
            var options;
            var items;

            items = parseThumbnailElements(galleryElement);

            // 这里可以定义参数
            options = {
              barsSize: {
                top: 100,
                bottom: 100
              },
              fullscreenEl: false,
              shareButtons: [
                {id: 'wechat', label: '分享微信', url: '#'},
                {id: 'weibo', label: '新浪微博', url: '#'},
                {id: 'download', label: '保存图片', url: '{{raw_image_url}}', download: true}
              ],

              // define gallery index (for URL)
              galleryUID: galleryElement.getAttribute('data-pswp-uid'),

              getThumbBoundsFn: function (index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0]; // find thumbnail
                var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                var rect = thumbnail.getBoundingClientRect();

                return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
              }

            };

            // PhotoSwipe opened from URL
            if (fromURL) {
              if (options.galleryPIDs) {
                // parse real index when custom PIDs are used
                for (var j = 0; j < items.length; j++) {
                  if (items[j].pid === index) {
                    options.index = j;
                    break;
                  }
                }
              } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
              }
            } else {
              options.index = parseInt(index, 10);
            }

            // exit if index not found
            if (isNaN(options.index)) {
              return;
            }

            if (disableAnimation) {
              options.showAnimationDuration = 0;
            }

            // Pass data to PhotoSwipe and initialize it
            gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI, items, options);
            gallery.init();
          };

          // loop through all gallery elements and bind events
          var galleryElements = document.querySelectorAll(gallerySelector);
          console.log(galleryElements);

          for (var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i + 1);
            galleryElements[i].onclick = onThumbnailsClick;
          }

          // Parse URL and open gallery if it contains #&pid=3&gid=1
          var hashData = photoswipeParseHash();
          if (hashData.pid && hashData.gid) {
            openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
          }
        };

        // execute above function
        initPhotoSwipeFromDOM('.img-box-hook');
      }
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
        .imgBox-1
          .imgItem
            height: 300px
            overflow: hidden
            img
                max-width: 100%
                max-height: 100%
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
