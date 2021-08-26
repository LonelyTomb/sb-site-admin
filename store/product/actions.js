import {
  SET_PRODUCTS,
  SET_PRODUCT,
  SET_SUBSCRIPTION,
  SET_SUBSCRIPTIONS,
} from './_types'

const actions = {
  async create({ commit }, payload) {
    const response = await this.$axios.$post('/api/product', payload)
    commit(SET_PRODUCT, response.payload)
  },
  async update({ commit }, { id, form }) {
    const response = await this.$axios.$put(`/api/product/${id}`, form)
    commit(SET_PRODUCT, response.payload)
  },
  async all({ commit }, params = {}) {
    const response = await this.$axios.$get('/api/product', { params })
    commit(SET_PRODUCTS, response.payload)
  },
  async single({ commit }, id) {
    const response = await this.$axios.$get(`/api/product/${id}`)
    commit(SET_PRODUCT, response.payload)
  },
  async subscribe({ commit }, payload) {
    return await this.$axios.$post(`/api/product-subscription`, payload)
  },
  async subscriptions({ commit }, params = {}) {
    const response = await this.$axios.$get(`/api/product-subscription`, {
      params,
    })
    commit(SET_SUBSCRIPTIONS, response.payload)
  },
  async subscription({ commit }, payload) {
    const response = await this.$axios.$get(
      `/api/product-subscription/${payload}`
    )
    commit(SET_SUBSCRIPTION, response.payload)
  },
}

export default actions
