<template>
  <div class="friends">
    <div class="left">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="已关注" name="first">
          <router-link to="/" class="friends-item">
            <div class="avatar"></div>
            <div class="info">
              <div class="name">
                用户名
              </div>
              <div class="focus yiguanzhu">
                <i class="icon-yiguanzhu"></i>已关注
              </div>
              <div class="sign">
                备注：哈哈哈哈哈哈哈哈fdgdfgfgdfgdgdfgfxkgjdfkgdfg
              </div>
            </div>
          </router-link>
          <router-link to="/" class="friends-item">
            <div class="avatar"></div>
            <div class="info">
              <div class="name">
                用户名
              </div>
              <div class="focus">
                <i class="icon-yiguanzhu"></i>已关注
              </div>
              <div class="sign">
                备注：哈哈哈哈哈哈哈哈fdgdfgfgdfgdgdfgfxkgjdfkgdfg
              </div>
            </div>
          </router-link>
          <router-link to="/" class="friends-item">
            <div class="avatar"></div>
            <div class="info">
              <div class="name">
                用户名
              </div>
              <div class="focus">
                <i class="icon-yiguanzhu"></i>已关注
              </div>
              <div class="sign">
                备注：哈哈哈哈哈哈哈哈fdgdfgfgdfgdgdfgfxkgjdfkgdfg
              </div>
            </div>
          </router-link>
          <router-link to="/" class="friends-item">
            <div class="avatar"></div>
            <div class="info">
              <div class="name">
                用户名
              </div>
              <div class="focus">
                <i class="icon-yiguanzhu"></i>已关注
              </div>
              <div class="sign">
                备注：哈哈哈哈哈哈哈哈fdgdfgfgdfgdgdfgfxkgjdfkgdfg
              </div>
            </div>
          </router-link>
          <router-link to="/" class="friends-item">
            <div class="avatar"></div>
            <div class="info">
              <div class="name">
                用户名
              </div>
              <div class="focus">
                <i class="icon-yiguanzhu"></i>已关注
              </div>
              <div class="sign">
                备注：哈哈哈哈哈哈哈哈fdgdfgfgdfgdgdfgfxkgjdfkgdfg
              </div>
            </div>
          </router-link>
        </el-tab-pane>
        <el-tab-pane label="互相关注" name="second">
          <router-link to="/" class="friends-item">
            <div class="avatar"></div>
            <div class="info">
              <div class="name">
                用户名
              </div>
              <div class="focus huxiangguanzhu">
                <i class="icon-huxiangguanzhu"></i>互相关注
              </div>
              <div class="sign">
                备注：哈哈哈哈哈哈哈哈fdgdfgfgdfgdgdfgfxkgjdfkgdfg
              </div>
            </div>
          </router-link>
          <router-link to="/" class="friends-item">
            <div class="avatar"></div>
            <div class="info">
              <div class="name">
                用户名
              </div>
              <div class="focus">
                <i class="icon-huxiangguanzhu"></i>互相关注
              </div>
              <div class="sign">
                备注：哈哈哈哈哈哈哈哈fdgdfgfgdfgdgdfgfxkgjdfkgdfg
              </div>
            </div>
          </router-link><router-link to="/" class="friends-item">
          <div class="avatar"></div>
          <div class="info">
            <div class="name">
              用户名
            </div>
            <div class="focus">
              <i class="icon-huxiangguanzhu"></i>互相关注
              </div>
            <div class="sign">
              备注：哈哈哈哈哈哈哈哈fdgdfgfgdfgdgdfgfxkgjdfkgdfg
            </div>
          </div>
        </router-link><router-link to="/" class="friends-item">
          <div class="avatar"></div>
          <div class="info">
            <div class="name">
              用户名
            </div>
            <div class="focus">
              <i class="icon-huxiangguanzhu"></i>互相关注
              </div>
            <div class="sign">
              备注：哈哈哈哈哈哈哈哈fdgdfgfgdfgdgdfgfxkgjdfkgdfg
            </div>
          </div>
        </router-link><router-link to="/" class="friends-item">
          <div class="avatar"></div>
          <div class="info">
            <div class="name">
              用户名
            </div>
            <div class="focus">
              <i class="icon-huxiangguanzhu"></i>互相关注
              </div>
            <div class="sign">
              备注：哈哈哈哈哈哈哈哈fdgdfgfgdfgdgdfgfxkgjdfkgdfg
            </div>
          </div>
        </router-link><router-link to="/" class="friends-item">
          <div class="avatar"></div>
          <div class="info">
            <div class="name">
              用户名
            </div>
            <div class="focus">
              <i class="icon-huxiangguanzhu"></i>互相关注
              </div>
            <div class="sign">
              备注：哈哈哈哈哈哈哈哈fdgdfgfgdfgdgdfgfxkgjdfkgdfg
            </div>
          </div>
        </router-link>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="right">
      <div class="top"><span>推荐</span><div class="refresh">换一批</div></div>
      <router-link to="/" class="friends-item">
        <div class="avatar"></div>
        <div class="info">
          <div class="name">
            用户名
          </div>
          <div class="focus">
            <i class="icon-jiaguanzhu"></i>加关注
              </div>
          <div class="sign">
            备注：哈哈哈哈哈哈哈哈fdgdfgfgdfgdgdfgfxkgjdfkgdfg
          </div>
        </div>
      </router-link>
      <router-link to="/" class="friends-item">
        <div class="avatar"></div>
        <div class="info">
          <div class="name">
            用户名
          </div>
          <div class="focus jiaguanzhu">
            <i class="icon-jiaguanzhu"></i>加关注
              </div>
          <div class="sign">
            备注：哈哈哈哈哈哈哈哈fdgdfgfgdfgdgdfgfxkgjdfkgdfg
          </div>
        </div>
      </router-link>
      <router-link to="/" class="friends-item">
        <div class="avatar"></div>
        <div class="info">
          <div class="name">
            用户名
          </div>
          <div class="focus">
            <i class="icon-jiaguanzhu"></i>加关注
              </div>
          <div class="sign">
            备注：哈哈哈哈哈哈哈哈fdgdfgfgdfgdgdfgfxkgjdfkgdfg
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName2: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .friends
    overflow: hidden
    .left
      box-sizing: border-box
      padding: 10px
      width: 590px
      float: left
      background: #ffffff
      font-size: 0
    .right
      box-sizing: border-box
      float: right
      width: 290px
      padding: 6px 10px
      background: #fff
      height: 600px
      overflow: hidden
      .top
        border-bottom: 1px solid #C0CCDA
        margin-bottom: 15px
        overflow: hidden
        span
          display: inline-block
          padding: 12px 30px
          font-size: 16px
          font-weight: 700
          color: #58B7FF
          border-bottom: 3px solid #58B7FF
        .refresh
          float: right
          padding: 12px 30px
          cursor: pointer
          &:hover
            color: #58B7FF
      .friends-item
        margin: 10px
    .friends-item
      box-sizing: border-box
      display: inline-block
      position: relative
      padding: 10px
      margin: 10px 15px
      width: 250px
      min-height: 100px
      border: 1px solid #d1dbe5
      font-size: 14px
      color: #5e6d82
      text-decoration: none
      .avatar
        position: absolute
        top: 50%
        left: 10px
        transform: translateY(-50%)
        width: 60px
        height: 60px
        background-color: #ccc
        border-radius: 50%
        overflow: hidden
        img
          width: 100%
          height: 100%
      .info
        padding-left: 70px
        /* CSS div内放长英文字母或长数字自动换行 CSS一行排不下自动打断换行 */
        word-wrap: break-word
        >div
          margin: 4px 0
        .name
          font-size: 16px
          font-weight: 700
        .focus
          display: inline-block
          padding: 3px 8px
          height: 18px
          line-height: 18px
          text-align: center
          border: 1px solid #d1dbe5
          border-radius: 5px
          &.jiaguanzhu
            color: #58B7FF
            border: 1px solid #58B7FF
          &.yiguanzhu
            color: #F7BA2A
            border: 1px solid #F7BA2A
          &.huxiangguanzhu
            color: #13CE66
            border: 1px solid #13CE66
        .sign
          height: 50px
          overflow: hidden
</style>
