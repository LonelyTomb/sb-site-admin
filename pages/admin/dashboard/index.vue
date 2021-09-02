<template>
  <b-container fluid class="admin-dashboard">
    <b-row v-if="false" no-gutters class="mb-5">
      <b-col cols="12">
        <section class="d-flex flex-row range-filters gap-5">
          <b-dropdown
            id="dropdown-left"
            text="Custom Range"
            class="m-2"
            variant="link"
          >
            <b-dropdown-item>Action</b-dropdown-item>
            <b-dropdown-item>Another action</b-dropdown-item>
            <b-dropdown-item>Something else here</b-dropdown-item>
          </b-dropdown>
          <p class="d-flex px-3 py-2 bg-white rounded my-2 gap-3">
            <b-img src="~svg/calendar_1.svg" fluid />
            1st Jan, 2020 - 30th Jan, 2021
          </p>
        </section>
      </b-col>
    </b-row>
    <b-row class="mb-5">
      <b-col
        v-for="(item, index) in cardData"
        :key="index"
        cols="12"
        lg="3"
        md="6"
        class="mb-4"
      >
        <nuxt-link
          :to="{ name: item.route }"
          class="text-decoration-none text-dark"
        >
          <stats-card :item="item" />
        </nuxt-link>
      </b-col>
    </b-row>
    <b-row v-if="false" class="details-row">
      <b-col col>
        <div
          class="
            bg-white
            p-3
            rounded
            details-card
            d-flex
            flex-column
            justify-content-between
          "
        >
          <div>
            <p class="mb-5 font-weight-bold">Best Selling</p>
            <p class="detail-card-header">Lakowe Golf</p>
            <p class="opacity-60 font-weight-bold">₦5,000,000</p>
          </div>

          <div>
            <a class="d-flex justify-content-between opacity-60" href="#"
              >View More
              <b-img src="~svg/arrow 1.svg" />
            </a>
          </div>
        </div>
      </b-col>
      <b-col col>
        <div
          class="
            bg-white
            p-3
            rounded
            details-card
            d-flex
            flex-column
            justify-content-between
          "
        >
          <div>
            <p class="mb-5">Least Selling</p>
            <p>Lakowe Golf</p>
            <p>₦5,000,000</p>
          </div>

          <div>
            <a class="d-flex justify-content-between" href="#"
              >View More
              <b-img src="~svg/arrow 1.svg" />
            </a>
          </div>
        </div>
      </b-col>
      <b-col col>
        <div class="bg-white p-3 rounded details-card">
          <div>
            <p class="mb-5">Most Plots Sold</p>
            <div>
              <p>Lakowe Golf</p>
              <p>Tincan Island</p>
              <p>Ogbomosho</p>
              <p>Lekki Penisula</p>
              <p>Eko Atlantic City</p>
            </div>
          </div>
        </div>
      </b-col>
      <b-col col>
        <div class="bg-white p-3 rounded details-card">
          <div>
            <p class="mb-5">Most Plots Sold</p>
            <div>
              <p>Lakowe Golf</p>
              <p>Tincan Island</p>
              <p>Ogbomosho</p>
              <p>Lekki Penisula</p>
              <p>Eko Atlantic City</p>
            </div>
          </div>
        </div>
      </b-col>
      <b-col col>
        <div
          class="
            p-3
            rounded
            d-flex
            align-items-center
            justify-content-center
            add-more-card
          "
        >
          <b-img src="~svg/plus_border.svg" />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AdminDashboard',
  components: {
    StatsCard: () => import('@/components/cards/StatsCard'),
  },
  layout: 'admin',
  data() {
    return {}
  },
  head() {
    return {
      title: 'Sabreworks || Dashboard',
    }
  },
  computed: {
    ...mapGetters({
      customerCount: 'customer/count',
      realtorCount: 'realtor/count',
      productCommissions: 'transactions/productCommissions',
    }),
    totalCommission() {
      return this.productCommissions.length
        ? this.productCommissions.reduce(
            (acc, current) => acc + Number(current.total_commissions_paid),
            0
          )
        : 0
    },
    cardData() {
      return [
        {
          title: 'Total Clients',
          route: 'admin-clients',
          numeric: this.customerCount,
          percentage: 0,
          icon: require('@/assets/images/svg/Group 2.svg'),
        },
        {
          title: 'Total Realtors',
          route: 'admin-realtors',
          numeric: this.realtorCount,
          percentage: 0,
          icon: require('@/assets/images/svg/Group 2.svg'),
        },
        {
          title: 'Total Commissions',
          route: 'admin-commissions',
          numeric: `N${this.$formatAsMoney(
            this.$fromKobo(this.totalCommission)
          )}`,
          percentage: 0,
          icon: require('@/assets/images/svg/percentage.svg'),
        },
      ]
    },
  },
  async mounted() {
    const loader = this.$loading.show()
    try {
      await this.getCustomerCount()
      await this.getProductCommissions()
      await this.getRealtorCount()
      loader.hide()
    } catch (e) {
      this.$Toast.fire({ icon: 'error', title: this.$formatError(e) })
    }
  },
  methods: {
    ...mapActions({
      getCustomerCount: 'customer/count',
      getRealtorCount: 'realtor/count',
      totalCommissions: 'customer/totalCommissions',
      getProductCommissions: 'transactions/productCommissions',
    }),
  },
}
</script>
<style lang="scss">
.admin-dashboard {
  .range-filters {
    .btn {
      background: {
        color: var(--white);
      }
    }
  }

  .stats-card {
    border-radius: 10px;
    padding: toRem(30);
  }
  .details-row {
    .details-card,
    .add-more-card {
      height: 100%;
    }

    .add-more-card {
      background: transparent;
      border: 1px dashed rgba($black, 0.4);
      overflow: hidden;

      filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.08));
    }
  }

  .stat-header {
    font-size: toRes(35);
    display: flex;
    gap: 0.5rem;
    align-items: end;
    font-weight: 700;
    // position: relative;
  }

  .stat-change-rate {
    // position: absolute;
    // top: 2%;
    // right: -65%;
    font-weight: 600;
    color: var(--good);
    font-size: toRes(18);
  }

  .negative-stat {
    color: var(--bad);
  }

  .stat-detail {
    margin-bottom: 0;
    font-weight: 500;
    opacity: 0.7;
  }

  .detail-card-header {
    font-size: toRes(40);
    font-weight: 500;
  }

  .opacity-60 {
    // font-weight: 500;
    opacity: 0.6;
  }
}
</style>
