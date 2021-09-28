<template>
  <b-container fluid class="admin-dashboard">
    <b-row class="mb-5">
      <b-col cols="12" lg="3">
        <nuxt-link
          :to="{ name: 'admin-payments-pendings' }"
          class="text-decoration-none text-dark"
        >
          <div class="stats-card bg-white">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <p class="stat-header">{{ fundRequestCount }}</p>
                <p class="stat-detail">Pending Approval</p>
              </div>
              <div>
                <b-img src="~svg/Group 2 (1).svg" fluid />
              </div>
            </div>
          </div>
        </nuxt-link>
      </b-col>
      <b-col cols="12" lg="3">
        <nuxt-link
          :to="{ name: 'admin-payments-withdrawals' }"
          class="text-decoration-none text-dark"
        >
          <div class="stats-card bg-white">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <p class="stat-header">{{ withdrawalsCount }}</p>
                <p class="stat-detail">Withdrawals</p>
              </div>
              <div>
                <b-img src="~svg/Group 2 (1).svg" fluid />
              </div>
            </div>
          </div>
        </nuxt-link>
      </b-col>
      <b-col cols="12" lg="3">
        <div class="stats-card bg-white">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <p class="stat-header">0</p>
              <p class="stat-detail">Payment Defaults</p>
            </div>
            <div>
              <b-img src="~svg/Group 2 (2).svg" fluid />
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="px-3">
      <transactions-table
        v-if="transactions.rows"
        class="w-100"
        :items="transactions.rows"
        :pagination="transactions.paging"
        :fields="fields"
        @export="exportData"
        @search="searchData"
        @goToPage="loadData"
      />
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Payments',
  components: {
    TransactionsTable: () => import('@/components/tables/TransactionsTable'),
  },
  layout: 'admin',
  data() {
    return {
      fields: [
        'client',
        { key: 'total_amount', label: 'Total amount' },
        { key: 'type', label: 'Payment Type' },
        { key: 'channel', label: 'Payment Channel' },
        { key: 'position', label: 'Transaction Type' },
        { key: 'created_at', label: 'Date' },
        { key: 'status', sortable: true },
      ],
    }
  },
  head() {
    return {
      title: 'Sabreworks || Payments',
    }
  },
  computed: {
    ...mapGetters({
      withdrawalsCount: 'withdrawals/count',
      fundRequestCount: 'fundRequests/count',
      transactions: 'transactions/all',
    }),
  },
  async mounted() {
    const loader = this.$loading.show()
    try {
      await this.getWithdrawalsCount()
      await this.getFundRequestCount()
      await this.fetchTransactions()
      loader.hide()
    } catch (e) {
      loader.hide()
      this.$Toast.fire({ icon: 'error', title: this.$formatError(e) })
    }
  },
  methods: {
    ...mapActions({
      getWithdrawalsCount: 'withdrawals/count',
      getFundRequestCount: 'fundRequests/count',
      fetchTransactions: 'transactions/all',
      exportTransaction: 'transactions/export',
    }),
    async loadData(e) {
      const loader = this.$loading.show()
      try {
        await this.fetchTransactions({ page: e })
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
        const res = await this.exportTransaction()
        this.saveAsCSV('transactions', res)
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
        await this.fetchTransactions({ search: val })
        loader.hide()
      } catch (e) {
        loader.hide()
        await this.$formatError(e)
      }
    },
  },
}
</script>
