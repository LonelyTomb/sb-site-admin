<template>
  <b-modal
    id="create-plan"
    ref="create-plan"
    size="lg"
    hide-header
    hide-footer
    :title="`Plan ${edit ? 'Update' : 'Creation'}`"
    body-class="p-5"
  >
    <h1>Plan {{ edit ? 'Update' : 'Creation' }}</h1>
    <b-form @submit.prevent="submit">
      <b-form-group
        id="location-amount-unit"
        label="Amount per Unit:"
        label-for="location-amount-unit"
      >
        <b-form-input
          id="location-amount-unit"
          v-model="form.amount_per_unit"
          type="text"
          number
          placeholder="Enter Amount per Unit"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="location-minimum-unit"
        label="Minimum Number of Units:"
        label-for="location-minimum-unit"
      >
        <b-form-input
          id="location-minimum-unit"
          v-model="form.minimun_no_units"
          type="number"
          min="1"
          number
          placeholder="Enter Minimum number of Unit"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="location-type" label="Type:" label-for="location-type">
        <b-form-select id="location-type" v-model="form.type" name="type">
          <b-form-select-option value="">Select Type</b-form-select-option>
          <b-form-select-option
            v-for="type in types || []"
            :key="type.value"
            :value="type.value"
            :disabled="
              !!(
                type.value === 'out_right' && getPlanType('out_right').length
              ) ||
              (type.value === 'installment' &&
                product.property_type === 'investment')
            "
          >
            {{ type.key }}
          </b-form-select-option>
        </b-form-select>
      </b-form-group>

      <b-form-group
        v-if="!isOutRight"
        id="location-minimum-amount"
        label="Minimum Deposit Amount"
        label-for="location-minimum-amount"
      >
        <b-form-input
          id="location-minimum-amount"
          v-model="form.minimun_deposit_amount"
          type="text"
          number
          placeholder="Enter Minimum Deposit Amount"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        v-if="!isOutRight"
        id="location-duration"
        label="Duration in Months:"
        label-for="location-duration"
      >
        <b-form-input
          id="location-duration"
          v-model="form.duration"
          type="number"
          min="1"
          number
          placeholder="Enter Duration in Months"
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
  product_id: null,
  duration: 1,
  minimun_no_units: 1,
  amount_per_unit: 0,
  minimun_deposit_amount: 0,
  type: '',
}

export default {
  name: 'CreatePlan',
  props: {
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      form: {
        ...defaultData,
        product_id: Number(this.$route.params.id),
      },
      types: [
        { key: 'Installment', value: 'installment' },
        { key: 'OutRight', value: 'out_right' },
      ],
    }
  },
  computed: {
    ...mapGetters({ plan: 'product/plans/single', product: 'product/single' }),
    isOutRight() {
      return !this.form.type || this.form.type === 'out_right'
    },
    isDisabled() {
      return false
    },
  },
  watch: {
    edit(val) {
      if (val) {
        this.updateForm(val)
      }
    },
    plan(val) {
      if (val) {
        this.updateForm(val)
      }
    },
    product(val) {
      if (val) {
        this.updateForm({
          ...this.form,
          amount_per_unit: val.unit_price,
        })
      }
    },
  },
  mounted() {
    if (this.edit) {
      this.updateForm(this.plan)
    } else {
      this.updateForm({
        ...this.form,
        amount_per_unit: this.product.unit_price,
        duration: 1,
      })
    }
  },
  methods: {
    ...mapActions({
      savePlan: 'product/plans/create',
      updatePlan: 'product/plans/update',
    }),
    hideModal() {
      this.$bvModal.hide('create-plan')
    },
    getPlanType(type) {
      return (
        (this.product &&
          this.product.payment_plans.filter(
            (item) => item.type === type && item.is_active
          )) ||
        []
      )
    },
    updateForm(payload) {
      this.form = {
        ...this.form,
        ...payload,
        amount_per_unit: this.$fromKobo(payload.amount_per_unit),
        minimun_deposit_amount: this.$fromKobo(payload.minimun_deposit_amount),
      }
    },
    async submit() {
      const loader = this.$loading.show()
      const minimum = this.isOutRight
        ? this.form.amount_per_unit
        : this.form.minimun_deposit_amount
      try {
        const payload = {
          ...this.form,
          product_id: Number(this.$route.params.id),
          amount_per_unit: this.$toKobo(this.form.amount_per_unit),
          minimun_deposit_amount: this.$toKobo(minimum),
        }
        if (this.edit) {
          const id = payload.id
          delete payload.id
          await this.updatePlan({ id, payload })
        } else {
          await this.savePlan(payload)
        }
        loader.hide()

        this.$Toast.fire({
          icon: 'success',
          title: `Plan ${this.edit ? 'Updated' : 'Created'}`,
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
