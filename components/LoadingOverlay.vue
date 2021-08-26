<template lang="">
  <loading
    :active.sync="isLoading"
    :can-cancel="true"
    :loader="loader"
    :color="color"
    :is-full-page="fullPage"
  />
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      loader: 'bars',
      color: '#006A38',
    }
  },
  methods: {
    start() {
      this.isLoading = true
    },
    finish() {
      this.isLoading = false
    },
  },
}
</script>
<style lang=""></style>
