<template>
  <div>
    <b-container fluid="xxxl" class="client-page">
      <b-row v-if="false" no-gutters class="mb-4">
        <b-col cols="12">
          <section class="d-flex flex-row range-filters gap-5">
            <b-dropdown id="dropdown-left" text="Custom Range" class="m-2">
              <b-dropdown-item>Action</b-dropdown-item>
              <b-dropdown-item>Another action</b-dropdown-item>
              <b-dropdown-item>Something else here</b-dropdown-item>
            </b-dropdown>
          </section>
        </b-col>
      </b-row>
      <b-row class="">
        <b-col
          v-for="(item, index) in cardData"
          :key="index"
          cols="12"
          lg="3"
          md="6"
          class="mb-4"
        >
          <stats-card :item="item" />
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Commissions',
  components: {
    SalesTable: () => import('@/components/tables/SalesTable'),
    StatsCard: () => import('@/components/cards/AltStatsCard'),
  },
  layout: 'admin',
  data() {
    return {
      pendingCount: {},
      onGoingCount: {},
      completedCount: {},
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
      dummyData: [
        {
          title: 'Total Sales',
          numeric: 4000,
          percentage: 40,
          icon: require('@/assets/images/svg/shop.svg'),
        },
      ],
    }
  },
  head() {
    return {
      title: 'Demo Company || Sales',
    }
  },
  computed: {
    ...mapGetters({
      subscriptions: 'product/subscriptions',
      subscriptionsCount: 'product/subscriptionsCount',
      productsSold: 'product/productsSold',
    }),
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
          title: 'Total Products Sold',
          numeric: `${this.totalProductsSold}`,
          percentage: 0,
          icon: require('@/assets/images/svg/shop.svg'),
        },
        {
          title: 'Completed Sales',
          numeric: `${this.completedCount.count || 0}`,
          percentage: 0,
          icon: require('@/assets/images/svg/check-border.svg'),
        },
        {
          title: 'Pending Sales',
          numeric: `${this.pendingCount.count || 0}`,
          percentage: 0,
          icon: require('@/assets/images/svg/doc-border.svg'),
        },
        {
          title: 'Ongoing Sales',
          numeric: `${this.onGoingCount.count || 0}`,
          percentage: 0,
          icon: require('@/assets/images/svg/activity-border.svg'),
        },
      ]
    },
  },
  async mounted() {
    const loader = this.$loading.show()
    try {
      await this.getProductsSold()
      await this.getSubscriptions()
      this.onGoingCount = {
        ...(await this.getSubscriptionsCount({
          status: 'on_going',
        })),
      }
      this.pendingCount = {
        ...(await this.getSubscriptionsCount({ status: 'paused' })),
      }
      this.completedCount = {
        ...(await this.getSubscriptionsCount({
          status: 'completed',
        })),
      }
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
      getTransactions: 'transactions/all',
      getProductsSold: 'product/productsSold',
      getSubscriptions: 'product/subscriptions',
      getSubscriptionsCount: 'product/subscriptionsCount',
      getProductCommissions: 'transactions/productCommissions',
      exportSubscriptions: 'product/subscriptionsExport',
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
.client-page {
  .range-filters {
    .btn {
      border: 1px solid var(--dark);
      background: {
        color: var(--white) !important;
      }
      a {
        color: var(--dark);
      }
    }
  }
}
</style>
