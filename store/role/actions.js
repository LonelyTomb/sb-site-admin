import { SET_ROLE, SET_ROLES } from './_types'

const actions = {
  async roles({ commit }, params = {}) {
    const response = await this.$axios.$get('/api/role', {
      params,
    })
    commit(SET_ROLES, response.payload)
  },
  async role({ commit }, id) {
    const response = await this.$axios.$get(`/api/role/${id}`)
    commit(SET_ROLE, response.payload)
  },
}
export default actions
