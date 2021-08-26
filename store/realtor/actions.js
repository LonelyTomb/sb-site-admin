const actions = {
  async signUp({ commit }, payload) {
    const response = await this.$axios.$post(
      '/api/auth/realtor-sign-up',
      payload
    )
    return response.data
  },
}
export default actions
