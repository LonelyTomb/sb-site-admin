export const formatErr = (e) => {
  return (
    (e?.response?.data?.error && e?.response?.data?.error[0].message) ||
    'Unable to complete request'
  )
}

export default ({ app }, inject) => {
  inject('formatError', formatErr)
}
