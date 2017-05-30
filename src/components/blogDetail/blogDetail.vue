<template>
  <div class="blogDetail" v-title data-title="浏览博客">
    <div class="top"><span>浏览博客</span></div>
    <div class="blog-detail">
      <div class="blog-op" v-if="user.isLoginUser"><i class="el-icon-edit" @click="modify"></i><i class="el-icon-delete" @click="dls({id: blog._id, type: blog.type})"></i></div>
      <div class="blog-title">
        <div class="title">{{blog.body.title}}</div>
        <div class="info">
          <span>{{moment(blog.time).format('YYYY年MM月DD日 HH:mm')}}&nbsp;&nbsp;|&nbsp;&nbsp;</span><span>赞：{{blog.thumbsUp.length}}&nbsp;&nbsp;|&nbsp;&nbsp;</span><span>评论：{{blog.comments.length}}&nbsp;&nbsp;|&nbsp;&nbsp;</span><span>浏览：{{blog.body.visits}}</span>
        </div>
      </div>
      <div class="blog-content">
        <div v-html="blog.body.content"></div>
      </div>
      <div class="blog-detail-op">
        <div class="thumbs-up"><i :class="'icon-dianzan' + hasClass" @click="thumbsUp({id: blog._id, type: blog.type})"></i>({{blog.thumbsUp.length}})</div>
        <div class="comments">
          <div class="comment-top">评论({{blog.comments.length}})</div>
          <div class="item" v-for="comment in blog.comments">
            <div class="avatar"><img :src="comment.avatar"></div>
            <div class="wrap">
              <div class="content">
                <router-link :to="'/' + comment.user" class="name">{{ comment.name }}</router-link>&nbsp;：{{comment.content}}
              </div>
              <div class="time">{{ moment(comment.time).format('YYYY年MM月DD日 HH:mm') }}&nbsp;&nbsp;&nbsp;&nbsp;<span
                class="delete" v-show="comment.user === user.loginUser.user"
                @click="dlComment({id: blog._id, type: blog.type, comment: comment})">删除</span></div>
            </div>
          </div>
        </div>
        <div class="newComment">
          <el-input
            class="content"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="我也说一句"
            v-model="content">
          </el-input>
          <el-button class="sbmContent" type="primary" size="mini" @click="comment({id: blog._id, type: blog.type})">评论</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import router from '../../router';

  export default {
    props: {
      user: {
        type: Object
      }
    },
    data() {
      return {
        blog: {
          body: {
            title: '',
            content: '',
            visits: 0
          },
          comments: [],
          thumbsUp: []
        },
        content: ''
      };
    },
    computed: {
      hasThumbsUp: function () {
        var flag = false;
        for (var i = 0; i < this.blog.thumbsUp.length; i++) {
          if (this.blog.thumbsUp[i].user === this.user.loginUser.user) {
            flag = true;
            break;
          }
        }
        return flag;
      },
      hasClass: function () {
        if (this.hasThumbsUp) {
          return ' has';
        } else {
          return '';
        }
      }
    },
    created() {
      this.getBlogDetail();
    },
    methods: {
      getBlogDetail() {
        this.$http.get('/getBlogDetail?blogId=' + this.$route.params.blogId).then(response => {
          var result = response.body;
          if (result.result === '1') {
            this.blog = result.blog;
          }
        }, response => {
          // error callback
        });
      },
      thumbsUp(op) {
        console.log(op);
        this.$http.post('/thumbsUp', {
          type: op.type,
          id: op.id,
          status: this.hasThumbsUp
        }).then(response => {
          var result = response.body;
          if (result.result === '1') {
            // this.$message.success('点赞成功');
            this.getBlogDetail();
          }
        });
      },
      comment(op) {
        console.log(op, this.content);
        if (this.content === '') {
          this.$message.warning('别调皮，你都还没写东西，发表啥！！！');
          return;
        }
        this.$http.post('/addComment', {
          type: op.type,
          id: op.id,
          content: this.content
        }).then(response => {
          var result = response.body;
          if (result.result === '1') {
            this.$message.success('发表评论成功');
            this.getBlogDetail();
            this.content = '';
          }
        });
      },
      dlComment(obj) {
        console.log(obj);
        this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/dlComment', {
            type: obj.type,
            id: obj.id,
            commentId: obj.comment._id
          }).then(response => {
            var result = response.body;
            if (result.result === '1') {
              this.$message.success('删除评论成功');
              this.getBlogDetail();
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      dls(op) {
        console.log(op);
        this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/dl', {
            type: op.type,
            id: op.id
          }).then(response => {
            var result = response.body;
            if (result.result === '1') {
              this.$message.success('删除博客成功');
              router.push({name: 'blog', params: {user: this.user.showUser.user}});
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      modify() {
        router.push({name: 'blogModify', params: {user: this.user.showUser.user, blogId: this.blog._id}});
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .blogDetail
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
    .blog-detail
      color: #5e6d82
      padding: 20px 0
      .blog-op
        text-align: right
        i
          display: inline-block
          padding: 0 10px
          cursor: pointer
          &:hover
            color: #58B7FF
      .blog-title
        text-align: center
        margin-bottom: 20px
        .title
          padding: 20px
          font-size: 20px
          font-weight: 700
        .info
          font-size: 13px
      .blog-content
        overflow: auto
      .blog-detail-op
        padding: 10px
        .thumbs-up
          text-align: center
          margin: 10px
          color: #99a9bf
          i
            font-size: 40px
            cursor: pointer
            &:hover
              color: #324057
          .has
            color: #58B7FF
            &:hover
              color: #58B7FF
        .comments
          width: 590px
          font-size: 13px
          line-height: 1.33
          > div
            margin: 10px 0
          .comment-top
            color: #58B7FF
            font-size: 14px
          .item
            overflow: hidden
            > div
              float: left
            .avatar
              margin-right: 10px
              img
                width: 30px
                height: 30px
                border-radius: 50%
            .wrap
              width: 518px
              .content
                font-weight: normal
                .name
                  color: #58B7FF
                  text-decoration: none
                  font-weight: 700
                  &:hover
                    text-decoration: underline
              .time
                font-size: 13px
                font-weight: normal
                color: #99a9bf
                .delete
                  cursor: pointer
                  &:hover
                    color: #FF4949
                    text-decoration: underline
        .newComment
          width: 590px
          margin-bottom: 10px
          position: relative
          .sbmContent
            position: absolute
            bottom: 5px
            right: 8px
</style>
