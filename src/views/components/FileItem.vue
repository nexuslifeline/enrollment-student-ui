<template>
  <div class="file-item">
    <template v-if="!isBusy">
      <v-icon name="file-image" scale="2.7" class="file-item__icon" />
      <div class="file-item__details" @click="$emit('onFileItemSelect', fileIndex)">
        <p v-if="!!title" class="file-item__title">{{title}}</p>
        <p v-if="!!description" class="file-item__description">{{description}}</p>
      </div>
      <v-icon name="check" scale="1.5" class="file-item__icon-check" />
    </template>
    <div v-else class="file-item__spinner-container">
      <v-icon
        name="spinner"
        pulse />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isBusy: {
      type: [Boolean],
      default: false
    },
    title: {
      type: [String]
    },
    description: {
      type: [String]
    },
    fileIndex: {
      type: [Number]
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/shared.scss";

  .file-item {
    margin: 25px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .file-item__spinner-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }

  .file-item__title {
    margin: 0;
    font-weight: 500;
    color: $dark-gray;
  }

  .file-item__description {
    margin: 0;
    color: $gray;
  }

  .file-item__details {
    margin-left: 18px;

    &:hover {
      cursor: pointer;
    }
  }

  .file-item__icon {
    color: $gray;
  }

  .file-item__icon-check {
    color: $green;
    margin-left: auto;
  }
</style>