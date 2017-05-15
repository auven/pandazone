<template>
  <div class="newMood">
    <el-input
      class="moodText"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="说点儿什么吧"
      v-model="moodText">
    </el-input>
    <transition name="addImgFade">
      <el-upload
        v-show="showAddImg"
        list-type="picture-card"
        class="addImg"
        ref="upload"
        name="avatar"
        :auto-upload="true"
        action="/uploadTemp"
        :file-list="moodImg"
        :on-change="handleChange"
        :on-preview="handlePreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
    </transition>
    <div class="moodSubmit">
      <el-button class="btn" type="primary" @click="newMoodSubmit">发表</el-button>
      <i class="el-icon-picture showAddImg" @click="showAI"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        moodText: '',
        showAddImg: false,
        moodImg: []
      };
    },
    methods: {
      newMoodSubmit() {
        if (this.moodText === '' && this.moodImg.length === 0) {
          this.$message.warning('别调皮，你都还没写东西，发表啥！！！');
          return;
        }

        this.$http.post('/newMood', {
          moodText: this.moodText,
          moodImg: this.moodImg
        }).then(response => {
          var result = response.body;
          if (result.result === '1') {
            this.$message.success('发表说说成功');
            this.moodText = '';
            this.moodImg = [];
            this.showAddImg = false;
            // 触发父组件里的方法
            this.$emit('subNewMood');
          }
        }, response => {
          // error callback
        });
      },
      handleRemove(file, fileList) {
        var index = this.moodImg.indexOf(file.response.path);
        this.moodImg.splice(index, 1);
        console.log(this.moodImg);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleChange(file, fileList) {
        console.log(fileList);
        for (var i = 0; i < fileList.length; i++) {
          if (fileList[i].response) {
            this.moodImg[i] = fileList[i].response.path;
          }
        }
        console.log(this.moodImg);
      },
      showAI() {
        this.moodImg = [];
        this.showAddImg = !this.showAddImg;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .newMood
    box-sizing: border-box
    padding: 16px
    overflow: hidden
    background: #ffffff
    .moodText
      textarea
        border: none
    .addImg
      margin: 0 0 50px 0
      &.addImgFade-enter-active, &.addImgFade-leave-active
        transition: opacity .5s
      &.addImgFade-enter, &.addImgFade-leave-active
        opacity: 0
    .moodSubmit
      overflow: hidden
      margin: 10px 0
      .btn, .showAddImg
        float: right
      .showAddImg
        font-size: 30px
        margin-right: 10px
        color: #99A9BF
        cursor: pointer
        &:hover
          color: #475669
</style>
