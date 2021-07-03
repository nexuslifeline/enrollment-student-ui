<template>
  <div class="alert__container">
    <b-alert variant="success" show>
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
      :currentStage="currentStage"/>
  </div>
</template>

<script>
import ApprovalIndicator from '../ApprovalIndicator'
import { evaluationApprovalStages }  from '../../../content'
export default {
  evaluationApprovalStages,
  props: {
    currentStage: {
      type: [Number, String]
    }
  },
  components: { ApprovalIndicator }
}
</script>

<style lang="scss" scoped>
  .alert__container {
    width: 100%;
    height: 100%;
  }
</style>