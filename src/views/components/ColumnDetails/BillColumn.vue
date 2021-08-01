<template>
  <div class="bill-column__container">
    <a href="#" @click.prevent="$emit('onClick')">
      {{ data.billingNo }}
    </a>
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
  @import '../../../assets/scss/shared.scss';

  .bill-column__container {
    display: flex;
    width: 100%;
    align-items: center;
    position: relative;
  }
</style>