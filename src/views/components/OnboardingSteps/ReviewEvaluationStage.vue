<template>
  <div class="application__wizard-form-fields">
    <b-alert variant="success" class="mt-4" show>
      <h5 class="mb-3">REQUEST FOR EVALUATION SUBMITTED!</h5>
      <p>
        Thank you for submitting your enrollment application for this school year.
        <br> You'll be notified via email / sms about the result of you evaluation request.
      </p>
      <p>
        Once notified, log in again to continue your enrollment application.
      </p>
      <p>
        We will try to get back to you as soon as we can!
      </p>
    </b-alert>
    <ApprovalIndicator
      :stages="$options.evaluationApprovalStages"
      :currentStage="approvalStage"
    />
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
  import ApprovalIndicator from '../ApprovalIndicator.vue'
  import { evaluationApprovalStages } from '../../../content';
  import { AcademicRecordStatuses, OnboardingSteps } from '../../../helpers/enum';
  import { StudentApi } from '../../../mixins/api';

  export default {
    evaluationApprovalStages,
    mixins: [StudentApi],
    components: {
      ApprovalIndicator
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

