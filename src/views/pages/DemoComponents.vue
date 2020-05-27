<template>
  <div class="wrapper">
    <div class="left-pane">
      <StageIndicator :stages="stages" :activeIndex="selectedIdex" @selectedItem="onSelectStage"/>
    </div>
    <div class="right-pane">

    </div>
  </div>
</template>

<script>
import StageIndicator from '../components/StageIndicator'
export default {
  name: 'Demo',
  components: {
    StageIndicator
  },
  data() {
    return {
      selectedIdex: 0,
      stages: [
        {
          header: "Complete Address",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit psum dolor sit amet psum dolor sit amet"
        },
        {
          header: "Family Background",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        {
          header: "Educational Background",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        }
      ]
    }
  },
  methods: {
    onSelectStage(idx) {
      this.selectedIdex = idx;
    }
  }
}
</script>
<style lang="scss" scoped>
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .left-pane {
    flex-basis: 350px;
    padding: 20px;
  }

  .right-pane {
    flex: 1;
  }
</style>