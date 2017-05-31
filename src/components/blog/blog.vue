<template>
  <div class="blog" v-title data-title="博客">
    <div class="top"><span v-show="user.isLoginUser">我的博客</span><span v-show="!user.isLoginUser">Ta的博客</span></div>
    <div class="blog-main">
      <div class="left">
        <div class="new-blog-btn" v-if="user.isLoginUser"><el-button type="primary" @click="newBlogBtn">写博客</el-button></div>
        <div class="blog-main-wrap">
          <div class="blog-item" v-for="blog in blogs">
            <div class="title"><router-link :to="{name: 'blogDetail', params: {user: user.showUser.user, blogId: blog._id}}">{{blog.body.title}}</router-link></div>
            <div class="info-op">
              <span class="time">{{moment(blog.time).format('YYYY年MM月DD日 HH:mm')}}&nbsp;&nbsp;</span>
              <span class="blog-op" v-if="user.isLoginUser">
                <el-dropdown trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="'{ type: \'delete\', id: \''+ blog._id +'\' }'">删除</el-dropdown-item>
                    <el-dropdown-item :command="'{ type: \'update\', id: \''+ blog._id +'\' }'">编辑</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </div>
          </div>

        </div>
        <div class="page" v-if="blogs.length > 0">
          <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            :total="total">
          </el-pagination>
        </div>
        <div style="text-align: center; margin: 20px" v-if="blogs.length === 0">
          尚无博客
        </div>
      </div>
      <div class="right">
        <div class="user-blog-info">
          <div class="user-avatar">
            <img :src="user.showUser.avatar">
          </div>
          <div class="blogs-info">
            <div class="user-name">
              {{user.showUser.name}}
            </div>
            <div class="blog-total">
              <span class="total">{{total}}</span>&nbsp;篇博客
            </div>
          </div>
        </div>
        <div class="blog-group">
          <div class="group-top">博客分组<div class="group-op">管理</div></div>
          <div class="groups">
            <div class="group-item selected">全部博客<div class="total">({{total}})</div></div>
            <div class="group-item" v-for="group in blogGroup">{{group.groupName}}<div class="total">({{group.blogs.length}})</div></div>
          </div>
        </div>
        <div class="blog-search">
          <div class="search-top">搜索</div>
          <el-input
            placeholder="请输入关键字"
            icon="search"
            v-model="input2"
            :on-icon-click="handleIconClick">
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import router from '../../router';
  import Vue from 'vue';

  export default {
    props: {
      user: {
        type: Object
      }
    },
    data() {
      return {
        input2: '',
        blogs: [],
        total: 0,
        currentPage: 1,
        blogGroup: []
      };
    },
    created() {
      if (this.$route.query.page) {
        this.currentPage = -(-this.$route.query.page); // 将字符串转为数字
      }
    },
    mounted() {
      this.getBlogs();
    },
    methods: {
      newBlogBtn() {
        router.push({name: 'blogNew'});
      },
      handleIconClick(ev) {
        console.log(ev);
      },
      handleCommand(command) {
        /* eslint no-eval: "error" */
        /* eslint-env browser */
        var obj = window.eval('(' + command + ')');
//        this.$message('click on item ' + command);
        console.log(command, obj);
        if (obj.type === 'delete') {
          console.log('shanchu');
          this.dls(obj.id);
        }
        if (obj.type === 'update') {
          console.log('修改');
          this.modify(obj.id);
        }
      },
      getBlogs() {
        var self = this;
        self.pdzTimer.getStatus = setInterval(function () {
          var page = self.$route.query.page || 1;
          if (self.user.showUser.user) {
            clearInterval(self.pdzTimer.getStatus);
            self.$http.get('/getBlogs?user=' + self.user.showUser.user + '&page=' + page + '&pageSize=' + 10).then(response => {
              var result = response.body;
              if (result.result === '1') {
                self.blogs = result.blogs;
                self.total = result.total;
              }
            }, response => {
              // error callback
            });

            self.getGroup();
          }
        }, 50);
      },
      handleCurrentChange(val) {
        router.push({path: this.$route.path, query: {page: val}});
        this.getBlogs();
      },
      getGroup() {
        this.$http.get('/getBlogGroup?user=' + this.user.showUser.user).then(response => {
          // success callback
          var groups = response.body.group;
          if (!groups) {
            return;
          }
          for (var i = 0; i < groups.length; i++) {
            // this.groupOption[i] = groups[i].groupName;
            Vue.set(this.blogGroup, i, groups[i]);
          }
          console.log(groups, this.blogGroup);
        }, response => {
          // error callback
        });
      },
      dls(id) {
        this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/dl', {
            type: 'blog',
            id: id
          }).then(response => {
            var result = response.body;
            if (result.result === '1') {
              this.$message.success('删除博客成功');
              this.getBlogs();
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      modify(id) {
        router.push({name: 'blogModify', params: {user: this.user.showUser.user, blogId: id}});
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .blog
    box-sizing: border-box
    padding: 20px
    background: #ffffff
    .top
      border-bottom: 1px solid #C0CCDA
      span
        display: inline-block
        padding: 12px 30px
        font-size: 16px
        font-weight: 700
        color: #58B7FF
        border-bottom: 3px solid #58B7FF
    .blog-main
      overflow: hidden
      .left
        float: left
        width: 600px
        .new-blog-btn
          padding: 15px
          border-bottom: 1px solid #C0CCDA
        .blog-main-wrap
          .blog-item
            overflow:hidden
            height: 35px
            line-height: 35px
            .title
              float: left
              width: 350px
              a
                font-size: 14px
                color: #475669
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis
                text-decoration: none
                &:hover
                  text-decoration: underline
            .info-op
              float: right
              width: 240px
              font-size: 13px
              text-align: right
              color: #99a9bf
              .blog-op .el-dropdown .el-dropdown-link
                color: #99a9bf
                font-size: 13px
                cursor: pointer
                &:hover
                  color: #FF4949
        .page
          margin-top: 20px
          text-align: center
      .right
        padding-top: 20px
        float: right
        width: 230px
        .user-blog-info
          position: relative
          padding-bottom: 20px
          border-bottom: 1px solid #C0CCDA
          .user-avatar
            img
              width: 80px
              height: 80px
              border: 1px dashed #C0CCDA
              border-radius: 5px
          .blogs-info
            position: absolute
            width: 130px
            top: 0
            left: 90px
            text-align: center
            .user-name
              height: 40px
              line-height: 40px
              font-size: 18px
              font-weight: 700
            .blog-total
              height: 40px
              line-height: 40px
              color: #475669
              .total
                font-size: 24px
                font-weight: 700
                color: #58B7FF
        .blog-group
          padding: 10px 0
          font-size: 14px
          border-bottom: 1px solid #C0CCDA
          .group-top
            padding: 10px 0
            font-weight: 700
            overflow: hidden
            .group-op
              float: right
          .groups
            > div
              cursor: pointer
              padding: 10px 0
            .group-item
              color: #58B7FF
              .total
                  float: right
              &.selected
                background: rgba(88, 183, 255, .3)
                color: #475669
        .blog-search
          margin: 20px 0 40px 0
          .search-top
            margin-bottom: 10px
            font-weight: 700
            font-size: 14px
</style>
