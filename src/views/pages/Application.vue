<template>
  <div class="application__container">
    <div class="application__pane">
      <div class="application__left-pane">
        <div class="application__group-stage-container">
          <SlideStageIndicator
            :stages="$options.groupStages"
            :activeId="currentStepId"
          />
        </div>
      </div>
      <div class="application__main-pane">
        <template v-if="isLoaded">
          <ProfileStage
            v-if="currentStepId === OnboardingSteps.PROFILE.id"
            @onAfterSubmit="(stepId) => currentStepId = stepId"
            :data.sync="data"
          />
          <AddressStage
            v-if="currentStepId === OnboardingSteps.ADDRESS.id"
            @onAfterSubmit="(stepId) => currentStepId = stepId"
            @onBack="(stepId) => currentStepId = stepId"
            :data.sync="data"
          />
          <FamilyStage
            v-if="currentStepId === OnboardingSteps.FAMILY.id"
            @onAfterSubmit="(stepId) => currentStepId = stepId"
            @onBack="(stepId) => currentStepId = stepId"
            :data.sync="data"
          />
          <EducationStage
            v-if="currentStepId === OnboardingSteps.EDUCATION.id"
            @onAfterSubmit="(stepId) => currentStepId = stepId"
            @onBack="(stepId) => currentStepId = stepId"
            :data.sync="data"
          />
          <RequestEvaluationStage
            v-if="currentStepId === OnboardingSteps.REQUEST_EVALUATION.id"
            @onAfterSubmit="(stepId) => currentStepId = stepId"
            @onBack="(stepId) => currentStepId = stepId"
            :data.sync="data"
          />
          <ReviewEvaluationStage
            v-if="currentStepId === OnboardingSteps.EVALUATION_IN_REVIEW.id"
            :data.sync="data"
          />
          <SubmitApplicationStage
            v-if="currentStepId === OnboardingSteps.ACADEMIC_YEAR_APPLICATION.id"
            @onAfterSubmit="(stepId) => currentStepId = stepId"
            @onBack="(stepId) => currentStepId = stepId"
            :data.sync="data"
          />
          <ReviewApplicationStage
            v-if="currentStepId === OnboardingSteps.ACADEMIC_RECORD_IN_REVIEW.id"
            :data.sync="data"
          />
          <PaymentStage
            v-if="currentStepId === OnboardingSteps.PAYMENTS.id"
            @onAfterSubmit="(stepId) => currentStepId = stepId"
            @onBack="(stepId) => currentStepId = stepId"
            :data.sync="data"
          />
          <ReviewPaymentStage
            v-if="currentStepId === OnboardingSteps.WAITING.id"
            :data.sync="data"
          />
        </template>
      </div>
    </div>
  </div>
  <!-- main container -->
</template>
<script>
import {
  StudentApi
} from '../../mixins/api';
import SlideStageIndicator from '../components/SlideStageIndicator';
import {
  OnboardingSteps,
} from '../../helpers/enum';
import {
  groupStages,
} from '../../content';
import {
  ProfileStage,
  AddressStage,
  FamilyStage,
  EducationStage,
  RequestEvaluationStage,
  ReviewEvaluationStage,
  SubmitApplicationStage,
  ReviewApplicationStage,
  PaymentStage,
  ReviewPaymentStage
} from '../components/OnboardingSteps'


export default {
  name: "Application",
  groupStages,
  mixins: [
    StudentApi
  ],
  components: {
    SlideStageIndicator,
    ProfileStage,
    AddressStage,
    FamilyStage,
    EducationStage,
    RequestEvaluationStage,
    ReviewEvaluationStage,
    SubmitApplicationStage,
    ReviewApplicationStage,
    PaymentStage,
    ReviewPaymentStage
  },
  data() {
    return {
      currentStepId: 1,
      isLoaded: false,
      OnboardingSteps,
      data: {}
    };
  },
  created() {
    const studentId = this.$store.state.user.id;
    this.getStudent(studentId).then(({ data: student }) => {
      this.isLoaded = true;
      this.data = student;
      this.currentStepId = student?.onboardingStepId || 1;
    });
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/shared.scss";

  .application__container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .application__pane {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    //max-width: 1200px;
  }

  .application__left-pane {
    height: 100%;
    flex: 0 1 35%;

    @include for-size(tablet-landscape-down) {
      display: none;
    }
  }

  .application__group-stage-container {
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 1031;
    width: 35%;

    @include for-size(tablet-landscape-down) {
      display: none;
    }
  }

  .application__main-pane {
    flex: 1;
    display: flex;
    flex-direction: row;
    //align-items: center;
    justify-content: center;
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

  .application__form-title {
    font-size: 18px;
  }

  .application__form-description {
    font-size: 14px;
    margin-bottom: 20px;
    color: $gray;
  }

  .approval-container {
    width: 100%;
    height: 100px;
  }

  .approval-actions {
    padding: 20px 50px;
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

  .payment-step__number {
    background-color: $blue;
    color: $white;
    height: 28px;
    width: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    border-radius: 50%;
    font-size: 16px;
    font-weight: 500;
  }

  .payment-step-header-container {
    display:flex;
    align-items: center;
  }

  .payment-step-details-container {
    display:flex;
    flex-direction: column;
    width: 100%;
  }

  .payment-step-container {
    display:flex;
    flex-direction: row;
    width: 100%;
  }

  .application__wizard-form-fields {
    margin-bottom: 20px;
  }

  .item + .item:before {
    content: " | ";
  }

  .icon-tooltip {
    height: 14px;
    width: 14px;
    color: rgb(68, 185, 224);
    margin: 0 0 2px 5px;
  }

</style>