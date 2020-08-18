<template>
  <div class="assesment_main-container">
    <h5>Assesment Forms</h5>
    <b-table
       head-variant="light"
      responsive small hover outlined show-empty
      :fields="tables.assesment.fields"
      :items.sync="tables.assesment.items"
      :busy="tables.assesment.isBusy">
      <template v-slot:cell(action) = "row">
        <b-button @click="onPrintAssesment(row.item.id)" variant="outline-warning"><v-icon name="print"></v-icon></b-button>
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
  </div>
</template>

<script>
import { TranscriptApi, ReportApi } from "../../mixins/api";
import { TranscriptStatuses } from "../../helpers/enum";
export default {
  name: "AssesmentForm",
  mixins: [ TranscriptApi, ReportApi ],
  data() {
    return {
      TranscriptStatuses: TranscriptStatuses,
      tables: {
        assesment: {
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
    const transcriptStatusId = TranscriptStatuses.ENROLLED.id
    const { assesment } = this.tables
    const params = { studentId, transcriptStatusId, paginate: false }
    assesment.isBusy = true

    this.getTranscriptList(params).then(({ data }) => {
      assesment.items = data
      assesment.isBusy = false
    })
  },
  methods: {
    onPrintAssesment(transcriptId) {
      this.getAssessmentFormPreview(transcriptId)
      .then(({ data }) => {
        const file = new Blob([data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
    }
  }
}
</script>

<style>
  .assesment_main-container {
    width: 100%;
    height: 100%;
  }
</style>