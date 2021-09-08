import { SET_ADMINS, SET_ADMIN } from './_types'

const actions = {
  async add({ commit }, payload) {
    const response = await this.$axios.$post('/api/auth/admin', payload)
    return response.data
  },
  async admins({ commit }, params = {}) {
    const response = await this.$axios.$get('/api/admin', { params })
    commit(SET_ADMINS, response.payload)
  },
  async admin({ commit }, id) {
    const response = await this.$axios.$get(`/api/admin/${id}`)
    commit(SET_ADMIN, response.payload)
  },
  async activate({ commit }, id) {
    await this.$axios.$get(`/api/admin/activate/${id}`)
  },
  async deactivate({ commit }, id) {
    await this.$axios.$get(`/api/admin/default/${id}`)
  },
}
export default actions
