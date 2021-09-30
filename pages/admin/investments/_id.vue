<template>
  <b-container fluid>
    <b-row>
      <div class="d-flex properties-grid scrollbar">
        <div v-for="image in images" :key="image.src">
          <ProductSlider :image="image" full-width />
        </div>
      </div>
    </b-row>
    <b-row class="py-5 px-2">
      <b-col md="12" lg="4">
        <b-card v-if="product">
          <b-card-title
            class="
              d-flex
              flex-row
              justify-content-between
              align-items-center
              mb-4
              border-bottom border-dark
            "
          >
            <h2>Payment Plans</h2>

            <b-button
              v-if="product.payment_plans && product.payment_plans.length === 0"
              class="d-inline-flex gap-2 align-items-center"
              variant="dark"
              size="sm"
              @click="togglePlanModal(false)"
              ><b-img src="~svg/plus-circle 1.svg" />New Plan</b-button
            >
          </b-card-title>
          <b-card-text class="d-flex flex-column gap-3">
            <b-list-group v-for="plan in product.payment_plans" :key="plan.id">
              <b-list-group-item
                >Amount Per Unit: NGN
                {{
                  $formatAsMoney($fromKobo(plan.amount_per_unit))
                }}</b-list-group-item
              >
              <b-list-group-item
                >Minimum Deposit: NGN
                {{
                  $formatAsMoney($fromKobo(plan.minimun_deposit_amount))
                }}</b-list-group-item
              >
              <b-list-group-item
                >Minimum Units: {{ plan.minimun_no_units }}</b-list-group-item
              >
              <!-- <b-list-group-item
                >Duration: {{ plan.duration }} month(s)</b-list-group-item
              > -->
              <b-list-group-item class="text-capitalize">
                Type: {{ plan.type.replace('_', ' ') }}
              </b-list-group-item>
              <b-list-group-item class="text-capitalize">
                Active: {{ plan.is_active ? 'Yes' : 'No' }}
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <b-button
                  v-if="!plan.is_active"
                  size="sm"
                  variant="success"
                  @click.prevent="toggleActivation(plan.id, 'activate')"
                  >Activate</b-button
                >
                <b-button
                  v-if="plan.is_active"
                  size="sm"
                  variant="danger"
                  @click.prevent="toggleActivation(plan.id, 'deactivate')"
                  >Deactivate</b-button
                >
                <b-button
                  variant="dark"
                  size="sm"
                  @click="togglePlanModal(true, plan.id)"
                  >Edit</b-button
                >
              </b-list-group-item>
            </b-list-group>
          </b-card-text>
          <create-plan :edit="edit" @completed="refreshData" />
        </b-card>
      </b-col>
      <b-col md="12" lg="8">
        <b-card>
          <b-form @submit.prevent="submit">
            <b-form-group
              id="location-name"
              label="Name:"
              label-for="location-name"
            >
              <b-form-input
                id="location-name"
                v-model="form.name"
                type="text"
                placeholder="Enter Name"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="location-description"
              label="Description:"
              label-for="location-description"
            >
              <b-form-textarea
                id="location-description"
                v-model="form.description"
                placeholder="Enter Description"
                required
              ></b-form-textarea>
            </b-form-group>
            <b-form-group
              id="location-units"
              label="Total Units:"
              label-for="location-units"
            >
              <b-form-input
                id="location-units"
                v-model="form.total_units"
                type="number"
                min="1"
                number
                placeholder="Enter Total Units"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="location-price"
              label="Price per unit:"
              label-for="location-price"
            >
              <b-form-input
                id="location-name"
                v-model="form.unit_price"
                type="text"
                number
                placeholder="Enter price per unit"
                required
                disabled
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="investment-roi"
              label="Returns On Investment %:"
              label-for="investment-roi"
            >
              <b-form-input
                id="investment-roi"
                v-model="form.interest_percentage"
                type="text"
                number
                placeholder="Enter ROI percentage"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="investment-duration"
              label="Duration in months:"
              label-for="investment-duration"
            >
              <b-form-input
                id="investment-duration"
                v-model="form.duration"
                type="text"
                number
                placeholder="Duration in months"
                required
              ></b-form-input>
            </b-form-group>
            <div class="d-flex justify-content-end gap-3 pt-3">
              <b-button type="submit" variant="dark">Update</b-button>
              <div v-if="product" class="d-flex gap-3">
                <b-button
                  v-if="!product.is_active"
                  size="sm"
                  variant="success"
                  @click.prevent="toggleStatus(product.id, 'activate')"
                  >Activate</b-button
                >
                <b-button
                  v-if="product.is_active"
                  size="sm"
                  variant="danger"
                  @click.prevent="toggleStatus(product.id, 'deactivate')"
                  >Deactivate</b-button
                >
              </div>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProductSlider from '../../../components/products/ProductSlider'

