const getters = {
  all({ withdrawals }) {
    return withdrawals
  },
  single({ withdrawal }) {
    return withdrawal
  },
  count({ count }) {
    return count
  },
}

export default getters
