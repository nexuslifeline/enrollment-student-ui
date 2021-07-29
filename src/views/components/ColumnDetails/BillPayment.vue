<template>
  <span>
    {{ $options.formatNumber(data.totalPaid) }}
  </span>
</template>

<script>
import { formatNumber } from '../../../helpers/forms';
export default {
  formatNumber,
  props: {
    data: {
      type: [Object]
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/shared.scss';
</style>