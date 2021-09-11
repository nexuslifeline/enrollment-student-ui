<template>
  <div>
    <b-badge variant="secondary">
      {{ BillingTypes.getEnum(data.billingTypeId).label }}
    </b-badge>
  </div>
</template>

<script>
import { BillingTypes } from '../../../helpers/enum';
export default {
  props: {
    data: {
      type: [Object]
    }
  },
  data() {
    return {
      BillingTypes
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/shared.scss';
</style>