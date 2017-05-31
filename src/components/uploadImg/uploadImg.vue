<template>
  <div class="uploadImg" v-title data-title="新建相册">
    <div class="top"><span>新建相册</span></div>
    <div class="albumInfo">
      <el-form ref="albumInfo" :model="album" label-width="80px" label-position="left" >
        <el-form-item label="相册名">
          <el-input v-model="album.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="album.desc"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-upload
      list-type="picture-card"
      class="addImg"
      ref="upload"
      name="avatar"
      drag
      multiple
      :auto-upload="true"
      action="/uploadTemp"
      :file-list="photos"
      :on-change="handleChange"
      :on-preview="handlePreview"
      :on-remove="handleRemove">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <div class="moodSubmit">
      <el-button type="primary" @click="newMoodSubmit">创建</el-button>
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
        photos: [],
        album: {
          name: '',
          desc: ''
        }
      };
    },
    methods: {
      newMoodSubmit() {
        if (this.album.name === '' || this.photos.length === 0) {
          this.$message.warning('别调皮，你都还没写东西，发表啥！！！');
          return;
        }

        this.$http.post('/newAlbum', {
          body: {
            name: this.album.name,
            desc: this.album.desc,
            photos: this.photos
          }
        }).then(response => {
          var result = response.body;
          if (result.result === '1') {
            this.$message.success('新建相册成功');
            router.push({name: 'albumDetail', params: {user: this.user.showUser.user, albumId: result.albumId}});
          }
        }, response => {
          // error callback
        });
      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
        console.log(file);
      },
      handleChange(file, fileList) {
        console.log(fileList);
        for (var i = 0; i < fileList.length; i++) {
          if (fileList[i].response) {
            this.photos[i] = fileList[i].response.path;
          }
        }
        console.log(this.photos);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .uploadImg
    box-sizing: border-box
    padding: 20px
    overflow: hidden
    background: #ffffff
    .top
      border-bottom: 1px solid #C0CCDA
      margin-bottom: 20px
      span
        display: inline-block
        padding: 12px 30px
        font-size: 16px
        font-weight: 700
        color: #58B7FF
        border-bottom: 3px solid #58B7FF
    .albumInfo
      width: 80%
      margin: auto
    .addImg
      position: relative
      overflow: hidden
      min-height: 250px
      margin: 0 0 50px 0
      .el-upload.el-upload--picture-card
        position: absolute
        top: 0
        left: 0
        border: none
        line-height: 0
        width: 100%
        .el-upload-dragger
          width: 100%
      .el-upload-list.el-upload-list--picture-card
        display: inline-block
        margin-top: 200px
    .moodSubmit
      overflow: hidden
      margin: 10px 0
      text-align: center
</style>
