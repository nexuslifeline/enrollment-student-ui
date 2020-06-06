<template>
 <carousel :autoplay="false" :perPage="1">
  <slide>
    <div class="carousel__slide-image">
      <SvgRocket />
    </div>
    <div class="carousel__slide-text">
      <h4 class="carousel__slide-title">Signup</h4>
      <p class="carousel__slide-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import SvgRocket from '../../assets/svg/rocket.svg';

export default {
  components: {
    Carousel,
    Slide,
    SvgRocket
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/shared.scss";

  .carousel__slide-title {
    color: $white;
    text-align: center;
  }

  .carousel__slide-description {
    color: $white;
    text-align: center;
    margin-bottom: 0;
  }

  .carousel__slide-text {
    padding: 10px 40px;
  }

  .carousel__slide-image {
    margin-top: 30px;
  }

  .carousel__slide-image {
    height: 300px;
    width: 450px;
    margin: 0 auto;

    svg {
      height: auto;
      width: 100%;
    }
  }

</style>