import { SET_FUND, SET_FUNDS, FUND_COUNT } from './_types'

const actions = {
  async create({ commit }, payload) {
    await this.$axios.$post('/api/fund-request', payload)
    // commit(SET_PRODUCT, response.payload)
  },
  async approve({ commit }, payload) {
    await this.$axios.$patch(`/api/fund-request/approve`, payload)
    // commit(SET_PRODUCT, response.payload)
  },
  async decline({ commit }, payload) {
    await this.$axios.$patch(`/api/fund-request/decline`, payload)
    // commit(SET_PRODUCT, response.payload)
  },
  async all({ commit }) {
    const response = await this.$axios.$get('/api/fund-request')
    commit(SET_FUNDS, response.payload)
  },
  async single({ commit }, id) {
    const response = await this.$axios.$get(`/api/fund-request/${id}`)
    commit(SET_FUND, response.payload)
  },
  async count({ commit }) {
    const response = await this.$axios.$get('/api/fund-request/count')
    commit(FUND_COUNT, response.payload.count)
  },
}

export default actions
