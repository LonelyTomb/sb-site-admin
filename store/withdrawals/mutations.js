import { SET_WITHDRAWALS, SET_WITHDRAWAL, SET_COUNT } from './_types'

const mutations = {
  [SET_WITHDRAWALS](state, withdrawals) {
    state.withdrawals = { ...withdrawals }
  },
  [SET_WITHDRAWAL](state, withdrawal) {
    state.withdrawal = withdrawal
  },
  [SET_COUNT](state, count) {
    state.count = count
  },
}

export default mutations
