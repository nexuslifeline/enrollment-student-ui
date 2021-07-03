<template>
  <div class="application__wizard-form-fields">
    <EvaluationApprovedAlert v-if="isApproved" :data="data.latestAcademicRecord && data.latestAcademicRecord.evaluation || null" />
    <EvaluationPendingAlert v-else :currentStage="approvalStage" />
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
          Continue to Application
      </b-button>
    </div>
  </div>
</template>
<script>

  import { AcademicRecordStatuses, OnboardingSteps } from '../../../helpers/enum';
  import { StudentApi } from '../../../mixins/api';
  import EvaluationPendingAlert from '../AlertNotifications/EvaluationPending'
  import EvaluationApprovedAlert from '../AlertNotifications/EvaluationApproved'

  export default {
    mixins: [StudentApi],
    components: {
      EvaluationPendingAlert,
      EvaluationApprovedAlert
    },
    props: {
      data: {
        type: [Object]
      }
    },
    data() {
      return {
        isProcessing: false,
        approvalStage: 1,
        AcademicRecordStatuses
      }
    },
    created() {
      this.showCurrentStage();
    },
    computed: {
      currentStatusId() {
        return this.data?.latestAcademicRecord?.academicRecordStatusId;
      },
      isNextVisible() {
        return ![
          AcademicRecordStatuses.DRAFT.id,
          AcademicRecordStatuses.EVALUATION_PENDING.id,
          AcademicRecordStatuses.EVALUATION_REJECTED.id,
          AcademicRecordStatuses.CLOSED.id,
        ].includes(this.data?.latestAcademicRecord.academicRecordStatusId);
      },
      isApproved() {
        return [
          AcademicRecordStatuses.EVALUATION_APPROVED.id,
          AcademicRecordStatuses.ENLISTMENT_PENDING.id,
          AcademicRecordStatuses.ENLISTMENT_REJECTED.id,
          AcademicRecordStatuses.ENLISTMENT_APPROVED.id,
          AcademicRecordStatuses.ASSESSMENT_REJECTED.id,
          AcademicRecordStatuses.ASSESSMENT_APPROVED.id,
          AcademicRecordStatuses.PAYMENT_SUBMITTED.id,
          AcademicRecordStatuses.ENROLLED.id
        ].includes(this.data?.latestAcademicRecord.academicRecordStatusId);
      }
    },
    methods: {
      showCurrentStage() {
        this.approvalStage = this.currentStatusId === AcademicRecordStatuses.EVALUATION_APPROVED.id
          ? 2
          : 1;
      },
      onSubmitNext() {
        this.isProcessing = true;
        const onboardingStepId = OnboardingSteps.ACADEMIC_YEAR_APPLICATION.id;
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


</style>

