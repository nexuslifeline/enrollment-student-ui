<template>
  <div>
    <div class="file-uploader-container">
      <FileUploader
        @onFileChange="onStudentFileUpload"
        @onFileDrop="onStudentFileUpload"
        title="UPLOAD REQUIREMENTS"
      />
    </div>
    <div class="file-item-container">
      <FileItem
        v-for="(item, index) of files"
        :key="index"
        :title="item.name"
        :description="item.notes"
        :documentTypeName="item.documentType ? item.documentType.name  : ''"
        :fileIndex="index"
        @onFileItemSelect="onStudentFileItemSelect"
        @onFileItemRemove="onDeleteStudentFile"
        @onFileItemPreview="previewStudentFile"
        :isBusy="item.isBusy"
      />
    </div>
    <FileViewer
      :show="fileViewer.student.show"
      :file="file"
      :owner="file.owner"
      :isBusy="file.isLoading"
      @close="fileViewer.student.show = false"
      @onNavLeft="onStudentFileNavLeft"
      @onNavRight="onStudentFileNavRight"
      :navCount="fileViewer.student.activeNavCount"
      :navActiveIndex="fileViewer.student.activeNavIndex"
      :enableArrowNav="fileViewer.student.isActiveNavEnabled"
    />
  </div>
</template>
<script>
  import  FileUploader from '../FileUploader';
  import  FileItem from '../FileItem';
  import  FileViewer from '../FileViewer';
  import { copyValue } from '../../../helpers/extractor';
  import { validate, reset } from '../../../helpers/forms';
  import {

    DocumentTypeApi,
    StudentFileApi
  } from '../../../mixins/api';
  import {
    ApplicationSteps,
    AcademicRecordStatuses
  } from '../../../helpers/enum';

  const fileFields = {
    id: null,
    documentTypeId: null,
    notes: null
  }

  export default {
    mixins: [StudentFileApi, DocumentTypeApi],
    props: {
      studentId: {
        type: [Number, String]
      }
    },
    components: {
      FileUploader,
      FileItem,
      FileViewer
    },
    data() {
      return {
        file: {
          type: null,
          src: null,
          name: null,
          notes: null,
          isLoading: false
        },
        fileViewer: {
          student: {
            isActiveNavEnabled: false,
            activeNavCount: 0,
            activeNavIndex: 0,
            show: false,
          }
        },
        isShownFile: false,
        files: [],
        isFileDeleting: false,
        isFileUpdating: false,
        forms: {
          file: {
            fields: { ...fileFields },
            states: { ...fileFields },
            errors: { ...fileFields }
          }
        }
      }
    },
    created() {
      this.loadFiles();
    },
    methods: {
      loadFiles() {
        this.getStudentFiles(this.studentId, { paginate: false }).then(({ data }) => {
          console.log('files', data)
          this.files = data;
        }).catch((error) => {
          console.warn(error);
        });
      },
      onStudentFileUpload(file) {
        const formData = new FormData();
        formData.append('file', file);

        this.files.push({ id: null, name: null, notes: null, isBusy: true })
        let newFileIndex = this.files.length - 1
        let newFile = this.files[newFileIndex]

        this.addStudentFile(formData, this.studentId).then(({ data }) =>{
          newFile.id = data.id
          newFile.name = data.name
          newFile.isBusy = false
          this.onStudentFileItemSelect(newFileIndex)
        })
      },
      onDeleteStudentFile (index) {
        const selectedFile = this.files[index]
        this.isFileDeleting = true
        selectedFile.isBusy = true
        this.deleteStudentFile(this.studentId, selectedFile.id).then(()=> {
          this.isFileDeleting = false
          this.isShownFile = false
          this.files.splice(index, 1);
        }).catch((error) => {
          this.isFileDeleting = false
          selectedFile.isBusy = false
        });
      },
      onStudentFileItemSelect(idx) {
        const { file } = this.forms
        reset(file)
        this.selectedStudentFileIndex = idx
        file.fields.id = this.files[idx].id
        file.fields.notes = this.files[idx].notes
        file.fields.documentTypeId = this.files[idx].documentType?.id

        this.isShownFile = true
      },
      onUpdateStudentFile () {
        const selectedFile = this.files[this.selectedStudentFileIndex]
        this.isFileUpdating = true
        selectedFile.isBusy = true

        this.updateStudentFile(file.fields, this.studentId, file.fields.id).then(({ data }) => {
          selectedFile.notes = data.notes
          selectedFile.documentType = data.documentType
          this.isFileUpdating = false
          this.isShownFile = false;
          setTimeout(() => selectedFile.isBusy = false, 1000);
        }).catch((error) => {
          const { errors } = error.response.data;
          validate(file, errors);
          this.isFileUpdating = false
          selectedFile.isBusy = false
        });

      },
      previewStudentFile(index) {
        this.setupStudentFileActiveFileViewer(index)
        // const { student: { fields : student } } = this.forms
        const selectedFile = this.files[index]

        this.file.type = null
        this.file.src = null
        this.file.name = selectedFile?.name
        this.file.notes = selectedFile?.notes
        this.file.isLoading = true
        this.file.owner = {};
        this.fileViewer.student.show = true

        this.getStudentFilePreview(this.studentId, selectedFile.id)
          .then(response => {
            this.file.type = response.headers.contentType
            const file = new Blob([response.data], { type: response.headers.contentType })
            const reader = new FileReader();
            reader.onload = e => this.file.src = e.target.result
            reader.readAsDataURL(file);
            this.file.isLoading = false
        })
      },
      onStudentFileNavLeft() {
        const files = this.files;
        let currentIdx = this.files.indexOf(this.lastActiveFile)
        const isFirst = currentIdx === 0;
        currentIdx = isFirst ? files.length - 1 : currentIdx - 1;
        const file = files[currentIdx];
        const currentFileItem = {
          ...this.lastActiveFile,
          index: currentIdx,
          item: file
        };
        this.previewStudentFile(currentIdx);
      },
      onStudentFileNavRight() {
        const files = this.files;
        let currentIdx = this.files.indexOf(this.lastActiveFile)
        const isLast = currentIdx === files.length - 1;
        currentIdx = isLast ? 0 : currentIdx + 1;
        const file = files[currentIdx];
        const currentFileItem = {
          ...this.lastActiveFile,
          index: currentIdx,
          item: file
        };
        this.previewStudentFile(currentIdx);
      },
      setupStudentFileActiveFileViewer(index) {
        this.lastActiveFile = this.files[index]
        this.fileViewer.student.isActiveNavEnabled = this.files?.length > 1
        this.fileViewer.student.activeNavCount = this.files?.length;
        this.fileViewer.student.activeNavIndex =  index
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/shared.scss";

  .file-uploader-container {
    width: 100%;
    height: 250px;
    margin: 20px 0 20px 0;

  }

  .file-item-container {
    width: 100%;
    height: auto;
  }


</style>

