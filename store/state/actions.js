import { SET_STATES, SET_STATE } from './_types'

const actions = {
  async getStates({ commit }) {
    const response = await this.$axios.$get('/api/state')
    commit(SET_STATES, response.payload)
  },
  async getState({ commit }, payload) {
    const response = await this.$axios.$get(`/api/state/${payload}`)
    commit(SET_STATE, response.payload)
  },
}

export default actions
