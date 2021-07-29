<template>
  <div class="alert__container">
    <b-alert variant="warning" show>
      <h5>Sorry, something went wrong!</h5>
      <p>
        We could not find your approved Assessment record with the initial billing. Please ensure that your Application has been submitted.
        <br><br>
        You can submit your Application request <b-link @click="$emit('linkClicked')">here</b-link>.
      </p>
    </b-alert>
  </div>
</template>

<script>

export default {
  
}
</script>

<style lang="scss" scoped>
  .alert__container {
    width: 100%;
  }
</style>