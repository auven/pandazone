<template>
  <div>
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
    mounted() {
      this.getStatus();
    },
    methods: {
      getStatus() {
        console.log('hahafdfgdgdfgfsddfgj', this.user.showUser);
        if (this.user.showUser.user) {
          this.$http.get('/getStatus?user=' + this.user.showUser.user + '&all=true&' + 'type=all').then(response => {
            var result = response.body;
            if (result.result === '1') {
              this.statusData = result.status;
            }
          }, response => {
            // error callback
          });
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
