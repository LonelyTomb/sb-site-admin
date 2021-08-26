import { SET_ACCOUNT, SET_BANKS } from './_types'

const actions = {
  async getBanks({ commit }) {
    const response = await this.$axios.$get('/api/bank-account/list-all-banks')
    commit(SET_BANKS, response.payload.banks)
  },
  async createBankAccount({ commit }, payload) {
    const response = await this.$axios.$post(`/api/bank-account`, payload)
    commit(SET_ACCOUNT, response.payload)
  },
  async updateBankAccount({ commit }, payload) {
    await this.$axios.$put(`/api/bank-account`, payload)
  },
  async fetchBankAccount({ commit }) {
    const response = await this.$axios.$get(`/api/bank-account`)
    commit(SET_ACCOUNT, response.payload)
  },
}

export default actions
