<template>
  <div>
    <b-badge v-if="data.billingStatusId === BillingStatus.PAID.id" variant="success">
      Paid
    </b-badge>
    <b-badge v-else-if="data.billingStatusId === BillingStatus.UNPAID.id" :variant="data.isForwarded ? 'secondary' : 'warning'">
      Unpaid<span v-if="data.isForwarded"> + Forwarded</span>
    </b-badge>
    <b-badge v-else :variant="data.isForwarded ? 'secondary' : 'warning'">
      Partial<span v-if="data.isForwarded"> + Forwarded</span>
    </b-badge>
  </div>
</template>

<script>
import { BillingStatus } from '../../../helpers/enum';
export default {
  props: {
    data: {
      type: [Object]
    }
  },
  data() {
    return {
      BillingStatus
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/shared.scss';
</style>