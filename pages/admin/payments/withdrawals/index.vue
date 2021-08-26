<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12">
        <b-table
          :fields="fields"
          :items="withdrawals.rows || []"
          striped
          bordered
          outlined
          hover
          :responsive="true"
        >
          <!-- A custom formatted column -->
          <template #cell(created_at)="data">
            {{ data.item.created_at | luxon }}
          </template>
          <!-- A custom formatted column -->
          <template #cell(name)="data">
            <b class="text-info">{{ data.item.customer.firstname }}</b
            >, <b>{{ data.item.customer.lastname }}</b>
          </template>
          <template #cell(amount)="data">
            NGN {{ $formatAsMoney($fromKobo(data.item.amount)) }}
          </template>
          <template #cell(status)="data">
            <p class="text-capitalize mb-0">
              {{ data.item.status }}
            </p>
          </template>
          <!-- Optional default data cell scoped slot -->
          <template #cell(actions)="data">
            <div v-if="!types.includes(data.item.status)">
              <b-button
                variant="success"
                class="mr-lg-3 mb-3 mb-lg-0"
                @click="approve(data.item)"
                >Approve</b-button
              >
              <b-button variant="danger" @click="decline(data.item)"
                >Decline</b-button
              >
            </div>
            <div v-else>
              <p>No Actions Available</p>
            </div>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Withdrawals',
  components: {},
  layout: 'admin',
  data() {
    return {
      types: ['processed', 'declined'],
      fields: [
        {
          key: 'created_at',
          sortable: false,
          label: 'Date',
        },
        {
          key: 'name',
          sortable: true,
          label: 'Name',
        },
        {
          key: 'amount',
          sortable: false,
          label: 'Amount',
        },
        {
          key: 'status',
          label: 'Status',
        },
        {
          key: 'actions',
          label: 'Actions',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({ withdrawals: 'withdrawals/all' }),
  },
  mounted() {
    this.loadWithdrawalRequests()
  },
  methods: {
    ...mapActions({
      loadWithdrawalRequests: 'withdrawals/all',
      declineRequest: 'withdrawals/decline',
      approveRequest: 'withdrawals/approve',
    }),
    async approve(withdraw) {
      const loader = this.$loading.show()
      const { id } = withdraw
      try {
        await this.approveRequest({ id })
        loader.hide()
        this.$Toast.fire({
          icon: 'success',
          title: 'Payment Approved',
        })
        await this.loadWithdrawalRequests()
      } catch (e) {
        loader.hide()
        this.$Toast.fire({
          icon: 'error',
          title: this.$formatError(e),
        })
      }
    },
    async decline(fund) {
      const loader = this.$loading.show()
      const { id } = fund
      try {
        await this.declineRequest({ id })
        loader.hide()
        await this.$Toast.fire({
          icon: 'success',
          title: 'Payment Declined',
        })
        await this.loadWithdrawalRequests()
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

<style scoped></style>
