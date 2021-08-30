import {
  SET_CUSTOMER_COUNT,
  SET_REALTOR_COUNT,
  SET_CUSTOMERS,
  SET_CUSTOMER,
} from './_types'

const mutations = {
  [SET_CUSTOMER_COUNT](state, count) {
    state.count = count
  },
  [SET_REALTOR_COUNT](state, count) {
    state.realtor_count = count
  },
  [SET_CUSTOMERS](state, customers) {
    state.customers = customers
  },
  [SET_CUSTOMER](state, customer) {
    state.customer = customer
  },
}
export default mutations
