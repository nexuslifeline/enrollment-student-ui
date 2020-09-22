<template>
  <div class="schedule__main-container">
    <h4 class="c-app__page-title">
      {{$options.headline.title}} ({{tables.academicRecords.items.length}})
    </h4>
    <p class="c-app__page-description">
      {{$options.headline.description}}
    </p>
    <b-table
      class="c-app__table"
      :fields="tables.academicRecords.fields"
      :items.sync="tables.academicRecords.items"
      :busy="tables.academicRecords.isBusy"
      responsive
      small
      hover
      outlined
      show-empty>
      <template v-slot:cell(action) = "row">
        <b-button
          :to="`/schedules/${row.item.id}`"
          variant="primary">
          <v-icon name="search" />
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
  </div>
</template>

<script>
import { AcademicRecordApi, ReportApi } from "../../../mixins/api";
import { AcademicRecordStatuses } from "../../../helpers/enum";
import headline from './data/schedule';

export default {
  mixins: [ AcademicRecordApi, ReportApi ],
  headline,
  data() {
    return {
      tables: {
        academicRecords: {
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
    const { academicRecords } = this.tables
    const params = { studentId, academicRecordStatusId, paginate: false }
    academicRecords.isBusy = true

    this.getAcademicRecordList(params).then(({ data }) => {
      academicRecords.items = data
      academicRecords.isBusy = false
    })
  },
}
</script>

<style>
  .schedule__main-container {
    height: 100%;
    width: 100%;
    padding: 20px;
  }
</style>