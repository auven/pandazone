<template>
  <div id="app">
    <div class="main">
      <div class="main-wrapper">
        <div class="main-body">
          <v-header></v-header>
          <div class="main-box">
            <!--<router-view></router-view>-->
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
    components: {
      'v-header': header,
      'v-footer': footer
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
      .main-body
        padding-bottom: 165px
        .main-box
          background: url(/static/images/72019_top.png) top center no-repeat
          overflow: hidden
    .main-footer
      position: relative
      height: 165px
      margin: -165px auto 0 auto
</style>
