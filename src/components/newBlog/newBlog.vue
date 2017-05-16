<template>
  <div class="newBlog">
    <div class="top">写博客</div>
    <div class="new-main">
      <el-form class="title-group" :model="formInline" label-width="60px" label-position="left">
        <el-form-item label="标题">
          <el-input v-model="formInline.user" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="分组" class="group">
          <el-select v-model="formInline.region" placeholder="分组">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
          <el-button v-show="isShow" type="primary" @click="showInput">新建分组</el-button>
          <el-input
            v-show="!isShow"
            v-model="newGroup"
            placeholder=""
            @blur="handleInputConfirm"
            ref="newGroupInput"></el-input>
        </el-form-item>
      </el-form>
      <vue-ueditor></vue-ueditor>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import vueUeditor from '@/components/vueUeditor/vueUeditor';

  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        isShow: true,
        newGroup: ''
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!');
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
      }
    },
    components: {
      vueUeditor
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .newBlog
    width: 900px
    margin: 30px auto
    border-radius: 5px
    overflow: hidden
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
          .el-input
            display: inline-block
            width: 88px
</style>
