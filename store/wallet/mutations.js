import { SET_BALANCE } from './_types'
const mutations = {
  [SET_BALANCE](state, balance) {
    state.balance = { ...balance }
  },
}

export default mutations
