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
            <b-col cols="12" lg="6">
              <div>
                <p class="price-type outright px-4 py-2">PRICE</p>
              </div>
              <p class="price outright">
                <span>NGN</span>
                {{
                  formatAsMoney(
                    calculatePrice(getPlanType('out_right')[0].amount_per_unit)
                  )
                }}
              </p>
            </b-col>
          </b-row>
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
        <BaseButton
          v-b-modal.modal-lg
          text="Buy Now"
          variant="primary"
          class="d-lg-none d-block mobile-btn"
        />
      </b-col>
      <b-col cols="12" lg="10" class="d-lg-block d-none">
        <div v-if="!purchased && product.payment_plans.length" class="">
          <b-button
            v-if="plan"
            type="button"
            variant="primary"
            class="
              py-3
              text-white
              w-75
              d-flex
              align-items-center
              justify-content-center
            "
            @click.prevent="topplePurchaseModal()"
            >Buy Now
            <b-img
              src="@/assets/images/svg/btn-arrow.svg"
              alt=""
              class="btn-icon ml-2"
            />
          </b-button>
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
    <PurchasModal
      v-if="product && plan"
      :plan="plan"
      :product="product"
      :units="units"
    />
  </div>
</template>

<script>
import Property from '@/components/cards/Property'
// import BaseSwitch from '@/components/BaseSwitch'
import BaseButton from '@/components/BaseButton'
import PurchasModal from '@/components/modals/PurchasModal'

export default {
  components: {
    Property,
    // BaseSwitch,
    PurchasModal,
    BaseButton,
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
  },
  data() {
    return {
      installmental: false,
      units: 1,
      planId: '',
      plan: null,
      minUnits: 1,
    }
  },
  watch: {
    planId(val) {
      this.plan = val
        ? this.product.payment_plans.filter(
            (item) => item.id === val && item.is_active
          )[0]
        : this.getPlanType('out_right')[0]
    },
  },
  mounted() {
    this.plan = this.getPlanType('out_right')[0]
  },
  methods: {
    toggleInstallmental(val) {
      this.installmental = val
      this.planId = this.installmental ? this.planId : ''
    },
    getPlanType(type) {
      return this.product.payment_plans.filter(
        (item) => item.type === type && item.is_active
      )
    },
    topplePurchaseModal() {
      if (this.installmental && this.planId === '') {
        this.$Toast.fire({ icon: 'warning', title: 'Select number of months!' })
        return false
      }
      this.$bvModal.show('modal-lg')
    },
    calculatePrice(amount) {
      return this.$fromKobo(this.units * amount)
    },
    formatAsMoney(amount) {
      return new Intl.NumberFormat().format(amount)
    },
  },
}
</script>

<style lang="scss" scoped>
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
