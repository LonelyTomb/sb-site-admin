import { SET_PLAN, SET_PLANS } from './_types'

const actions = {
  async create({ commit }, payload) {
    await this.$axios.$post('/api/payment-plan', payload)
    // commit(SET_PRODUCT, response.payload)
  },
  async update({ commit }, { id, payload }) {
    await this.$axios.$put(`/api/payment-plan/${id}`, payload)
    // commit(SET_PRODUCT, response.payload)
  },
  async activate({ commit }, { id }) {
    await this.$axios.$patch(`/api/payment-plan/activate/${id}`)
    // commit(SET_PRODUCT, response.payload)
  },
  async deactivate({ commit }, { id }) {
    await this.$axios.$patch(`/api/payment-plan/deactivate/${id}`)
    // commit(SET_PRODUCT, response.payload)
  },
  async all({ commit }) {
    const response = await this.$axios.$get('/api/payment-plan')
    commit(SET_PLANS, response.payload)
  },
  async single({ commit }, id) {
    const response = await this.$axios.$get(`/api/payment-plan/${id}`)
    commit(SET_PLAN, response.payload)
  },
}

export default actions
