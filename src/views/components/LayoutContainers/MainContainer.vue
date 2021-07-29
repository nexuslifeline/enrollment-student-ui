<template>
  <div class="layout__main-container">
    <div v-if="!!$slots.subheader" class="layout__subheader-area">
      <slot name="subheader"></slot>
    </div>
    <!-- <div>
      <h4 class="c-app__page-title">
        {{ title }}
      </h4>
      <p class="c-app__page-description">
        {{ description }}
      </p>
    </div> -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: [String]
    },
    description: {
      type: [String]
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/shared.scss';

  .layout__main-container {
    height: 100%;
    width: 100%;
    // padding: 20px;
    background-color: $light-gray;
  }

  .layout__subheader-area {
    // padding: 10px 15px;
    width: 100%;
    // border-bottom: 1px solid $light-gray-10;
    display: flex;
    align-items: center;
  }
</style>