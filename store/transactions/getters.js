const getters = {
  all({ transactions }) {
    return transactions
  },
  single({ transaction }) {
    return transaction
  },
  productCommissions({ productCommissions }) {
    return productCommissions
  },
}

export default getters
