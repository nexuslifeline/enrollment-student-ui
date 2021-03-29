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
            description: "You can view your past enrollment records such as your Assessment Forms and Certificate of Registration.",
            path: 'documents',
            isVisible: true
          },
          {
            title: 'My Statements',
            image: '/img/svg/my-statements.svg',
            description: "You can view a detailed breakdown of your School charges.",
            path: 'statements',
            isVisible: true
          },
          {
            title: 'My Payments',
            image: '/img/svg/my-payments.svg',
            description: "Your payment history is a record of your past payment transactions. allows you to view a complete record of payments made on a SOA or other Billing.",
            path: 'payments',
            isVisible: true
          },
          {
            title: 'My Grades',
            image: '/img/svg/my-documents.svg',
            description: "See an overview of grading and feedback on your completed course work.",
            path: 'grades',
            isVisible: true
          },
          {
            title: 'My Profile',
            image: '/img/svg/my-profile.svg',
            description: "You can edit your account settings, as well as some information on your public profile.",
            path: 'profile',
            isVisible: true
          },
          // {
          //   title: 'My Applications',
          //   image: '/img/svg/my-applications.svg',
          //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincid idunt ut labore et dolore magna aliqua.",
          //   path: 'applications',
          //   isVisible: true
          // },
          {
            title: 'My Requirements',
            image: '/img/svg/my-documents.svg',
            description: "See what requirements you have submitted. Allows you to update requirements.",
            path: 'requirements',
            isVisible: true
          },
          {
            title: 'My Schedule',
            image: '/img/svg/my-documents.svg',
            description: "Shows your class schedule. See what time your subject is over the course of the week.",
            path: `schedules/${this.$store?.state?.user?.academicRecord.id}`,
            isVisible: true
          },
          {
            title: 'My Ledger',
            image: '/img/svg/my-documents.svg',
            description: "Shows how you've paid your accounts over the length of period.",
            path: `ledgers`,
            isVisible: true
          },
          {
            title: 'My Clearance',
            image: '/img/svg/my-documents.svg',
            description: "See if you have already obtained clearance in various departments and offices.",
            path: `clearance`,
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