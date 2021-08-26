import {
  SET_PRODUCTS,
  SET_PRODUCT,
  SET_SUBSCRIPTION,
  SET_SUBSCRIPTIONS,
} from './_types'

const mutations = {
  [SET_PRODUCTS](state, products) {
    state.products = { ...products }
  },
  [SET_PRODUCT](state, product) {
    state.product = product
  },
  [SET_SUBSCRIPTIONS](state, subscriptions) {
    state.subscriptions = subscriptions
  },
  [SET_SUBSCRIPTION](state, subscription) {
    state.subscription = subscription
  },
}

export default mutations
