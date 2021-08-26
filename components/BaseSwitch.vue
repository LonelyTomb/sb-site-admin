<template>
  <label class="switch" for="checkbox">
    <input id="checkbox" v-model="isChecked" type="checkbox" />
    <div class="slider round"></div>
  </label>
</template>
<script>
export default {
  props: {
    checked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isChecked: this.checked,
    }
  },
  watch: {
    isChecked(val) {
      this.$emit('toggle', val)
    },
  },
}
</script>
<style lang="scss" scoped></style>
