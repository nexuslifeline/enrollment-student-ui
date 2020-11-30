<template>
  <div class="requirement__main-container">
    <h4 class="c-app__page-title">
      {{$options.headline.title}} ({{tables.studentFiles.items.length}})
    </h4>
    <p class="c-app__page-description">
      {{$options.headline.description}}
    </p>
    <b-table
      class="c-app__table"
      :fields="tables.studentFiles.fields"
      :items.sync="tables.studentFiles.items"
      :busy="tables.studentFiles.isBusy"
      responsive
      small
      hover
      outlined
      show-empty>
      <template v-slot:cell(action) = "row">
        <b-button
          @click="onPreviewFile(row.index)"
          variant="primary">
          <v-icon name="print" />
        </b-button>
      </template>
      <template v-slot:table-busy>
        <div class="text-center my-2">
          <v-icon
            name="spinner"
            spin
            class="mr-2" />
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
    <FileViewer
      :show="fileViewer.show"
      :file="file"
      :owner="file.owner"
      :isBusy="file.isLoading"
      @close="fileViewer.show = false"
      @onNavLeft="onStudentFileNavLeft"
      @onNavRight="onStudentFileNavRight"
      :navCount="fileViewer.activeNavCount"
      :navActiveIndex="fileViewer.activeNavIndex"
      :enableArrowNav="fileViewer.isActiveNavEnabled"
    />
  </div>
</template>

<script>
import { StudentFileApi, ReportApi } from "../../../mixins/api";
import FileViewer from "../../components/FileViewer";
import headline from './data/requirement';

export default {
  mixins: [ StudentFileApi, ReportApi ],
  headline,
  components: { FileViewer },
  data() {
    return {
      showModalPreview : false,
      file: {
        type: null,
        src: null,
        name: null,
        notes: null,
        isLoading: false
      },
      fileViewer: {
        isActiveNavEnabled: false,
        activeNavCount: 0,
        activeNavIndex: 0,
        show: false,
      },
      lastActiveFile : null,
      tables: {
        studentFiles: {
          isBusy: false,
          fields: [
            {
              key: "name",
							label: "Filename",
							tdClass: "align-middle",
							thStyle: { width: '40%'},
            },
            {
              key: "documentType.name",
							label: "Document Type",
							tdClass: "align-middle",
              thStyle: { width: "20%"},
            },
            {
              key: "notes",
							label: "Notes",
							tdClass: "align-middle",
							thStyle: { width: "38%"},
            },
            {
              key: "action",
              label: "",
              tdClass: "align-middle text-center",
              thStyle: {width: "5%"}
            }
          ],
          items: []
        }
      }
    }
  },
  created() {
    const studentId = this.$store.state.user.id;
    const { studentFiles } = this.tables
    const params = { paginate: false }
    studentFiles.isBusy = true

    this.getStudentFiles(studentId, params).then(({ data }) => {
      studentFiles.items = data
      studentFiles.isBusy = false
    })
  },
  methods: {
    setupStudentFileActiveFileViewer(index) {
      const { items: studentFiles } = this.tables.studentFiles
      this.lastActiveFile = studentFiles[index]
      this.fileViewer.isActiveNavEnabled = studentFiles?.length > 1
      this.fileViewer.activeNavCount = studentFiles?.length;
      this.fileViewer.activeNavIndex =  index
    },
    onPreviewFile(index) {
      this.setupStudentFileActiveFileViewer(index)
      const params = { paginate: false }
      const user = this.$store.state.user;
      const { items: studentFiles } = this.tables.studentFiles
      const selectedFile = studentFiles[index]

      this.file.type = null
      this.file.src = null
      this.file.name = selectedFile?.name
      this.file.notes = selectedFile?.notes
      this.file.isLoading = true
      this.file.owner = user;
      this.fileViewer.show = true

      this.getStudentFilePreview(user.id, selectedFile.id)
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
      const files = this.tables.studentFiles.items
      let currentIdx = this.tables.studentFiles.items.indexOf(this.lastActiveFile)
      const isFirst = currentIdx === 0;
      currentIdx = isFirst ? files.length - 1 : currentIdx - 1;
      const file = files[currentIdx];
      const currentFileItem = {
        ...this.lastActiveFile,
        index: currentIdx,
        item: file
      };
      this.onPreviewFile(currentIdx);
    },
    onStudentFileNavRight() {
      const files = this.tables.studentFiles.items
      let currentIdx = this.tables.studentFiles.items.indexOf(this.lastActiveFile)
      const isLast = currentIdx === files.length - 1;
      currentIdx = isLast ? 0 : currentIdx + 1;
      const file = files[currentIdx];
      const currentFileItem = {
        ...this.lastActiveFile,
        index: currentIdx,
        item: file
      };
      this.onPreviewFile(currentIdx);
    },
  },
  computed: {
    user() {
      return this.$store.state.user || {};
    },
  }
}
</script>

<style lang="scss" scoped>
  .requirement__main-container {
    height: 100%;
    width: 100%;
    padding: 20px;
  }

  .requirement__title-container {
    margin-bottom: 10px;
  }

  .total-container {
    height: 55px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .total-billing-amount {
      width: 200px;
      margin-left: 20px;
      text-align: right;
    }
  }

  .row-details-container {
    width: 100%;
    height: 100%;
    padding: 30px 60px 10px 60px;
  }

  .add-button-container {
     margin-bottom: 10px;
     .pay-button {
       width: 100px;
     }
  }

  .link {
    color: rgb(45, 164, 204);
    cursor: pointer;

    &:hover {
      color: lightblue;
    }
  }
</style>