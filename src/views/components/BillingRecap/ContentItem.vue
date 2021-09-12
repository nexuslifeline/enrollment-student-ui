<template>
  <div class="content__item">
    <span class="label__item">{{ label }}</span>
    <span class="description__item" :class="{ bold: isBold }">
      {{ content }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: [String]
    },
    content: {
      type: [String]
    },
    isBold: {
      type: [Boolean],
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/shared.scss';

  .content__item {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 10px;

    .label__item {
      width: 45%;
      max-width: 120px;
      color: $gray;
      font-size: 13px;
    }

    .description__item {
      flex: 1;
      text-align: right;
      font-size: 13px;

      &.bold {
        font-weight: 600;
      }
    }
  }
</style>