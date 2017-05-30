<template>
  <div class="status">
    <div class="status-user">
      <div class="avatar">
        <img :src="status.avatar">
      </div>
      <div class="info">
        <div class="name">
          <router-link :to="'/' + status.user">{{ status.name }}</router-link>
        </div>
        <div class="time">{{ moment(status.time).format('YYYY年MM月DD日 HH:mm') }}&nbsp;&nbsp;&nbsp;&nbsp;<span class="delete" v-show="status.user === user.loginUser.user" @click="dls({id: status._id, type: status.type})">删除</span></div>
      </div>
    </div>
    <div class="status-body">
      <div class="moodBody" v-if="status.type === 'mood'">
        <div class="text">{{ status.body.text }}</div>
        <div :class="imgBoxClass + ' mood-img-box-hook'" v-if="status.body.img.length > 0">
          <div class="imgItem" v-for="img in status.body.img">
            <img :src="img">
          </div>
        </div>
      </div>
      <div class="blogBody" v-if="status.type === 'blog'">
        <router-link :to="{name: 'blogDetail', params: {user: status.user, blogId: status._id}}"><i class="el-icon-document"></i><span class="title">{{ status.body.title }}</span></router-link>
      </div>
    </div>
    <div class="status-op">
      <i :class="'icon-dianzan' + hasClass" @click="thumbsUp({id: status._id, type: status.type})"></i>
      <i class="icon-pinglun" @click="snc"></i>
    </div>
    <div class="newComment" v-show="showNewComment">
      <el-input
        class="content"
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 4}"
        placeholder="我也说一句"
        v-model="content">
      </el-input>
      <el-button class="sbmContent" type="primary" size="mini" @click="comment({id: status._id, type: status.type})">评论</el-button>
    </div>
    <div class="thumbs-up">
      <i class="icon-dianzan"></i>
      <span v-for="user in status.thumbsUp"><router-link :to="'/' + user.user">{{ user.name }}</router-link><span
        v-if="status.thumbsUp.indexOf(user) !== status.thumbsUp.length - 1">、</span></span>
      共<span>{{ status.thumbsUp.length }}</span>人觉得很赞


    </div>
    <div class="comment">
      <div class="item" v-for="comment in status.comments">
        <div class="avatar"><img :src="comment.avatar"></div>
        <div class="wrap">
          <div class="content">
            <router-link :to="'/' + comment.user" class="name">{{ comment.name }}</router-link>&nbsp;：{{ comment.content
            }}


          </div>
          <div class="time">{{ moment(comment.time).format('YYYY年MM月DD日 HH:mm') }}&nbsp;&nbsp;&nbsp;&nbsp;<span class="delete" v-show="comment.user === user.loginUser.user" @click="dlComment({id: status._id, type: status.type, comment: comment})">删除</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "response" }] */
  export default {
    props: {
      status: {
        type: Object
      },
      user: {
        type: Object
      }
    },
    data() {
      return {
        content: '',
        showNewComment: false
      };
    },
    created() {
    },
    mounted() {
    },
    computed: {
      imgBoxClass: function () {
        if (this.status.body.img.length === 1) {
          return 'imgBox-1';
        }
        if (this.status.body.img.length === 2) {
          return 'imgBox-2';
        }
        if (this.status.body.img.length >= 3) {
          return 'imgBox-3';
        }
      },
      hasThumbsUp: function () {
        var flag = false;
        for (var i = 0; i < this.status.thumbsUp.length; i++) {
          if (this.status.thumbsUp[i].user === this.user.loginUser.user) {
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
    methods: {
      dls(op) {
        console.log(op);
        this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
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
              this.$message.success('删除成功');
              this.$emit('refresh');
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
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
            this.$emit('refresh');
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
            this.$emit('refresh');
            this.content = '';
            this.showNewComment = false;
          }
        });
      },
      snc() {
        this.showNewComment = !this.showNewComment;
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
              this.$emit('refresh');
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .status
    box-sizing: border-box
    margin: 20px 0
    padding: 16px
    overflow: hidden
    background: #ffffff
    font-size: 13px
    font-weight: 700
    color: #5e6d82
    .status-user
      overflow: hidden
      margin-bottom: 12px
      > div
        float: left
      .avatar
        margin-right: 10px
        img
          width: 50px
          height: 50px
          border-radius: 50%
      .info
        font-size: 15px
        > div
          height: 25px
          line-height: 25px
        .name
          a
            color: #5e6d82
            text-decoration: none
            &:hover
              color: #1F2D3D
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
    .status-body
      font-size: 15px
      font-weight: normal
      .moodBody
        .text
          margin-bottom: 12px
        .imgBox-1
          .imgItem
            overflow: hidden
            img
              max-width: 100%
              max-height: 300px
        .imgBox-2
          .imgItem
            overflow: hidden
            display: inline-block
            box-sizing: border-box
            border: 2px solid #ffffff
            width: 40%
            position: relative
            img
              position: absolute
              top: 50%
              left: 50%
              transform: translate(-50%, -50%)
        .imgBox-3
          .imgItem
            overflow: hidden
            display: inline-block
            box-sizing: border-box
            border: 2px solid #ffffff
            width: 33.3333%
            position: relative
            img
              position: absolute
              top: 50%
              left: 50%
              transform: translate(-50%, -50%)
      .blogBody
        a
          display: flex
          align-items: center
          padding: 10px 20px
          background: rgba(112, 144, 218, 0.1)
          color: #5e6d82
          text-decoration: none
          line-height: 1.5
          transition: all 0.3s ease-in
          .el-icon-document
            display: inline-block
            margin-right: 12px
            font-size: 40px
          &:hover
            border-radius: 8px
            border: 1px dashed #58B7FF
            color: #58B7FF
    .status-op
      margin-bottom: 10px
      text-align: right
      border-bottom: 1px solid #eaeefb
      height: 40px
      line-height: 40px
      font-size: 22px
      color: #99a9bf
      > i:nth-child(1)
        display: inline-block
        margin-right: 20px
      i
        cursor: pointer
        &:hover
          color: #324057
      .has
        color: #58B7FF
        &:hover
          color: #58B7FF
    .newComment
      margin-bottom: 10px
      position: relative
      .sbmContent
        position: absolute
        bottom: 5px
        right: 8px
    .thumbs-up
      margin-bottom: 10px
      line-height: 20px
      font-size: 13px
      color: #58B7FF
      .icon-dianzan
        display: inline-block
        margin-right: 7px
        height: 20px
        line-height: 20px
        text-align: center
        width: 20px
        border-radius: 50%
        background: #58B7FF
        color: #ffffff
      a
        color: #58B7FF
        text-decoration: none
        &:hover
          text-decoration: underline
    .comment
      font-size: 13px
      line-height: 1.33
      > div
        margin: 10px 0
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
</style>
