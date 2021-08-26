<template>
  <b-container fluid>
    <b-row no-gutters class="mb-5">
      <b-col col>
        <div>
          <b-button
            v-b-modal.create-product
            class="d-inline-flex gap-2 align-items-center"
            variant="dark"
            ><b-img src="~svg/plus-circle 1.svg" />New Location</b-button
          >
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        v-for="location in products.rows"
        :key="location.id"
        cols="12"
        md="12"
        lg="3"
      >
        <nuxt-link
          :to="`/admin/locations/${location.id}`"
          class="text-decoration-none"
        >
          <location :property="location" />
        </nuxt-link>
      </b-col>
    </b-row>
    <create-product @completed="refreshData" />
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AdminProperty',
  components: {
    Location: () => import('@/components/cards/Location'),
    CreateProduct: () => import('@/components/modals/CreateProduct'),
  },
  layout: 'admin',
  data() {
    return {}
  },
  head() {
    return {
      title: 'Sabreworks || Properties',
    }
  },
  computed: {
    ...mapGetters({ products: 'product/all' }),
  },
  async mounted() {
    const loader = this.$loading.show()
    try {
      await this.fetchProducts({ property_type: 'land' })
      await this.fetchStates()
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
      fetchStates: 'state/getStates',
    }),
    async refreshData(val) {
      if (!val) return
      const loader = this.$loading.show()
      try {
        await this.fetchProducts({ property_type: 'land,house' })
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
