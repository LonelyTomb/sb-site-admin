<template>
  <div class="purchase-modal-container">
    <b-modal
      id="modal-lg"
      ref="modal-lg"
      class="purchase-modal"
      hide-header
      hide-footer
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      title="Large Modal"
      dialog-class="purchase-dialog"
      modal-class="purchase-modal"
      body-class="p-4"
    >
      <div class="d-flex mb-4 px-lg-0 px-3">
        <b-img
          src="@/assets/images/svg/forward-icon.svg"
          class="mr-3 back-arrow"
          alt=""
          @click="closeModal"
        />
      </div>

      <b-row class="">
        <b-col cols="12">
          <p class="modal-title">Purchase Details</p>
          <div class="d-lg-flex pd-lg-0">
            <div
              class="
                p-card
                d-flex
                flex-column
                justify-content-between
                p-4
                c-rounded
                w-100
                mb-4
              "
            >
              <span>Amount Payable</span>
              <h1>
                <span class="text-white">NGN</span
                >{{
                  formatAsMoney(
                    calculatePrice(
                      mobilePlan.amount_per_unit || plan.amount_per_unit
                    )
                  )
                }}
              </h1>
              <small
                v-if="
                  mobile_payment_plan === 'installment' &&
                  mobilePlan.minimun_deposit_amount
                "
                class="d-block"
              >
                Initial Deposit:

                <span class="text-white">NGN</span>

                {{
                  formatAsMoney(
                    calculatePrice(mobilePlan.minimun_deposit_amount)
                  )
                }}
              </small>
            </div>
          </div>
          <div class="d-block">
            <div class="mobile-view mx-2 mobile-units-input">
              <b-form-group
                :description="`Units available: ${product.total_units}`"
                label="No of Units"
                label-for="no-of-units"
                class="text-dark"
              >
                <b-form-input
                  id="no-of-units"
                  v-model="mobileUnits"
                  type="number"
                  :max="product.total_units"
                  :min="minUnits"
                  number
                  class="bg-white py-3 px-4 mb-3 c-rounded"
                  trim
                />
              </b-form-group>
            </div>
            <div class="mobile-view">
              <div class="my-select mx-2 bg-white py-2 mb-3">
                <b-select
                  v-model="mobile_payment_plan"
                  class="payment-plan px-4"
                  name="pay"
                >
                  <b-select-option value=""
                    >Select Payment Type</b-select-option
                  >
                  <b-select-option value="out_right"
                    >Outright Payment</b-select-option
                  >
                  <b-select-option value="installment"
                    >Installment Payment</b-select-option
                  >
                </b-select>
              </div>
            </div>
            <div
              v-if="mobile_payment_plan === 'installment'"
              class="mobile-view"
            >
              <div class="my-select mx-2 bg-white py-2 mb-3">
                <b-select
                  v-model="planId"
                  class="payment-plan px-4"
                  name="payment_plans"
                >
                  <b-select-option value="">Select Duration</b-select-option>
                  <b-select-option
                    v-for="payment_plan in getPlanType('installment')"
                    :key="payment_plan.id"
                    :value="payment_plan.id"
                  >
                    {{ payment_plan.duration }} Months
                  </b-select-option>
                </b-select>
              </div>
            </div>
            <div class="mobile-view">
              <div class="my-select mx-2 bg-white py-2 mb-3">
                <b-select
                  v-model="paymentMethod"
                  class="payment-plan px-4"
                  name="pay"
                >
                  <b-select-option
                    v-for="method in paymentMethods"
                    :key="method.key"
                    :value="method.key"
                  >
                    {{ method.title }}
                  </b-select-option>
                </b-select>
              </div>
            </div>
            <b-card no-body class="mx-2 mb-5 p-1">
              <b-card-header header-tag="header" class="" role="tab">
                <div
                  v-b-toggle.accordion-2
                  block
                  class="
                    collapse-control
                    d-flex
                    justify-content-between
                    align-items-center
                    px-2
                    py-2
                  "
                >
                  <p class="mb-0">Terms and Conditions</p>
                  <b-icon
                    icon="caret-down-fill"
                    class="mr-2 search-icon"
                  ></b-icon>
                </div>
              </b-card-header>
              <b-collapse
                id="accordion-2"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body>
                  <b-card-text>
                    <Terms />
                  </b-card-text>
                  <div class="mt-4">
                    <input
                      id="styled-checkbox-2"
                      v-model="agreed"
                      type="checkbox"
                      class="styled-checkbox"
                    />
                    <label for="styled-checkbox-2"
                      >Agree to our Terms and Conditions</label
                    >
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>

            <BaseButton
              v-if="paymentMethod !== 'fund_request'"
              v-b-modal.modal-lg
              :text="'Pay Now Via ' + paymentMethod"
              variant="dark"
              class="d-block mobile-btn"
              :disable-button="!agreed || !paymentMethod"
              @click.prevent="subscribeToProduct"
            />
            <BaseButton
              v-else
              v-b-modal.modal-lg
              :disable-button="!agreed || !paymentMethod"
              text="Proceed"
              variant="dark"
              class="d-block mobile-btn"
              @click.prevent="subscribeToProduct"
            />
          </div>
        </b-col>
      </b-row>
      <proof-of-payment :form="poc" @completed="completePayment" />
    </b-modal>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import { mapActions } from 'vuex'
