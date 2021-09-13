<template>
  <div class="alert__container">
    <b-alert variant="success" show>
        <h5 class="mb-3">YOUR REQUEST HAS BEED APPROVED!</h5>
        <p>
            Thank you for submitting your request to us. Your request has been evaluated and approved.
            We have provided you a recommendation of schedule that you may choose on.
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
    height: 100%;
  }
</style>