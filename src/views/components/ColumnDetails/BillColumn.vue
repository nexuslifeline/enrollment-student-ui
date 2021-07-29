<template>
  <div class="bill-column__container">
    <a href="#" @click.prevent="$emit('onClick')">
      {{ data.billingNo }}
    </a>
    <div v-if="data.isForwarded" class="badge-container">
      <b-badge variant="secondary">
        Forwarded
      </b-badge>
    </div>
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

  .badge-container {
    position: absolute;
    right: 10px;
    top: -10px;
  }
</style>