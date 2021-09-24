import { SET_COUNT, SET_CUSTOMERS, SET_CUSTOMER } from './_types'

const actions = {
  async signUp({ commit }, payload) {
    const response = await this.$axios.$post(
      '/api/auth/customer-sign-up',
      payload
    )
    return response.data
  },
  async totalCommissions({ commit }) {
    return await this.$axios.$get('/api/customer/total-commission')
  },
  async customers({ commit }, params = {}) {
    const response = await this.$axios.$get('/api/customer', { params })
    commit(SET_CUSTOMERS, response.payload)
  },
  async customer({ commit }, id) {
    const response = await this.$axios.$get(`/api/customer/${id}`)
    commit(SET_CUSTOMER, response.payload)
  },
  async activate({ commit }, id) {
    await this.$axios.$get(`/api/customer/activate/${id}`)
  },
  async deactivate({ commit }, id) {
    await this.$axios.$get(`/api/customer/default/${id}`)
  },
  async export({ commit }) {
    return await this.$axios.$get(`/api/customer/csv`)
  },
  async count({ commit }, params = {}) {
    const response = await this.$axios.$get('/api/customer/count', { params })
    commit(SET_COUNT, response.payload.count)
  },
  async bulkUpload({ commit }, payload) {
    return await this.$axios.$post('/api/customer/bulk-sign-up', payload)
  },
}
export default actions
