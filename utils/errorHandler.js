import errorCodes from './errorCodes.json'
export default function errorHandler(status) {
  const message = errorCodes[status] || errorCodes[0]
  return {
    message,
  }
}
