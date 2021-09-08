import { SET_ROLES, SET_ROLE } from './_types'

const mutations = {
  [SET_ROLES](state, roles) {
    state.roles = roles
  },
  [SET_ROLE](state, role) {
    state.role = role
  },
}
export default mutations
