// import { SET_TRANSACTION, SET_TRANSACTIONS } from './_types'

const actions = {
  async forgotPassword({ commit }, payload) {
    return await this.$axios.$post('/api/auth/forgot-password', payload)
  },
  async resetPassword({ commit }, payload) {
    return await this.$axios.$post(`/api/auth/reset-password`, payload)
  },
  async verifyEmail({ commit }, payload) {
    return await this.$axios.$get(
      `/api/auth/verify-email/${payload.auth_id}/${payload.value}`
    )
  },
  async resendEmail({ commit }, payload) {
    return await this.$axios.$post(
      `/api/auth/resend-email-verification-link/${payload.email}`
    )
  },
  async updateProfile({ commit }, { type, payload }) {
    return await this.$axios.$put(`/api/${type}/profile`, payload)
  },
  async verifyRefCode({ commit }, params) {
    return await this.$axios.$get('/api/auth/validate-referral-code', {
      params,
    })
  },
}

export default actions
