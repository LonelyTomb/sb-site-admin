import errorHandler from './../utils/errorHandler'
import { Toast } from './toast'
export default function ({ $axios, redirect }) {
  //   $axios.onRequest((config) => {
  //     console.log('Making request to ' + config.url)
  //   })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    const { message } = errorHandler(code)
    Toast.fire({ icon: 'error', title: message.text })
  })
}
