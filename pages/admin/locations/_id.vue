<template>
  <b-container fluid>
    <b-row>
      <div v-if="product" class="d-flex mb-3 mt-4 mt-lg-0">
        <img
          :src="require('@/assets/images/svg/back-arrow.svg')"
          class="mr-3 back-arrow d-none"
          alt=""
          @click="$router.back()"
        />
        <page-title :title="product.name" />
      </div>
    </b-row>
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
                  formatAsMoney($fromKobo(plan.amount_per_unit))
                }}</b-list-group-item
              >
              <b-list-group-item
                >Minimum Deposit: NGN
                {{
                  formatAsMoney($fromKobo(plan.minimun_deposit_amount))
                }}</b-list-group-item
              >
              <b-list-group-item
                >Minimum Units: {{ plan.minimun_no_units }}</b-list-group-item
              >
              <b-list-group-item
                >Duration: {{ plan.duration }} month(s)</b-list-group-item
              >
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
            <b-row>
              <b-col lg="6">
                <b-form-group
                  id="location-state"
                  label="State:"
                  label-for="location-state"
                >
                  <b-form-select
                    id="location-state"
                    v-model="form.state_id"
                    name="state_id"
                  >
                    <b-form-select-option value=""
                      >Select State
                    </b-form-select-option>
                    <b-form-select-option
                      v-for="state in states.rows || []"
                      :key="state.id"
                      :value="state.id"
                    >
                      {{ state.name }}
                    </b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group
                  id="location-lga"
                  label="Lga:"
                  label-for="location-units"
                >
                  <b-select
                    id="location-lga"
                    v-model="form.lga_id"
                    name="lga_id"
                  >
                    <b-form-select-option value=""
                      >Select City
                    </b-form-select-option>
                    <b-form-select-option
                      v-for="lga in lgas.rows || []"
                      :key="lga.id"
                      :value="lga.id"
                    >
                      {{ lga.name }}
                    </b-form-select-option>
                  </b-select>
                </b-form-group>
              </b-col>
            </b-row>
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
              id="location-address"
              label="Address:"
              label-for="location-address"
            >
              <b-form-textarea
                id="location-address"
                v-model="form.address"
                placeholder="Enter Address"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group
              id="location-units"
              label="Available Units:"
              label-for="location-units"
            >
              <b-form-input
                id="location-units"
                v-model="form.available_units"
                type="number"
                min="1"
                number
                placeholder="Update Available Units"
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
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="location-features"
              label="Features:"
              label-for="location-features"
            >
              <b-form-tags
                v-model="form.features"
                input-id="location-features"
                placeholder="Enter new features separated by space"
              />
            </b-form-group>
            <upload-file
              v-if="form.name"
              :form="form"
              :images="form.images"
              @completed="updateImages"
            />
            <div class="d-flex justify-content-end gap-3 pt-3">
              <b-button type="submit" variant="dark">Update</b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PageTitle from '../../../components/PageTitle'
import ProductSlider from '../../../components/products/ProductSlider'

const defaultData = {
  name: '',
  state_id: '',
  lga_id: '',
  description: '',
  address: '',
  available_units: 1,
  unit_price: 0,
  features: [],
  property_type: 'land',
  status: 'open',
}
export default {
  name: 'Location',
  components: {
    PageTitle,
    ProductSlider,
    uploadFile: () => import('@/components/uploadFile'),
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
      states: 'state/all',
      lgas: 'lga/all',
    }),
    images() {
      return (
        (this.product &&
          this.product.images.map((image) => ({ src: image }))) ||
        []
      )
    },
  },
  watch: {
    'form.state_id'(val) {
      this.fetchLGAs({ state_id: val })
    },
  },
  async mounted() {
    await this.refreshData()
  },
  methods: {
    ...mapActions({
      fetchProduct: 'product/single',
      fetchLGAs: 'lga/getLGAs',
      fetchStates: 'state/getStates',
      updateProduct: 'product/update',
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
        await this.fetchStates()
        if (this.product.state_id) {
          await this.fetchLGAs({ state_id: this.product.state_id })
        }
      } catch (e) {
        await this.$Toast.fire({
          icon: 'error',
          title: this.$formatError(e),
        })
      }
      loader.hide()
    },
    formatAsMoney(value) {
      return new Intl.NumberFormat().format(value)
    },
    updateImages(val) {
      this.form.images = val
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
