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
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Payments',
  components: {},
  layout: 'admin',
  data() {
    return {}
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
    }),
  },
  async mounted() {
    await this.getWithdrawalsCount()
    await this.getFundRequestCount()
  },
  methods: {
    ...mapActions({
      getWithdrawalsCount: 'withdrawals/count',
      getFundRequestCount: 'fundRequests/count',
    }),
  },
}
</script>
