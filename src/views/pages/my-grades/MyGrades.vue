<template>
  <div class="grade__main-container">
    <h4 class="c-app__page-title">
      {{$options.headline.title}} ({{tables.academicRecords.items.length}})
    </h4>
    <p class="c-app__page-description">
      {{$options.headline.description}}
    </p>
    <b-table
      small outlined show-empty
      :fields="tables.academicRecords.fields"
      :busy="tables.academicRecords.isBusy"
      :items="tables.academicRecords.items">
      <template v-slot:table-busy>
        <div class="text-center my-2">
          <v-icon
            name="spinner"
            spin
            class="mr-2" />
          <strong>Loading...</strong>
        </div>
      </template>
      <template v-slot:cell(action)="row">
         <b-dropdown
            right
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
            boundary="window">
            <template v-slot:button-content>
              <v-icon name="ellipsis-v" />
            </template>
            <b-dropdown-item
              @click="onShowGrades(row)" >
              View Grades
            </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-table>

    <b-modal
      v-model="showGradesModal"
        :noCloseOnEsc="true"
        :noCloseOnBackdrop="true"
        size="lg">

        <div slot="modal-title">
          <!-- modal title -->
          Grades
        </div>

        <b-table
            class="c-table"
            small
            hover
            outlined
            show-empty
            :fields="tables.grades.fields"
            :busy="tables.grades.isBusy"
            :items="tables.grades.items"
            responsive
          >
            <template v-slot:head(gradingPeriods)>
              <div class="cell-term__header">
                <div class="cell-term-input text-right" v-for="gradingPeriod in gradingPeriods" :key="gradingPeriod.id">
                  {{ gradingPeriod.name }}
                </div>
              </div>
            </template>
            <template v-slot:cell(name)="{ item }">
              <div>{{ item.subject.name }}</div>
              <div>{{ item.subject.description }}</div>
            </template>
            <template v-slot:cell(gradingPeriods)="{ item }">
              <div class="cell-term">
                <div
                  v-for="gradingPeriod in gradingPeriods"
                  :key="gradingPeriod.id"
                  class="cell-term-input text-right"
                >{{ item.grades.find(d => d.id === gradingPeriod.id) ? $options.formatNumber(item.grades.find(d => d.id === gradingPeriod.id).pivot.grade) : null }}</div>
              </div>
            </template>
            <template v-slot:table-busy>
              <div class="text-center my-2">
                <v-icon name="spinner" spin class="mr-2" />
                <strong>Loading...</strong>
              </div>
            </template>
          </b-table>

        <div slot="modal-footer" class="w-100">
          <!-- modal footer buttons -->
          <b-button
            variant="outline-danger"
            class="float-right btn-close"
            @click="showGradesModal = false"
          >
            Close
          </b-button>
        </div>

    </b-modal>

  </div>
</template>

<script>
import { AcademicRecordApi, GradingPeriodApi, StudentApi, StudentGradeApi, } from '../../../mixins/api'
import headline from './data/grade';
import { AcademicRecordStatuses } from "../../../helpers/enum";
import { formatNumber } from "../../../helpers/forms"
export default {
  formatNumber,
  AcademicRecordStatuses,
  headline,
  mixins: [ StudentApi, AcademicRecordApi, GradingPeriodApi, StudentGradeApi ],
  data() {
    return {
      showGradesModal: false,
      gradingPeriods: [],
      tables: {
        academicRecords: {
          isBusy: false,
          fields: [
            {
							key: "schoolYear.name",
							label: "School Year",
							tdClass: "align-middle",
              thStyle: {width: "25%"},
            },
            {
							key: "level.name",
							label: "Level",
							tdClass: "align-middle",
              thStyle: {width: "25%"},
            },
            {
							key: "course.name",
							label: "Course",
							tdClass: "align-middle",
              thStyle: {width: "25%"},
            },
            {
							key: "semester.name",
							label: "Semester",
							tdClass: "align-middle",
              thStyle: {width: "25%"},
            },
            {
              key: 'action',
              label: '',
              tdClass: 'align-middle',
              thStyle: { width: '40px' },
            },
          ],
          items: []
        },
        grades: {
          isBusy: false,
          fields: [
            {
              key: 'name',
              label: 'Subject',
              tdClass: 'align-middle',
              thStyle: { width: '30%' },
            },
            {
              key: 'gradingPeriods',
              label: '',
              tdClass: 'align-middle',
              thStyle: { width: '70%' },
            },
          ],
          items: []
        },
      },
      filters: {
        academicRecord: {
          criteria: null,
          academicRecordStatusId: this.$options.AcademicRecordStatuses.ENROLLED.id
        }
      },
    }
  },
  created() {
    // this.loadTerms()
    this.loadAcademicRecords()
  },
  methods: {
    loadAcademicRecords() {
      const studentId = this.$store.state.user.id;
      const { academicRecords } = this.tables
      const { academicRecordStatusId } = this.filters.academicRecord
      const params = { paginate: false, studentId, academicRecordStatusId }
      academicRecords.isBusy = true

      this.getAcademicRecordList(params).then(( { data }) => {
        academicRecords.items = data
        academicRecords.isBusy = false
      })
    },
    onShowGrades(row) {
      this.showGradesModal = true
      const { grades } = this.tables
      const academicRecordId = row.item.id
      const { schoolCategoryId, schoolYearId, semesterId, courseId, sectionId } = row.item
      const params = { schoolCategoryId, schoolYearId, semesterId, paginate: false  }
      grades.isBusy = true

      this.getGradingPeriodList(params).then(({ data }) => {
        this.gradingPeriods = data
      });
      const studentId = this.$store.state.user.id;
      const gradeParams = { studentId, courseId, sectionId, schoolYearId, semesterId, paginate: false }
      this.getStudentGradeList(gradeParams).then(({ data })=> {
        grades.items = data
        grades.isBusy = false
      })
    },


  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/shared.scss";
  .grade__main-container {
    height: 100%;
    display: flex;
    padding: 20px;
    flex-direction: column;
    @include for-size(phone-only) {
      padding: 20px 20px 0 20px;
    }
  }

  .sub-nav {
    list-style: none;
    padding: 0;
  }

  .sub-nav__item {
    margin-bottom: 10px;
    padding: 6px 20px;

    &.active {
      background-color: $light-blue-10;
      border-radius: 3px;

      .sub-nav__link {
        color: $brand-primary;
        font-weight: 500;
      }
    }

    &:hover {
      cursor: pointer;
    }
  }

  .sub-nav__title {
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .left-pane {
    min-width: 230px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-right: 1px solid $light-gray-10;
  }

  .sub-nav__link {
    font-size: 14px;
    color: $black;
  }

  .right-pane {
    flex: 1;
    border: solid whitesmoke 1px;
    padding:30px;

    @include for-size(phone-only) {
      margin-top: 20px;
    }
  }

  .filters {
    margin-bottom: 10px;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .cell-term {
    display: flex;
    width: 100%;
    .cell-term-input {
      margin: 0 5px;
      width: 100%;
      //border-left: solid 1px  lightgray;
    }
  }
  .cell-term__header {
    display: flex;
    width: 100%;

    .cell-term-input {
      margin: 0 5px;
      width: 100%;
      // min-width: 23%;
      //border-left: solid 1px  lightgray;
    }
  }
</style>