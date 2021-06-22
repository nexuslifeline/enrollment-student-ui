<template>
  <div class="application__wizard-form-fields">
   <div class="application__content">
      <b-alert variant="success" show>
      <h5>APPLICATION SUBMITTED!</h5>
      <p>Thank you for submitting your enrollment application for this school year.
      <br> We will review your application and once approved, you will be able to proceed to payment.
      <br>
      <br>You'll be notified via email / sms about the result of your subject enlistment request.
      <br>Once notified, log in again to continue your enrollment application. </p>
    </b-alert>

    <div>
      <span style="font-size: 1.5rem; font-weight: bold">{{ percentage }}% </span>
      <span>
        We are still reviewing your application. Please check your account from time to time
      </span>
    </div>
    <div class="pb-5">
      <ProgressIndicator
        :barCount="6"
        :activeBar="percentage === 30 ? 2 : percentage === 60 ? 4 : 6"
      />
    </div>
    <ApprovalIndicator
      :stages="$options.approvalStages"
      :currentStage="selectedApprovalStage"
    />
   </div>
    <div class="application__action-bar">
      <b-button
        v-if="isNextVisible"
        @click="onSubmitNext"
        variant="primary"
        class="application__main-action"
        :disabled="isProcessing">
        <v-icon
          v-if="isProcessing"
          name="sync"
          class="mr-2"
          spin />
          Continue to Payment
      </b-button>
    </div>
  </div>
</template>
<script>
  import ApprovalIndicator from '../ApprovalIndicator';
  import ProgressIndicator from '../ProgressIndicator';
  import { approvalStages } from '../../../content';
  import { AcademicRecordStatuses, OnboardingSteps  } from '../../../helpers/enum';
  import { StudentApi } from '../../../mixins/api';

  export default {
    approvalStages,
    mixins: [StudentApi],
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
        selectedApprovalStage: 1,
        isProcessing: false,
        AcademicRecordStatuses,
        OnboardingSteps
      }
    },
    created() {
      this.showCurrentStage();
      this.showEstimatedPercentage();
    },
    computed: {
      currentStatusId() {
        return this.data?.activeAcademicRecord?.academicRecordStatusId;
      },
      isNextVisible() {
        return [
          AcademicRecordStatuses.ASSESSMENT_APPROVED.id,
          AcademicRecordStatuses.PAYMENT_SUBMITTED.id,
          AcademicRecordStatuses.ENROLLED.id,
        ].includes(this.data?.activeAcademicRecord.academicRecordStatusId);
      }
    },
    methods: {
      showCurrentStage() {
        const stages = {
          [AcademicRecordStatuses.ENLISTMENT_PENDING.id]: 1,
          [AcademicRecordStatuses.ENLISTMENT_REJECTED.id]: 1,
          [AcademicRecordStatuses.ENLISTMENT_APPROVED.id]: 2,
          [AcademicRecordStatuses.ASSESSMENT_REJECTED.id]: 2,
          [AcademicRecordStatuses.ASSESSMENT_APPROVED.id]: 3
        }
        this.selectedApprovalStage = stages?.[this.currentStatusId] || 1;
      },
      showEstimatedPercentage() {
        const estimates = {
          [AcademicRecordStatuses.ASSESSMENT_APPROVED.id]: 100,
          [AcademicRecordStatuses.ENLISTMENT_APPROVED.id]: 60,
        }
        this.percentage = estimates?.[this.currentStatusId] || 30;
      },
      onSubmitNext() {
        this.isProcessing = true;
        const onboardingStepId = OnboardingSteps.PAYMENTS.id;
        this.patchStudent({ onboardingStepId }, this.data?.id).then(({ data }) => {
          this.$emit('update:data', data);
          this.$emit('onAfterSubmit', onboardingStepId);
          this.isProcessing = false;
        }).catch((error) => {
          console.warn(error);
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

  .application__content {
    height: calc(100% - 80px);
  }


</style>

