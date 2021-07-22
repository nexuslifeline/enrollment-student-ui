<template>
  <div class="alert__container">
    <b-alert variant="warning" show>
      <h5>Important Notice !</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptate culpa nam necessitatibus laborum saepe ut in quo vitae nihil?
        <br><br>
        You should submit Application request first. To submit a request click <b-link @click="$emit('linkClicked')">here</b-link>.
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