import { SET_ACCOUNT, SET_BANKS } from './_types'
const mutations = {
  [SET_ACCOUNT](state, account) {
    state.account = { ...account }
  },
  [SET_BANKS](state, banks) {
    state.banks = banks
  },
}

export default mutations
