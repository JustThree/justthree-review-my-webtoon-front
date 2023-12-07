<template>
  <h1>글 등록화면 예정</h1>
  <span>글 제목</span>
  <input type="text" v-model="title"/>
  <div class="frame-editor">
    <div id="editor"></div>
  </div>
  <button @click="submitBoard">등록</button>
  <div>
    <span>업로드한 파일 이름:</span>
    <span v-text="uploadedFileName.value"></span>
    <!--{{ uploadedFileName.value }}-->
  </div>
</template>

<script setup>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ref, onMounted } from 'vue';

let editor;
const title = ref('');
const content = ref('<p>글을 작성해주세요</p>');
const uploadedFileName = ref('');

const submitBoard = async () => {
  const titleValue = title.value;
  const contentValue = content.value;
  // 등록 로직 작성
  const formData = new FormData();
  formData.append('title', titleValue);
  formData.append('content', contentValue);
  formData.append('imagefiles', filePath);
};

onMounted(() => {
  ClassicEditor
      .create(document.querySelector('#editor'), {
        toolbar: [
          'heading',
          '|',
          'fontColor',
          'fontSize',
          'bold',
          'italic',
          '|',
          'alignment',
          'bulletedList',
          'numberedList',
          'indent',
          'outdent',
          '|',
          'imageUpload',
          'insertTable',
          'link',
          '|',
          'undo',
          'redo',
        ],
        ckfinder: {
          uploadUrl: 'http://localhost:8089/api/upload',
        },
      })
      .then(newEditor => {
        editor = newEditor;
        editor.setData(content.value);
        editor.model.document.on('change:data', () => {
          content.value = editor.getData();
        });

        editor.plugins.get('FileRepository').createUploadAdapter = function(loader) {
          return {
            upload: async () => {
              const file = await loader.file;
              console.log("file");
              console.log(file);
              console.log(file.name);
              uploadedFileName.value = file.name;
              return {file};
            }
          };
        };
      })
      .catch(error => {
        console.error(error);
      });
});
</script>

<style>
.frame-editor{
  height: 600px;
  border: solid 1px;
}
/* CKEditor 스타일 수정 */
.ck-editor__editable {
  height: 500px !important;
  font-size: 20px !important;
  color: #333 !important;
}
</style>