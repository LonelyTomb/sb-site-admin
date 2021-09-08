import {
  SET_PRODUCTS,
  SET_PRODUCT,
  SET_PRODUCT_SOLD,
  SET_SUBSCRIPTION,
  SET_SUBSCRIPTIONS,
  SET_SUBSCRIPTIONS_COUNT,
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

  /**
   *
   * @param commit
   * @param id
   * @returns {Promise<void>}
   */
  async activate({ commit }, { id }) {
    await this.$axios.$patch(`/api/product/activate/${id}`)
  },

  /**
   *
   * @param commit
   * @param id
   * @returns {Promise<void>}
   */
  async deactivate({ commit }, { id }) {
    await this.$axios.$patch(`/api/product/deactivate/${id}`)
  },

  async productsSold({ commit }) {
    const response = await this.$axios.$get(`/api/product/total-units-sold`)
    commit(SET_PRODUCT_SOLD, response.payload)
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

  async subscriptionsCount({ commit }, params = {}) {
    const response = await this.$axios.$get(`/api/product-subscription/count`, {
      params,
    })
    await commit(SET_SUBSCRIPTIONS_COUNT, response.payload)
    return response.payload
  },

  async subscriptionsExport({ commit }, params = {}) {
    return await this.$axios.$get(`/api/product-subscription/csv`, {
      params,
    })
  },

  async subscription({ commit }, payload) {
    const response = await this.$axios.$get(
      `/api/product-subscription/${payload}`
    )
    commit(SET_SUBSCRIPTION, response.payload)
  },
}

export default actions
