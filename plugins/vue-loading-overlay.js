import Vue from 'vue'
// Import component
import Loading from 'vue-loading-overlay'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'
// Init plugin
Vue.use(Loading, {
  loader: 'bars',
  color: '#090D7C',
  opacity: 0.95,
})
