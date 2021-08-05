<template>
  <div class="application__wizard-form">
    <div class="application__wizard-form-fields">
      <!-- <b-row>
        <b-col md="5">
          <b-form-group>
            <label>Last School Attended</label>
            <b-form-input
              v-model="forms.education.fields.lastSchoolAttended"
              debounce="500"/>
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group>
            <label>From</label>
            <b-form-input
              v-model="forms.education.fields.lastSchoolYearFrom"
              debounce="500"/>
          </b-form-group>
        </b-col>
          <b-col md="2">
          <b-form-group>
            <label>To</label>
            <b-form-input
              v-model="forms.education.fields.lastSchoolYearTo"
              debounce="500"/>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group>
            <label>Level</label>
            <b-form-input
              v-model="forms.education.fields.lastLevel"
              debounce="500"/>
          </b-form-group>
        </b-col>
      </b-row> -->
      <!-- <b-row>
        <b-col md="12">
          <b-form-group>
            <label>Last School Address</label>
            <b-form-input
              v-model="forms.education.fields.lastSchoolAddress"
              debounce="500" />
          </b-form-group>
        </b-col>
      </b-row> -->
      <b-row>
        <b-col md="12">
          <b-row>
            <b-col md="5">
              <b-form-group>
                <label>Elementary or Primary</label>
                <b-form-input
                    v-model="forms.education.fields.elementaryCourse"
                    debounce="500"/>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-group>
                <label>From</label>
                <b-form-input
                    v-model="forms.education.fields.elementaryCourseYearFrom"
                    debounce="500" />
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-group>
                <label>To</label>
                <b-form-input
                    v-model="forms.education.fields.elementaryCourseYearTo"
                    debounce="500" />
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group>
                <label>Honor Received</label>
                <b-form-input
                    v-model="forms.education.fields.elementaryCourseHonors"
                    debounce="500"/>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <b-row>
            <b-col md="5">
              <b-form-group>
                <label>High School or Secondary</label>
                <b-form-input
                    v-model="forms.education.fields.highSchoolCourse"
                    debounce="500"/>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-group>
                <label>From</label>
                <b-form-input
                    v-model="forms.education.fields.highSchoolCourseYearFrom"
                    debounce="500"/>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-group>
                <label>To</label>
                <b-form-input
                    v-model="forms.education.fields.highSchoolCourseYearTo"
                    debounce="500"/>
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group>
                <label>Honor Received</label>
                <b-form-input
                    v-model="forms.education.fields.highSchoolCourseHonors"
                    debounce="500"/>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <b-row>
            <b-col md="5">
              <b-form-group>
                <label>Senior High School or Upper Secondary</label>
                <b-form-input
                    v-model="forms.education.fields.seniorSchoolCourse"
                    debounce="500"/>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-group>
                <label>From</label>
                <b-form-input
                    v-model="forms.education.fields.seniorSchoolCourseYearFrom"
                    debounce="500"/>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-group>
                <label>To</label>
                <b-form-input
                    v-model="forms.education.fields.seniorSchoolCourseYearTo"
                    debounce="500"/>
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group>
                <label>Honor Received</label>
                <b-form-input
                    v-model="forms.education.fields.seniorSchoolCourseHonors"
                    debounce="500"/>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <b-row>
            <b-col md="5">
              <b-form-group>
                <label >College (if graduated) or Tertiary</label>
                <b-form-input
                    v-model="forms.education.fields.collegeDegree"
                    debounce="500"/>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-group>
                <label>From</label>
                <b-form-input
                    v-model="forms.education.fields.collegeDegreeYearFrom"
                    debounce="500"/>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-group>
                <label>To</label>
                <b-form-input
                    v-model="forms.education.fields.collegeDegreeYearTo"
                    debounce="500"/>
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group>
                <label>Honor Received</label>
                <b-form-input
                    v-model="forms.education.fields.collegeDegreeHonors"
                    debounce="500"/>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
    <div class="application__action-bar">
      <b-button
        @click="$emit('onBack', previousStepId)"
        variant="outline-secondary"
        class="application__back-action">
        Back
      </b-button>
      <b-button
        @click="onSubmitNext"
        variant="primary"
        class="application__main-action"
        :disabled="isProcessing">
        <v-icon
          v-if="isProcessing"
          name="sync"
          class="mr-2"
          spin />
          Next
      </b-button>
    </div>
  </div>
</template>
<script>
  import PhotoViewer from '../PhotoViewer'
  import { copyValue } from '../../../helpers/extractor';
  import { validate, reset } from '../../../helpers/forms';
  import {
    StudentApi
  } from '../../../mixins/api';
  import {
    OnboardingSteps,
  } from '../../../helpers/enum';

  const educationFields = {
    lastSchoolAttended: null,
    lastSchoolAddress: null,
    lastSchoolYearFrom: null,
    lastSchoolYearTo: null,
    lastLevel: null,
    elementaryCourse: null,
    elementaryCourseYearFrom: null,
    elementaryCourseYearTo: null,
    elementaryCourseHonors: null,
    highSchoolCourse: null,
    highSchoolCourseYearFrom: null,
    highSchoolCourseYearTo: null,
    highSchoolCourseHonors: null,
    seniorSchoolCourse: null,
    seniorSchoolCourseYearFrom: null,
    seniorSchoolCourseYearTo: null,
    seniorSchoolCourseHonors: null,
    collegeDegree: null,
    collegeDegreeYearFrom: null,
    collegeDegreeYearTo: null,
    collegeDegreeHonors: null,
  }

  export default {
    mixins: [StudentApi],
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
        isProcessing: false,
        previousStepId: OnboardingSteps.FAMILY.id,
        forms: {
          education: {
            fields: { ...educationFields },
            states: { ...educationFields },
            errors: { ...educationFields }
          }
        }
      }
    },
    created() {
      this.populate();
    },
    methods: {
      populate() {
        copyValue(this.data?.education || {}, this.forms.education.fields);
      },
      onSubmitNext() {
        this.isProcessing = true;
        reset(this.forms.education);
        const onboardingStepId = OnboardingSteps.REQUEST_EVALUATION.id; // next step
        const payload = {
          onboardingStepId,
          education: {
            ...this.forms.education?.fields
          }
        }
        this.updateStudent(payload, this.data?.id).then(({ data }) => {
          this.$emit('update:data', data);
          this.$emit('onAfterSubmit', onboardingStepId);
          this.isProcessing = false;
        }).catch((error) => {
          const { errors } = error.response.data;
          validate(this.forms.education, errors)
          this.isProcessing = false;
        });
      }
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

