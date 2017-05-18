import Vue from 'vue';
import Router from 'vue-router';
import register from '@/components/register/register';
import page404 from '@/components/404/404';
import login from '@/components/login/login';
import home from '@/components/home/home';
import index from '@/components/index/index';
import blog from '@/components/blog/blog';
import newBlog from '@/components/newBlog/newBlog';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: '',
      component: home,
      children: [
        {
          path: '',
          name: 'index',
          component: index
        }
      ]
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
      path: '/:user',
      name: 'user',
      // 请注意注意注意注意注意，模板必须包含在一个div中
      component: home,
      children: [
        {
          path: 'mood',
          name: 'mood',
          component: {template: '<div>说说页面</div>'}
        },
        {
          path: 'blog',
          name: 'blog',
          component: blog
        },
        {
          path: 'blog/detail',
          name: 'blogDetail',
          component: {template: '<div>博客详情页面</div>'}
        },
        {
          path: 'blog/new',
          name: 'blogNew',
          component: newBlog
        },
        {
          path: 'blog/modify',
          name: 'blogModify',
          component: {template: '<div>修改博客页面</div>'}
        },
        {
          path: 'album',
          name: 'album',
          component: {template: '<div>相册页面</div>'}
        },
        {
          path: 'album/:name',
          name: 'albumDetail',
          component: {template: '<div>相册---{{ $route.params.name }}</div>'}
        },
        {
          path: 'album/new',
          name: 'albumNew',
          component: {template: '<div>新建相册页面</div>'}
        },
        {
          path: 'album/upload',
          name: 'albumUpload',
          component: {template: '<div>上传照片页面</div>'}
        },
        {
          path: 'message',
          name: 'message',
          component: {template: '<div>留言页面</div>'}
        },
        {
          path: 'friends',
          name: 'friends',
          component: {template: '<div>好友页面</div>'}
        },
        {
          path: 'profile',
          name: 'profile',
          component: {template: '<div>个人档页面</div>'}
        },
        {
          path: 'profile/modify',
          name: 'profileModify',
          component: {template: '<div>修改个人档页面</div>'}
        },
        {
          path: '*',
          name: '4040',
          component: page404
        }
      ]
    },
    {
      path: '*',
      name: '404',
      component: page404
    }
  ]
});
