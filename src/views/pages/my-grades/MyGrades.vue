<template>
  <MainContainer
    :title="`My Grades`"
    :description="''">
    <template v-slot:subheader>
      <GradeCards />
    </template>
  </MainContainer>
</template>

<script>
export default {

}
</script>
<style lang="scss" scoped>
  @import "../../../assets/scss/shared.scss";
</style>