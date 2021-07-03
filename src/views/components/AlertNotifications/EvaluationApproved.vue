<template>
  <div class="alert__container">
    <b-alert variant="success" show>
        <h5 class="mb-3">YOUR EVALUATION HAS BEED APPROVED!</h5>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto in fugiat velit dolores at dolorum iste, laborum totam tenetur deserunt?
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