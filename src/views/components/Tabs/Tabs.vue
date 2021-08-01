<template>
  <ul class="c-subheader__tabs">
    <template v-for="(item, index) in items">
      <li
        @click="$emit('onSelect', { item, index })"
        class="c-subheader__tab-item"
        :class="{ active: activeIndex === index }"
        :key="index">
        {{ item.name }}
      </li>
    </template>
  </ul>
</template>

<script>

export default {
  props: {
    activeIndex: {
      type: [Number],
      default: 0
    },
    items: {
      type: [Array]
    }
  },
  created() {
    console.log('items', this.items)
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/shared.scss';

  .c-subheader__tabs {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    // padding: 0 10px;
    // padding: 10px 15px;
    border-bottom: 1px solid $light-gray-10;
    margin-bottom: 10px;
    width: 100%;
    transition: all .3s;
  }

  .c-subheader__tab-item {
    margin-right: 30px;
    padding-bottom: 10px;
    height: 100%;
    cursor: pointer;

    &.active {
      border-bottom: 3px solid $blue;
      color: $blue;
      font-weight: 500;
    }
  }
</style>