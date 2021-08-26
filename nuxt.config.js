import { resolve } from 'path'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: process.env.NUXT_MODE,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Sabreworks Admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  generate: {
    dir: 'docker/dist',
  },
  alias: {
    png: resolve(__dirname, './assets/images/png'),
    svg: resolve(__dirname, './assets/images/svg'),
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    apiUrl: process.env.API_URL,
    APP_AWS_ID: process.env.APP_AWS_ID,
    APP_AWS_SECRET_ACCESS_KEY: process.env.APP_AWS_SECRET_ACCESS_KEY,
    APP_AWS_BUCKET: process.env.APP_AWS_BUCKET,
    NUXT_MODE: process.env.NUXT_MODE,
  },
  loading: '~/components/LoadingOverlay.vue',
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['./assets/scss/imports.scss'],
  styleResources: {
    scss: ['./assets/scss/_variables.scss', './assets/scss/functions.scss'],
  },
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false, // Or `bvCSS: false`
    // Install the `IconsPlugin` plugin (in addition to `BootstrapVue` plugin)
    icons: true,
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/toast.js' },
    { src: '~/plugins/vue-loading-overlay.js' },
    { src: '~/plugins/vue-luxon.js' },
    { src: '~/plugins/vuelidate' },
    { src: '~/plugins/vue-clipboard.js' },
    { src: '~/plugins/currencyFormat' },
    { src: '~/plugins/formatErrors' },
    { src: '~/plugins/vue-slick-carousel' },
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    prefix: '/', // Used as fallback if no runtime config is provided,
    proxy: process.env.NUXT_MODE !== 'static',
    credentials: true,
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL:
        process.env.NUXT_MODE === 'static' ? process.env.API_URL : '',
    },
  },
  proxy: {
    '/api/': {
      target: process.env.API_URL,
      pathRewrite: { '^/api/': '/api/' },
      secure: process.env.NODE_ENV === 'production',
    },
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: false,
    },
    strategies: {
      admin: {
        scheme: 'local',
        token: {
          property: 'payload.access_token',
          required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'payload',
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'get' },
          user: { url: '/api/admin/profile', method: 'get' },
        },
      },
    },
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
  },
}
