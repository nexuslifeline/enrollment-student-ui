<template>
  <div class="home__menus">
    <MenuItem v-for="(item, idx) in menus"
      :title="item.title"
      :description="item.description"
      :path="item.path"
      :key="idx"
      :isVisible="item.isVisible">
      <template v-slot:image>
        <img :src="item.image" />
      </template>
    </MenuItem>
  </div>
</template>

<script>
  import ArrowRight from '../../../assets/svg/arrow-right.svg';
  import MenuItem from './MenuItem';

  export default {
    name: 'Menus',
    props: {
      showNewApplicationNotice: {
        type: [Boolean]
      }
    },
    components: {
      ArrowRight,
      MenuItem,
    },
    data() {
      return {
        academicRecordId: null,
        menus: [
          {
            title: 'Enroll Now !',
            image: '/img/svg/my-documents.svg',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincid idunt ut labore et dolore magna aliqua.",
            path: '/applications/new',
            isVisible: this.showNewApplicationNotice
          },
          {
            title: 'My Documents',
            image: '/img/svg/my-documents.svg',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincid idunt ut labore et dolore magna aliqua.",
            path: 'documents',
            isVisible: true
          },
          {
            title: 'My Statements',
            image: '/img/svg/my-statements.svg',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincid idunt ut labore et dolore magna aliqua.",
            path: 'statements',
            isVisible: true
          },
          {
            title: 'My Payments',
            image: '/img/svg/my-payments.svg',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincid idunt ut labore et dolore magna aliqua.",
            path: 'payments',
            isVisible: true
          },
          {
            title: 'My Grades',
            image: '/img/svg/my-documents.svg',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincid idunt ut labore et dolore magna aliqua.",
            path: 'grades',
            isVisible: true
          },
          {
            title: 'My Profile',
            image: '/img/svg/my-profile.svg',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincid idunt ut labore et dolore magna aliqua.",
            path: 'profile',
            isVisible: true
          },
          {
            title: 'My Applications',
            image: '/img/svg/my-applications.svg',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincid idunt ut labore et dolore magna aliqua.",
            path: 'applications',
            isVisible: true
          },
          {
            title: 'My Requirements',
            image: '/img/svg/my-documents.svg',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincid idunt ut labore et dolore magna aliqua.",
            path: 'requirements',
            isVisible: true
          },
          {
            title: 'My Schedule',
            image: '/img/svg/my-documents.svg',
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincid idunt ut labore et dolore magna aliqua.",
            path: `schedules/${this.$store?.state?.user?.academicRecord.id}`,
            isVisible: true
          }
        ]
      }
    },
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