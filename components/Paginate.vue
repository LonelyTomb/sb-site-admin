<template>
  <b-pagination
    v-model="currentPage"
    :total-rows="totalRows"
    :per-page="perPage"
    aria-controls="my-table"
    @change="changePage"
  />
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      required: false,
      default: 1,
    },
    perPage: {
      required: false,
      default: 20,
      type: Number,
    },
    totalRows: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentPage: this.page,
    }
  },
  methods: {
    changePage(e) {
      this.$emit('to', e)
    },
  },
}
</script>

<style lang="scss" scoped></style>
