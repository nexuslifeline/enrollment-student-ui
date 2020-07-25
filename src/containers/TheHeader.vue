<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="d-lg-none"
      @click="$store.commit('TOGGLE_SIDEBAR_MOBILE')"
    />
    <CToggler
      in-header
      class="d-md-down-none"
      @click="$store.commit('TOGGLE_SIDEBAR_DESKTOP')"
    />
    <TheHeaderDropdownAccnt/>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt
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
</style>