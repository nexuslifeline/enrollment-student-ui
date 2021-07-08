<template>
  <div class="alert__container">
    <b-alert variant="danger" show>
    <p style="font-weight:bold">
        Sorry, your assessment is rejected with the ffg. reasons : <br>
        {{ data && data.disapprovalNotes }} <br><br>
        <small>Your application is being reviewed again by the Registrar.</small>
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