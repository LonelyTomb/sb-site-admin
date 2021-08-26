<template>
  <div class="details-page">
    <b-row>
      <b-col cols="12" lg="10" class="mb-4">
        <div class="product-details-wrapper">
          <div class="product-details">
            <div class="d-flex flex-column">
              <h1 class="product-name py-2 py-lg-0">{{ product.name }}</h1>
              <p class="product-address d-flex align-items-center">
                <b-img fluid src="~svg/pin.svg" class="mr-2" />{{
                  product.address
                }}
              </p>
            </div>
            <p class="text-dark product-description mb-0 d-block d-lg-none">
              Description
            </p>
            <p class="text-dark product-description">
              {{ product.description }}
            </p>
          </div>
          <b-row class="prices">
            <b-col cols="6" lg="6">
              <div>
                <p class="price-type installment px-4 py-2">AMOUNT PAID</p>
              </div>
              <p class="price installment">
                <span>NGN</span>
                {{ formatAsMoney(calculatePrice(subscription.amount_paid)) }}
              </p>
            </b-col>
            <b-col cols="6" lg="6">
              <div>
                <p class="price-type outright px-4 py-2">Allocated Plots</p>
              </div>
              <p class="price outright">
                {{ subscription.units }} <span>Unit(s)</span>
              </p>
            </b-col>
          </b-row>
        </div>

        <div
          v-if="Number(subscription.amount_left) > 0"
          class="
            mt-4
            d-flex
            justify-content-end
            flex-column
            subscription-box
            px-3
            py-4
          "
        >
          <div class="">
            <h2 class="d-block">Continue Payment</h2>
            <div class="d-flex align-items-end flex-column">
              <div class="w-100">
                <b-form-group
                  :description="`Amount Left: ${formatAsMoney(
                    calculatePrice(subscription.amount_left)
                  )}`"
                  label="Enter Amount"
                  label-for="no-of-units"
                  class="text-dark"
                >
                  <b-form-input
                    id="amount left"
                    v-model="amount_left"
                    type="text"
                    class="amount-input"
                    number
                    trim
                  />
                </b-form-group>
              </div>

              <b-form-group
                label="Pay Via"
                label-for="payment-type"
                class="text-dark payment-method w-100"
              >
                <b-select
                  id="payment-type"
                  v-model="paymentMethod"
                  name="pay"
                  class="payment-method-select px-4"
                >
                  <option value="" disabled>Select Payment type</option>
                  <option
                    v-for="method in paymentMethods"
                    :key="method.key"
                    :value="method.key"
                  >
                    {{ method.title }}
                  </option>
                </b-select>
              </b-form-group>
            </div>
          </div>

          <BaseButton
            text="Pay Now"
            variant="green"
            :disable-button="amount_left < 1000 || !paymentMethod"
            @click.prevent="continuePayment"
          />
          <proof-of-payment :form="poc" @completed="closeModal" />
        </div>

        <div v-if="product.features.length" class="features mt-lg-5">
          <h4 class="my-4">Features</h4>
          <b-row class="list">
            <b-col
              v-for="feature in product.features"
              :key="feature"
              lg="4"
              md="12"
            >
              <p class="text-dark mb-4">{{ feature }}</p>
            </b-col>
          </b-row>
        </div>

        <div v-if="false" class="map-area mt-5">
          <h4>Map View</h4>

          <div class="map mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.365644558144!2d3.3019818149416125!3d6.601401024083862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b91af739f6ed7%3A0x2c8a1710d6125543!2sPertinence%20Group!5e0!3m2!1sen!2sng!4v1618338880530!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </b-col>
    </b-row>
    <div v-if="false" class="related">
      <h4 class="">You Might Like These</h4>
      <section class="properties-grid d-flex gap-4">
        <Property
          v-for="property in properties"
          :key="property"
          :property="property"
          half
        />
      </section>
    </div>
  </div>
</template>

<script>
import Property from '@/components/cards/Property'
import BaseButton from '@/components/BaseButton'
import { mapActions } from 'vuex'

const defaultData = {
  name: '',
  proof_of_payment: '',
  bank_reference: '',
  product_sub_id: '',
  purpose: 'product_sub_payment',
  amount: 0,
}
export default {
  name: 'SubscriptionDetails',
  components: {
    Property,
    BaseButton,
    ProofOfPayment: () => import('@/components/modals/ProofofPayment'),
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    purchased: {
      type: Boolean,
      required: false,
      default: false,
    },
    subscription: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      amount_left: 1000,
      poc: {
        ...defaultData,
      },
      paymentMethod: '',
      paymentMethods: [
        { key: 'wallet', title: 'Pay Via Wallet' },
        { key: 'paystack', title: 'Pay Via Card' },
        { key: 'fund_request', title: 'Upload Proof of Payment' },
      ],
    }
  },
  methods: {
    ...mapActions({
      fetchSubscription: 'product/subscription',
      subscribeToProduct: 'transactions/subscribeToProduct',
    }),
    async closeModal() {
      this.poc = { ...defaultData }
      await this.$Toast.fire({
        icon: 'success',
        title:
          'Your payment proof was successfully uploaded, It will be approved shortly once the payment is confirmed',
      })
      await this.fetchSubscription(this.$route.params.id)
    },
    calculatePrice(amount) {
      return this.$fromKobo(amount)
    },
    formatAsMoney(amount) {
      return new Intl.NumberFormat().format(amount)
    },
    async continuePayment() {
      const loader = this.$loading.show()

      const payload = {
        amount: this.$toKobo(this.amount_left),
        product_sub_id: this.subscription.id,
        callback_url: `${process.env.baseUrl}/customer/subscriptions/${this.subscription.id}`,
        payment_method: this.paymentMethod,
      }
      try {
        const response = await this.subscribeToProduct(payload)
        if (response.payload.paystackUrl) {
          window.location.assign(response.payload.paystackUrl)
        } else {
          loader.hide()
          if (payload.payment_method === 'fund_request') {
            this.poc = {
              ...this.poc,
              name: `subscription-${new Date().getTime()}-${
                this.subscription.id
              }`,
              product_sub_id: this.subscription.id,
              amount: payload.amount,
            }
            this.$bvModal.show('upload-proof')
          } else {
            await this.$Toast.fire({
              icon: 'success',
              title: 'Payment successful',
            })
            await this.fetchSubscription(this.$route.params.id)
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
.details-page {
  .location {
    span {
      font-size: 16px;
      font-weight: bold;
      opacity: 0.6;
      display: inline-block;
      margin-right: 14px;
    }
  }

  h4 {
    font-weight: 500;
    text-transform: uppercase;
    line-height: toRes(25);
    letter-spacing: -0.2px;
    font-size: toRes(20);

    @media screen and (max-width: 768px) {
      font-size: toRes(18);
      font-weight: 500;
    }
  }
  .product-details-wrapper {
    border-bottom: 1px solid rgba(#eaeaea, 0.1);
  }
  .product-details {
    .product-name {
      font-size: toRes(40);
    }
    .product-address {
      color: rgba($dark, 0.6);
      font: {
        size: toRes(20);
        weight: normal;
      }
      line-height: toRes(35);
      text-transform: uppercase;
      img {
        width: toRem(14);
        height: toRem(20);
      }
    }
    .product-description {
      color: var(--dark);
      font: {
        size: toRes(18);
        weight: normal;
      }
      line-height: toRes(35);
    }
  }
  .prices {
    .price-type {
      border-radius: toRem(21);
      font-size: toRem(12);
      line-height: toRem(15);
      letter-spacing: -0.24px;
      display: inline-block;
      &.outright {
        background-color: rgba(#3c0f59, 0.1);
        color: #3c0f59;
      }
      &.installment {
        background-color: rgba(#d95100, 0.1);
        color: #d95100;
      }
    }
    .price {
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
      @media screen and (max-width: 992px) {
        font: {
          size: toRem(30);
        }
        & > span {
          font: {
            size: toRes(20);
          }
        }
      }
      &.outright {
        color: #3c0f59;
      }
      &.installment {
        color: #d95100;
      }
    }
  }

  .features {
    .list {
      p {
        line-height: toRes(30);
        font-size: toRes(17);
        font-weight: 400;
      }
    }
  }

  .map-area {
    .map {
      height: 320px;
      @media screen and (max-width: 768px) {
        height: 220px;
      }
    }
  }

  .properties-grid {
    overflow-x: scroll;
  }

  .subscription-box {
    border-radius: 10px;
    box-shadow: 0 0 30px #090d7c0d;
    h2 {
      color: #3c0f59;
    }
    small.form-text {
      color: #d95100 !important;
    }
    .amount-input {
      border: 1.5px solid var(--dark);
      border-radius: toRem(10);
      height: auto;
      background: transparent;
    }
    .payment-method-select {
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
  }
  .purchase {
    .price {
      //   height: 140px;

      small {
        font-size: 13px;
        text-transform: uppercase;
      }

      h1 {
        font-weight: 500;
        font-size: 28px;
        font-family: $secondary-font;
      }

      .my-select {
        border: 1px solid #000;
      }

      #payment-plan {
        display: block;
        width: 100%;
        padding: 12px 0;
        border: none;
      }

      #payment-plan:focus {
        outline: none;
      }
    }
  }

  .badges {
    font-size: 15px;
    padding: 12px 30px;
    @media screen and (max-width: 768px) {
      font-size: 12px;
      padding: 12px 20px;
      margin-left: 10px;
    }
  }

  .danger {
    background: $danger;
  }

  .purple {
    background: $royal;
  }
}

.plus-icon {
  font-size: 30px;
  color: $primary;
}
</style>
