<template>
  <b-container fluid>
    <b-row no-gutters class="mb-5">
      <b-col col>
        <div>
          <b-button
            v-b-modal.create-product
            class="d-inline-flex gap-2 align-items-center"
            variant="dark"
            ><b-img src="~svg/plus-circle 1.svg" />Create Investment
            Plan</b-button
          >
        </div>
      </b-col>
    </b-row>
    <b-row class="justify-content-center justify-content-lg-start">
      <b-col
        v-for="investment in products.rows"
        :key="investment.id"
        cols="auto"
        class="mb-3"
      >
        <nuxt-link
          :to="`/admin/investments/${investment.id}`"
          class="text-decoration-none"
        >
          <Investment :investment="investment" />
        </nuxt-link>
      </b-col>
    </b-row>
    <create-investment @completed="refreshData" />
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AdminProperty',
  components: {
    Investment: () => import('@/components/cards/Investment'),
    CreateInvestment: () => import('@/components/modals/CreateInvestment'),
  },
  layout: 'admin',
  data() {
    return {}
  },
  head() {
    return {
      title: 'Sabreworks || Investment',
    }
  },
  computed: {
    ...mapGetters({ products: 'product/all' }),
  },
  async mounted() {
    const loader = this.$loading.show()
    try {
      await this.fetchProducts({ property_type: 'investment' })
      loader.hide()
    } catch (e) {
      loader.hide()

      await this.$Toast.fire({
        icon: 'error',
        title: this.$formatError(e),
      })
    }
  },
  methods: {
    ...mapActions({
      fetchProducts: 'product/all',
    }),
    async refreshData(val) {
      if (!val) return
      const loader = this.$loading.show()
      try {
        await this.fetchProducts({ property_type: 'investment' })
        loader.hide()
      } catch (e) {
        loader.hide()

        await this.$Toast.fire({
          icon: 'error',
          title: this.$formatError(e),
        })
      }
    },
  },
}
</script>

<style scoped></style>
