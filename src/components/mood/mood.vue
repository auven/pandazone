<template>
  <div class="mood" v-title data-title="说说">
    <div class="top"><span v-show="user.isLoginUser">我的说说</span><span v-show="!user.isLoginUser">Ta的说说</span></div>
    <div class="mood-main">
      <div class="left">
        <new-mood @subNewMood="getStatus" class="mood-item" v-show="user.isLoginUser"></new-mood>
        <div v-for="status in statusData">
          <status :status="status" :user="user" @refresh="getStatus" class="mood-item"></status>
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
        <div style="text-align: center; margin: 20px" v-if="statusData.length === 0">
          尚无说说
        </div>
      </div>
      <div class="right">
        <div class="user-mood-info">
          <div class="user-avatar">
            <img :src="user.showUser.avatar">
          </div>
          <div class="moods-info">
            <div class="user-name">
              {{ user.showUser.name }}
            </div>
            <div class="mood-total">
              <span class="total">{{ total }}</span>&nbsp;篇说说
            </div>
          </div>
        </div>
      </div>
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
            self.$http.get('/getStatus?user=' + self.user.showUser.user + '&all=false&' + 'type=mood&' + 'page=' + page + '&pageSize=' + self.pageSize).then(response => {
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
//        console.log(this.$route);
        router.push({path: this.$route.path, query: {page: val}});
        this.getStatus();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .mood
    box-sizing: border-box
    padding: 20px
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
    .mood-main
      overflow: hidden
      .right
        float: right
        width: 230px
        .user-mood-info
          position: relative
          padding-bottom: 20px
          border-bottom: 1px solid #C0CCDA
          .user-avatar
            img
              width: 80px
              height: 80px
              border: 1px dashed #C0CCDA
              border-radius: 5px
          .moods-info
            position: absolute
            width: 130px
            top: 0
            left: 90px
            text-align: center
            .user-name
              height: 40px
              line-height: 40px
              font-size: 18px
              font-weight: 700
            .mood-total
              height: 40px
              line-height: 40px
              color: #475669
              .total
                font-size: 24px
                font-weight: 700
                color: #58B7FF
      .left
        width: 600px
        float: left
        .mood-item
          border: 1px dashed #C0CCDA
          border-radius: 5px
        .block
          text-align: center
</style>
