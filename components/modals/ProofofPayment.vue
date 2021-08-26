<template>
  <b-modal
    id="upload-proof"
    :no-close-on-backdrop="true"
    :no-close-on-esc="true"
    :hide-footer="true"
    centered
    title="Proof of Payment Details"
    dialog-class="upload-proof-dialog px-4"
    modal-class="upload-proof-modal"
    ><b-form @submit.prevent="submit">
      <b-form-group
        id="bank-reference-label"
        label="Enter Bank reference if available:"
        label-for="bank-reference"
      >
        <b-form-input
          id="bank-reference"
          v-model="poc.bank_reference"
          type="text"
          number
          placeholder="Enter Bank reference if available"
        ></b-form-input>
      </b-form-group>
      <section class="bank-details c-rounded border-danger border p-4 my-3">
        <p class="text-danger">Account Number: 0033347558</p>
        <p class="text-danger">Account Name: Sabreworks</p>
        <p class="text-danger mb-0">Bank Name: United Bank for Africa (UBA)</p>
      </section>
      <upload-file
        v-if="form.name"
        :form="form"
        class="mb-3"
        @completed="updateImages"
      />
      <b-button type="submit" variant="dark">Upload payment</b-button>
    </b-form>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ProofOfPayment',
  components: {
    uploadFile: () => import('@/components/uploadFile'),
  },
  props: {
    form: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      poc: {
        amount: 0,
        proof_of_payment: '',
        bank_reference: '',
        product_sub_id: '',
        purpose: 'product_sub_payment',
      },
    }
  },
  watch: {
    form(val) {
      this.poc = { ...val }
    },
  },
  mounted() {
    this.poc = { ...this.form }
  },
  methods: {
    ...mapActions({
      uploadProof: 'fundRequests/create',
    }),
    updateImages(val) {
      this.poc.proof_of_payment = val.length && val[0]
    },
    async submit() {
      const loader = this.$loading.show()

      const payload = {
        ...this.poc,
      }
      if (!payload.bank_reference) {
        delete payload.bank_reference
      }
      if (!payload.product_sub_id) {
        delete payload.product_sub_id
      }
      try {
        await this.uploadProof(payload)
        loader.hide()
        this.$Toast.fire({
          icon: 'success',
          title:
            'Your payment proof was successfully uploaded, It will be approved shortly once the payment is confirmed',
        })
        this.$bvModal.hide('upload-proof')
        await this.$emit('completed', true)
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

<style scoped lang="scss">
.bank-details {
  background-color: #d811300d;
  p {
    font: {
      size: toRes(20);
    }
    line-height: toRes(25);
    letter-spacing: -0.2px;
  }
}
</style>
