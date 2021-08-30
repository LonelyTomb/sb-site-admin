import { SET_COUNT } from './_types'

const actions = {
  async signUp({ commit }, payload) {
    const response = await this.$axios.$post(
      '/api/auth/realtor-sign-up',
      payload
    )
    return response.data
  },
  async export({ commit }) {
    return await this.$axios.$get(`/api/customer/csv`)
  },
  async count({ commit }, params = { is_realtor: true }) {
    const response = await this.$axios.$get('/api/customer/count', { params })
    commit(SET_COUNT, response.payload.count)
  },
}
export default actions
