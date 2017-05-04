<template>
  <div class="newMood">
    <el-input
      class="moodText"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="说点儿什么吧"
      v-model="moodText">
    </el-input>
    <el-upload
      v-show="showAddImg"
      list-type="picture-card"
      class="addImg"
      ref="upload"
      name="avatar"
      action="/uploadTemp"
      :on-change="handleChange"
      :on-preview="handlePreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
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
        this.$refs.upload.submit();
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
        for (var i = 0; i < fileList.length; i++) {
          this.moodImg[i] = fileList[i].response.path;
        }
        console.log(this.moodImg);
      },
      showAI() {
        this.showAddImg = !this.showAddImg;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .newMood
    overflow: hidden
    width: 590px
    background: #ffffff
    .moodText
      textarea
        border: none
    .addImg
      margin: 15px 10px 50px 10px
    .moodSubmit
      overflow: hidden
      margin: 10px
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
