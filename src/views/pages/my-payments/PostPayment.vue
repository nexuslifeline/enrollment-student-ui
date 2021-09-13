<template>
  <!-- <div class="post-payment__container">
    <div class="left__pane">
      <BillingRecap :billingId="1" />
    </div>
    <div class="right__pane">

    </div>
  </div> -->
  <MainContainer
    :title="`${$options.headline.title}`"
    :description="$options.headline.description">
    <template v-slot:subheader>
      <Tabs
        :items="[]"
      />
    </template>
  </MainContainer>
</template>

<script>
import headline from './data/payment';
export default {
  headline
}
</script>
<style lang="scss" scoped>
  .post-payment__container {
    width: 100%;
    height: 100%;
    padding: 40px;
    max-width: 1300px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
  }

  .left__pane {
    width: 350px;
  }

  .right__pane {
    flex: 1;
  }
</style>
