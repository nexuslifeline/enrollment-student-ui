<template>
  <CHeader :class="{ 'header-on-boarding': isOnboarding }" fixed with-subheader light>
    <!--<CToggler
      in-header
      class="d-lg-none"
      @click="$store.commit('TOGGLE_SIDEBAR_MOBILE')"
    />
    <CToggler
      in-header
      class="d-md-down-none"
      @click="$store.commit('TOGGLE_SIDEBAR_DESKTOP')"
    />-->
    <TheHeaderDropdownAccnt/>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt
  },
  props: {
    isOnboarding: {
      type: [Boolean],
      default: false
    }
  }
}
</script>
<style lang="scss">
  @import "../assets/scss/shared.scss";

  .c-header-nav {
    height: $header-height !important;
    min-height: $header-height !important;
  }

  .c-header {
    min-height: $header-height !important;
  }

  .header-on-boarding {
    border-bottom: 0 !important;
  }
</style>