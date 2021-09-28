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
        <commissions-table
          v-if="commissions.rows"
          class="w-100"
          :items="commissions.rows"
          :pagination="commissions.paging"
          :fields="fields"
          @export="exportData"
          @search="searchData"
          @goToPage="loadData"
        >
        </commissions-table>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Commissions',
  components: {
    CommissionsTable: () => import('@/components/tables/CommissionsTable'),
    StatsCard: () => import('@/components/cards/StatsCard'),
  },
  layout: 'admin',
  data() {
    return {
      fields: [
        {
          key: 'fullname',
          label: 'Fullname',
        },
        {
          key: 'details',
          label: 'Details',
        },
        {
          key: 'value',
          label: 'Value',
        },
        {
          key: 'total_amount',
          label: 'Amount Payable',
        },
        {
          key: 'status',
        },
        {
          key: 'created_at',
          label: 'Completed At',
        },
      ],
      dummyData: [
        {
          title: 'Total Commissions',
          numeric: 4000,
          percentage: 40,
          icon: require('@/assets/images/svg/percentage.svg'),
        },
      ],
    }
  },
  head() {
    return {
      title: 'Sabreworks || Commissions',
    }
  },
  computed: {
    ...mapGetters({
      commissions: 'transactions/all',
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
          title: 'Total Commissions',
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
      getTransactions: 'transactions/all',
      getProductCommissions: 'transactions/productCommissions',
      exportTransaction: 'transactions/export',
    }),
    async loadData(e) {
      const loader = this.$loading.show()
      try {
        await this.getTransactions({ page: e, type: 'commission' })
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
        const res = await this.exportTransaction({ type: 'commission' })
        this.saveAsCSV('commissions', res)
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
        await this.getTransactions({ search: val, type: 'commission' })
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
