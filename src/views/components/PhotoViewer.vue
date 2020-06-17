<template>
  <div class="photo-viewer">
    <div class="photo-viewer__action-top">
      <button @click="$emit('onPhotoRemove')" class="photo-viewer__remove">
        <v-icon class="photo-viewer__remove-icon" name="times-circle" scale="1.2" />
      </button>
    </div>
    <img
      v-if="!!imageUrl"
      class="photo-viewer__image"
      :src="imageUrl"
    />
    <div class="photo-viewer__action">
      <input
        @change="onInputFileChange"
        ref="photoViewerFile"
        type="file"
        class="photo-viewer__file"
        accept="image/*"
      />
      <button
        @click="onBrowseClick"
        class="photo-viewer__browse">
        <span class="photo-viewer__browse-caption">
          Browse
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: [String]
    }
  },
  methods: {
    onBrowseClick() {
      this.$refs.photoViewerFile.click();
    },
    onInputFileChange(event) {
      const file = event.target.files.length > 0
        ? event.target.files[0]
        : null;
      this.$emit('onPhotoChange', file);
      this.$refs.photoViewerFile.value = ''
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/shared.scss";
  .photo-viewer {
    width: 100%;
    height: 100%;
    border: 1px solid $gray;
    position: relative;
    border-radius: 3px;
    overflow: hidden;
  }

  .photo-viewer__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .photo-viewer__action {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    height: 32px;
    background-color: transparent;

    &:hover {
      .photo-viewer__browse {
        display: block;
      }
    }
  }

  .photo-viewer__action-top {
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    height: auto;
    min-height: 20px;
    background-color: transparent;
    display: flex;
    justify-content: flex-end;

    &:hover {
      .photo-viewer__remove {
        display: inline-block;
      }
    }
  }

  .photo-viewer__browse {
    width: 100%;
    height: 100%;
    border: none;
    background-color: $light-gray;
    opacity: .7;
    outline: none;
    display: none;
  }

  .photo-viewer__browse-caption {
    font-weight: 500;
    color: $dark-gray;
  }

  .photo-viewer__file {
    display: none;
  }

  .photo-viewer__remove {
    outline: none;
    border: none;
    background-color: transparent;
    display: none;
  }

  .photo-viewer__remove-icon {
    color: $red;
  }
</style>