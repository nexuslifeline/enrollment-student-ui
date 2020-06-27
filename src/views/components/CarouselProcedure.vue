<template>
<div class="carousel__container">
  <carousel :autoplay="false" :perPage="1">
    <slide>
      <div class="carousel__slide-image">
        <PersonDesktop />
      </div>
      <div class="carousel__slide-text">
        <h4 class="carousel__slide-title">
          Start your bright future with us!
        </h4>
        <p class="carousel__slide-description">
          School of competent and dedicated teachers that provides quality education and creative programs.
        </p>
        </div>
      </slide>
      <slide>
        <div>
        <p class="carousel__slide-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import PersonDesktop from '../../assets/svg/person-table.svg';
//import SvgRocket from '../../assets/svg/rocket.svg';

export default {
  components: {
    Carousel,
    Slide,
    PersonDesktop
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/shared.scss";

  .carousel__slide-title {
    color: $darkblue;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
  }

  .carousel__slide-description {
    color: $dark-gray;
    text-align: center;
    margin-bottom: 0;
  }

  .carousel__slide-text {
    padding: 10px 40px;
  }

  .carousel__slide-image {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 350px;
    width: auto;
    margin-top: 30px;
    margin-bottom: 30px;

    svg {
      height: 100%;
      width: 100%;
    }
  }

  @supports (-ms-ime-align: auto) {
  .carousel__container {
    width: 50vw;
  }
}

</style>