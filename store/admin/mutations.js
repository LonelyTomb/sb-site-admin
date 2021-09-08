import { SET_ADMINS, SET_ADMIN } from './_types'

const mutations = {
  [SET_ADMINS](state, admins) {
    state.admins = admins
  },
  [SET_ADMIN](state, admin) {
    state.admin = admin
  },
}
export default mutations
