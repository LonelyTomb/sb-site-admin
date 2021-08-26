import {
  SET_TRANSACTIONS,
  SET_TRANSACTION,
  SET_PRODUCTS_COMMISSION,
} from './_types'

const mutations = {
  [SET_TRANSACTIONS](state, transactions) {
    state.transactions = { ...transactions }
  },
  [SET_TRANSACTION](state, transaction) {
    state.transaction = transaction
  },
  [SET_PRODUCTS_COMMISSION](state, productCommissions) {
    state.productCommissions = [...productCommissions]
  },
}

export default mutations
