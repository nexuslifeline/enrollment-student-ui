<template>
  <div v-show="isReady" class="home-content">
    <!--<div class="greetings">
      <h2 class="greetings__title">Welcome home!</h2>
      <p class="greetings__description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>-->
    <Menus :showNewApplicationNotice="showNewApplicationNotice" ref="menus" :key="menuKey"/>
  </div>
</template>

<script>
  import Menus from './components/menus/Menus'
  import { SchoolCategories } from "../helpers/enum";
  export default {
    name: 'Home',
    components: {
      Menus
    },
    data() {
      return {
        menuKey: 0,
        isReady: false,
        SchoolCategories: SchoolCategories,
        showNewApplicationNotice: false
      }
    },
    computed: {
      // hasActiveAdmission() {
      //   return !!(this.$store.state.user && this.$store.state.user.activeAdmission);
      // },
      // hasActiveApplication() {
      //   return !!(this.$store.state.user && this.$store.state.user.activeApplication && this.$store.state.user.activeApplication.isManual === 0);
      // },
      isOnboarding() {
        return !!this.$store.state.user?.isOnboarding;
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
      academicRecords() {
        return this.$store.state.user.academicRecords || [];
      }
    },
    created() {
      if (this.isOnboarding) {
        this.$router.push({ path: '/application' });
      }
    },
    // temporarily commented this
    // mounted() {
    //   this.$nextTick(() => {
    //     setTimeout(() => {
    //       if (this.user && this.activeSchoolYear && this.activeSemester && this.latestAcademicRecord) {
    //         if (this.latestAcademicRecord.schoolYearId !== this.activeSchoolYear.id ) {
    //           this.showNewApplicationNotice = true
    //         }
    //         else {
    //           if (this.latestAcademicRecord.schoolCategoryId === SchoolCategories.SENIOR_HIGH_SCHOOL.id
    //             || this.latestAcademicRecord.schoolCategoryId === SchoolCategories.COLLEGE.id
    //             || this.latestAcademicRecord.schoolCategoryId === SchoolCategories.GRADUATE_SCHOOL.id
    //               || this.latestAcademicRecord.schoolCategoryId === SchoolCategories.VOCATIONAL.id  ) {
    //                 //check if active semester id is equal to latest academic record semester id
    //               // if (this.latestAcademicRecord.semesterId !== this.activeSemester.id) {
    //               //   this.showNewApplicationNotice = true
    //               // }
    //             const result = this.academicRecords.find(el => el.academicRecordStatusId === 3 && el.semesterId === this.activeSemester.id)
    //             this.showNewApplicationNotice = result ? false : true
    //           }
    //         }
    //       }
    //       this.menuKey =+ 1 //force render menu component
    //       this.isReady = true
    //     }, 1500);
    //   })
    // },
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
