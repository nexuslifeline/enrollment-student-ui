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
      <TheHeader v-if="!!$store.state.user" :isOnboarding="isOnboarding" />
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
      <!-- <v-icon name="info" class="application-icon"></v-icon> -->
      <!-- <div v-if="applyApplicationVisible" class="new-application">
        <div class="info-message-container">
          <div class="info-message">
            <p>NEW SCHOOL YEAR IS OPEN !</p>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda quis explicabo, accusantium a accusamus nulla laudantium impedit! Quod, tempore ducimus.</span>
          </div>
          <b-button variant="outline-primary">
             Apply Now ! </b-button>
        </div>
      </div> -->
    </CWrapper>
  </div>
</template>

<script>
import TheSidebar from './TheSidebarV2'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'
import { AuthApi, SchoolYearApi, SemesterApi } from '../mixins/api'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { SchoolCategories } from '../helpers/enum'


export default {
  name: 'TheContainer',
  mixins: [AuthApi, SchoolYearApi, SemesterApi],
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
    Loading
  },
  data() {
    return {
      isLoading: true,
      isMounted: false,
      SchoolCategories: SchoolCategories
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

      const params = { paginate: false, isActive: 1 }
      this.getSchoolYearList(params).then(({ data }) => {
        if (data.length > 0) {
          this.$store.commit('SET_ACTIVE_SCHOOL_YEAR', data[0]);
        }
      })

      this.getSemesterList(params).then(({ data }) => {
        if (data.length > 0) {
          this.$store.commit('SET_ACTIVE_SEMESTER', data[0]);
        }
      })
    },
  },
  computed: {
    isOnboarding() {
      const path = this.$route.path;
      return path === '/admission' || path === '/application';
    },
    user() {
      return this.$store.state.user || {};
    },
    activeSchoolYear() {
      return this.$store.state.activeSchoolYear || {};
    },
    activeSemester() {
      return this.$store.state.activeSemester || {};
    },
    latestAcademicRecord() {
      return this.$store.state.user.latestAcademicRecord || {};
    },
    applyApplicationVisible() {
      if (this.user && this.activeSchoolYear && this.activeSemester && this.latestAcademicRecord) {
        if (this.latestAcademicRecord.schoolYearId !== this.activeSchoolYear.id ) {
          return true
        }
        else {
          if (this.latestAcademicRecord.schoolCategoryId === SchoolCategories.SENIOR_HIGH_SCHOOL.id
            || this.latestAcademicRecord.schoolCategoryId === SchoolCategories.COLLEGE.id
             || this.latestAcademicRecord.schoolCategoryId === SchoolCategories.GRADUATE_SCHOOL.id
              || this.latestAcademicRecord.schoolCategoryId === SchoolCategories.VOCATIONAL.id  ) {
                //check if active semester id is equal to latest academic record semester id
                if (this.latestAcademicRecord.semesterId !== this.activeSemester.id) {
                  return true
                }
          }
        }
      }
      return false
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/scss/shared.scss";
  @import "../assets/scss/animations.scss";

  .c-main {
    padding: 0;
    width: 100vw !important;
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

  .c-body {
    position: relative!important;
  }

  .new-application {
    position: absolute;
    height: 250px;
    width: 300px;
    border-radius: 5px;
    z-index: 999!important;
    margin-left: 70px;
    bottom: 0;
    margin-bottom: 20px;
    display:  flex;
    justify-content:  center;
    align-items: center;
    transition: all 0.7s ease;
    background-color: white;
    border: solid 0.5px lightgray;

    .info-message-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      padding: 10px;

      .info-message {
        flex: 1;

        p {
          font-size: 14pt;
          text-align: center;
          font-weight: bold;
        }
        span {
          font-size: 10pt;
          color: lightgray;
        }
      }
    }

    .application-icon {
      width: 30px;
      height: 30px;
      color: rgb(86, 29, 243);
      transition: all 0.3s ease;
    }
  }
</style>
