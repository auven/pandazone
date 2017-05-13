<template>
  <div class="index">
    <div class="left">
      <new-mood @subNewMood="getStatus"></new-mood>
      <div v-for="status in statusData">
        <status :status="status"></status>
      </div>
    </div>
    <div class="right">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import newMood from '@/components/newMood/newMood';
  import status from '@/components/status/status';
  import PhotoSwipe from 'photoswipe/dist/photoswipe.min';
  import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default.min';
  import $ from 'jquery';

  export default {
    props: {
      user: {
        type: Object
      }
    },
    data() {
      return {
        statusData: []
      };
    },
    components: {
      newMood,
      status
    },
    mounted() {
      this.getStatus();
    },
    updated() {
      // 放在这里才能取到dom
      // this.$nextTick 等dom完全加载完执行
      this.$nextTick(function () {
        console.log('this.$nextTick 等dom加载完成就执行');
        this.initImgbox();
        this.setPswp();
      });

      console.log('没等dom加载完成就执行');
    },
    methods: {
      getStatus() {
        // 使用定时的方式来获取props
        var self = this;
        self.pdzTimer.getStatus = setInterval(function () {
          console.log('hahafdfgdgdfgfsddfgj', self.user.loginUser.user);
          if (self.user.loginUser.user) {
            clearInterval(self.pdzTimer.getStatus);
            self.$http.get('/getStatus?user=' + self.user.loginUser.user + '&all=true&' + 'type=all').then(response => {
              var result = response.body;
              if (result.result === '1') {
                self.statusData = result.status;
              }
            }, response => {
              // error callback
            });
          }
        }, 50);
      },
      initImgbox() {
        console.log('initImgbox');

        // 让图片盒子里的每张图片外框宽高相等
        $('.mood-img-box-hook>.imgItem').each(function () {
          if ($(this).parent().attr('class').indexOf('1') === -1) {
            $(this).height($(this).width());
          }
        });

        // 让宽或高撑满整个盒子
        $('.mood-img-box-hook>.imgItem>img').each(function () {
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
        console.log('setPswp');

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
        initPhotoSwipeFromDOM('.mood-img-box-hook');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .index
    width: 960px
    margin: 30px auto
    overflow: hidden
    .left
      width: 590px
      float: left
    .right
      float: right
      width: 350px
      background: #000
      height: 600px
</style>
