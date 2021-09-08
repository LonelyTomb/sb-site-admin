import {
  SET_PRODUCTS,
  SET_PRODUCT,
  SET_SUBSCRIPTION,
  SET_SUBSCRIPTIONS,
  SET_SUBSCRIPTIONS_COUNT,
  SET_PRODUCT_SOLD,
} from './_types'

const mutations = {
  [SET_PRODUCTS](state, products) {
    state.products = { ...products }
  },
  [SET_PRODUCT](state, product) {
    state.product = product
  },
  [SET_PRODUCT_SOLD](state, productsSold) {
    state.productsSold = [...productsSold]
  },
  [SET_SUBSCRIPTIONS](state, subscriptions) {
    state.subscriptions = subscriptions
  },
  [SET_SUBSCRIPTION](state, subscription) {
    state.subscription = subscription
  },
  [SET_SUBSCRIPTIONS_COUNT](state, subscriptionsCount) {
    state.subscriptionsCount = { ...subscriptionsCount }
  },
}

export default mutations
