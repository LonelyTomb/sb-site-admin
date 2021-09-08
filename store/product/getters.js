const getters = {
  all({ products }) {
    return products
  },
  single({ product }) {
    return product
  },
  productsSold({ productsSold }) {
    return productsSold
  },
  subscription({ subscription }) {
    return subscription
  },
  subscriptionsCount({ subscriptionsCount }) {
    return subscriptionsCount
  },
  subscriptions({ subscriptions }) {
    return subscriptions
  },
}

export default getters
