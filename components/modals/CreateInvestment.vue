<template>
  <b-modal
    id="create-product"
    ref="modal-lg"
    size="lg"
    hide-header
    hide-footer
    title="Location Creation"
    body-class="p-5"
  >
    <h1>Investment Creation</h1>
    <b-form @submit.prevent="submit">
      <b-form-group
        id="investment-name"
        label="Name:"
        label-for="investment-name"
      >
        <b-form-input
          id="investment-name"
          v-model="form.name"
          type="text"
          placeholder="Enter Name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="investment-description"
        label="Description:"
        label-for="investment-description"
      >
        <b-form-textarea
          id="investment-description"
          v-model="form.description"
          placeholder="Enter Description"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-form-group
        id="investment-price"
        label="Price per unit:"
        label-for="investment-price"
      >
        <b-form-input
          id="investment-name"
          v-model="form.unit_price"
          type="text"
          number
          placeholder="Enter price per unit"
          required
        ></b-form-input>
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
        <b-button type="button" variant="link" @click="hideModal"
          >Cancel</b-button
        >
        <b-button type="submit" variant="dark">Save</b-button>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
  name: 'CreateProduct',
  components: {},
  props: {
    product: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        ...defaultData,
      },
    }
  },
  computed: {
    ...mapGetters({
      states: 'state/all',
      lgas: 'lga/all',
    }),
  },
  watch: {
    'form.state_id'(val) {
      if (val) {
        this.fetchLGAs({ state_id: val })
      }
    },
  },
  mounted() {
    const loader = this.$loading.show()
    try {
      // if (this.$auth.user.state_id) {
      //   this.fetchLGAs({ state_id: this.$auth.user.state_id })
      // }
    } catch (e) {
      this.$Toast.fire({ icon: 'error', title: this.$formatError(e) })
    }
    loader.hide()
  },
  methods: {
    ...mapActions({
      fetchLGAs: 'lga/getLGAs',
      saveProduct: 'product/create',
    }),
    hideModal() {
      this.$bvModal.hide('create-product')
    },
    updateImages(val) {
      this.form.images = val
    },
    async submit() {
      const loader = this.$loading.show()
      try {
        const payload = {
          ...this.form,
          unit_price: this.$toKobo(this.form.unit_price),
        }
        await this.saveProduct(payload)
        loader.hide()

        this.$Toast.fire({
          icon: 'success',
          title: 'Product Created',
        })
        this.form = { ...defaultData }

        this.hideModal()
        this.$emit('completed', true)
      } catch (e) {
        loader.hide()
        await this.$Toast.fire({ icon: 'error', title: this.$formatError(e) })
      }
    },
  },
}
</script>

<style scoped></style>
