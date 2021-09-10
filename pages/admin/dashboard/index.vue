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
          :to="{ name: item.link }"
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

          <div class="opacity-60">
            <a href="#"
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
    <b-row class="px-3">
      <sales-table
        v-if="subscriptions.rows"
        class="w-100"
        :items="subscriptions.rows"
        :pagination="subscriptions.paging"
        :fields="fields"
        @export="exportData"
        @search="searchData"
        @goToPage="loadData"
      >
      </sales-table>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AdminDashboard',
  components: {
    SalesTable: () => import('@/components/tables/SalesTable'),
    StatsCard: () => import('@/components/cards/AltStatsCard'),
  },
  layout: 'admin',
  data() {
    return {
      fields: [
        {
          key: 'check',
        },
        {
          key: 'client',
          label: 'Client',
        },
        // {
        //   key: 'referrer',
        //   label: 'Referrer',
        // },
        {
          key: 'sales',
          label: 'Sales',
        },
        {
          key: 'date',
          label: 'Date',
        },
        {
          key: 'total_amount',
          label: 'Total Price',
        },
        {
          key: 'amount_paid',
          label: 'Amount Paid',
        },
        {
          key: 'status',
        },
      ],
    }
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
      subscriptions: 'product/subscriptions',
      subscriptionsCount: 'product/subscriptionsCount',
      productCommissions: 'transactions/productCommissions',
      productsSold: 'product/productsSold',
    }),
    totalCommission() {
      return this.productCommissions.length
        ? this.productCommissions.reduce(
            (acc, current) => acc + Number(current.total_commissions_paid),
            0
          )
        : 0
    },
    totalProductsSold() {
      return this.productsSold.length
        ? this.productsSold.reduce(
            (acc, current) => acc + Number(current.total_units_sold),
            0
          )
        : 0
    },
    cardData() {
      return [
        {
          title: 'Total Clients',
          numeric: `${this.customerCount || 0}`,
          percentage: 0,
          icon: require('@/assets/images/svg/Group 2.svg'),
          link: 'admin-clients',
        },
        {
          title: 'Total Realtors',
          numeric: `${this.realtorCount || 0}`,
          percentage: 0,
          icon: require('@/assets/images/svg/Group 2 (1).svg'),
          link: 'admin-realtors',
        },
        {
          title: 'Total Products Sold',
          numeric: `${this.totalProductsSold}`,
          percentage: 0,
          icon: require('@/assets/images/svg/shop.svg'),
          link: 'admin-sales',
        },
        {
          title: 'Total Commissions',
          numeric: `N${this.$formatAsMoney(
            this.$fromKobo(this.totalCommission)
          )}`,
          percentage: 0,
          icon: require('@/assets/images/svg/percentage.svg'),
          link: 'admin-commissions',
        },
      ]
    },
  },
  async mounted() {
    const loader = this.$loading.show()
    try {
      await this.getCustomerCount({ is_realtor: false })
      await this.getRealtorCount()
      await this.getSubscriptions()
      await this.getTransactions({ type: 'commission' })
      await this.getProductCommissions()

      loader.hide()
    } catch (e) {
      loader.hide()
      await this.$Toast.fire({
        icon: 'error',
        title: this.$formatError(e),
      })
    }
  },
  methods: {
    ...mapActions({
      getCustomerCount: 'customer/count',
      getRealtorCount: 'realtor/count',
      getSubscriptions: 'product/subscriptions',
      getProductsSold: 'product/productsSold',
      getProductCommissions: 'transactions/productCommissions',
      getTransactions: 'transactions/all',
    }),
    async loadData(e) {
      const loader = this.$loading.show()
      try {
        await this.getSubscriptions({ page: e })
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
        loader.hide()
      } catch (e) {
        loader.hide()
        await this.$Toast.fire({
          icon: 'error',
          title: this.$formatError(e),
        })
      }
    },
    saveAsCSV(filename, data) {
      const hiddenElement = document.createElement('a')
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(data)
      hiddenElement.target = '_blank'
      hiddenElement.download = `${filename}.csv`
      hiddenElement.click()
    },
    async exportData() {
      const loader = this.$loading.show()
      try {
        const res = await this.exportSubscriptions()
        this.saveAsCSV('sales', res)
        loader.hide()
      } catch (e) {
        loader.hide()
        await this.$Toast.fire({
          icon: 'error',
          title: this.$formatError(e),
        })
      }
    },
    async searchData(val) {
      const loader = this.$loading.show()
      try {
        await this.getSubscriptions({ search: val })
        loader.hide()
      } catch (e) {
        loader.hide()
        await this.$formatError(e)
      }
    },
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
