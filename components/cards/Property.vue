<template>
  <b-container class="px-4 pt-4 pb-3 property-card mb-4 mx-0" fluid>
    <b-row>
      <b-col cols="12">
        <nuxt-link
          :to="`/customer/${
            subscription && subscription.id ? 'subscriptions' : 'properties'
          }/${subscription.id || property.id}`"
          class="text-decoration-none"
        >
          <b-img-lazy
            class="property-image mb-3"
            :src="property.images.length && property.images[0]"
            :alt="property.name"
            fluid-grow
          />
        </nuxt-link>
      </b-col>
      <b-col cols="12">
        <div class="d-flex flex-column justify-content-between h-100">
          <div class="property-info d-flex flex-column gap-2">
            <b-select
              v-if="!purchased"
              id="select-payment"
              v-model="paymentMethod"
              text="Filter By"
              class="select-payment w-50 text-white btn btn-secondary py-2"
            >
              <b-select-option value="outright" selected
                >OUTRIGHT PRICE</b-select-option
              >
              <b-select-option value="installment"
                >INSTALLMENT PRICE</b-select-option
              >
            </b-select>
            <p v-if="!purchased" class="property-price pt-3 pb-4 mb-0">
              <span>NGN</span>
              {{
                new Intl.NumberFormat().format($fromKobo(property.unit_price))
              }}
            </p>
            <div
              class="d-flex flex-row justify-content-between align-items-center"
            >
              <nuxt-link
                :to="`/customer/${
                  subscription && subscription.id
                    ? 'subscriptions'
                    : 'properties'
                }/${subscription.id || property.id}`"
                class="text-decoration-none"
              >
                <div
                  class="
                    d-flex
                    flex-row
                    justify-content-start
                    text-truncate
                    align-items-center
                  "
                >
                  <p class="property-name mb-0">{{ property.name }}</p>
                  <span class="mx-1 divider">|</span>
                  <p
                    class="
                      property-location
                      mb-0
                      d-inline-block d-lg-block
                      text-truncate
                    "
                  >
                    {{ property.address }}
                  </p>
                </div>
              </nuxt-link>
              <p v-if="!purchased" class="property-units mb-0">
                {{ property.available_units }} UNIT(S)
              </p>
            </div>
          </div>
          <div
            v-if="subscription.status"
            class="d-flex flex-row justify-content-between"
          >
            <p class="last-update-time mb-0 text-capitalize">
              {{ subscription.status.replace('_', ' ') }}
            </p>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  props: {
    property: {
      type: Object,
      required: true,
    },
    subscription: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    purchased: {
      type: Boolean,
      required: false,
      default: false,
    },
    half: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      paymentMethod: 'outright',
    }
  },
}
</script>
<style lang="scss" scoped>
.property-card {
  box-shadow: 0 0 30px #090d7c0d;
  //min-width: toRem(300);
  //width: toRem(300);
  border-radius: toRem(10);

  @media screen and (max-width: 992px) {
    min-width: toRem(300);
  }
  background: {
    image: linear-gradient(180deg, #fafbff60 0%, var(--white) 100%);
  }
  .select-payment {
    border: none;
    height: auto;
    background: {
      color: var(--secondary);
      image: url('~assets/images/svg/chevron-down-white.svg');
      position: right 0.75rem center/8px;
      size: 10px;
      repeat: no-repeat;
    }
    border-radius: toRem(5);
    font: {
      size: toRem(11);
      weight: 500;
    }
    letter-spacing: toRes((-0.22));
    &:focus {
      box-shadow: none;
    }
  }
  .property-info {
    @media screen and (max-width: 992px) {
      gap: 0;
    }
  }
  .property-image {
    //width: 95%;
    height: toRem(200);
    object-fit: cover;
    object-position: center;
    border-radius: toRem(10);
    @media screen and (max-width: 992px) {
      width: 95%;
      height: toRem(200);
    }
  }

  .property-name,
  .property-location,
  .divider,
  .property-units {
    color: rgba($dark, 0.5);
    font: {
      size: toRem(15);
    }
    line-height: toRem(30);
    letter-spacing: toRem(-0.3);
    @media screen and (max-width: 992px) {
      font: {
        size: toRem(12);
      }
    }
  }

  .property-name {
    color: rgba($dark, 0.6);
  }

  .property-price {
    color: var(--dark);
    font: {
      size: toRes(35);
      weight: 700;
    }
    line-height: toRes(29);
    border-bottom: 1px solid rgba($gray, 0.1);
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
  }

  .last-update-time {
    color: rgba($dark, 0.4);
    letter-spacing: -0.3;
    font: {
      size: toRem(15);
    }
    @media screen and (max-width: 992px) {
      font: {
        size: toRem(8);
      }
    }
  }
}
</style>
