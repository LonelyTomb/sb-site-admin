import { SET_BALANCE } from './_types'

const actions = {
  async balance({ commit }, payload) {
    const response = await this.$axios.$get('/api/wallet/my-wallet', payload)
    commit(SET_BALANCE, response.payload)
  },
}

export default actions
