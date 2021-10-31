<template>
  <div class="grade__card-item">
    <h3 class="grade__card-title">Software Architecture</h3>
    <p class="grade__card-description">
      Software architecture is, simply, the organization of a system. This organization includes all components, how they interact with each other, the environment in which they operate, and the principles used to design the software.
    </p>
    <div class="grade__card-content-item">
      <BIconPersonCheck />
      <!-- <AvatarMaker
        :avatarId="1"
        :size="18"
        :text="'PR'"
      /> -->
      <span class="content-item__text">
        Paul Christian Rueda
      </span>
    </div>

    <div class="grade__card-content-item">
      <BIconLayers />
      <BulletedContent
        class="content-item__text"
        :items="[
          'BSIT-1A',
          'Mon - Tue'
        ]"
      />
    </div>

    <div class="grade__card-body">
      <div class="grade__body-row">
        <div class="grade__body-item">
          <div class="grade__body-label">
            Classmates
          </div>
          <AvatarGroup
            :maxVisible="5"
            :data="[
              { id: 11, firstName: 'John', lastName: 'Doe', name: 'Joh Doe' },
              { id: 17, firstName: 'Michael', lastName: 'Punzalan', name: 'Michael Punzalan' },
              { id: 18, firstName: 'Gelyn Joy', lastName: 'Manalang', name: 'Gelyn Joy Manalang' },
              { id: 20, firstName: 'Kai', lastName: 'Rueda', name: 'Kai Rueda' },
              { id: 1, firstName: 'Pau', lastName: 'Rueda', name: 'Pau Rueda' },
              { id: 2, firstName: 'Jane', lastName: 'Suarez', name: 'Jane Suarez' }
            ]"
          />
        </div>
        <div class="grade__body-item" :style="{ maxWidth: '55px' }">
          <div class="grade__body-label">
            Prelim
          </div>
          <div class="grade__body-content-big">
            89
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  methods: {

  }
}
</script>
<style lang="scss" scoped>
  @import "../../../assets/scss/shared.scss";

  .grade__card-item {
    min-height: 240px;
    width: 260px;
    padding: 30px 20px;
    // border: 1px solid $light-gray-10;
    box-shadow: -1px 0px 5px 1px $light-gray-10;
    -webkit-box-shadow: -1px 0px 5px 1px $light-gray-10;
    -moz-box-shadow: -1px 0px 5px 1px $light-gray-10;
    background-color: $white;
    border-radius: 9px;
  }

  .grade__card-title {
    font-size: 19px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .grade__card-description {
    font-size: 14px;
    text-align: left;
    color: $dark-gray-300;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .grade__card-body {
    border-top: 1px solid $light-gray-10;
    margin-top: 30px;
    padding: 10px 0;
  }

  .grade__card-content-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
  }

  .content-item__text {
    margin-left: 12px;
    font-size: 14px;
    color: $dark-gray-300;
  }

  .grade__body-row {
    display: flex;
    flex-direction: row;
  }

  .grade__body-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .grade__body-label {
    font-weight: 500;
    font-size: 13px;
  }

  .grade__body-content-big {
    font-weight: 500;
    font-size: 17px;
  }
</style>