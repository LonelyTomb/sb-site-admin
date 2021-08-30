const getters = {
  count({ count }) {
    return count
  },
  // eslint-disable-next-line camelcase
  realtorCount({ realtor_count }) {
    // eslint-disable-next-line camelcase
    return realtor_count
  },
  customers({ customers }) {
    return customers
  },
  customer({ customer }) {
    return customer
  },
}
export default getters
