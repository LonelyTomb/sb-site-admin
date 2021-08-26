<template>
  <div class="">
    <h1 class="mb-0">{{ title }}</h1>
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
  font-size: toRes(30);
  font-weight: bold;
  @media screen and (max-width: 768px) {
    font-size: toRes(26);
  }
}
</style>
