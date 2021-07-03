<template>
  <div class="alert__container">
     <b-alert variant="success" show>
        <h5>CONGRATULATIONS!</h5>
        <p> Your are now officially enrolled and a certified Theresian. <br><br>
          You can download your Certificate of Registration 
          <a href="#" @click.prevent="$emit('onPreviewRegistration')">here</a>.<br>
          Note: Always bring it whenever you go within the school premises.<br><br>

          Accounting Department is now working for your Official Receipt.<br>
          Once available, you can download it <a href="#">here</a>. <br><br>

          Go to my <a href="#" @click="$emit('onGoToDashboard')">Dashboard</a>. <br>
          View my <a href="#" @click="$emit('onPreviewAssessment')">Documents</a>. <br>
        </p>
        <!-- <small>Please, click here to complete your enrollment.</small> <b-button variant="outline-primary" @click="onCompleteEnrollment"> Click Here</b-button> -->
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
    height: 100%;
  }
</style>