<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>

<script>
  const UE = require('UE');// eslint-disable-line

  export default {
    name: 'editorView',
    data: () => (
      {
        editor: null
      }
    ),
    methods: {
      geteditor() {
        return this.editor.getContent();
        // console.log(this.editor.getContent());
      }
    },
    mounted() {
      this.editor = UE.getEditor('editor', {
        toolbars: [[
          'fullscreen', 'source', '|', 'undo', 'redo', '|',
          'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
          'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
          'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
          'directionalityltr', 'directionalityrtl', 'indent', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
          'link', 'unlink', 'anchor', '|',
          'insertcode', 'pagebreak', 'background', '|',
          'horizontal', 'date', 'time', 'spechars', '|',
          'print', 'preview', 'searchreplace', 'help'
        ]],
        zIndex: 99,
        autoHeightEnabled: true,
        autoFloatEnabled: true,
        initialFrameWidth: 860,
        initialFrameHeight: 500
      });
    },
    destroyed() {
      this.editor.destroy();
    }
  };
</script>

<style>

</style>
