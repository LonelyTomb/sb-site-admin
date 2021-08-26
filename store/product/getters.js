const getters = {
  all({ products }) {
    return products
  },
  single({ product }) {
    return product
  },
  subscription({ subscription }) {
    return subscription
  },
  subscriptions({ subscriptions }) {
    return subscriptions
  },
}

export default getters
