// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import VueResource from 'vue-resource';
import App from './App';
import router from './router';

import './common/stylus/index.styl';

Vue.use(ElementUI);
Vue.use(VueResource);

Vue.config.productionTip = false;

// 定义全局变量
Vue.prototype.pdzTimer = {};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
