import { SET_FUNDS, SET_FUND, FUND_COUNT } from './_types'

const mutations = {
  [SET_FUNDS](state, fundRequests) {
    state.fundRequests = { ...fundRequests }
  },
  [SET_FUND](state, fundRequest) {
    state.fundRequest = fundRequest
  },
  [FUND_COUNT](state, count) {
    state.count = count
  },
}

export default mutations