const defaultData = {
  name: '',
  description: '',
  duration: 1,
  interest_percentage: 1,
  unit_price: 0,
  property_type: 'investment',
  total_units: 0,
  status: 'open',
}
export default {
  name: 'Location',
  components: {
    ProductSlider,
    CreatePlan: () => import('@/components/modals/CreatePlan'),
  },
  layout: 'admin',
  data() {
    return {
      form: {
        ...defaultData,
      },
      edit: false,
    }
  },
  computed: {
    ...mapGetters({
      product: 'product/single',
    }),
    images() {
      return (
        (this.product &&
          this.product.images.map((image) => ({ src: image }))) ||
        []
      )
    },
  },
  async mounted() {
    await this.refreshData()
  },
  methods: {
    ...mapActions({
      fetchProduct: 'product/single',
      updateProduct: 'product/update',
      activateProduct: 'product/activate',
      deActivateProduct: 'product/deactivate',
      activatePlan: 'product/plans/activate',
      deActivatePlan: 'product/plans/deactivate',
      fetchPlan: 'product/plans/single',
    }),
    async refreshData() {
      const loader = this.$loading.show()
      try {
        await this.fetchProduct(this.$route.params.id)
        this.form = {
          ...this.product,
          unit_price: this.$fromKobo(this.product.unit_price),
        }
      } catch (e) {
        await this.$Toast.fire({
          icon: 'error',
          title: this.$formatError(e),
        })
      }
      loader.hide()
    },
    async togglePlanModal(status, id = '') {
      this.edit = status
      if (status) {
        const loader = this.$loading.show()
        try {
          await this.fetchPlan(id)
          loader.hide()
          this.$bvModal.show('create-plan')
        } catch (e) {
          loader.hide()
          await this.$Toast.fire({
            icon: 'error',
            title: this.$formatError(e),
          })
        }
      } else {
        this.$bvModal.show('create-plan')
      }
    },
    async toggleActivation(id, type) {
      const loader = this.$loading.show()
      try {
        if (type === 'activate') {
          await this.activatePlan({ id })
        } else {
          await this.deActivatePlan({ id })
        }
        await this.refreshData()
        loader.hide()
        await this.$Toast.fire({ icon: 'success', title: `Plan ${type}d` })
      } catch (e) {
        loader.hide()
        await this.$Toast.fire({ icon: 'error', title: this.$formatError(e) })
      }
    },
    async toggleStatus(id, type) {
      const loader = this.$loading.show()
      try {
        if (type === 'activate') {
          await this.activateProduct({ id })
        } else {
          await this.deActivateProduct({ id })
        }
        await this.refreshData()
        loader.hide()
        await this.$Toast.fire({
          icon: 'success',
          title: `Investment ${type}d`,
        })
      } catch (e) {
        loader.hide()
        await this.$Toast.fire({ icon: 'error', title: this.$formatError(e) })
      }
    },
    async submit() {
      const loader = this.$loading.show()
      try {
        const payload = {
          ...this.form,
          unit_price: this.$toKobo(this.form.unit_price),
        }
        await this.updateProduct({ id: this.product.id, form: payload })
        loader.hide()

        this.$Toast.fire({
          icon: 'success',
          title: 'Product Updated',
        })
      } catch (e) {
        loader.hide()
        await this.$Toast.fire({ icon: 'error', title: this.$formatError(e) })
      }
    },
  },
}
</script>

<style scoped lang="scss">
.properties-grid {
  overflow-x: auto;
  width: 72.2vw;

  @media screen and (max-width: 768px) {
    width: 94.5vw;
  }
}
</style>
