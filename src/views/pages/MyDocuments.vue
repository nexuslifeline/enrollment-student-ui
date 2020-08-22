<template>
  <div class="main-container">
    <div class="left-pane">
      <p class="sub-nav__title">MY DOCUMENTS</p>
      <ul class="sub-nav">
        <li class="sub-nav__item" :class="{ active: $route.path.includes('/assesment-form')}">
          <router-link
            class="sub-nav__link"
            to="/documents/assesment-form">
            Assesment Forms
          </router-link>
        </li>
        <li class="sub-nav__item" :class="{ active: $route.path.includes('/registration-form')}">
          <router-link
            class="sub-nav__link"
            to="/documents/registration-form">
            Registration Forms
          </router-link>
        </li>
      </ul>
        <!--<router-link class="link" to="/my-documents/assesment-form" >Assesment Forms</router-link>
        <router-link class="link" to="/my-documents/registration-form">Registration Forms</router-link>-->
    </div>
    <div class="right-pane">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

  @import "../../assets/scss/shared.scss";

  .main-container {
    height: 100%;
    display: flex;
    @include for-size(phone-only) {
      flex-direction: column;
      padding: 20px 20px 0 20px;
    }
  }

  .sub-nav {
    list-style: none;
    padding: 0;
  }

  .sub-nav__item {
    margin-bottom: 10px;
    padding: 6px 20px;

    &.active {
      background-color: $light-blue-10;
      border-radius: 3px;

      .sub-nav__link {
        color: $brand-primary;
        font-weight: 500;
      }
    }
  }

  .sub-nav__title {
    font-size: 16px;
    font-weight: 600;
  }

  .left-pane {
    min-width: 230px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-right: 1px solid $light-gray-10;
  }

  .sub-nav__link {
    font-size: 14px;
    color: $black;
  }

  .right-pane {
    flex: 1;
    border: solid whitesmoke 1px;
    padding:30px;

    @include for-size(phone-only) {
      margin-top: 20px;
    }
  }

</style>