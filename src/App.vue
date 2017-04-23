<template>
  <div id="app">
    <div class="main">
      <div class="main-wrapper">
        <div class="main-body">
          <v-header></v-header>
          <div class="main-box">
            <router-view></router-view>
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
      return {};
    },
    components: {
      'v-header': header,
      'v-footer': footer
    },
    methods: {}
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
      .main-body
        padding-bottom: 170px
        .main-box
          overflow: hidden
    .main-footer
      position: relative
      height: 170px
      margin: -170px auto 0 auto
</style>
