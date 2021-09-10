<template>
  <div>
    <h1 class="mb-4 text-center">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 25px;
  font-family: $secondary-font;
  color: black;
}
@media screen and (max-width: 768px) {
  h1 {
    font-size: 25px;
  }
}
</style>
