<template>
  <div class="c-app"
    :class="{ 'c-app__side-bar--active': !isOnboarding }">
    <TheSidebar v-show="!isOnboarding" />
    <CWrapper>
      <TheHeader/>
      <div class="c-body">
        <main class="c-main">
          <CContainer class="c-container-fluid" fluid>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </CContainer>
        </main>
        <!--<TheFooter/>-->
      </div>
    </CWrapper>
  </div>
</template>

<script>
import TheSidebar from './TheSidebarV2'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'

export default {
  name: 'TheContainer',
  components: {
    TheSidebar,
    TheHeader,
    TheFooter
  },
  computed: {
    isOnboarding() {
      const path = this.$route.path;
      return path === '/admission' || path === '/application';
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/scss/shared.scss";
  @import "../assets/scss/animations.scss";

  .c-main {
    padding: 0;
  }

  .c-container-fluid {
    padding: 0 !important;
    height: 100%;
  }

  .c-app__side-bar--active {
    .c-main {
      width: calc(100% - $side-bar-width) !important;
      margin-left: $side-bar-width !important;
    }
  }
</style>
