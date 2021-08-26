<template>
  <b-modal
    id="investment-modal"
    ref="investment-modal"
    class="investment-modal"
    hide-header
    centered
    hide-footer
    :no-close-on-backdrop="true"
    :no-close-on-esc="true"
    title="Large Modal"
    dialog-class="investment-dialog"
    modal-class="investment-modal"
  >
    <div class="investment-modal-wrapper p-4">
      <section class="d-flex align-items-center modal-title mb-4">
        <b-button
          variant="link"
          class="text-dark font-weight-bold p-0 mr-2"
          type="button"
          @click.prevent="hide"
        >
          <b-icon icon="chevron-left" />
        </b-button>
        <h4 class="mb-0">Sabreworks’ Investment</h4>
      </section>
      <section>
        <b-form class="investment-form">
          <b-row>
            <b-col cols="6">
              <b-form-group
                id="unit-label"
                label="No of Units"
                label-for="unit"
              >
                <b-form-input
                  id="unit"
                  v-model="form.units"
                  type="number"
                  min="1"
                  number
                  placeholder="No of Units"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6 mt-3">
              <small class="alt-label mb-4">Duration</small>
              <p class="alt-desc mb-0">36 Months</p>
            </b-col>
          </b-row>
          <b-row class="mb-5">
            <b-col cols="6 mt-3">
              <small class="alt-label mb-4">Amount Payable</small>
              <p class="alt-desc mb-0">NGN 350,000</p>
            </b-col>
            <b-col cols="6 mt-3">
              <small class="alt-label mb-4">Amount Payable</small>
              <p class="alt-desc mb-0">NGN 500,000</p>
            </b-col>
          </b-row>
          <b-row class="payment-row mb-5">
            <b-col cols="12">
              <p>Payment Method</p>
              <b-form-radio-group
                id="payment-methods"
                v-model="form.paymentMethod"
                class="payment-methods"
                :options="paymentMethods"
                name="paymentMethod"
                buttons
              ></b-form-radio-group>
            </b-col>
          </b-row>
          <b-button block variant="dark" class="py-3">Pay Now</b-button>
        </b-form>
      </section>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'PurchaseInvestment',
  components: {},
  data() {
    return {
      paymentMethods: [
        { value: 'wallet', text: 'Pay with Wallet' },
        { value: 'paystack', text: 'Pay with Card' },
        { value: 'fund_request', text: 'Upload Proof of Payment' },
      ],
      form: {
        units: 1,
        paymentMethod: 'wallet',
      },
    }
  },
  methods: {
    hide() {
      this.$refs['investment-modal'].hide()
    },
  },
}
</script>

<style lang="scss">
.investment-dialog {
  width: toRem(425);
}
.investment-modal {
  .investment-form {
    label {
      margin-bottom: 1rem;
    }
    label,
    .alt-label {
      color: rgba($dark, 0.6);
      font: {
        size: toRem(15);
      }
    }
    .alt-desc {
      font: {
        size: toRem(18);
        weight: bold;
      }
      line-height: toRem(23);
    }
    .payment-methods {
      display: block;
      .btn {
        border-radius: toRem(5);
        padding: toRes(12) toRes(25);
        background: {
          color: var(--white);
        }
        margin: {
          right: 1rem;
        }
        font: {
          size: toRem(13);
        }
        letter-spacing: toRem(-0.2);
        color: rgba($dark, 0.5);
        border: 1px solid rgba($dark, 0.5);
        &.active {
          color: rgba($dark, 1);
          border: 1px solid rgba($dark, 1);
          box-shadow: none;
        }
      }
    }
    .btn {
      font: {
        size: toRes(20);
      }
    }
  }
}
</style>
