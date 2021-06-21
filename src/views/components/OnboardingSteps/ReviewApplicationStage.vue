<template>
  <div class="application__wizard-form-fields">
    <b-row>
      <b-col md="12">
        <b-alert variant="success" show>
          <h5>APPLICATION SUBMITTED!</h5>
          <p>Thank you for submitting your enrollment application for this school year.
          <br> We will review your application and once approved, you will be able to proceed to payment.
          <br>
          <br>You'll be notified via email / sms about the result of your subject enlistment request.
          <br>Once notified, log in again to continue your enrollment application. </p>
        </b-alert>
        <b-row class="pb-2">
          <b-col md="12">
            <div>
              <span style="font-size: 1.5rem; font-weight: bold">{{ percentage }}% </span>
              <span>
                We are still reviewing your application. Please check your account from time to time
              </span>
            </div>
          </b-col>
        </b-row>
        <div class="pb-5">
          <ProgressIndicator
            :barCount="6"
            :activeBar="percentage === 30 ? 2 : percentage === 60 ? 4 : 6"
          />
        </div>
        <div class="approval-container">
          <ApprovalIndicator
            :stages="$options.approvalStages"
            :currentStage="selectedApprovalStage"
          />
        </div>
        <!-- <b-alert
          :show="dismissCountDown"
          variant="info"
          @dismissed="onUpdateStudent()"
          @dismiss-count-down="countDownChanged"
        >
          Please wait a few second, we are setting up for you. Time remaining: {{ dismissCountDown  }} second(s).
          <v-icon
            v-if="dismissCountDown"
            name="spinner"
            class="mr-2 float-right"
            spin />
        </b-alert> -->
      </b-col>
    </b-row>
  </div>
</template>
<script>
  import ApprovalIndicator from '../ApprovalIndicator';
  import ProgressIndicator from '../ProgressIndicator';
  import { approvalStages } from '../../../content';
  import { AcademicRecordStatuses } from '../../../helpers/enum';

  export default {
    approvalStages,
    components: {
      ApprovalIndicator,
      ProgressIndicator
    },
    props: {
      data: {
        type: [Object]
      }
    },
    data() {
      return {
        approvalStage: 1,
        percentage: 30,
      }
    },
    created() {
      this.showCurrentStage();
      this.showEstimatedPercentage();
    },
    computed: {
      currentStatusId() {
        return this.data?.activeAcademicRecord?.academicRecordStatusId;
      }
    },
    methods: {
      showCurrentStage() {
        this.approvalStage = this.currentStatusId === AcademicRecordStatuses.EVALUATION_APPROVED.id
          ? 2
          : 1;
      },
      showEstimatedPercentage() {
        this.percentage = this.currentStatusId === AcademicRecordStatuses.ASSESSMENT_APPROVED.id
          ? 100
          : this.currentStatusId === AcademicRecordStatuses.ENLISTMENT_APPROVED.id
          ? 60
          : 30;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/shared.scss";

  .application__wizard-form-fields {
    margin-bottom: 20px;
    width: 85%;
    max-width: 750px;
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

