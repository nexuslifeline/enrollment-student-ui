<template>
  <div class="application__wizard-form-fields">
   <div class="application__content">
    <EnlistmentPendingAlert v-if="[AcademicRecordStatuses.EVALUATION_APPROVED.id, AcademicRecordStatuses.ENLISTMENT_PENDING.id].includes(currentAcademicRecordStatusId)"/>
    <EnlistmentApprovedAlert :data="application" v-if="currentAcademicRecordStatusId === AcademicRecordStatuses.ENLISTMENT_APPROVED.id"/>
    <AssessmentRejectedAlert :data="studentFee" v-if="currentAcademicRecordStatusId === AcademicRecordStatuses.ASSESSMENT_REJECTED.id"/>
    <AssessmentApprovedAlert :data="studentFee" v-if="currentAcademicRecordStatusId === AcademicRecordStatuses.ASSESSMENT_APPROVED.id"/>
    <div class="mt-2 mb-2">
      <span style="font-size: 1.5rem; font-weight: bold">{{ percentage }}% </span>
      <span>
        We are still reviewing your application. Please check your account from time to time
      </span>
    </div>
    <ProgressIndicator :barCount="6" :activeBar="percentage === 30 ? 2 : percentage === 60 ? 4 : 6"/>
    <ApprovalIndicator :stages="$options.approvalStages" :currentStage="selectedApprovalStage"/>
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
  import { approvalStages } from '../../../content';
  import { AcademicRecordStatuses, OnboardingSteps  } from '../../../helpers/enum';
  import { StudentApi } from '../../../mixins/api';
  import EnlistmentPendingAlert from '../AlertNotifications/EnlistmentPending'
  import EnlistmentApprovedAlert from '../AlertNotifications/EnlistmentApproved'
  import AssessmentRejectedAlert from '../AlertNotifications/AssesmentRejected'
  import AssessmentApprovedAlert from '../AlertNotifications/AssessmentApproved'
  import ProgressIndicator from '../ProgressIndicator'
  import ApprovalIndicator from '../ApprovalIndicator'

  export default {
    approvalStages,
    mixins: [StudentApi],
    components: {
      EnlistmentPendingAlert,
      AssessmentRejectedAlert,
      ProgressIndicator,
      ApprovalIndicator,
      EnlistmentApprovedAlert,
      AssessmentApprovedAlert
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
      currentAcademicRecordStatusId() {
        return this.data?.latestAcademicRecord?.academicRecordStatusId;
      },
      isNextVisible() {
        return [
          AcademicRecordStatuses.ASSESSMENT_APPROVED.id,
          AcademicRecordStatuses.PAYMENT_SUBMITTED.id,
          AcademicRecordStatuses.ENROLLED.id,
        ].includes(this.data?.latestAcademicRecord.academicRecordStatusId);
      },
      application() {
        return this.data?.latestAcademicRecord?.application
      },
      studentFee() {
        return this.data?.latestAcademicRecord?.studentFee
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
        this.selectedApprovalStage = stages?.[this.currentAcademicRecordStatusId] || 1;
      },
      showEstimatedPercentage() {
        const estimates = {
          [AcademicRecordStatuses.ASSESSMENT_APPROVED.id]: 100,
          [AcademicRecordStatuses.ENLISTMENT_APPROVED.id]: 60,
        }
        this.percentage = estimates?.[this.currentAcademicRecordStatusId] || 30;
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

