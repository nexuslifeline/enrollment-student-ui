<template>
  <div class="registration_main-container">
    <h5>Registration Forms</h5>
    <b-table
       head-variant="light"
      responsive small hover outlined show-empty
      :fields="tables.registration.fields"
      :items.sync="tables.registration.items"
      :busy="tables.registration.isBusy">
      <template v-slot:cell(action) = "row">
        <b-button @click="onPrintRegistration" variant="outline-warning"><v-icon name="print"></v-icon></b-button>
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
export default {
  data() {
    return {
      tables: {
        registration: {
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

  },
  methods: {
    onPrintRegistration() {

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