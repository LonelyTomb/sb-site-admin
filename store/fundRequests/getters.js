const getters = {
  all({ fundRequests }) {
    return fundRequests
  },
  single({ fundRequest }) {
    return fundRequest
  },
  count({ count }) {
    return count
  },
}

export default getters
