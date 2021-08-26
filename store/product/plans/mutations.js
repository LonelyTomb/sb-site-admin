import { SET_PLANS, SET_PLAN } from './_types'

const mutations = {
  [SET_PLANS](state, plans) {
    state.plans = { ...plans }
  },
  [SET_PLAN](state, plan) {
    state.plan = plan
  },
}

export default mutations
