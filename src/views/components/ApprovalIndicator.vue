<template>
  <div class="wizard">
    <ul class="wizard__steps">
      <li
        v-for="(stage, index) of stages" :key="index"
        @click="$emit('stageSelect', index)"
        class="wizard__step"
        :class="{ 'active': index <= currentStage }"
        :style="{ 'width': `${stepLineValue}%` }">
        <span class="wizard__step-line"></span>
        <span class="wizard__step-indicator">
          <v-icon
            v-if="index < currentStage"
            name="check"
            scale="1.2"
            class="wizard__step-icon bounce-in"
          ></v-icon>
          <span
            v-else
            class="wizard__number bounce-in">
            {{index + 1}}
          </span>
        </span>
        <span
          v-if="currentStage >= index"
          class="wizard__step-label"
          :class="{ 'wizard__step-active-label-indicator': currentStage >= index }">
          {{currentStage === index ? stage.waitingLabel : stage.approvedLabel}}
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      stages: {},
      currentStage : 0
    },
    methods: {

    },
    computed: {
      stepLineValue() {
        return 100 / this.stages.length;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/shared.scss";
  @import "../../assets/scss/animations.scss";

  .wizard {
    width:  100%;
    height: 100%;
  }

  .wizard__steps {
    list-style-type: none;
    text-align: justify;
    -ms-text-justify: distribute-all-lines;
    text-justify: distribute-all-lines;
    -webkit-padding-start: 0!important;
  }

  .wizard__step {
    bottom: 0px;
    vertical-align: bottom;
    display: inline-block;
    text-align: center;
    position:  relative;
  }

  .wizard__step:not(:first-child) .wizard__step-line {
    position: absolute;
    width:  100%;
    left:  -50%;
    bottom:  -25px;
    height:  2px;
    background-color: $dark-gray-10;
    margin-bottom: 10px;
  }

  .wizard__step-indicator {
    position:  absolute;
    box-sizing: border-box;
    display:  block;
    width:  35px;
    height:  35px;
    left: calc(50% - (35px / 2));
    bottom:  -31px;
    border-radius: 50%;
    z-index: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 2px solid $dark-gray-10;
  }

  .wizard__number {
    font-weight: bold;
    font-size: 14px;
    color: $dark-gray-10;
    font-size: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
  }

  .wizard__step {
    &.active {
      .wizard__step-indicator {
        border: 2px solid $green;
      }
    }
  }

  .wizard__step.active:not(:first-child) {
    .wizard__step-line {
      background-color: $green;
    }
  }

  span.wizard__step-label {
    position: absolute;
    display: block;
    font-size: 0.875rem;
    color: $dark-gray-10;
    line-height: 1rem;
    cursor: pointer;
    top: 40px;
    left: 1em;
    right: 1em;
  }

  .wizard__step-active-label-indicator {
    color: $dark-gray-10;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .wizard__step-icon {
    color: $green;
  }


</style>

