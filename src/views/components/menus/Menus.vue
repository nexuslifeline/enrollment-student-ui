<template>
  <div class="home__menus">
    <MenuItem v-for="(item, idx) in menus"
      :title="item.title"
      :description="item.description"
      :key="idx">
      <template v-slot:image>
        <component :is="item.image" />
      </template>
    </MenuItem>
  </div>
</template>

<script>
  import MyDocuments from '../../../assets/svg/my-documents.svg';
  import MyStatements from '../../../assets/svg/my-statements.svg';
  import MyPayments from '../../../assets/svg/my-payments.svg';
  import MyProfile from '../../../assets/svg/my-profile.svg';
  import MyApplications from '../../../assets/svg/my-applications.svg';
  import ArrowRight from '../../../assets/svg/arrow-right.svg';
  import MenuItem from './MenuItem';

  export default {
    name: 'Menus',
    components: {
      MyDocuments,
      MyStatements,
      MyPayments,
      MyProfile,
      MyApplications,
      ArrowRight,
      MenuItem
    },
    data() {
      return {
        menus: [
          {
            title: 'My Documents',
            image: 'MyDocuments',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincid idunt ut labore et dolore magna aliqua."
          },
          {
            title: 'My Statements',
            image: 'MyStatements',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincid idunt ut labore et dolore magna aliqua."
          },
          {
            title: 'My Payments',
            image: 'MyPayments',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincid idunt ut labore et dolore magna aliqua."
          },
          {
            title: 'My Grades',
            image: 'MyDocuments',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincid idunt ut labore et dolore magna aliqua."
          },
          {
            title: 'My Profile',
            image: 'MyProfile',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincid idunt ut labore et dolore magna aliqua."
          },
          {
            title: 'My Applications',
            image: 'MyApplications',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincid idunt ut labore et dolore magna aliqua."
          }
        ]
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/scss/shared.scss";
  .home__menus {
    width: auto;
    max-width: calc((230px + 15px + 15px) * 4); // size of each menu plus 10px from left and 10px from right times number of columns
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 30px;
    margin-bottom: 50px;

    @include for-size(phone-only) {
      width: 100%;
      justify-content: center;
    }
  }
</style>