<template>
  <div class="message" v-title data-title="留言">
    <div class="top"><span v-show="user.isLoginUser">我的留言</span><span v-show="!user.isLoginUser">Ta的留言</span></div>
    <div class="message-main">
      <div class="left">
        <div class="newMsg msg-item">
          <el-input
            class="msgText"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="说点儿什么吧"
            v-model="msgText">
          </el-input>
          <div class="newMsgBtn">
            <el-button class="btn" type="primary" @click="newMsg">发表</el-button>
          </div>
        </div>
        <div class="msg-item" v-for="item in msg">
          <div class="user">
            <div class="avatar">
              <img :src="item.avatar">
            </div>
            <div class="info">
              <div class="name">
                <router-link :to="'/' + item.author">{{ item.name }}</router-link>
              </div>
              <div class="time">{{ moment(item.time).format('YYYY年MM月DD日 HH:mm') }}&nbsp;&nbsp;&nbsp;&nbsp;<span class="delete" v-show="item.author === user.loginUser.user" @click="dls({id: item._id, user: user.showUser.user})">删除</span></div>
            </div>
          </div>
          <div class="msg-body">
            <div class="text">{{ item.content }}</div>
          </div>
        </div>
        <div style="text-align: center; margin: 20px" v-if="msg.length === 0">
          尚无留言
        </div>
      </div>
      <div class="right">
        <div class="user-msg-info">
          <div class="user-avatar">
            <img :src="user.showUser.avatar">
          </div>
          <div class="msg-info">
            <div class="user-name">
              {{ user.showUser.name }}
            </div>
            <div class="msg-total">
              <span class="total">{{ msg.length }}</span>&nbsp;条留言
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      user: {
        type: Object
      }
    },
    data() {
      return {
        msgText: '',
        msg: []
      };
    },
    mounted() {
      this.getMsg();
    },
    methods: {
      newMsg() {
        if (this.msgText === '') {
          this.$message.warning('别调皮，你都还没写东西，发表啥！！！');
          return;
        }

        this.$http.post('/newMsg', {
          user: this.user.showUser.user,
          content: this.msgText
        }).then(response => {
          var result = response.body;
          if (result.result === '1') {
            this.$message.success('发表留言成功');
            this.msgText = '';
            this.getMsg();
          }
        }, response => {
          // error callback
        });
      },
      getMsg() {
        // 使用定时的方式来获取props
        var self = this;
        self.pdzTimer.getStatus = setInterval(function () {
          var page = self.$route.query.page || 1;
          console.log('hahafdfgdgdfgfsddfgj', self.user.loginUser.user, page);
          if (self.user.showUser.user) {
            clearInterval(self.pdzTimer.getStatus);
            self.$http.get('/getMsg?user=' + self.user.showUser.user).then(response => {
              var result = response.body;
              if (result.result === '1') {
                self.msg = result.messages;
                // self.total = result.total;
              }
            }, response => {
              // error callback
            });
          }
        }, 50);
      },
      dls(obj) {
        this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/dlMsg', {
            user: obj.user,
            messageId: obj.id
          }).then(response => {
            var result = response.body;
            if (result.result === '1') {
              this.$message.success('删除留言成功');
              this.getMsg();
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
  .message
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
    .message-main
      overflow: hidden
      .right
        margin-top: 20px
        float: right
        width: 230px
        .user-msg-info
          position: relative
          padding-bottom: 20px
          border-bottom: 1px solid #C0CCDA
          .user-avatar
            img
              width: 80px
              height: 80px
              border: 1px dashed #C0CCDA
              border-radius: 5px
          .msg-info
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
            .msg-total
              height: 40px
              line-height: 40px
              color: #475669
              .total
                font-size: 24px
                font-weight: 700
                color: #58B7FF
      .left
        width: 600px
        float: left
        .newMsg
          .msgText
            textarea
              border: none
          .newMsgBtn
            overflow: hidden
            margin: 10px 0
            text-align: right
        .msg-item
          box-sizing: border-box
          padding: 10px
          margin: 15px 0
          border: 1px dashed #C0CCDA
          border-radius: 5px
          .user
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
          .msg-body
            font-size: 15px
            font-weight: normal
            margin-bottom: 12px
</style>
