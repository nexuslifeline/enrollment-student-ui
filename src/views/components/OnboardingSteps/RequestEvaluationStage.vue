<template>
  <div class="application__wizard-form">
    <div class="application__wizard-form-fields">
      <b-row v-if="currentAcademicRecordStatusId === AcademicRecordStatuses.EVALUATION_REJECTED.id">
        <b-col md=12>
          <b-alert variant="danger" show>
            <h5 class="mb-3">
              Request has been Rejected!
            </h5>
            <p>
              {{ data.latestAcademicRecord.evaluation.disapprovalNotes }}
            </p>
            <p>Please be inform that you can modify your request and resubmit for evaluation.</p>
          </b-alert>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col md=12 >
          <h5>
            1. Your previous academic details.
          </h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="5">
          <b-form-group>
            <label class="required">Last School Attended</label>
            <b-form-input
              v-model="forms.evaluation.fields.lastSchoolAttended"
              :state="forms.evaluation.states.lastSchoolAttended"
              debounce="500"/>
            <b-form-invalid-feedback>
              {{ forms.evaluation.errors.lastSchoolAttended }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group>
            <label class="required">From</label>
            <b-form-input
              v-model="forms.evaluation.fields.lastSchoolYearFrom"
              :state="forms.evaluation.states.lastSchoolYearFrom"
              debounce="500" />
            <b-form-invalid-feedback>
              {{ forms.evaluation.errors.lastSchoolYearFrom }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group>
            <label class="required">To</label>
            <b-form-input
              v-model="forms.evaluation.fields.lastSchoolYearTo"
              :state="forms.evaluation.states.lastSchoolYearTo"
              debounce="500" />
            <b-form-invalid-feedback>
              {{ forms.evaluation.errors.lastSchoolYearTo }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col md=3>
            <b-form-group>
              <label class="required">School Level</label>
              <b-form-select
                v-model='forms.evaluation.fields.lastSchoolLevelId'
                :state="forms.evaluation.states.lastSchoolLevelId">
                <template v-slot:first>
                  <b-form-select-option :value='null' disabled>-- School Level --</b-form-select-option>
                </template>
                <b-form-select-option v-for='level in options.levels.items' :key='level.id' :value='level.id'>
                  {{level.name}}
                </b-form-select-option>
              </b-form-select>
              <b-form-invalid-feedback>
                {{ forms.evaluation.errors.lastSchoolLevelId }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <b-form-group>
            <label>Notes</label>
            <b-form-textarea
              rows="2"
              v-model="forms.evaluation.fields.notes"
              debounce="500"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-2 mt-2">
        <b-col md=12>
          <h5>
            2. Your school level to enroll.
          </h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4">
          <b-form-group>
            <b-form-select
              @input="loadCourses"
              v-model='forms.activeAcademicRecord.fields.levelId'
              :state="forms.activeAcademicRecord.states.levelId">
              <template v-slot:first>
                <b-form-select-option :value='null' disabled>-- Level --</b-form-select-option>
              </template>
              <b-form-select-option v-for='level in options.levels.items' :key='level.id' :value='level.id'>
                {{ level.name }}
              </b-form-select-option>
            </b-form-select>
            <b-form-invalid-feedback>
              {{ forms.activeAcademicRecord.errors.levelId }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group v-if="isCourseVisible">
            <b-form-select
              v-model='forms.activeAcademicRecord.fields.courseId'
              :state="forms.activeAcademicRecord.states.courseId"
              >
              <template v-slot:first>
                <b-form-select-option :value='null' disabled>-- Course --</b-form-select-option>
              </template>
              <b-form-select-option v-for='course in options.courses.items' :key='course.id' :value='course.id'>
                {{ course.description }} {{ course.major ? `(${ course.major })` : ''}}
              </b-form-select-option>
            </b-form-select>
            <b-form-invalid-feedback>
              {{ forms.activeAcademicRecord.errors.courseId }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group v-if="isSemesterVisible">
            <b-form-select
              v-model='forms.activeAcademicRecord.fields.semesterId'
              :state="forms.activeAcademicRecord.states.semesterId">
              <template v-slot:first>
                <b-form-select-option :value='null' disabled>-- Semester --</b-form-select-option>
              </template>
              <b-form-select-option v-for='semester in options.semesters.items.values' :key='semester.id' :value='semester.id'>
                {{ semester.name }}
              </b-form-select-option>
            </b-form-select>
            <b-form-invalid-feedback>
              {{forms.activeAcademicRecord.errors.semesterId}}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col md=12>
          <h5>
            3. Attachment of supporting documents.
          </h5>
          <p class="ml-3">
            <small>
              Upon submitting this form, the details you provided in the system will be examined and are subject for the approval of the registrar's office. <br>
              In order for this application to be approved and proceed to the next phase of the enrollment process, please upload your complete enrollment requirements. <br>
              <strong>You can get full list of your complete enrollment requirements <a href="#" @click.prevent="previewRequirementList()">HERE</a>.</strong> <br>
              If your requirements are not yet ready, you can log out for now and your application will be saved. Your enrollment application can be continued the next time you log in.
            </small>
          </p>
        </b-col>
      </b-row>
      <div>
        <StudentFileList v-if="!!data.id" :studentId="data.id" />
      </div>
    </div>
    <div class="application__action-bar">
      <b-button
        @click="$emit('onBack', previousStepId)"
        variant="outline-secondary"
        class="application__back-action">
        Back
      </b-button>
      <b-button
        @click="onSubmitEvaluationRequest"
        variant="primary"
        class="application__main-action"
        :disabled="isProcessing">
        <v-icon
          v-if="isProcessing"
          name="sync"
          class="mr-2"
          spin />
          Submit Request
      </b-button>
    </div>
    <FileViewer
      :show="isShownRequirements"
      :file="file"
      :owner="file.owner"
      :isBusy="file.isLoading"
      @close="isShownRequirements = false"
    />
  </div>
</template>
<script>
  import  StudentFileList from '../StudentFiles/List';
  import { copyValue } from '../../../helpers/extractor';
  import { validate, reset } from '../../../helpers/forms';
  import  FileViewer from '../FileViewer';
  import {
    StudentApi,
    LevelApi,
    ApplicationApi,
    ReportApi,
    AcademicRecordApi
  } from '../../../mixins/api';
  import {
    OnboardingSteps,
    AcademicRecordStatuses,
    SchoolCategories,
    Semesters
  } from '../../../helpers/enum';

  const academicRecordFields = {
    semesterId: null,
    levelId: null,
    courseId: null,
  }

  const evaluationFields = {
    lastSchoolYearFrom: null,
    lastSchoolYearTo: null,
    lastSchoolAttended: null,
    lastSchoolLevelId: null,
    notes: null,
    approvalNotes: null,
    disapprovalNotes: null,
  }

  const studentFileFields = {
    documentTypeId: null,
    notes: null
  }

  export default {
    mixins: [
      StudentApi,
      LevelApi,
      ApplicationApi,
      ReportApi,
      AcademicRecordApi
    ],
    props: {
      data: {
        type: [Object]
      }
    },
    components: {
      StudentFileList,
      FileViewer
    },
    data() {
      return {
        isShownRequirements: false,
        file: {
          type: null,
          src: null,
          name: null,
          notes: null,
          isLoading: false
        },
        fileViewer: {
          student: {
            isActiveNavEnabled: false,
            activeNavCount: 0,
            activeNavIndex: 0,
            show: false,
          }
        },
        AcademicRecordStatuses,
        SchoolCategories,
        isProcessing: false,
        previousStepId: OnboardingSteps.EDUCATION.id,
        forms: {
          evaluation: {
            fields: { ...evaluationFields },
            states: { ...evaluationFields },
            errors: { ...evaluationFields }
          },
          activeAcademicRecord: {
            fields: { ...academicRecordFields },
            states: { ...academicRecordFields },
            errors: { ...academicRecordFields }
          },
          studentFile: {
            fields: { ...studentFileFields },
            states: { ...studentFileFields },
            errors: { ...studentFileFields }
          }
        },
        options: {
          levels: { items:[] },
          courses: { items: [] },
          semesters: { items: Semesters },
        }
      }
    },
    created() {
      this.populate();
      this.loadLevels();
      this.loadCourses();
    },
    computed: {
      currentAcademicRecordStatusId() {
        return this.data?.latestAcademicRecord?.academicRecordStatusId;
      },
      selectedSchoolCategoryId() {
        const { levelId } = this.forms?.activeAcademicRecord?.fields;
        if (levelId) {
          return this.options?.levels?.items[levelId - 1]?.schoolCategoryId;
        }
      },
      isCourseVisible() {
        return  [
            SchoolCategories.SENIOR_HIGH_SCHOOL.id,
            SchoolCategories.COLLEGE.id,
            SchoolCategories.GRADUATE_SCHOOL.id,
            SchoolCategories.VOCATIONAL.id
          ].includes(this.selectedSchoolCategoryId);
      },
      isSemesterVisible() {
        return [
            SchoolCategories.SENIOR_HIGH_SCHOOL.id,
            SchoolCategories.COLLEGE.id
          ].includes(this.selectedSchoolCategoryId);
      }
    },
    methods: {
      populate() {
        copyValue(this.data?.latestAcademicRecord?.evaluation || {}, this.forms.evaluation.fields);
        copyValue(this.data?.latestAcademicRecord || {}, this.forms.activeAcademicRecord.fields);
      },
      onSubmitEvaluationRequest() {
        this.isProcessing = true;

        reset(this.forms.activeAcademicRecord);
        reset(this.forms.evaluation);

        const payload = {
          ...this.forms?.evaluation?.fields,
          ...this.forms?.activeAcademicRecord?.fields
        }

        const onboardingStepId = OnboardingSteps.EVALUATION_IN_REVIEW.id; // next step
        const academicRecordId = this.data?.latestAcademicRecord?.id;

        this.postRequestEvaluation(payload, academicRecordId).then((response) => {
          this.$emit('update:data', { ...this.data, evaluation: { ...response?.data } });
          this.$emit('onAfterSubmit', onboardingStepId);
          this.isProcessing = false;
        }).catch((error) => {
          const { errors } = error.response.data;
          validate(this.forms.activeAcademicRecord, errors);
          validate(this.forms.evaluation, errors);
          this.isProcessing = false;
        });
      },
      // Note! for improvement need to create components/dropdowns for this dropdown
      loadLevels() {
        this.getLevelList({ paginate: false }).then(({ data }) => {
          this.options.levels.items = data;
        });
      },
      loadCourses() {
        const { levelId } = this.forms.activeAcademicRecord.fields;
        if (!levelId) return;

        this.getCoursesOfLevelList(levelId, { paginate: false }).then(({ data }) => {
          this.options.courses.items = data
        });
      },
      previewRequirementList(){
        this.file.type = null
        this.file.src = null
        this.file.notes = null
        this.file.isLoading = true
        this.file.owner = null;
        this.file.name = 'Requirements List'

        this.isShownRequirements = true
        this.getRequirementListPreview()
          .then(response => {
            this.file.type = response.headers.contentType
            const file = new Blob([response.data], { type: "application/pdf" } )
            const reader = new FileReader();
            reader.onload = e => this.file.src = e.target.result
            reader.readAsDataURL(file);
            this.file.isLoading = false
        })
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

  .file-uploader-container {
    width: 100%;
    height: 250px;
    margin: 20px 0 20px 0;

  }

  .file-item-container {
    width: 100%;
    height: auto;
  }


</style>

