import { SET_COUNT, SET_REALTORS, SET_REALTOR } from './_types'

const mutations = {
  [SET_COUNT](state, count) {
    state.count = count
  },
  [SET_REALTORS](state, realtors) {
    state.realtors = realtors
  },
  [SET_REALTOR](state, realtor) {
    state.realtor = realtor
  },
}
export default mutations
