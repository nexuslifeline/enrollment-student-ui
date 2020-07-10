<template>
  <div class="side-bar__panel">
    <ul class="side-bar__menus">
      <li v-for="(item, idx) in $options.nav"
        :key="idx"
        class="side-bar__menu-item"
        :class="{ 'active': $route.path === item.to }">
        <a :href="`#${item.to}`" class="side-bar__menu-link">
          <component :is="item.icon" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import nav from './_nav-v2';
  import MyHome from '../assets/svg/my-home-nav.svg';
  import MyDocuments from '../assets/svg/my-documents-nav.svg';
  import MyStatements from '../assets/svg/my-statements-nav.svg';
  import MyGrades from '../assets/svg/my-grades-nav.svg';
  import MyPayments from '../assets/svg/my-payments-nav.svg';
  import MyProfile from '../assets/svg/my-profile-nav.svg';
  //import MyApplications from '../../../assets/svg/my-applications-nav.svg';

  export default {
    name: 'TheSidebarV2',
    nav,
    components: {
      MyHome,
      MyDocuments,
      MyStatements,
      MyGrades,
      MyPayments,
      MyProfile
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/shared.scss";

  .side-bar__panel {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 60px;
    border-right: 1px solid $light-gray-200;
    background-color: $white;
  }

  .side-bar__menus {
    margin: 0;
    margin-top: 60px !important;
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .side-bar__menu-item {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

     &.active {
      background-color: $maroon-100;

      svg * {
        color: $maroon !important;
        fill: $maroon !important;
      }
    }
  }

  .side-bar__menu-link {
    height: 28px;
    width: 28px;
    margin: 7px 0;
    padding: 3px 0;

    svg {
      height: 100%;
      width: auto;
      max-width: 100%;
    }
  }
</style>
