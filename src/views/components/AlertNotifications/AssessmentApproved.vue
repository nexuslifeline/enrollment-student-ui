<template>
  <div class="alert__container">
    <b-alert variant="success" show>
        <h5 class="mb-3">YOUR ENLISTMENT REQUEST HAS BEED APPROVED!</h5>
        <p>
            We are pleased to see that we are few steps closer in officially enrolling you.
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