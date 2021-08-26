import { SET_LGAS, SET_LGA } from './_types'

const actions = {
  async getLGAs({ commit }, params) {
    const response = await this.$axios.$get('/api/lga', { params })
    commit(SET_LGAS, response.payload)
  },
  async getLGA({ commit }, payload) {
    const response = await this.$axios.$get(`/api/lga/${payload}`)
    commit(SET_LGA, response.payload)
  },
}

export default actions
