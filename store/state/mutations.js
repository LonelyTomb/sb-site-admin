import { SET_STATES, SET_STATE } from './_types'
const mutations = {
  [SET_STATES](state, all) {
    state.all = { ...all }
  },
  [SET_STATE](state, single) {
    state.single = single
  },
}

export default mutations
