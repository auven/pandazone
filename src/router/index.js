import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import register from '@/components/register/register';
import page404 from '@/components/404/404';
import login from '@/components/login/login';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/recoverPass',
      name: 'recoverPass',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/home',
      name: 'home',
      component: {template: '<div>我的主页</div>'}
    },
    {
      path: '/mood',
      name: 'mood',
      component: {template: '<div>说说页面</div>'}
    },
    {
      path: '/blog',
      name: 'blog',
      component: {template: '<div>博客页面</div>'}
    },
    {
      path: '/blog/detail',
      name: 'blogDetail',
      component: {template: '<div>博客详情页面</div>'}
    },
    {
      path: '/blog/new',
      name: 'blogNew',
      component: {template: '<div>新建博客页面</div>'}
    },
    {
      path: '/blog/modify',
      name: 'blogModify',
      component: {template: '<div>修改博客页面</div>'}
    },
    {
      path: '/album',
      name: 'album',
      component: {template: '<div>相册页面</div>'}
    },
    {
      path: '/album/:name',
      name: 'albumDetail',
      component: {template: '<div>相册---{{ $route.params.name }}</div>'}
    },
    {
      path: '/album/new',
      name: 'albumNew',
      component: {template: '<div>新建相册页面</div>'}
    },
    {
      path: '/album/upload',
      name: 'albumUpload',
      component: {template: '<div>上传照片页面</div>'}
    },
    {
      path: '/friends',
      name: 'friends',
      component: {template: '<div>好友页面</div>'}
    },
    {
      path: '/profile',
      name: 'profile',
      component: {template: '<div>个人档页面</div>'}
    },
    {
      path: '/album/modify',
      name: 'profileModify',
      component: {template: '<div>修改个人档页面</div>'}
    },
    {
      path: '*',
      name: '404',
      component: page404
    }
  ]
});
