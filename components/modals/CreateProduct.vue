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
    <h1>Location Creation</h1>
    <b-form @submit.prevent="submit">
      <b-form-group id="location-name" label="Name:" label-for="location-name">
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
              <b-form-select-option value="">Select State</b-form-select-option>
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
            <b-select id="location-lga" v-model="form.lga_id" name="lga_id">
              <b-form-select-option value="">Select City</b-form-select-option>
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

      <b-form-group id="location-type" label="Type:" label-for="location-type">
        <b-form-select
          id="location-type"
          v-model="form.property_type"
          name="type"
        >
          <b-form-select-option value="">Select Type</b-form-select-option>
          <b-form-select-option
            v-for="type in types || []"
            :key="type.value"
            :value="type.value"
          >
            {{ type.key }}
          </b-form-select-option>
        </b-form-select>
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
      <upload-file v-if="form.name" :form="form" @completed="updateImages" />
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
  state_id: '',
  lga_id: '',
  description: '',
  address: '',
  total_units: 1,
  unit_price: 0,
  features: [],
  property_type: 'land',
  status: 'open',
}

export default {
  name: 'CreateProduct',
  components: {
    uploadFile: () => import('@/components/uploadFile'),
  },
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
      types: [
        { key: 'Land', value: 'land' },
        { key: 'House', value: 'house' },
      ],
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
