<template>
  <div class="assesment__main-container">
    <h4 class="c-app__page-title">
      {{$options.headline.title}} ({{tables.assessment.items.length}})
    </h4>
    <p class="c-app__page-description">
      {{$options.headline.description}}
    </p>
    <b-table
      class="c-app__table"
      :fields="tables.assessment.fields"
      :items.sync="tables.assessment.items"
      :busy="tables.assessment.isBusy"
      responsive
      small
      hover
      outlined
      show-empty>
      <template v-slot:cell(action) = "row">
        <b-button
          @click="onPrintAssesment(row.item.id)"
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
      :show="showModalPreview"
      :file="file"
      :owner="file.owner"
      :isBusy="file.isLoading"
      @close="showModalPreview = false"/>
  </div>
</template>

<script>
import { AcademicRecordApi, ReportApi } from "../../../mixins/api";
import { AcademicRecordStatuses } from "../../../helpers/enum";
import FileViewer from "../../components/FileViewer";
import headline from './data/assessment';

export default {
  mixins: [ AcademicRecordApi, ReportApi ],
  headline,
  components: { FileViewer },
  data() {
    return {
      AcademicRecordStatuses: AcademicRecordStatuses,
      showModalPreview : false,
      file: {
        type: null,
        src: null,
        name: null,
        notes: null,
        isLoading: false
      },
      tables: {
        assessment: {
          isBusy: false,
          fields: [
            {
              key: "student.studentNo",
							label: "Student No",
							tdClass: "align-middle",
							thStyle: { width: '10%'},
            },
            {
              key: "student.name",
							label: "Name",
							tdClass: "align-middle",
              thStyle: { width: "auto"},
              formatter: (value, key, item) => {
                if(!item.student.middleName){
                  item.student.middleName = ""
                }
                return item.student.firstName + " " + item.student.middleName + " " + item.student.lastName
              }
            },
            {
              key: "schoolYear.name",
							label: "School Year",
							tdClass: "align-middle",
							thStyle: { width: "10%"},
            },
            {
              key: "level.name",
              label: "level",
              tdClass: "align-middle",
              thStyle: { width: "15%"},
            },
            {
              key: "course.name",
              label: "Course",
              tdClass: "align-middle",
              thStyle: { width: "25%", maxWidth: "250px"},
              formatter: (value, key, item) => {
                if(!item.course){
                  return 'N/A'
                }
                return item.course.description + (item.course.major ? ' - ' + item.course.major : '')
              }
            },
            {
              key: "semester.name",
              label: "Semester",
              tdClass: "align-middle",
              thStyle: { width: "10%"},
              formatter: (value, key, item) => {
                if(!item.semester){
                  return 'N/A'
                }
                return value
              }
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
    const academicRecordStatusId = AcademicRecordStatuses.ENROLLED.id
    const { assessment } = this.tables
    const params = { studentId, academicRecordStatusId, paginate: false }
    assessment.isBusy = true

    this.getAcademicRecordList(params).then(({ data }) => {
      assessment.items = data
      assessment.isBusy = false
    })
  },
  methods: {
    onPrintAssesment(academicRecordId) {
      // this.getAssessmentFormPreview(academicRecordId)
      // .then(({ data }) => {
      //   const file = new Blob([data], { type: "application/pdf" });
      //   const fileURL = URL.createObjectURL(file);
      //   window.open(fileURL);
      // })

      this.file.type = null
      this.file.src = null
      this.file.notes = null
      this.file.isLoading = true
      this.file.owner = null;
      this.file.name = 'Assesment Form'

      this.showModalPreview = true
      this.getAssessmentFormPreview(academicRecordId)
        .then(response => {
          console.log(response)
          this.file.type = response.headers.contentType
          const file = new Blob([response.data], { type: "application/pdf" } )
          const reader = new FileReader();
          reader.onload = e => this.file.src = e.target.result
          reader.readAsDataURL(file);
          this.file.isLoading = false
      })
    }
  }
}
</script>

<style>
  .assesment__main-container {
    width: 100%;
    height: 100%;
  }
</style>