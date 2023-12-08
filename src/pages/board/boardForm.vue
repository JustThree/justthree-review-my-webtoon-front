<template>
  <h1>글 등록화면 예정</h1>
  <span>글 제목</span>
  <input type="text" v-model="title"/>
  <div class="frame-editor">
    <div id="editor"></div>
    <div>
      <input type="file" multiple @change="uploadFileChange($event)" />
    </div>
    <div>
      <ul>
        <li v-for="file in attachedFiles" :key="file.name">
          {{ file.name }}
          <button @click="removeAttachedFile(file)">삭제</button>
        </li>
      </ul>
    </div>
  </div>
  <button @click="submitBoard">등록</button>
</template>

<script setup>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ref, onMounted } from 'vue';

let editor;
const title = ref('');
const content = ref('');
const uploadedFileName = ref('');

const attachedFiles = ref([]);

const uploadFileChange = (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    attachedFiles.value.push(files[i]);
  }
};

const removeAttachedFile = (file) => {
  const index = attachedFiles.value.indexOf(file);
  if (index !== -1) {
    attachedFiles.value.splice(index, 1);
  }
};

const submitBoard = async () => {
  const titleValue = title.value;
  const contentValue = content.value;
  // 등록 로직 작성
  const formData = new FormData();
  formData.append('title', titleValue);
  formData.append('content', contentValue);
  for (let i = 0; i < attachedFiles.value.length; i++) {
    formData.append('imagefiles', attachedFiles.value[i]);
  }
  console.log(formData);
};

onMounted(() => {
  ClassicEditor
      .create(document.querySelector('#editor'), {
        placeholder: '자유롭게 글을 작성해주세요',
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
          //'imageUpload',
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

        /*
        //이미지 업로드 로직
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
        */

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
ul {
  display: flex;
  list-style: none;
  padding: 0;
}

li {
  margin-right: 10px;
}
</style>