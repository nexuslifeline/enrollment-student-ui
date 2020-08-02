<template>
  <div class="c-app"
    :class="{ 'c-app__side-bar--active': !isOnboarding }">
    <TheSidebar v-if="isMounted && !!$store.state.user && !isOnboarding" />
    <Loading
      :active.sync="isLoading"
      loader="dots"
      color="#AB1B1E"
      :is-full-page="true"
    />
    <CWrapper v-if="!!$store.state.user">
      <TheHeader v-if="!!$store.state.user" />
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
import { AuthApi } from '../mixins/api'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'TheContainer',
  mixins: [AuthApi],
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
    Loading
  },
  data() {
    return {
      isLoading: true,
      isMounted: false
    }
  },
  created() {
    this.loadProfile();
  },
  mounted() {
    setTimeout(() => this.isMounted = true, 1500);
  },
  methods: {
    loadProfile() {
      this.isLoading = true;
      this.getAuthenticatedUser().then(({ data: { userable } }) => {
        if (userable) {
          this.isLoading = false;
          this.$store.commit('SET_USER', userable);
        }
      }).catch((error) => {
        this.$router.push({ path: '/login' });
      })
    }
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
      width: calc(100% - #{$side-bar-width}) !important;
      margin-left: $side-bar-width !important;
    }
  }
</style>
