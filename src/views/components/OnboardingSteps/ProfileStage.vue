<template>
  <div class="application__wizard-form">
    <div class="application__wizard-form-fields">
      <b-row class="mt-4">
        <b-col md="6">
          <b-form-group v-if="data && ! data.latestAcademicRecord.isAdmission">
            <label class="required">Student No.</label>
            <b-form-input
              v-model="forms.student.fields.studentNo"
              :state="forms.student.states.studentNo"
              debounce="500"/>
            <b-form-invalid-feedback>
              {{forms.student.errors.studentNo}}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group>
            <label class="required">Firstname</label>
            <b-form-input
              v-model="forms.student.fields.firstName"
              :state="forms.student.states.firstName"
              debounce="500"/>
            <b-form-invalid-feedback>
              {{forms.student.errors.firstName}}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group>
            <label>Middlename</label>
            <b-form-input
              v-model="forms.student.fields.middleName"
              debounce="500"/>
          </b-form-group>
          <b-form-group>
            <label class="required">Lastname</label>
            <b-form-input
              v-model="forms.student.fields.lastName"
              :state="forms.student.states.lastName"
              debounce="500"/>
            <b-form-invalid-feedback>
              {{forms.student.errors.lastName}}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group>
            <label class="required">Birthdate</label>
            <b-form-input type="date"
              v-model="forms.student.fields.birthDate"
              :state="forms.student.states.birthDate" />
            <b-form-invalid-feedback>
              {{forms.student.errors.birthDate}}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group>
            <label class="required">Email</label>
            <b-form-input
              v-model="forms.student.fields.email"
              :state="forms.student.states.email"
              debounce="500"/>
            <b-form-invalid-feedback>
              {{forms.student.errors.email}}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group>
            <label>Mobile No.</label>
            <b-form-input
              v-model="forms.student.fields.mobileNo"
              debounce="500"/>
          </b-form-group>
          <b-form-group>
            <label class="required">Civil Status</label>
            <b-form-select
              v-model="forms.student.fields.civilStatusId"
              :state="forms.student.states.civilStatusId" >
              <template v-slot:first>
                <b-form-select-option :value='null' disabled>--Select Civil Status --</b-form-select-option>
              </template>
              <b-form-select-option v-for='civilStatus in options.civilStatuses.items.values' :key='civilStatus.id' :value='civilStatus.id'>
                {{ civilStatus.name }}
              </b-form-select-option>
            </b-form-select>
            <b-form-invalid-feedback>
              {{ forms.student.errors.civilStatusId }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <div class="profile-photo-container">
            <div class="profile-photo">
              <PhotoViewer
                @onPhotoChange="onPhotoChange"
                @onPhotoRemove="onPhotoRemove"
                :imageUrl="studentPhotoUrl"
                :isBusy="isProfilePhotoBusy"
              />
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <div class="application__action-bar">
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
    CivilStatuses
  } from '../../../helpers/enum';

  const studentFields = {
    id: null,
    studentNo: null,
    firstName: null,
    middleName: null,
    lastName: null,
    mobileNo: null,
    birthDate: null,
    civilStatusId: null,
    name: null,
    email: null
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
        studentPhotoUrl: null,
        isProfilePhotoBusy: false,
        isProcessing: false,
        forms: {
          student: {
            fields: { ...studentFields },
            states: { ...studentFields },
            errors: { ...studentFields }
          }
        },
        options:{
          civilStatuses: {
            items: CivilStatuses
          },
        }
      }
    },
    computed: {
      isAdmission() {
        return this.data?.latestAcademicRecord?.isAdmission;
      }
    },
    created() {
      this.populate();
    },
    methods: {
      populate() {
        copyValue(this.data || {}, this.forms.student.fields);
        if(this.data?.photo){
          this.studentPhotoUrl = process.env.VUE_APP_PUBLIC_PHOTO_URL + this.data?.photo?.hashName;
        }
      },
      onPhotoChange(file) {
        const formData = new FormData();
        formData.append('photo', file);
        this.isProfilePhotoBusy = true;
        this.savePhoto(formData, this.forms.student.fields.id).then(({ data }) =>{
          this.studentPhotoUrl = process.env.VUE_APP_PUBLIC_PHOTO_URL + data.hashName
          // localStorage.setItem('studentPhotoUrl', this.studentPhotoUrl);
          this.isProfilePhotoBusy = false;
        })
      },
      onPhotoRemove() {
        this.deletePhoto(this.forms.student.fields.id).then(({ data }) =>{
          this.studentPhotoUrl = ""
        })
      },
      onSubmitNext() {
        this.isProcessing = true;
        reset(this.forms.student);
        const onboardingStepId = OnboardingSteps.ADDRESS.id; // next step
        const payload = {
          ...this.forms?.student?.fields,
          onboardingStepId
        }

        // if latest academic record is admission, do not include Student No so it will not be validated
        if (this.isAdmission && payload.hasOwnProperty('studentNo')) {
          delete payload.studentNo;
        }

        this.updateStudent(payload, this.data?.id).then(({ data }) => {
          this.$emit('update:data', data);
          this.$emit('onAfterSubmit', onboardingStepId);
          this.isProcessing = false;
        }).catch((error) => {
          const { errors } = error.response.data;
          validate(this.forms.student, errors)
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

