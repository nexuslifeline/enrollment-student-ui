<template>
  <div class="registration_main-container">
    <h4 class="c-app__page-title">
      {{$options.headline.title}} ({{ tables.registrations.items.length }})
    </h4>
    <p class="c-app__page-description">
      {{$options.headline.description}}
    </p>
    <b-table
      class="c-app__table"
      responsive small outlined show-empty
      :fields="tables.registrations.fields"
      :items.sync="tables.registrations.items"
      :busy="tables.registrations.isBusy">
      <template v-slot:cell(action) = "row">
        <b-button @click="onPrintRegistration(row.item.id)" variant="outline-warning"><v-icon name="print"></v-icon></b-button>
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
import headline from './data/registration';
import { AcademicRecordApi, ReportApi } from "../../../mixins/api";
import { AcademicRecordStatuses } from "../../../helpers/enum";
import FileViewer from "../../components/FileViewer";

export default {
  headline,
  components: { FileViewer },
  mixins: [ AcademicRecordApi, ReportApi  ],
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
        registrations: {
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
    const { registrations } = this.tables
    const params = { studentId, academicRecordStatusId, paginate: false }
    registrations.isBusy = true

    this.getAcademicRecordList(params).then(({ data }) => {
      registrations.items = data
      registrations.isBusy = false
    })
  },
  methods: {
    onPrintRegistration(academicRecordId) {

      this.file.type = null
      this.file.src = null
      this.file.notes = null
      this.file.isLoading = true
      this.file.owner = null;
      this.file.name = 'Registration Form'

      this.showModalPreview = true
      this.getRegistrationFormPreview(academicRecordId)
        .then(response => {
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
  .registration_main-container {
    width: 100%;
    height: 100%;
  }
</style>