<template>
  <div class="">
    <div class="slider-container">
      <div class="slider">
        <img
          :src="image.src"
          class="mr-lg-4 mr-3"
          alt="Responsive image"
          :class="{ 'normal-img': !fullWidth, 'full-image': fullWidth }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true,
    },
    fullWidth: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.normal-img {
  width: 30rem;
  height: 18rem;
  float: left;
  @media screen and (max-width: 768px) {
    height: 10rem;
    width: 18rem;
  }
  /* object-fit: cover; */
}
.full-image {
  width: 60vw;
  height: 25rem;
  float: left;
  object-fit: cover;
  object-position: top center;
  @media screen and (max-width: 768px) {
    height: 10rem;
    width: 90rem;
  }
}
</style>
