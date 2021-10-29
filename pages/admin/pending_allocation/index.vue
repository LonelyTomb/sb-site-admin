<template>
  <div>
    <b-container fluid="xxxl" class="client-page">
      <b-row class="">
        <b-col cols="12">
          <pending-allocation-table
            v-if="subscriptions.rows"
            class="w-100"
            :items="subscriptions.rows"
            :pagination="subscriptions.paging"
            :fields="fields"
            @export="exportData"
            @search="searchData"
            @goToPage="loadData"
            @refreshData="refreshData"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PendingAllocation',
  components: {
    PendingAllocationTable: () =>
      import('@/components/tables/PendingAllocationTable'),
  },
  layout: 'admin',
  data() {
    return {
      fields: [
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
          key: 'is_allocated',
          label: 'Allocated',
        },
        {
          key: 'allocations',
          label: 'Allocations',
        },
        {
          key: 'Actions',
        },
      ],
    }
  },
  head() {
    return {
      title: 'Demo Company || Pending Allocation',
    }
  },
  computed: {
    ...mapGetters({
      subscriptions: 'product/subscriptions',
    }),
  },
  async mounted() {
    const loader = this.$loading.show()
    try {
      await this.getSubscriptions({ status: 'completed' })
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
    async refreshData() {
      const loader = this.$loading.show()
      try {
        await this.getSubscriptions({ status: 'completed' })

        loader.hide()
      } catch (e) {
        loader.hide()
        await this.$Toast.fire({
          icon: 'error',
          title: this.$formatError(e),
        })
      }
    },
    async loadData(e) {
      const loader = this.$loading.show()
      try {
        await this.getSubscriptions({ page: e, status: 'completed' })
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
        const res = await this.exportSubscriptions({ status: 'completed' })
        this.saveAsCSV('pending_allocations', res)
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
        await this.getSubscriptions({ search: val, status: 'completed' })
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
