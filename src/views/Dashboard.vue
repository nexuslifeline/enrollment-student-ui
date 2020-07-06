<template>
  <div class="home-content">
    <div class="greetings">
      <h2 class="greetings__title">Welcome home!</h2>
      <p class="greetings__description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
    <div class="home__menus">
      <div class="home__menu-action">

      </div>
    </div>
  </div>
</template>

<script>

</script>
<style lang="scss" scoped>
  .home-content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 60px;
  }

  .greetings {
    width: 100%;
    max-width: 1200px;
  }

  .home__menus {
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: row;
    margin-top: 30px;
  }

  .home__menu-action {
    border: 0;
    -webkit-box-shadow: 0px 1px 7px 0px rgba(212,212,212,1);
    -moz-box-shadow: 0px 1px 7px 0px rgba(212,212,212,1);
    box-shadow: 0px 1px 7px 0px rgba(212,212,212,1);
    width: 200px;
    min-height: 230px;
    border-radius: 3px;
  }
</style>
<style>

</style>
