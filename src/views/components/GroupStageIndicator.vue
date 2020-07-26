<template>
  <ul class="indicator">
    <li
      v-for="(stage, index) in stages"
      class="indicator__item"
      :class="{
        'completed': index < activeHeaderIndex,
        'active': index === activeHeaderIndex
      }">
      <div class="indicator__header">
        <span class="indicator__circle">
          <transition name="bounce" mode="out-in">
            <v-icon
              v-if="index < activeHeaderIndex"
              name="check"
              scale="1.1"
              class="indicator__check-icon"
            ></v-icon>
            <span v-else class="indicator__number">
              {{index + 1}}
            </span>
          </transition>
        </span>
        <span class="indicator__header-text">{{stage.header}}</span>
      </div>
      <ul class="indicator__sub-header">
        <li
          v-for="(item, index) in stage.children"
          class="indicator__sub-header-item"
          :class="{ 'active': item.id === activeId }"
          @click="$emit('selectedIdChange', item.id)">
          <span class="indicator__sub-header-text">{{item.subHeader}}</span>
          <transition name="slide-fade">
            <span v-if="item.id === activeId" class="indicator__sub-header-icon">
              <v-icon name="arrow-right"></v-icon>
            </span>
          </transition>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    stages: {
      type: [Array]
    },
    activeId: {
      type: [Number]
    }
  },
  computed: {
    activeHeaderIndex() {
      return this.stages.findIndex((item) =>
        item.children.map(({ id }) => id).includes(this.activeId)
      );
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/shared.scss";
  @import "../../assets/scss/animations.scss";

  .indicator {
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .indicator__circle {
    height: 31px;
    width: 31px;
    border: 1px solid $brand-primary;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 600;
    background-color: $brand-primary;
    opacity: .4;
  }

  .indicator__number {
    color: $white;
    font-size: 16px;
    font-weight: 600;
  }

  .indicator__header-text {
    margin-left: 15px;
    font-size: 15px;
    font-weight: 600;
    color: $brand-primary;
    opacity: .4;
  }

  .indicator__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 10px;

    &.active {
      .indicator__header-text {
        color: $brand-primary;
        opacity: 1;
      }
      .indicator__circle {
        border: 1px solid $brand-primary;
        background-color: $brand-primary;
        opacity: 1;
      }
    }

    &.completed {
      .indicator__header-text {
        color: $brand-primary;
        opacity: .4;
      }
      .indicator__circle {
        border: 1px solid $green;
        background-color: $green;
        opacity: 1;
      }
    }
  }

  .indicator__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }

  .indicator__sub-header {
    font-size: 14px;
    font-weight: 600;
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    list-style: none;
    padding: 0;
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
  }

  .indicator__sub-header-item {
    margin-left: 48px;
    flex: 1;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    margin-bottom: 5px;

    &.active {
      .indicator__sub-header-text {
        font-weight: 500;
        color: $brand-primary;
        opacity: 1;
      }
      .indicator__sub-header-icon {
        color: $brand-primary;
        opacity: 1;
      }
    }

    &:hover {
      cursor: pointer;
    }
  }

  .indicator__sub-header-text {
    color: $brand-primary;
    opacity: .4;
    font-weight: 400;
  }

  .indicator__sub-header-icon {
    margin-left: auto;
    color: $brand-primary;
    opacity: .4;
  }

  .indicator__check-icon {
    color: $white;
  }
</style>