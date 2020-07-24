<template>
  <div v-show="isReady" class="home-content">
    <!--<div class="greetings">
      <h2 class="greetings__title">Welcome home!</h2>
      <p class="greetings__description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>-->
    <Menus />
  </div>
</template>

<script>
  import Menus from './components/menus/Menus'
  export default {
    name: 'Home',
    components: {
      Menus
    },
    data() {
      return {
        isReady: false
      }
    },
    computed: {
      hasActiveAdmission() {
        return !!(this.$store.state.user && this.$store.state.user.activeAdmission);
      },
      hasActiveApplication() {
        return !!(this.$store.state.user && this.$store.state.user.activeApplication);
      }
    },
    created() {
      if (this.hasActiveApplication) {
        this.$router.push({ path: '/application' });
      } else if (this.hasActiveAdmission) {
        this.$router.push({ path: '/admission' });
      }
    },
    mounted() {
      setTimeout(() => this.isReady = true, 1500)
    },
  }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/shared.scss";
  .home-content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 60px;
    background-color: white;
  }
</style>
