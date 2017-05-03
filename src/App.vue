<template>
  <div id="app">
    <div class="main">
      <v-header :user="user"></v-header>
      <div class="main-wrapper">
        <div class="main-body">
          <div class="main-box">
            <router-view :user="user"></router-view>
          </div>
        </div>
      </div>
      <div class="main-footer">
        <v-footer></v-footer>
      </div>
    </div>
  </div>
</template>

<script>
  import header from '@/components/header/header';
  import footer from '@/components/footer/footer';

  export default {
    name: 'app',
    data() {
      return {
        user: {
          loginUser: {
            user: '',
            name: '',
            avatar: '',
            visits: ''
          },
          showUser: {
            user: '',
            name: '',
            avatar: '',
            visits: ''
          },
          isLoginUser: true
        }
      };
    },
    watch: {
      loginUser: {
        handler: function () {
          console.log(this.user);
        },
        deep: true
      }
    },
    components: {
      'v-header': header,
      'v-footer': footer
    },
    methods: {

    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .main
    position: fixed
    width: 100%
    height: 100%
    overflow: auto
    .main-wrapper
      min-height: 100%
      background: url(/static/images/72019_top.png) center 60px no-repeat
      overflow: hidden
      .main-body
        min-width: 960px
        margin: 0 auto
        margin-top: 60px
        padding-left: 20px
        padding-right: 20px
        padding-bottom: 170px
        .main-box
          overflow: hidden
    .main-footer
      position: relative
      height: 170px
      margin: -170px auto 0 auto
</style>
