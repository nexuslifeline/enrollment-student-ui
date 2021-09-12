<template>
  <div class="bill-column__container">
    <div>
      <b-link @click.prevent="$emit('onClick')">
        {{ data.billingNo }}
      </b-link>
    </div>
    <BulletedContent :items="[
      schoolYear,
      semester,
      term
    ]" />
  </div>
</template>

<script>
import BulletedContent from '../BulletedContent/BulletedContent';
export default {
  components: {
    BulletedContent
  },
  props: {
    data: {
      type: [Object]
    }
  },
  computed: {
    term() {
      return this.data?.term?.name || '';
    },
    schoolYear() {
      return this.data?.academicRecord?.schoolYear?.name || '';
    },
    level() {
      return this.data?.academicRecord?.level?.name || '';
    },
    semester() {
      return this.data?.academicRecord?.semester?.name || '';
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/shared.scss';

  .bill-column__container {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
  }
</style>