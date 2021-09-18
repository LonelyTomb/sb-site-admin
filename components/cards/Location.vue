<template>
  <b-container class="property-card mb-4 px-0 rounded overflow-hidden" fluid>
    <b-row no-gutters>
      <b-col cols="12">
        <b-img-lazy
          class="property-image"
          :src="(property.images.length && property.images[0]) || defaultImage"
          :alt="property.name"
          fluid-grow
        />
      </b-col>
      <b-col cols="12">
        <div class="d-flex flex-column justify-content-between h-100 p-4">
          <div class="property-info d-flex flex-column gap-2">
            <div class="property-name mb-3">
              <p class="mb-0">{{ property.name }}</p>
              <b-badge pill variant="secondary" class="py-1">
                {{ property.total_units - property.available_units }} Plot(s)
                Sold</b-badge
              >
            </div>
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
            <p class="property-price mb-0">
              NGN
              {{
                new Intl.NumberFormat().format($fromKobo(property.unit_price))
              }}
            </p>
          </div>
          <div>
            <p class="last-update-time mb-0">
              {{ property.updated_at | luxon }}
            </p>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: 'LocationCard',
  props: {
    property: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultImage: require('@/assets/images/png/property.png'),
    }
  },
}
</script>
<style lang="scss" scoped>
.property-card {
  box-shadow: 0 0 30px #090d7c0d;
  //min-width: toRes(650);
  border-radius: 10px !important;

  @media screen and (max-width: 992px) {
    min-width: toRem(300);
  }
  background: {
    color: var(--white);
  }
  .property-info {
    @media screen and (max-width: 992px) {
      gap: 0;
    }
  }
  .property-image {
    width: toRes(330);
    height: toRes(232);
    object-fit: cover;
    object-position: center;
    @media screen and (max-width: 992px) {
      width: toRem(119);
      height: toRem(120);
    }
  }
  .property-name {
    display: flex;
    justify-content: space-between;
    p {
      color: var(--dark);
      font: {
        size: toRes(20);
        weight: 500;
      }
      line-height: toRes(29);
      @media screen and (max-width: 992px) {
        font: {
          size: toRem(11);
        }
      }
    }
  }

  .property-location {
    color: rgba($dark, 0.6);
    font: {
      size: toRes(20);
    }
    line-height: toRes(29);
    @media screen and (max-width: 992px) {
      font: {
        size: toRem(12);
      }
    }
  }

  .property-price {
    color: var(--dark);
    font: {
      size: toRes(25);
      weight: 700;
    }
    line-height: toRes(29);
    @media screen and (max-width: 992px) {
      font: {
        size: toRem(15);
      }
    }
  }

  .last-update-time {
    color: rgba($dark, 0.4);
    letter-spacing: -0.3;
    font: {
      size: toRes(15);
    }
    @media screen and (max-width: 992px) {
      font: {
        size: toRem(8);
      }
    }
  }
}
</style>
