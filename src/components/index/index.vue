<template>
  <div class="index" v-title data-title="首页">
    <div class="left">
      <new-mood @subNewMood="getStatus"></new-mood>
      <div v-for="status in statusData">
        <status :status="status" :user="user" @refresh="getStatus"></status>
      </div>
      <div class="block" v-if="statusData.length > 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div style="text-align: center;  margin: 20px" v-if="statusData.length === 0">
        尚无动态
      </div>
    </div>
    <div class="right">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import newMood from '@/components/newMood/newMood';
  import status from '@/components/status/status';
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
        statusData: [],
        total: 0,
        currentPage: 1,
        pageSize: 10
      };
    },
    components: {
      newMood,
      status
    },
    created() {
      if (this.$route.query.page) {
        this.currentPage = -(-this.$route.query.page); // 将字符串转为数字
      }
    },
    mounted() {
      this.getStatus();
    },
    watch: {
      statusData: function () {
        this.$nextTick(function () {
          console.log('this.$nextTick 等dom加载完成就执行');
          this.initImgbox();
          this.setPswp('.mood-img-box-hook');
        });

        console.log('没等dom加载完成就执行');
      }
    },
    methods: {
      getStatus() {
        // 使用定时的方式来获取props
        var self = this;
        self.pdzTimer.getStatus = setInterval(function () {
          var page = self.$route.query.page || 1;
          console.log('hahafdfgdgdfgfsddfgj', self.user.loginUser.user, page);
          if (self.user.loginUser.user) {
            clearInterval(self.pdzTimer.getStatus);
            self.$http.get('/getStatus?user=' + self.user.loginUser.user + '&all=true&' + 'type=all&' + 'page=' + page + '&pageSize=' + self.pageSize).then(response => {
              var result = response.body;
              if (result.result === '1') {
                self.statusData = result.status;
                self.total = result.total;
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getStatus();
      },
      handleCurrentChange(val) {
        // 这里不清除会一直循环
        if (this.pdzTimer.getStatus) {
          clearInterval(this.pdzTimer.getStatus);
        }
        router.push({path: '/', query: {page: val}});
        this.getStatus();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .index
    overflow: hidden
    .left
      width: 590px
      float: left
      .block
        text-align: center
    .right
      float: right
      width: 290px
      background: #fff
      height: 600px
      opacity: 0.5
</style>
