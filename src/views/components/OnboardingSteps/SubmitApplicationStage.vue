<template>
  <div class="application__wizard-form-fields">
    <b-row v-if="currentAcademicRecordStatusId === AcademicRecordStatuses.ENLISTMENT_REJECTED.id">
      <b-col md=12>
        <b-alert variant="danger" show>
          <p style="font-weight:bold">
            Sorry, your application is rejected with the ffg. reasons : <br>
            {{ data.latestAcademicRecord.application.disapprovalNotes }} <br><br>
            <small>Please be inform that you can modify your application and resubmit for evaluation.</small>
          </p>
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
        <b-col md=12>
          <b-card border-variant="primary">
            <b-row>
              <b-col md="6">
                <b-form-group>
                  <label>Level</label>
                  <br>
                  <label class="font-weight-bold">{{ levelName }} </label>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group v-if="isCourseVisible">
                  <label>Course</label>
                  <br>
                  <label class="font-weight-bold">{{ courseName }} </label>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group >
                  <label>Section</label>
                  <b-form-select
                    :disabled="isLoadingSection"
                    v-model='forms.academicRecord.fields.sectionId'
                    :state="forms.academicRecord.states.sectionId"
                    @change="loadDefaultSubjects">
                    <template v-slot:first>
                      <b-form-select-option :value='null' disabled>
                        -- Section --
                      </b-form-select-option>
                    </template>
                    <b-form-select-option
                      v-for='section in options.sections.items'
                      :key='section.id'
                      :value='section.id'>
                      {{ section.name }}
                    </b-form-select-option>
                  </b-form-select>
                  <b-form-invalid-feedback>
                    {{forms.academicRecord.errors.sectionId}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group v-if="isSemesterVisible">
                  <label>Semester</label>
                  <br>
                  <label class="font-weight-bold">{{ semesterName }} </label>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
    </b-row>
    <b-row>
      <b-col md=12>
        <b-row>
          <b-col md=9>
            <p>
              Subjects for
              <strong>{{ levelName }} / </strong>
              <strong>{{ semesterName }} / </strong>
              <strong>{{ courseName }}</strong>.
            </p>
          </b-col>
          <b-col md=3 >
            <b-button
              block
              class="float-right float-bottom"
              variant="outline-primary"
              @click="onAddSubject">
              <v-icon
                name="plus-circle" />
              Add Subject</b-button>
          </b-col>
        </b-row>
        <b-form-group>
          <b-form-input :state="forms.academicRecord.states.subjects" hidden/>
          <b-form-invalid-feedback>
            {{ forms.academicRecord.errors.subjects }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-table
          sticky-header="300px"
          head-variant="light"
          responsive small hover outlined show-empty
          :fields="tables.enlistedSubjects.fields"
          :items.sync="tables.enlistedSubjects.items"
          :busy="tables.enlistedSubjects.isBusy">
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
          <template v-slot:cell(action)="row">
            <b-button
              @click="removeSubject(row)"
              size="sm" variant="danger">
              <v-icon name="trash" />
            </b-button>
          </template>
          <template v-slot:cell(section)="row">
            <span>{{ row.item.section ? row.item.section.name : '' }}</span>
            <b-dropdown
              right
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template v-slot:button-content>
                <v-icon name="ellipsis-v" />
              </template>
              <b-dropdown-item @click.prevent="onShowModalSection(row)">
                {{ row.item.sectionId ? 'Change' : 'Select Section' }}
              </b-dropdown-item>
              <b-dropdown-item @click.prevent="onSectionSubjectClear(row)">
                Clear
              </b-dropdown-item>
            </b-dropdown>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="9">
        <small>Note: You can add subjects by clicking the Add Subjects button while removal of subject is by clicking the red delete button inline on each subject.</small>
      </b-col>
      <b-col md="3">
        <h5 >TOTAL UNITS : &emsp; {{ totalUnits }}</h5>
      </b-col>
    </b-row>
    <div class="application__action-bar">
      <b-button
        @click="$emit('onBack', previousStepId)"
        variant="outline-secondary"
        class="application__back-action">
        Back
      </b-button>
       <b-button
          @click="onSubmitApplication"
          variant="primary"
          class="application__main-action"
          :disabled="isProcessing">
          <v-icon
            v-if="isProcessing"
            name="sync"
            class="mr-2"
            spin />
            Submit Application
        </b-button>
    </div>
    <b-modal
			v-model="isShownSubjects"
			:noCloseOnEsc="true"
			:noCloseOnBackdrop="true"
			size="xl">
      <b-tabs content-class="mt-4" pills v-model="selectedSubjectListIndex">
        <b-tab title="Scheduled List"/>
        <b-tab title="Unscheduled List" active/>
      </b-tabs>
      <div slot="modal-title"> <!-- modal title -->
        Subjects
      </div> <!-- modal title -->

      <div v-if="selectedSubjectListIndex === 0">
        <b-card>
          <b-row> <!-- modal body -->
            <b-col xl=12>
              <b-row class="mb-2">
                <b-col md="3">
                  <b-form-group>
                    <label>Level</label>
                    <b-form-select
                      @change="loadScheduledViewCourses"
                      v-model="filters.scheduledSubject.levelId">
                      <b-form-select-option v-for='level in options.levels.scheduledItems' :key='level.id' :value='level.id'>
                        {{ level.name }}
                      </b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col  md="3"
                    v-if="filters.scheduledSubject.schoolCategoryId === SchoolCategories.COLLEGE.id
                    || filters.scheduledSubject.schoolCategoryId === SchoolCategories.SENIOR_HIGH_SCHOOL.id
                    || filters.scheduledSubject.schoolCategoryId === SchoolCategories.GRADUATE_SCHOOL.id">
                  <b-form-group >
                    <label>Course</label>
                    <b-form-select
                      @change="loadScheduledViewSections"
                      :disabled="options.courses.scheduledLoading"
                      v-model="filters.scheduledSubject.courseId">
                      <b-form-select-option v-for='course in options.courses.scheduledItems' :key='course.id' :value='course.id'>
                        {{ course.description }} {{ course.major ? `(${ course.major })` : ''}}
                      </b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col  md="3" v-if="filters.scheduledSubject.schoolCategoryId === SchoolCategories.COLLEGE.id
                    || filters.scheduledSubject.schoolCategoryId === SchoolCategories.SENIOR_HIGH_SCHOOL.id
                    || filters.scheduledSubject.schoolCategoryId === SchoolCategories.GRADUATE_SCHOOL.id">
                  <b-form-group >
                    <label>Semester</label>
                    <b-form-select
                      @change="loadScheduledViewSections"
                      v-model="filters.scheduledSubject.semesterId" >
                      <b-form-select-option v-for='semester in options.semesters.scheduledItems.values' :key='semester.id' :value='semester.id'>
                        {{ semester.name }}
                      </b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col md="3">
                  <b-form-group >
                    <label>Section</label>
                    <b-form-select
                      @change="loadScheduledSubjects()"
                      :disabled="options.sections.scheduledLoading"
                      v-model="filters.scheduledSubject.sectionId"
                    >
                      <b-form-select-option v-for='section in options.sections.scheduledItems' :key='section.id' :value='section.id'>
                        {{ section.name }}
                      </b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>

              <!-- @filtered="onFiltered($event, paginations.subject)" -->
              <b-table
                class="c-app__table"
                small hover outlined show-empty responsive
                :items.sync="tables.scheduledSubjects.items"
                :fields="tables.scheduledSubjects.fields"
                :filter="filters.scheduledSubject.criteria"
                :busy="tables.scheduledSubjects.isBusy"
                :current-page="paginations.scheduledSubject.page"
                :per-page="paginations.scheduledSubject.perPage"
                >

                <template v-slot:table-busy>
                  <div class="text-center my-2">
                    <v-icon
                      name="spinner"
                      spin
                      class="mr-2" />
                    <strong>Loading...</strong>
                  </div>
                </template>

                <template v-slot:cell(isAllowed)="row">
                  <v-icon :name="row.item.isAllowed ? 'check' : 'times'" :color="row.item.isAllowed ? 'green' : 'red'"/>
                  <!-- <v-icon name="check" color ="green"/> -->
                </template>

                  <template v-slot:cell(subject)="row">
                  <span> {{ row.item.name }}</span>
                  <br>
                  <span> {{ row.item.description }}</span>
                </template>

                <template v-slot:cell(schedule)="row">
                  <span>
                    {{ row.item.schedules[0] ? row.item.schedules[0].personnel.firstName + ' ' + row.item.schedules[0].personnel.lastName : '' }}
                  </span>
                  <br>
                  <span v-for="schedule in row.item.schedules" :key="schedule.id" class="item">
                    <small>{{ Days.getEnum(schedule.dayId).abbrev + ' - Time: ' + schedule.startTime + ' - ' + schedule.endTime  }}</small>
                  </span>
                </template>

                <template v-slot:cell(action)="row">
                  <b-button
                    @click="addScheduledSubject(row)"
                    size="sm" variant="success">
                    <v-icon name="plus" />
                  </b-button>
                </template>
              </b-table>
              <b-row>
                <b-col md=6>
                  Showing {{paginations.scheduledSubject.from}} to {{paginations.scheduledSubject.to}} of {{paginations.scheduledSubject.totalRows}} records.
                </b-col>
                <b-col md=6>
                  <b-pagination
                    v-model="paginations.scheduledSubject.page"
                    :total-rows="paginations.scheduledSubject.totalRows"
                    :per-page="paginations.scheduledSubject.perPage"
                    size="sm"
                    align="end"
                    @input="recordDetails(paginations.scheduledSubject)"
                  />
                </b-col>
              </b-row>
            </b-col>
          </b-row> <!-- modal body -->
        </b-card>
      </div>
      <div v-if="selectedSubjectListIndex === 1">
        <b-card>
          <b-row> <!-- modal body -->
            <b-col md=12>
              <b-row class="mb-2">
                <b-col md="3">
                  <b-form-group
                        v-if="currentSchoolCategoryId === SchoolCategories.COLLEGE.id
                        || currentSchoolCategoryId === SchoolCategories.SENIOR_HIGH_SCHOOL.id
                        || currentSchoolCategoryId === SchoolCategories.GRADUATE_SCHOOL.id">
                    <label>Level</label>
                    <b-form-select
                      @change="filterSubject"
                      v-model="filters.subject.levelId"
                    >
                      <template v-slot:first>
                        <b-form-select-option :value='null' >-- All Levels --</b-form-select-option>
                      </template>
                      <b-form-select-option v-for='level in options.levelsOfCourses.items' :key='level.id' :value='level.id'>
                        {{ level.name }}
                      </b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col  md="3">
                  <b-form-group v-if="currentSchoolCategoryId === SchoolCategories.COLLEGE.id
                        || currentSchoolCategoryId === SchoolCategories.SENIOR_HIGH_SCHOOL.id
                        || currentSchoolCategoryId === SchoolCategories.GRADUATE_SCHOOL.id">
                    <label>Semester</label>
                    <b-form-select
                      @change="filterSubject"
                      v-model="filters.subject.semesterId"
                    >
                      <template v-slot:first>
                        <b-form-select-option :value='null' >-- All Semester --</b-form-select-option>
                      </template>
                      <b-form-select-option v-for='semester in options.semesters.items.values' :key='semester.id' :value='semester.id'>
                        {{ semester.name }}
                      </b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col offset-md="2" md="4">
                  <b-form-group>
                    <label>Search</label>
                    <b-form-input
                      v-model="filters.subject.criteria"
                      type="text"
                      debounce="500">
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-table
                class="c-app__table"
                small hover outlined show-empty
                :items.sync="tables.subjects.filteredItems"
                :fields="tables.subjects.fields"
                :filter="filters.subject.criteria"
                :busy="tables.subjects.isBusy"
                :current-page="paginations.subject.page"
                :per-page="paginations.subject.perPage"
                @filtered="onFiltered($event, paginations.subject)">
                <template v-slot:table-busy>
                  <div class="text-center my-2">
                    <v-icon
                      name="spinner"
                      spin
                      class="mr-2" />
                    <strong>Loading...</strong>
                  </div>
                </template>

                <template v-slot:cell(isAllowed)="row">
                  <v-icon :name="row.item.isAllowed ? 'check' : 'times'" :color="row.item.isAllowed ? 'green' : 'red'"/>
                </template>

                <template v-slot:cell(action)="row">
                  <b-button
                    v-if="row.item.isAllowed"
                    @click="addSubject(row)"
                    size="sm" variant="success">
                    <v-icon name="plus" />
                  </b-button>
                </template>

                <template v-slot:cell(subject)="row">
                  <span> {{ row.item.name }}</span>
                  <br>
                  <span> {{ row.item.description }}</span>
                </template>

              </b-table>
              <b-row>
                <b-col md=6>
                  Showing {{paginations.subject.from}} to {{paginations.subject.to}} of {{paginations.subject.totalRows}} records.
                </b-col>
                <b-col md=6>
                  <b-pagination
                    v-model="paginations.subject.page"
                    :total-rows="paginations.subject.totalRows"
                    :per-page="paginations.subject.perPage"
                    size="sm"
                    align="end"
                    @input="recordDetails(paginations.subject)"
                  />
                </b-col>
              </b-row>
            </b-col>
          </b-row> <!-- modal body -->
        </b-card>
      </div>
			<div slot="modal-footer" class="w-100"><!-- modal footer buttons -->
				<b-button
        class="float-right"
        variant="outline-danger"
        @click="isShownSubjects = false">
        Close
      </b-button>
			</div> <!-- modal footer buttons -->
		</b-modal>
  </div>
</template>
<script>
  import PhotoViewer from '../PhotoViewer'
  import { copyValue } from '../../../helpers/extractor';
  import { validate, reset, showNotification } from '../../../helpers/forms';
  import Tables from '../../../helpers/tables';
  import {
    SectionApi,
    LevelApi,
    TranscriptRecordApi,
    ApplicationApi,
    AcademicRecordApi
  } from '../../../mixins/api';
  import {
    AcademicRecordStatuses,
    SchoolCategories,
    Semesters,
    Days,
    OnboardingSteps
  } from '../../../helpers/enum';

  const academicRecordFields = {
    sectionId: null,
    levelId: null,
    courseId: null,
    semesterId: null
  }

  export default {
    mixins: [
      SectionApi,
      LevelApi,
      Tables,
      TranscriptRecordApi,
      ApplicationApi,
      AcademicRecordApi
    ],
    components: {
      PhotoViewer
    },
    props: {
      data: {
        type: [Object]
      }
    },
    data() {
      return {
        Days,
        AcademicRecordStatuses,
        SchoolCategories,
        Semesters,
        isLoadingSection: false,
        isProcessing: false,
        selectedSubjectListIndex: 0,
        isShownSubjects: false,
        previousStepId: OnboardingSteps.EVALUATION_IN_REVIEW.id,
        forms: {
          academicRecord: {
            fields: { ...academicRecordFields },
            states: { ...academicRecordFields },
            errors: { ...academicRecordFields }
          }
        },
        options: {
          levels:{
            items:[],
            scheduledItems: []
          },
          courses :{
            items: [],
            scheduledItems: [],
            scheduledLoading: false
          },
          sections :{
            items: [],
            scheduledItems: [],
            scheduledLoading: false
          },
          semesters: {
            items: Semesters,
            scheduledItems: Semesters
          },
          levelsOfCourses: {
            items: []
          },
        },
        filters: {
          subject: {
            criteria: null,
            levelId: null,
            courseId: null
          },
          scheduledSubject: {
            criteria: null,
            levelId: null,
            courseId: null,
            semesterId: null,
            sectionId: null,
            schoolCategory: null
          },
          sectionsOfSubject: {
            criteria: null,
          }
        },
        paginations: {
          subject: {
            from: 0,
            to: 0,
            totalRows: 0,
            page: 1,
            perPage: 10,
          },
          scheduledSubject: {
            from: 0,
            to: 0,
            totalRows: 0,
            page: 1,
            perPage: 10,
          },
          sectionsOfSubject: {
            from: 0,
            to: 0,
            totalRows: 0,
            page: 1,
            perPage: 10,
          }
        },
        tables: {
          enlistedSubjects: {
            isBusy: false,
            fields: [
              {
                key: "name",
                label: "SUBJECTS",
                tdClass: "align-middle",
                thClass: "align-middle",
                thStyle: { width: "auto" }
              },
              {
                key: "units",
                label: "LEC UNITS",
                tdClass: "align-middle text-center",
                thClass: "text-center align-middle",
                thStyle: { width: "15%" }
              },
              {
                key: "labs",
                label: "LAB UNITS",
                tdClass: "align-middle text-center",
                thClass: "text-center align-middle",
                thStyle: { width: "15%" }
              },
              {
                key: "totalUnits",
                label: "TOTAL UNITS",
                tdClass: "align-middle text-right",
                thClass: "text-right align-middle",
                thStyle: {width: "15%"}
              },
              {
                key: "section",
                label: "SECTION",
                tdClass: "align-middle text-right",
                thClass: "align-middle text-right",
                thStyle: {width: "15%"}
              },
              {
                key: "action",
                label: "",
                tdClass: "align-middle text-center",
                thStyle: {width: "60px"}
              }
            ],
            items: []
          },
          subjects: {
            isBusy: false,
            fields: [
              {
                key: "isAllowed",
                label: "Allowed",
                tdClass: "align-middle text-center",
                thClass: "align-middle",
                thStyle: {width: "25px"}
              },
              {
                key: "subject",
                label: "Subject",
                tdClass: "align-middle",
                thClass: "align-middle",
                thStyle: {width: "auto"}
              },
              {
                key: "units",
                label: "Lec Units",
                tdClass: "align-middle text-right",
                thClass: "align-middle text-right",
                thStyle: {width: "8%"}
              },
              {
                key: "labs",
                label: "Lab Units",
                tdClass: "align-middle text-right",
                thClass: "align-middle text-right",
                thStyle: {width: "8%"}
              },
              {
                key: "totalUnits",
                label: "TOTAL UNITS",
                tdClass: "align-middle text-right",
                thClass: "align-middle text-right",
                thStyle: {width: "8%"}
              },
              {
                key: "action",
                label: "",
                tdClass: "align-middle text-center",
                thStyle: {width: "5%"}
              }
            ],
            items: [],
            filteredItems: []
          },
          sectionsOfSubjects: {
            isBusy: false,
            fields: [
              {
                key: "name",
                label: "SECTION",
                tdClass: "align-middle ",
                thClass: "align-middle",
                thStyle: { width: "15%" }
              },
              {
                key: "level.name",
                label: "LEVEL",
                tdClass: "align-middle ",
                thClass: "align-middle",
                thStyle: { width: "15%" }
              },
              {
                key: "course.name",
                label: "COURSE",
                tdClass: "align-middle ",
                thClass: "align-middle",
                thStyle: { width: "15%" }
              },
              {
                key: "semester.name",
                label: "SEMESTER",
                tdClass: "align-middle ",
                thClass: "align-middle",
                thStyle: {width: "15%"}
              },
              {
                key: "schedule",
                label: "SCHEDULE",
                tdClass: "align-middle",
                thClass: "align-middle",
                thStyle: {width: "AUTO"}
              },
              {
                key: "action",
                label: "",
                tdClass: "align-middle text-center",
                thStyle: {width: "5%"}
              }
            ],
            items: []
          },
          scheduledSubjects: {
            isBusy: false,
            fields: [
              {
                key: "isAllowed",
                label: "Allowed",
                thClass: "align-middle",
                tdClass: "align-middle text-center",
                thStyle: { width: "25px" }
              },
              {
                key: "subject",
                label: "SUBJECT",
                tdClass: "align-middle ",
                thClass: "align-middle",
                thStyle: { width: "20%" }
              },
              {
                key: "schedule",
                label: "SCHEDULE",
                tdClass: "align-middle",
                thClass: "align-middle",
                thStyle: { width: "auto", minWidth: "500px"}
              },
              {
                key: "units",
                label: "Lec Units",
                tdClass: "align-middle text-right",
                thClass: "align-middle text-right",
                thStyle: {width: "8%"}
              },
              {
                key: "labs",
                label: "Lab Units",
                tdClass: "align-middle text-right",
                thClass: "align-middle text-right",
                thStyle: {width: "8%"}
              },
              {
                key: "totalUnits",
                label: "TOTAL UNITS",
                tdClass: "align-middle text-right",
                thClass: "text-right",
                thStyle: {width: "8%"}
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
      this.populate();
      this.loadDefaultSubjects();
      this.loadSections();
      this.loadCurrentLevelCourses();
      this.loadCurrentCourseLevels();
      this.loadLevels();
      this.loadUnscheduledSubjects();
    },
    computed: {
      currentAcademicRecordStatusId() {
        return this.data?.latestAcademicRecord?.academicRecordStatusId;
      },
      currentSchoolCategoryId() {
        return this.data?.latestAcademicRecord?.schoolCategoryId;
      },
      levelName() {
        return this.data?.latestAcademicRecord?.level?.name || 'No Level';
      },
      courseName() {
        return this.data?.latestAcademicRecord?.course?.name || 'No Course';
      },
      semesterName() {
        return this.data?.latestAcademicRecord?.semester?.name || 'No Semester';
      },
      totalUnits() {
        let totalUnits = 0
        this.tables.enlistedSubjects.items.forEach(i => {
          totalUnits += i.totalUnits
        })
        return totalUnits
      },
      isCourseVisible() {
        return  [
            SchoolCategories.SENIOR_HIGH_SCHOOL.id,
            SchoolCategories.COLLEGE.id,
            SchoolCategories.GRADUATE_SCHOOL.id,
            SchoolCategories.VOCATIONAL.id
          ].includes(this.currentSchoolCategoryId);
      },
      isSemesterVisible() {
        return [
            SchoolCategories.SENIOR_HIGH_SCHOOL.id,
            SchoolCategories.COLLEGE.id
          ].includes(this.currentSchoolCategoryId);
      }
    },
    methods: {
      populate() {
        copyValue(this.data?.latestAcademicRecord || {}, this.forms.academicRecord.fields);
      },
      loadLevels() {
        this.getLevelList({ paginate: false }).then(({ data }) => {
          this.options.levels.items = data;
          this.options.levels.scheduledItems = data;
        });
      },
      loadCurrentLevelCourses() {
        this.options.courses.scheduledLoading = true
        const { levelId } = this.data?.latestAcademicRecord;
        this.getCoursesOfLevelList(levelId, { paginate: false }).then(({ data }) => {
          this.options.courses.scheduledItems = data
          this.options.semesters.scheduledItems = Semesters
          if (data.length === 0) {
            this.options.semesters.scheduledItems = []
            this.filters.scheduledSubject.courseId = null
            this.filters.scheduledSubject.semesterId = null
          }
          this.options.courses.scheduledLoading = false
          //  this.loadScheduledViewSections()
        });
      },
      loadCurrentCourseLevels() {
        const { courseId } = this.data?.latestAcademicRecord;
        this.getLevelOfCoursesList(courseId, { paginate: false }).then(({ data }) => {
          this.options.levelsOfCourses.items = data
        })
      },
      loadUnscheduledSubjects() {
        const { transcriptRecord } = this.data?.latestAcademicRecord;
        const { subjects } = this.tables
        const { subject } = this.paginations

        if (!transcriptRecord?.curriculumId) {
          console.warn('loadUnscheduledSubjects -> curriculum id not found!');
        }

        subjects.isBusy = true
        const params = { paginate: false , curriculumId: transcriptRecord.curriculumId };

        this.getUnscheduledSubjects(transcriptRecord?.id, params).then(({ data }) => {
          const result = data.filter(subject => subject.isAllowed == true)

          //clear subjects
          subjects.items = []

          //init new subjects base on evaluation subjects
          subjects.items = data
          subjects.filteredItems = result
          subject.totalRows = data.length
          subjects.isBusy = false
          this.recordDetails(subject)
        });
      },
      loadSections() {
        this.isLoadingSection = true;
        this.forms.academicRecord.fields.sectionId = null;

        const { schoolYearId, levelId, courseId, semesterId } = this.data?.latestAcademicRecord;
        const params = { paginate: false, schoolYearId, levelId, courseId, semesterId };

        this.getSectionList(params).then(({ data }) => {
          this.options.sections.items = data;
          this.isLoadingSection = false;
        }).catch((error) => {
          console.warn(error);
        });
      },
      loadDefaultSubjects() {
        const { sectionId } = this.forms.academicRecord.fields;
        const { curriculumId } = this.data?.latestAcademicRecord?.transcriptRecord;

        const { enlistedSubjects } = this.tables
        const params = { paginate: false, curriculumId }
        enlistedSubjects.isBusy = true

        if (!sectionId) {
          enlistedSubjects.items = [];
          enlistedSubjects.isBusy = false;
          return;
        }

        this.getSectionScheduledSubjectsWithStatus(params, sectionId).then(({ data }) => {
          enlistedSubjects.items  = data.filter(s => s.isAllowed === true)
          const section = this.options.sections.items.find(s => s.id === sectionId )
          enlistedSubjects.items.forEach(item => {
            this.$set(item, 'sectionId', section ? section.id : null)
            this.$set(item, 'section', section ? section : null)
          });
          enlistedSubjects.isBusy = false
        });
      },
      onSubmitApplication() {
        this.isProcessing = true;
        reset(this.forms.academicRecord);
        const onboardingStepId = OnboardingSteps.ACADEMIC_RECORD_IN_REVIEW.id; // next step

        const { academicRecord } = this.forms;

        const { items } = this.tables.enlistedSubjects;
        const subjects = items?.map(v => ({ subjectId: v.id, sectionId: v.sectionId }));

        const payload = { sectionId: academicRecord?.fields?.sectionId, subjects };

        const academicRecordId = this.data.latestAcademicRecord?.id;

        this.postSubmitApplication(payload, academicRecordId).then(({ data }) => {
          const activeAcademicRecord = { ...this.data?.latestAcademicRecord, ...data.latestAcademicRecord };
          this.$emit('update:data', { ...this.data, activeAcademicRecord });
          this.$emit('onAfterSubmit', onboardingStepId);
          this.isProcessing = false;
        }).catch((error) => {
          const { errors } = error.response.data;
          validate(this.forms.academicRecord, errors);
          this.isProcessing = false;
        });
      },
      onAddSubject() {
        const { levelId, schoolCategoryId, courseId, semesterId } = this.forms.academicRecord.fields
        // const { levelsOfCourses } = this.options
        // const { subjects } = this.tables
        // const { subject } = this.paginations

        this.filters.subject.levelId = levelId
        this.filters.scheduledSubject.levelId = levelId

        if (levelId) {
          this.loadScheduledViewCourses()
        }

        this.filters.scheduledSubject.courseId = courseId
        this.filters.scheduledSubject.semesterId = semesterId

        this.filters.subject.semesterId = semesterId

        // levelsOfCourses.items = []
        // if (levelId == null) {
        //   return
        // }

        // if (schoolCategoryId === SchoolCategories.COLLEGE.id ||
        //   schoolCategoryId === SchoolCategories.SENIOR_HIGH_SCHOOL.id ||
        //   schoolCategoryId === SchoolCategories.GRADUATE_SCHOOL.id) {
        //   this.getLevelOfCoursesList(courseId, { paginate: false }).then(({ data }) => {
        //     levelsOfCourses.items = data
        //   })
        // }

        this.filterSubject()
        this.loadScheduledSubjects();
        this.isShownSubjects = true
      },
      filterSubject() {
        const { subjects } = this.tables
        const { subject } = this.paginations
        const { levelId, semesterId } = this.filters.subject

        if (levelId !== null && semesterId !== null) {
          subjects.filteredItems = subjects.items.filter(s => s.pivot.levelId === levelId && s.pivot.semesterId === semesterId)
        } else if (levelId !== null && semesterId === null) {
          subjects.filteredItems = subjects.items.filter(s => s.pivot.levelId === levelId)
        } else if (semesterId !== null && levelId === null) {
          subjects.filteredItems = subjects.items.filter(s => s.pivot.semesterId === semesterId)
        }
        else {
          subjects.filteredItems = subjects.items
        }

        this.onFiltered(subjects.filteredItems, subject)
      },
      loadScheduledViewCourses() {
        this.tables.scheduledSubjects.items = []
        let { levelId, courseId, semesterId, sectionId }  = this.filters.scheduledSubject
        const { scheduledItems } = this.options.levels

        // console.log(fields.levelId)
        const level = scheduledItems.find(i => i.id == levelId)
        const params = { paginate: false }
        if (level) {
          this.filters.scheduledSubject.schoolCategoryId = level.schoolCategoryId
        }

        // this.options.courses.scheduledLoading = true
        // this.getCoursesOfLevelList(levelId, params).then(({ data }) => {
        //   this.options.courses.scheduledItems = data
        //   this.options.semesters.scheduledItems = Semesters
        //   if (data.length === 0) {
        //     this.options.semesters.scheduledItems = []
        //     this.filters.scheduledSubject.courseId = null
        //     this.filters.scheduledSubject.semesterId = null
        //   }
        //   this.options.courses.scheduledLoading = false
        //    this.loadScheduledViewSections()
        // });
         this.loadScheduledViewSections()
      },
      loadScheduledViewSections() {
        //add loading section state
        this.options.sections.scheduledItems = []
        const { semesters, courses, sections } = this.options
        const { schoolYearId } = this.forms.academicRecord.fields
        const { levelId, courseId, semesterId } = this.filters.scheduledSubject

        if (courses.scheduledItems.length !==0 || courses.scheduledItems.length !==0) {
          if (!courseId || !semesterId) {
            return
          }
        }

        sections.scheduledLoading = true
        let params = { paginate: false, schoolYearId, levelId, courseId, semesterId };
        this.getSectionList(params).then(({ data }) => {
          this.options.sections.scheduledItems = data;
          this.filters.scheduledSubject.sectionId = null
          this.loadScheduledSubjects()
          sections.scheduledLoading = false
        });
      },
      removeSubject(row){
        this.tables.enlistedSubjects.items.splice(row.index, 1);
      },
      loadScheduledSubjects() {
        const { scheduledSubjects } = this.tables
        const { scheduledSubject } = this.paginations
        const { sectionId } = this.filters.scheduledSubject
        const { curriculumId } = this.data?.latestAcademicRecord?.transcriptRecord;
        const params = { paginate: false, curriculumId }
        scheduledSubjects.isBusy = true

        if (!sectionId) {
          scheduledSubjects.items = []
          scheduledSubjects.isBusy = false
          return
        }

        this.getSectionScheduledSubjectsWithStatus(params, sectionId).then(({ data }) => {
          scheduledSubjects.items = data
          scheduledSubject.totalRows = data.length
          scheduledSubjects.isBusy = false
          this.recordDetails(scheduledSubject)
        }).catch((error) => {
          scheduledSubjects.isBusy = false
        })
      },
      addSubject(row) {
        const { item } = row
        const { items } = this.tables.enlistedSubjects
        // check if subject exist in the table
        const result = items.find(subject => subject.id === item.id)
        if (result) {
          showNotification(this, 'danger', item.name + ' is already added.')
          return
        }
        this.$set(row.item, 'sectionId', null)
        this.$set(row.item, 'section', null)
        items.push(row.item)
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/shared.scss";

  .application__wizard-form-fields {
    margin-bottom: 20px;
  }

  .application__action-bar {
    position: sticky;
    height: 60px;
    background-color: $white;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top: 1px solid $brand-border-color;
    z-index: 2;
  }

  .application__back-action {
    min-width: 140px;

    @include for-size(phone-only) {
      min-width: 80px;
    }
  }

  .application__main-action {
    margin-left: auto;
    min-width: 160px;

    @include for-size(phone-only) {
      min-width: 80px;
    }
  }

  .profile-photo {
    height: 200px;
    width: 200px;
  }

  .profile-photo-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .application__wizard-form {
    padding: 30px 15px 50px 15px;
    width: 100%;
    max-width: 950px;
    margin: 25px 10px 20px 10px;
    background-color: $white;
    margin-bottom: 100px;

    @include for-size(tablet-portrait-down) {
      margin: 0 0 50px 0;
      border: none;
    }

    @include for-size(desktop-up) {
      padding: 20px 60px 60px 60px;
    }
  }


</style>

