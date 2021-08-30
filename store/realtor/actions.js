import { SET_COUNT, SET_REALTORS, SET_REALTOR } from './_types'

const actions = {
  async signUp({ commit }, payload) {
    const response = await this.$axios.$post(
      '/api/auth/realtor-sign-up',
      payload
    )
    return response.data
  },
  async realtors({ commit }, params = { is_realtor: true }) {
    const response = await this.$axios.$get('/api/customer', { params })
    commit(SET_REALTORS, response.payload)
  },
  async realtor({ commit }, id) {
    const response = await this.$axios.$get(`/api/customer/${id}`)
    commit(SET_REALTOR, response.payload)
  },
  async export({ commit }, params = { is_realtor: true }) {
    return await this.$axios.$get(`/api/customer/csv`, { params })
  },
  async count({ commit }, params = { is_realtor: true }) {
    const response = await this.$axios.$get('/api/customer/count', { params })
    commit(SET_COUNT, response.payload.count)
  },
}
export default actions
