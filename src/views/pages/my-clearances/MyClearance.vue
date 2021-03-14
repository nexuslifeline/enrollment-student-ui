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
              @click="onShowSignatories(row)" >
              View Clearance
            </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-table>

    <b-modal
      v-model="showSignatoriesModal"
        :noCloseOnEsc="true"
        :noCloseOnBackdrop="true"
        size="lg">

        <div slot="modal-title">
          <!-- modal title -->
          Clearances
        </div>

        <b-table
            class="c-table"
            small
            hover
            outlined
            show-empty
            :fields="tables.signatories.fields"
            :busy="tables.signatories.isBusy"
            :items="tables.signatories.items"
            responsive
          >
            <!-- <template v-slot:head(terms)>
              <div class="cell-term__header">
                <div class="cell-term-input text-right" v-for="term in terms" :key="term.id">
                  {{ term.name }}
                </div>
              </div>
            </template> -->
            <!-- <template v-slot:cell(name)="{ item }">
              <div>{{ item.name }}</div>
              <div>{{ item.description }}</div>
            </template>
            <template v-slot:cell(terms)="{ item }">
              <div class="cell-term">
                <div
                  v-for="term in terms"
                  :key="term.id"
                  class="cell-term-input text-right"
                >{{ item.grades.find(d => d.id === term.id) ? $options.formatNumber(item.grades.find(d => d.id === term.id).pivot.grade) : null }}</div>
              </div>
            </template> -->
            <template v-slot:cell(pivot.isCleared)="data">
              <v-icon v-if="data.item.pivot.isCleared" name="check" color="green"></v-icon>
              <v-icon v-else name="times" color="red"></v-icon>
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
            @click="showSignatoriesModal = false"
          >
            Close
          </b-button>
        </div>

    </b-modal>

  </div>
</template>

<script>
import { AcademicRecordApi, StudentApi, TermApi, StudentClearanceApi } from '../../../mixins/api'
import headline from './data/clearance';
import { AcademicRecordStatuses } from "../../../helpers/enum";
import { formatNumber } from "../../../helpers/forms"
export default {
  formatNumber,
  AcademicRecordStatuses,
  headline,
  mixins: [ StudentApi, AcademicRecordApi, TermApi, StudentClearanceApi ],
  data() {
    return {
      showSignatoriesModal: false,
      terms: [],
      tables: {
        academicRecords: {
          isBusy: false,
          fields: [
            {
							key: "academicRecord.schoolYear.name",
							label: "School Year",
							tdClass: "align-middle",
              thStyle: {width: "25%"},
            },
            {
							key: "academicRecord.level.name",
							label: "Level",
							tdClass: "align-middle",
              thStyle: {width: "25%"},
            },
            {
							key: "academicRecord.course.name",
							label: "Course",
							tdClass: "align-middle",
              thStyle: {width: "25%"},
            },
            {
							key: "academicRecord.semester.name",
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
        signatories: {
          isBusy: false,
          fields: [
            {
              key: 'name',
              label: 'Signatory',
              tdClass: 'align-middle',
              thStyle: { width: '50%' },
            },
            {
              key: 'pivot.remarks',
              label: 'Remarks',
              tdClass: 'align-middle',
              thStyle: { width: '40%' },
            },
            {
              key: 'pivot.isCleared',
              label: 'Cleared ?',
              tdClass: 'align-middle text-center',
              thStyle: { width: '10%' },
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
    this.loadStudentClearances()
  },
  methods: {
    loadStudentClearances() {
      const studentId = this.$store.state.user.id;
      const { academicRecords } = this.tables
      const params = { paginate: false, studentId }
      academicRecords.isBusy = true

      this.getStudentClearanceList(params).then(( { data }) => {
        academicRecords.items = data
        academicRecords.isBusy = false
      })
    },
    onShowSignatories(row) {
      this.showSignatoriesModal = true
      const { signatories } = this.tables
      const studentClearanceId = row.item.id
      signatories.isBusy = true
      this.getStudentClearance(studentClearanceId).then(({ data })=> {
        signatories.items = data.signatories
        signatories.isBusy = false
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
      min-width: 23%;
      //border-left: solid 1px  lightgray;
    }
  }
  .cell-term__header {
    display: flex;
    width: 100%;

    .cell-term-input {
      margin: 0 5px;
      min-width: 23%;
      //border-left: solid 1px  lightgray;
    }
  }
</style>