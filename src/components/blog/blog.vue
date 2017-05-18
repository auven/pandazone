<template>
  <div class="blog">
    <div class="top"><span>我的博客</span></div>
    <div class="blog-main">
      <div class="left">
        <div class="new-blog-btn"><el-button type="primary" @click="newBlogBtn">写博客</el-button></div>
        <div class="blog-main-wrap">
          <div class="blog-item">
            <div class="title">文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题</div>
            <div class="info-op">
              <span class="time">2017年05月17日 13:00&nbsp;&nbsp;</span>
              <span class="blog-op">
                <el-dropdown trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="'{ type: \'delete\', id: \'123456\' }'">删除</el-dropdown-item>
                    <el-dropdown-item :command="'{ type: \'update\', id: \'123456\' }'">编辑</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </div>
          </div>
          <div class="blog-item">
            <div class="title">文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题</div>
            <div class="info-op">
              <span class="time">2017年05月17日 13:00&nbsp;&nbsp;</span>
              <span class="blog-op">
                <el-dropdown trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="'{ type: \'delete\', id: \'123456\' }'">删除</el-dropdown-item>
                    <el-dropdown-item :command="'{ type: \'update\', id: \'123456\' }'">编辑</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </div>
          </div>
          <div class="blog-item">
            <div class="title">文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题</div>
            <div class="info-op">
              <span class="time">2017年05月17日 13:00&nbsp;&nbsp;</span>
              <span class="blog-op">
                <el-dropdown trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="'{ type: \'delete\', id: \'123456\' }'">删除</el-dropdown-item>
                    <el-dropdown-item :command="'{ type: \'update\', id: \'123456\' }'">编辑</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </div>
          </div>
          <div class="blog-item">
            <div class="title">文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题</div>
            <div class="info-op">
              <span class="time">2017年05月17日 13:00&nbsp;&nbsp;</span>
              <span class="blog-op">
                <el-dropdown trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="'{ type: \'delete\', id: \'123456\' }'">删除</el-dropdown-item>
                    <el-dropdown-item :command="'{ type: \'update\', id: \'123456\' }'">编辑</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </div>
          </div>
        </div>
        <div class="page">
          <el-pagination
            layout="prev, pager, next"
            :page-size="15"
            :total="50">
          </el-pagination>
        </div>
      </div>
      <div class="right">
        <div class="user-blog-info">
          <div class="user-avatar">
            <img src="/upload/avatar/3333333.jpg">
          </div>
          <div class="blogs-info">
            <div class="user-name">
              用户名
            </div>
            <div class="blog-total">
              <span class="total">60</span>&nbsp;篇博客
            </div>
          </div>
        </div>
        <div class="blog-group">
          <div class="group-top">博客分组<div class="group-op">管理</div></div>
          <div class="groups">
            <div class="group-item selected">全部博客<div class="total">(10)</div></div>
            <div class="group-item">组一<div class="total">(4)</div></div>
            <div class="group-item">组二<div class="total">(2)</div></div>
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

  export default {
    data() {
      return {
        input2: ''
      };
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
              font-size: 14px
              color: #475669
              white-space: nowrap
              overflow: hidden
              text-overflow: ellipsis
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
