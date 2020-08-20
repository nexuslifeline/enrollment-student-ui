<template>
  <div class="main-container">
    <div class="left-pane">
        <router-link class="link" to="/my-documents/assesment-form" >Assesment Forms</router-link>
        <router-link class="link" to="/my-documents/registration-form">Registration Forms</router-link>
    </div>
    <div class="right-pane">  
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>

  @import "../../assets/scss/shared.scss";

  .main-container {
    height: 100%;
    display: flex;
    padding: 20px 60px 0 20px;
    
    @include for-size(phone-only) {
      flex-direction: column;
      padding: 20px 20px 0 20px;
    }
  }

  .left-pane {
    width: 250px;
    display: flex;
    flex-direction: column;
  }

  .link {
    font-size: 14pt;
  }

  .right-pane {
    flex: 1;
    border: solid whitesmoke 1px;
    padding:30px;

    @include for-size(phone-only) {
      margin-top: 20px;
    }
  }

</style>