import { SET_WITHDRAWAL, SET_WITHDRAWALS, SET_COUNT } from './_types'

const actions = {
  async create({ commit }, payload) {
    return await this.$axios.$post('/api/withdrawal-request', payload)
    // commit(SET_PRODUCT, response.payload)
  },
  async approve({ commit }, payload) {
    await this.$axios.$patch(`/api/withdrawal-request/approve`, payload)
    // commit(SET_PRODUCT, response.payload)
  },
  async decline({ commit }, payload) {
    await this.$axios.$patch(`/api/withdrawal-request/decline`, payload)
    // commit(SET_PRODUCT, response.payload)
  },
  async all({ commit }) {
    const response = await this.$axios.$get('/api/withdrawal-request')
    commit(SET_WITHDRAWALS, response.payload)
  },
  async single({ commit }, id) {
    const response = await this.$axios.$get(`/api/withdrawal-request/${id}`)
    commit(SET_WITHDRAWAL, response.payload)
  },
  async count({ commit }) {
    const response = await this.$axios.$get('/api/withdrawal-request/count')
    commit(SET_COUNT, response.payload.count)
  },
}

export default actions
