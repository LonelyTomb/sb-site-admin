import {
  SET_TRANSACTION,
  SET_TRANSACTIONS,
  SET_PRODUCTS_COMMISSION,
} from './_types'

const actions = {
  async all({ commit }, params = {}) {
    const response = await this.$axios.$get('/api/txtn', { params })
    await commit(SET_TRANSACTIONS, response.payload)
    return response.payload
  },
  async productCommissions({ commit }, params = {}) {
    const response = await this.$axios.$get(
      '/api/txtn/total-commission-per-product',
      { params }
    )
    await commit(SET_PRODUCTS_COMMISSION, response.payload)
    return response.payload
  },
  async single({ commit }, payload) {
    const response = await this.$axios.$get(`/api/txtn/${payload}`)
    await commit(SET_TRANSACTION, response.payload)
    return response.payload
  },
  async topUp({ commit }, payload) {
    return await this.$axios.$post(`/api/txtn/fund-wallet`, payload)
    // commit(SET_TRANSACTION, response.payload)
  },
  async subscribeToProduct({ commit }, payload) {
    return await this.$axios.$post(`/api/txtn/product-sub-payment`, payload)
    // commit(SET_TRANSACTION, response.payload)
  },
}

export default actions
