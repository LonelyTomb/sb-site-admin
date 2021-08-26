export const toKobo = (amount) => {
  return Number(amount) * 100
}

export const fromKobo = (amount) => {
  return Number(amount) / 100
}

export const formatAsMoney = (amount) => {
  return new Intl.NumberFormat().format(amount)
}

export default ({ app }, inject) => {
  inject('toKobo', toKobo)
  inject('fromKobo', fromKobo)
  inject('formatAsMoney', formatAsMoney)
}
