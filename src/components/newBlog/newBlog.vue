<template>
  <div class="newBlog" v-title data-title="写博客">
    <div class="top">写博客</div>
    <div class="new-main">
      <el-form class="title-group" :model="newBlog" label-width="60px" label-position="left">
        <el-form-item label="标题">
          <el-input v-model="newBlog.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="分组" class="group">
          <el-select v-model="newBlog.group" placeholder="选择分组">
            <el-option v-for="item in groupOption" :value="item" :key="item"></el-option>
          </el-select>
          <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
          <el-button v-show="isShow" type="primary" @click="showInput">新建分组</el-button>
          <el-input
            class="new-blog-group-input"
            v-show="!isShow"
            v-model="newGroup"
            placeholder=""
            @blur="handleInputConfirm"
            ref="newGroupInput"></el-input>
        </el-form-item>
      </el-form>
      <vue-ueditor ref="vueUeditor"></vue-ueditor>
      <div class="new-blog-submit">
        <el-button>取消</el-button>
        <el-button type="primary" @click="onSubmit">发表</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import vueUeditor from '@/components/vueUeditor/vueUeditor';
  import Vue from 'vue';
  import router from '../../router';

  export default {
    props: {
      user: {
        type: Object
      }
    },
    data() {
      return {
        groupOption: [],
        newBlog: {
          title: '',
          group: ''
        },
        isShow: true,
        newGroup: ''
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!', this.newBlog);
        // 操作子组件里的方法
        var content = this.$refs.vueUeditor.geteditor();

        if (this.newBlog.title !== '' && content !== '') {
          this.$http.post('/newBlog', {
            group: this.newBlog.group || this.newGroup || '',
            title: this.newBlog.title,
            content: content
          }).then(response => {
            var result = response.body;
            if (result.result === '1') {
              this.$message.success('发表博客成功');
              router.push({name: 'blogDetail', params: {user: this.user.showUser.user, blogId: result.blogId}});
            }
          }, response => {
            // error callback
          });
        } else if (this.newBlog.title === '') {
          this.$message.error('标题不能为空');
        } else if (content === '') {
          this.$message.error('内容不能为空');
        }
      },
      showInput() {
        this.isShow = false;
        this.$nextTick(_ => {
          this.$refs.newGroupInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let newGroup = this.newGroup;
        if (newGroup) {
          return;
        }
        this.isShow = true;
      },
      getGroupOption() {
        var self = this;
        self.pdzTimer.getStatus = setInterval(function () {
          if (self.user.showUser.user) {
            clearInterval(self.pdzTimer.getStatus);
            self.$http.get('/getBlogGroup?user=' + self.user.showUser.user).then(response => {
              // success callback
              var groups = response.body.group;
              if (!groups) {
                return;
              }
              for (var i = 0; i < groups.length; i++) {
                // this.groupOption[i] = groups[i].groupName;
                Vue.set(self.groupOption, i, groups[i].groupName);
              }
              console.log(groups, self.groupOption);
            }, response => {
              // error callback
            });
          }
        }, 50);
      }
    },
    components: {
      vueUeditor
    },
    created() {
      this.getGroupOption();
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .newBlog
    .top
      box-sizing: border-box
      padding-left: 20px
      background: rgba(88, 183, 255, .3)
      height: 35px
      line-height: 35px
      font-size: 14px
      font-weight: 700
    .new-main
      box-sizing: border-box
      padding: 20px
      background: #FFFFFF
      .title-group
        .group
          .new-blog-group-input
            display: inline-block
            width: 88px
      .new-blog-submit
        text-align: right
        margin: 20px 30px 20px 0
</style>