import Terms from './Terms'

export default {
  components: {
    BaseButton,
    Terms,
    ProofOfPayment: () => import('@/components/modals/ProofofPayment'),
  },
  props: {
    plan: {
      type: Object,
      required: true,
    },
    product: {
      type: Object,
      required: true,
    },
    units: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      poc: {
        name: '',
        proof_of_payment: '',
        bank_reference: '',
        product_sub_id: '',
        purpose: 'product_sub_payment',
        amount: 0,
      },
      paymentMethods: [
        { key: 'wallet', title: 'Pay Via Wallet' },
        { key: 'paystack', title: 'Pay Via Card' },
        { key: 'fund_request', title: 'Upload Proof of Payment' },
      ],
      paymentMethod: 'wallet',
      mobile_payment_plan: '',
      planId: '',
      mobilePlan: {},
      mobileUnits: 1,
      minUnits: 1,
      agreed: false,
    }
  },
  watch: {
    planId(val) {
      this.mobilePlan = val
        ? this.product.payment_plans.filter(
            (item) => item.id === val && item.is_active
          )[0]
        : this.getPlanType('out_right')[0]
    },
    mobile_payment_plan(val) {
      if (val === 'out_right') {
        this.mobilePlan = { ...this.plan }
      }
    },
    units(val) {
      this.mobileUnits = val
    },
  },
  mounted() {},
  methods: {
    ...mapActions({
      subscribe: 'product/subscribe',
    }),
    closeModal() {
      this.$refs['modal-lg'].hide()
    },
    completePayment() {
      this.closeModal()
      this.$router.push({ name: 'customer-subscriptions' })
    },
    getPlanType(type) {
      return this.product.payment_plans.filter(
        (item) => item.type === type && item.is_active
      )
    },
    calculatePrice(amount) {
      const newPrice =
        this.units < this.mobileUnits
          ? this.mobileUnits * amount
          : this.units * amount
      return this.$fromKobo(newPrice)
    },
    formatAsMoney(amount) {
      return new Intl.NumberFormat().format(amount)
    },
    async subscribeToProduct() {
      const loader = this.$loading.show()
      const actualPrice = this.calculatePrice(
        this.mobilePlan.minimun_deposit_amount ||
          this.plan.minimun_deposit_amount
      )
      const payload = {
        units: this.mobileUnits || this.units,
        initial_payment_amount: Number(this.$toKobo(actualPrice)),
        product_id: this.product.id,
        payment_plan_id: this.mobilePlan.id || this.plan.id,
        callback_url: `${process.env.baseUrl}/customer/subscriptions`,
        payment_method: this.paymentMethod,
      }
      try {
        const response = await this.subscribe(payload)
        if (response.payload.paystackUrl) {
          window.location.assign(response.payload.paystackUrl)
        } else {
          loader.hide()

          if (payload.payment_method === 'fund_request') {
            this.poc = {
              ...this.poc,
              name: `subscription-${response.payload.createdSubscription.id}`,
              product_sub_id: response.payload.createdSubscription.id,
              amount: payload.initial_payment_amount,
            }
            this.$bvModal.show('upload-proof')
          } else {
            await this.$Toast.fire({
              icon: 'success',
              title: 'Purchase successful',
            })
            this.$bvModal.hide('modal-lg')
            await this.$router.push({ name: 'customer-subscriptions' })
          }
        }
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

<style lang="scss">
.purchase-dialog {
  // background-color: black !important;
  .back-arrow {
    filter: invert(1);
    transform: rotate(180deg);
    width: toRes(40);
    height: toRes(40);
  }
  .modal-title {
    font: {
      size: toRes(25);
      weight: 500;
    }
    line-height: toRes(55);
  }
  .p-card {
    min-height: toRes(164);
    background: {
      color: var(--dark);
    }
    span {
      text-transform: uppercase;
      font: {
        size: toRem(15);
        weight: 500;
      }
      line-height: toRes(55);
      color: rgba($white, 0.5);
    }
    h1 {
      text-transform: uppercase;
      color: var(--white);
      font: {
        size: toRes(35);
        weight: 700;
      }
      line-height: toRes(48);
      & > span {
        font: {
          size: toRes(25);
        }
      }
    }

    small {
      color: var(--white);
      font: {
        size: toRes(20);
        weight: 700;
      }
      line-height: toRes(38);
      & > span {
        font: {
          size: toRes(15);
        }
      }
    }
  }

  .breakdown-card {
    h1 {
      font-size: toRem(20);
    }
  }

  .payment-method {
    padding: 20px 60px !important;

    select {
      font-size: 18px;

      span {
        font-weight: bold !important;
      }
    }
  }

  .mobile-units-input {
    & input {
      border: 1.5px solid var(--dark);
      border-radius: toRem(10);
      height: auto;
    }
  }

  .payment-plan {
    display: block;
    width: 100%;
    height: auto;
    padding: 12px 0;
    border: 1.5px solid var(--dark);
    border-radius: toRem(10);
    background: {
      image: url('~assets/images/svg/chevron-down.svg');
      position: right/1.75rem center/8px;
      size: 10px;
      repeat: no-repeat;
    }
  }

  .payment-plan:focus {
    outline: none;
  }

  .terms {
    h4 {
      font-size: 19px;
      font-weight: 800;
      text-transform: uppercase;
    }

    p {
      font-size: 15px;
      color: #000;
    }
  }

  .styled-checkbox {
    opacity: 0; // hide it
    position: absolute;

    & + label {
      position: relative;
      cursor: pointer;
      padding: 0;
      font-size: 15px;
      font-weight: 600;
    }

    // Box.
    & + label:before {
      content: '';
      margin-right: 10px;
      display: inline-block;
      vertical-align: text-top;
      width: 20px;
      height: 20px;
      background: white;
      border: 1px solid #000;
      padding: 5px;
    }

    // Box hover
    label:before {
      background: #000000;
    }

    // Box focus
    &:focus + label:before {
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
    }

    // Box checked
    &:checked + label:before {
      background: #000000;
    }
  }

  .collapse-control {
    background: #fff;
  }

  .card-header {
    background-color: transparent;
    border-bottom: none;
  }

  .pay-btn {
    bottom: 0;
    width: 92%;
    button {
      text-transform: capitalize;
    }
  }
}
</style>
