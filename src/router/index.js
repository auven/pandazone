import Vue from 'vue';
import Router from 'vue-router';
import register from '@/components/register/register';
import page404 from '@/components/404/404';
import login from '@/components/login/login';
import home from '@/components/home/home';
import index from '@/components/index/index';
import blog from '@/components/blog/blog';
import newBlog from '@/components/newBlog/newBlog';
import profile from '@/components/profile/profile';
import mood from '@/components/mood/mood';
import userIndex from '@/components/userIndex/userIndex';
import uploadImg from '@/components/uploadImg/uploadImg';
import album from '@/components/album/album';
import albumDetail from '@/components/albumDetail/albumDetail';
import friends from '@/components/friends/friends';
import message from '@/components/message/message';
import blogDetail from '@/components/blogDetail/blogDetail';
import blogModify from '@/components/blogModify/blogModify';

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
          path: '',
          name: 'userIndex',
          component: userIndex
        },
        {
          path: 'mood',
          name: 'mood',
          component: mood
        },
        {
          path: 'blog',
          name: 'blog',
          component: blog
        },
        {
          path: 'blog/detail/:blogId',
          name: 'blogDetail',
          component: blogDetail
        },
        {
          path: 'blog/new',
          name: 'blogNew',
          component: newBlog
        },
        {
          path: 'blog/modify/:blogId',
          name: 'blogModify',
          component: blogModify
        },
        {
          path: 'album',
          name: 'album',
          component: album
        },
        {
          path: 'album/new',
          name: 'albumNew',
          component: uploadImg
        },
        {
          path: 'album/:albumId',
          name: 'albumDetail',
          component: albumDetail
        },
        {
          path: 'album/upload',
          name: 'albumUpload',
          component: {template: '<div>上传照片页面</div>'}
        },
        {
          path: 'message',
          name: 'message',
          component: message
        },
        {
          path: 'friends',
          name: 'friends',
          component: friends
        },
        {
          path: 'profile',
          name: 'profile',
          component: profile
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
