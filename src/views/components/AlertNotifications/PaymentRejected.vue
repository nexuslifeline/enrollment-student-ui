<template>
  <div class="alert__container">
    <b-alert variant="danger" show>
      <p>
        Sorry, your payment is <b>rejected</b> with the ffg. reasons : <br>
        <b>{{ data && data.disapprovalNotes }}</b> <br>
        <small>Please be inform that you can modify your payment and resubmit for Evaluation.</small>
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
  }
}
</script>

<style lang="scss" scoped>
  .alert__container {
    width: 100%;
  }
</style>