<template>
  <div
    class="progress__indicator"
    :style="{ 'height': `${barHeight}px` }">
    <div
      v-for="(item, index) of Array.from({ length: barCount })"
      class="indicator__item"
      :class="{ 'active': index < activeBar}"
      :style="{ 'width': `calc(${barItemWidth}% - ${barSpace}px)` }"
    />
  </div>
</template>

<script>
export default {
  props: {
    barCount: {
      type: [Number],
      default: 8
    },
    activeBar: {
      type: [Number],
      default: 2
    },
    barSpace: {
      type: [Number],
      default: 10
    },
    barHeight: {
      type: [Number],
      default: 18
    }
  },
  computed: {
    barItemWidth() {
      return 100 / this.barCount;
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/shared.scss";

  .progress__indicator {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .indicator__item {
    background-color: $light-gray-100;
    border-radius: 5px;
    &.active {
      background-color: $green;
    }
  }
</style>