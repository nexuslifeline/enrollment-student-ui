<template>
  <div class="home__menu-action">
    <div class="home__menu-image">
      <slot name="image"></slot>
    </div>
    <div class="home__menu-details">
      <p class="home__menu-title">
        {{title}}
      </p>
      <p class="home__menu-description">
        {{description}}
      </p>
      <button class="home__menu-more">
        <span class="home__menu-more-count">2</span>
        new recent documents
        <div class="home__menu-icon-right">
          <ArrowRight />
        </div>
      </button>
    </div>
  </div>
</template>

<script>
  import ArrowRight from '../../../assets/svg/arrow-right.svg'

  export default {
    name: 'MenuItem',
    components: {
      ArrowRight
    },
    props: {
      title: {
        type: [String]
      },
      description: {
        type: [String]
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/scss/shared.scss";

  .home__menu-action {
    border: 1px solid $light-gray-200;
    width: 230px;
    min-height: 290px;
    border-radius: 3px;
    padding: 20px 15px;
    margin: 10px;
    display: flex;
    flex-direction: column;

    &:hover {
      cursor: pointer;
      -webkit-box-shadow: 0px 1px 7px 0px rgba(212,212,212,1);
      -moz-box-shadow: 0px 1px 7px 0px rgba(212,212,212,1);
      box-shadow: 0px 1px 7px 0px rgba(212,212,212,1);
    }
  }

  .home__menu-image {
    padding: 10px;
    height: 120px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 100%;
      width: auto;
    }
  }

  .home__menu-title {
    font-size: 15px;
    font-weight: 600;
    margin: 7px 0;
    text-align: center;
    color: $dark-gray-300;
  }

  .home__menu-description {
    font-size: 12px;
    text-align: center;
    color: $dark-gray-300;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .home__menu-more {
    width: 100%;
    border: 0;
    outline: 0;
    background-color: $maroon-100;
    color: $maroon;
    border-radius: 3px;
    padding: 3px 10px;
    display: flex;
    flex-direction: row;
    font-size: 12px;
    align-items: center;
    margin-top: auto;
  }

  .home__menu-icon-right {
    height: 100%;
    width: 15px;
    margin-left: auto;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      width: 100%;
      height: auto;
      margin: 0;
    }
  }

  .home__menu-more-count {
    font-weight: 700;
    margin-right: 5px;
  }

  .home__menu-details {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>

