<template>
  <div class="application__wizard-form">
    <div class="application__wizard-form-fields">
      <b-row>
        <b-col md="6">
          <b-form-group>
            <label class="required">Father</label>
            <b-form-input
              v-model="forms.family.fields.fatherName"
              :state="forms.family.states.familyFatherName"
              debounce="500" />
            <b-form-invalid-feedback>
              {{forms.family.errors.familyFatherName}}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group>
            <label>Contact No.</label>
            <b-form-input
              v-model="forms.family.fields.fatherMobileNo"
              debounce="500" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-form-group>
            <label>Occupation</label>
            <b-form-input
              v-model="forms.family.fields.fatherOccupation"
              debounce="500" />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group>
            <label>Email Address</label>
            <b-form-input
              v-model="forms.family.fields.fatherEmail"
              :state="forms.family.states.familyFatherEmail"
              debounce="500" />
            <b-form-invalid-feedback>
              {{forms.family.errors.familyFatherEmail}}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col md="6">
          <b-form-group>
            <label class="required">Mother</label>
            <b-form-input
              v-model="forms.family.fields.motherName"
              :state="forms.family.states.familyMotherName"
              debounce="500" />
            <b-form-invalid-feedback>
              {{forms.family.errors.familyMotherName}}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group>
            <label>Contact No.</label>
            <b-form-input
              v-model="forms.family.fields.motherMobileNo"
              debounce="500" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-form-group>
            <label>Occupation</label>
            <b-form-input
              v-model="forms.family.fields.motherOccupation" 
              debounce="500"/>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group>
            <label>Email Address</label>
            <b-form-input
              v-model="forms.family.fields.motherEmail"
              :state="forms.family.states.familyMotherEmail"
              debounce="500" />
            <b-form-invalid-feedback>
              {{forms.family.errors.familyMotherEmail}}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md=12>
          <b-row class="mt-2 mb-2">
            <b-col md=12 >
              <h6>In case of emergency, Please contact : </h6>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <b-form-group>
                <label class="required">Parent/Guardian</label>
                <b-form-input 
                  v-model="forms.family.fields.parentGuardianName"
                  :state="forms.family.states.familyParentGuardianName" 
                  debounce="500"/>
                <b-form-invalid-feedback>
                  {{forms.family.errors.familyParentGuardianName}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label class="required">Parent/Guardian Contact No.</label>
                <b-form-input 
                  v-model="forms.family.fields.parentGuardianContactNo"
                  :state="forms.family.states.familyParentGuardianContactNo" 
                  debounce="500"/>
                <b-form-invalid-feedback>
                  {{forms.family.errors.familyParentGuardianContactNo}}
                </b-form-invalid-feedback>
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
    ApplicationSteps,
    Countries
  } from '../../../helpers/enum';

  const familyFields = {
    fatherName: null,
    fatherOccupation: null,
    fatherMobileNo: null,
    fatherEmail: null,
    motherName: null,
    motherOccupation: null,
    motherMobileNo: null,
    motherEmail: null,
    parentGuardianName: null,
    parentGuardianContactNo: null
  }

  const familyErrorFields = {
    familyFatherName: null,
    familyFatherOccupation: null,
    familyFatherMobileNo: null,
    familyFatherEmail: null,
    familyMotherName: null,
    familyMotherOccupation: null,
    familyMotherMobileNo: null,
    familyMotherEmail: null,
    familyParentGuardianName: null,
    familyParentGuardianContactNo: null
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
        previousStepId: ApplicationSteps.ADDRESS.id,
        forms: {
          family: {
            fields: { ...familyFields },
            states: { ...familyErrorFields },
            errors: { ...familyErrorFields }
          }
        },
        options:{
          countries: {
            items: Countries
          },
        }
      }
    },
    created() {
      this.populate();
    },
    methods: {
      populate() {
        copyValue(this.data?.family, this.forms.family.fields);
      },
      onSubmitNext() {
        this.isProcessing = true;
        const onboardingStepId = ApplicationSteps.EDUCATION.id; // next step
        const payload = {
          onboardingStepId,
          family: {
            ...this.forms.family?.fields
          }
        }
        this.updateStudent(payload, this.data?.id).then(({ data }) => {
          this.$emit('update: data', data);
          this.$emit('onAfterSubmit', onboardingStepId);
          this.isProcessing = false;
        }).catch((error) => {
          const { errors } = error.response.data;
          validate(this.forms.family, errors)
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

