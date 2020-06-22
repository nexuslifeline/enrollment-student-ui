<template>
  <div class="file-uploader" @click="onBrowseClick">
    <template v-if="!isBusy">
      <div class="file-uploader__icons">
        <v-icon
          name="file-pdf"
          class="file-uploader__file-icon file-uploader__file--pdf mr-3"
          scale="2.8"
        />
        <v-icon
          name="file-image"
          class="file-uploader__file-icon file-uploader__file--image ml-3"
          scale="2.8"
        />
      </div>
      <div class="file-uploader__title">
        {{title}}
      </div>
      <div class="file-uploader__description">
        {{description}}
      </div>
    </template>
    <div v-else class="file-uploader__spinner-container">
      <v-icon
        name="spinner"
        pulse />
    </div>
    <input
      @change="onInputFileChange"
      ref="fileUploader"
      type="file"
      class="file-uploader__file-input"
      :accept="accept"
    />
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
      type: [String],
      default: 'Attachments'
    },
    description: {
      type: [String],
      default: 'Click to browse files.'
    },
    accept: {
      type: [String],
      default: 'image/*, application/pdf, application/msword'
    }
  },
  methods: {
    onBrowseClick() {
      this.$refs.fileUploader.click();
    },
    onInputFileChange(event) {
      const file = event.target.files.length > 0
        ? event.target.files[0]
        : null;
      this.$emit('onFileChange', file);
      this.$refs.fileUploader.value = ''
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/shared.scss";

  .file-uploader {
    height: 100%;
    width: 100%;
    background-color: $light-gray;
    border: 1px dashed $gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
    }
  }

  .file-uploader__spinner-container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .file-uploader__file-input {
    display: none;
  }

  .file-uploader__title {
    margin-top: 18px;
    font-weight: 500;
    font-size: 16px;
    color: $gray;
    text-transform: uppercase;
  }

  .file-uploader__description {
    font-size: 14px;
    color: $gray;
  }

  .file-uploader__icons {
    display: flex;
    justify-content: center;
  }

  .file-uploader__file-icon {
    color: $gray;
  }

  .file-uploader__file--pdf {
    transform: rotate(-36deg);
  }

  .file-uploader__file--image {
    transform: rotate(36deg);
  }
</style>