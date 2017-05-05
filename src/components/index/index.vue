<template>
  <div>
    <new-mood></new-mood>
    <div v-for="statu in statusData">
      <status :statu="statu"></status>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import newMood from '@/components/newMood/newMood';
  import status from '@/components/status/status';

  export default {
    data() {
      return {
        statusData: [
          {
            type: 'mood',
            time: 111111,
            user: 'auven',
            name: '张剑',
            avatar: '/upload/avatar/1493144785757.jpg',
            body: {
              text: '11111',
              img: []
            },
            comments: [
              {
                time: 111111,
                user: 'gyt',
                name: '高玉婷',
                avatar: '/upload/avatar/1493144785757.jpg',
                content: '11111111111'
              },
              {
                time: 22222222,
                user: 'gyt',
                name: '高玉婷',
                avatar: '/upload/avatar/1493144785757.jpg',
                content: '22222222222'
              }
            ],
            thumbsUp: [
              {
                user: 'auven',
                name: '张剑'
              },
              {
                user: 'gyt',
                name: '高玉婷'
              }
            ]
          },
          {
            type: 'mood',
            time: 22222222,
            user: 'gyt',
            name: '高玉婷',
            avatar: '/upload/avatar/1493144785757.jpg',
            body: {
              text: '222222',
              img: ['/upload/avatar/1493144785757.jpg']
            },
            comments: [
              {
                time: 111111,
                user: 'gyt',
                name: '高玉婷',
                avatar: '/upload/avatar/1493144785757.jpg',
                content: '11111111111'
              },
              {
                time: 22222222,
                user: 'gyt',
                name: '高玉婷',
                avatar: '/upload/avatar/1493144785757.jpg',
                content: '22222222222'
              }
            ],
            thumbsUp: [
              {
                user: 'auven',
                name: '张剑'
              },
              {
                user: 'gyt',
                name: '高玉婷'
              }
            ]
          },
          {
            type: 'mood',
            time: 22222222,
            user: 'gyt',
            name: '高玉婷',
            avatar: '/upload/avatar/1493144785757.jpg',
            body: {
              text: '222222',
              img: ['/upload/avatar/1493144785757.jpg', '/upload/avatar/1493144785757.jpg']
            },
            comments: [
              {
                time: 111111,
                user: 'gyt',
                name: '高玉婷',
                avatar: '/upload/avatar/1493144785757.jpg',
                content: '11111111111'
              },
              {
                time: 22222222,
                user: 'gyt',
                name: '高玉婷',
                avatar: '/upload/avatar/1493144785757.jpg',
                content: '22222222222'
              }
            ],
            thumbsUp: [
              {
                user: 'auven',
                name: '张剑'
              },
              {
                user: 'gyt',
                name: '高玉婷'
              }
            ]
          },
          {
            type: 'mood',
            time: 22222222,
            user: 'gyt',
            name: '高玉婷',
            avatar: '/upload/avatar/1493144785757.jpg',
            body: {
              text: '222222',
              img: ['/upload/avatar/1493144785757.jpg', '/upload/avatar/1493144785757.jpg', '/upload/avatar/1493144785757.jpg']
            },
            comments: [
              {
                time: 111111,
                user: 'gyt',
                name: '高玉婷',
                avatar: '/upload/avatar/1493144785757.jpg',
                content: '11111111111'
              },
              {
                time: 22222222,
                user: 'gyt',
                name: '高玉婷',
                avatar: '/upload/avatar/1493144785757.jpg',
                content: '22222222222'
              }
            ],
            thumbsUp: [
              {
                user: 'auven',
                name: '张剑'
              },
              {
                user: 'gyt',
                name: '高玉婷'
              }
            ]
          }
        ]
      };
    },
    components: {
      newMood,
      status
    },
    methods: {

    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
