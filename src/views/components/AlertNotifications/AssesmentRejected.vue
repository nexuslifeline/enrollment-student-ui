<template>
  <div class="alert__container">
    <b-alert variant="danger" show>
    <p style="font-weight:bold">
        Sorry, your assessment is rejected with the ffg. reasons : <br>
        {{ data && data.disapprovalNotes }} <br><br>
        <small>Please be inform that you can modify your application and resubmit for evaluation.</small>
    </p>
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