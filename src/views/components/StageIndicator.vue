<template>
  <ul class="indicator">
    <li v-for="(stage, index) in stages" class="indicator__item" @click="$emit('selectedItem', index)">
      <span class="indicator__number">{{index + 1}}</span>
      <div class="indicator__text-container">
        <span class="indicator__headline">{{stage.header}}</span>
        <p v-if="[activeIndex].includes(index)" class="indicator__description">
          {{stage.description}}
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['stages', 'activeIndex'],
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
  .indicator {
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
  }

  .indicator__item {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 15px;

    &:hover {
      cursor: pointer;
    }
  }

  .indicator__text-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 5px 0;
  }

  .indicator__headline {
    font-size: 16px;
    font-weight: 500;
    color: #0080FF;
  }

  .indicator__description {
    color: #b8b8b8;
    margin: 0;
  }

  .indicator__number {
    background-color: #0080FF;
    color: #FFFFFF;
    height: 33px;
    width: 33px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    border-radius: 50%;
    font-size: 16px;
    font-weight: 500;
  }
</style>