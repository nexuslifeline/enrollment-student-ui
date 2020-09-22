<template>
  <div class="schedule__main-container">
    <b-overlay :show="isLoading" rounded="sm">
      <router-link :to="'/schedules'"> View History</router-link>
      <div class="title-container">
        <h3>My Schedule</h3>
        <div><span>{{ academicRecord ? academicRecord.schoolYear.name : ''}} | {{ academicRecord? academicRecord.level.name : '' }}</span></div>
        <div><span> {{ academicRecord && academicRecord.course ? academicRecord.course.description : ''}} {{ academicRecord &&  academicRecord.semester? `| ${academicRecord.semester.name}` : '' }}</span></div>
      </div>
      <div class="schedule-view">
        <ScheduleViewer
          :selectedItems="selectedSchedules"
          :showExtendedTime="false"
        />
      </div>
      <div v-if="tables.unScheduledSubjects.items.length > 0">
        <h4 class="c-app__page-title">
          UNSCHEDULED SUBJECTS ({{tables.unScheduledSubjects.items.length}})
        </h4>
        <b-table
          class="c-app__table"
          :fields="tables.unScheduledSubjects.fields"
          :items.sync="tables.unScheduledSubjects.items"
          :busy="tables.unScheduledSubjects.isBusy"
          responsive
          small
          hover
          outlined
          show-empty>
          <template v-slot:cell(name)="data">
            <span>{{data.item.code}} {{data.item.name}}</span><br>
            <small>{{data.item.description}}</small>
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
    </b-overlay>
  </div>
</template>

<script>
import ScheduleViewer from "../../components/ScheduleViewer";
import { AcademicRecordApi } from "../../../mixins/api";
import { copyValue } from '../../../helpers/extractor';

export default {
  components: { ScheduleViewer },
  mixins: [AcademicRecordApi],
  data() {
    return {
      academicRecord: null,
      selectedSchedules: [],
      tables: {
        unScheduledSubjects: {
          isBusy: false,
          fields: [
            {
              key: "name",
              label: "SUBJECTS",
              tdClass: "align-middle",
              thStyle: { width: "auto" }
            },
            {
              key: "units",
              label: "LEC UNITS",
              tdClass: "align-middle text-center",
              thClass: "text-center",
              thStyle: { width: "15%" }
            },
            {
              key: "labs",
              label: "LAB UNITS",
              tdClass: "align-middle text-center",
              thClass: "text-center",
              thStyle: { width: "15%" }
            },
            {
              key: "totalUnits",
              label: "TOTAL UNITS",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              thStyle: {width: "8%"}
            },
          ],
          items: []
        }
      }
    }
  },
  created() {
    this.isLoading = true

    if (this.$route.params.academicRecordId && isNaN(this.$route.params.academicRecordId)) {
      this.$router.push('/schedules/history')
      return
    }

    this.tables.unScheduledSubjects.isBusy = true
    this.tables.unScheduledSubjects.items = []
    this.selectedSchedules = []
    const params = { paginate: false}
    const academicRecordId = this.$route?.params?.academicRecordId

    //get academic record detailes
    this.getAcademicRecord(academicRecordId).then(({ data }) => {
      this.academicRecord = data
    })
    //get academic subhects schedule
    this.getAcademicSchedule(academicRecordId, params).then(({ data }) => {
      data.forEach(subject => {
        if(subject.sectionSchedule?.length > 0) {
          //if subject has schedule add to section schedule
          subject.sectionSchedule.forEach(schedule => {
            const newSchedule = {
              dayIndex: schedule.dayId - 1,
              start: schedule.startTime,
              end: schedule.endTime,
              data: {
                id: subject.id,
                title: subject.description,
                description: `${schedule.personnel.name} | ${schedule.section.name}`
              }
            }

            this.selectedSchedules.push(newSchedule)
          })
        } else {
          //if subject has no schedule add to unscheduled subjects
         this.tables.unScheduledSubjects.items.push(subject)
        }
      });
      this.tables.unScheduledSubjects.isBusy = false
      this.isLoading = false
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

  .title-container {
    height: 100px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .schedule-view {
    height: 100%;
    width: 100%;
    margin-bottom: 30px;
  }
</style>