import { SET_LGAS, SET_LGA } from './_types'
const mutations = {
  [SET_LGAS](state, all) {
    state.all = { ...all }
  },
  [SET_LGA](state, single) {
    state.single = single
  },
}

export default mutations
