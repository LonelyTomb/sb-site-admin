<template>
  <div v-if="images.length" class="mb-4">
    <VueSlickCarousel
      v-bind="settings"
      ref="c1"
      class="product-carousel mb-4"
      :as-nav-for="c2"
    >
      <div v-for="image in images" :key="image.src">
        <b-img
          :src="image.src"
          class="mr-lg-4 mr-3 product-carousel-image carousel-image"
          alt="Responsive image"
          fluid
        />
      </div>
    </VueSlickCarousel>
    <VueSlickCarousel
      v-bind="settings2"
      ref="c2"
      class="product-carousel-small"
      :as-nav-for="c1"
    >
      <div v-for="image in images" :key="image.src" class="pr-3">
        <b-img
          :src="image.src"
          class="mr-lg-4 mr-3 product-carousel-small-image carousel-image"
          alt="Responsive image"
          fluid
        />
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
export default {
  name: 'ProductCarousel',
  props: {
    images: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      c1: null,
      c2: null,
      settings: {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        focusOnSelect: true,
        asNavFor: this.c2,
      },
      settings2: {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        focusOnSelect: true,
        asNavFor: this.c1,
      },
    }
  },
  mounted() {
    setTimeout(() => {
      this.c1 = this.$refs.c1
      this.c2 = this.$refs.c2
    }, 3000)
  },
}
</script>

<style scoped lang="scss">
.carousel-image {
  cursor: pointer;
  object-fit: cover;
  object-position: center;
  border-radius: toRem(10);
}
.product-carousel,
.product-carousel-image {
  height: toRem(550);
  @media screen and (max-width: 992px) {
    height: toRem(350);
  }
}

.product-carousel-small,
.product-carousel-small-image {
  height: toRem(200);
  @media screen and (max-width: 992px) {
    height: toRem(100);
  }
}
</style>
