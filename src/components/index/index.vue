<template>
  <div class="index">
    <new-mood></new-mood>
    <div v-for="status in statusData">
      <status :status="status"></status>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import newMood from '@/components/newMood/newMood';
  import status from '@/components/status/status';

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
    watch: {
      user: function () {
        // this.$nextTick() 里面的函数在DOM渲染后执行
        // 放在这里才能取到dom
        this.$nextTick(function () {
          this.getStatus();
        });
      }
    },
    created() {
      this.getStatus();
    },
    methods: {
      getStatus() {
        // 使用定时的方式来获取props
        var self = this;
        var timer = setInterval(function () {
          console.log('hahafdfgdgdfgfsddfgj', self.user.loginUser.user);
          if (self.user.loginUser.user) {
            self.$http.get('/getStatus?user=' + self.user.loginUser.user + '&all=true&' + 'type=all').then(response => {
              var result = response.body;
              if (result.result === '1') {
                clearInterval(timer);
                self.statusData = result.status;
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
  .index
    width: 960px
    margin: 30px auto
</style>
