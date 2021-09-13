<template>
  <div class="alert__container">
    <b-alert variant="success" show>
        <h5 class="mb-3">YOUR REQUEST HAS BEED APPROVED!</h5>
        <p>
            Thank you for submitting your pre-enlistment request.
            Your request has been approved and was endorsed in the Business Office/Finance Department for further review of your fees.
            We will update you once your account has been been updated.
        </p>
        <br>
        <p>{{ data && data.approvalNotes }}</p>
    </b-alert>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: [Object]
    }
  },
}
</script>

<style lang="scss" scoped>
  .alert__container {
    width: 100%;
  }
</style>