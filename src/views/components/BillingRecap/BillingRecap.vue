<template>
  <div class="recap__container">
    <h5 class="card__title">Bill Information</h5>
    <Item label="Billing Number" content="BILL-0901215901" />
    <Item label="Due Date" content="Sept 20, 2021" />
    <Item label="Previous Balance" content="11,500.00" isBold />
    <Item label="Current Balance" content="10,000.00" isBold />
    <Item label="Less Payment" content="(1,500.00)" isBold />
    <hr />
    <Item label="Total Balance" content="20,000.00" isBold />
  </div>
</template>

<script>
import Item from './ContentItem';
export default {
  components: {
    Item
  },
  props: {
    billId: {
      type: [Number, String]
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/shared.scss';

  .recap__container {
    min-height: 250px;
    background-color: $light-gray-50;
    border-radius: 3px;
    padding: 25px 20px;
  }

  .card__title {
    margin-bottom: 20px;
  }

</style>