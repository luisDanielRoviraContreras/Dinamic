export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  loading: '~/components/loading.vue',
  router: {
    middleware: ['mobile']
  },
  head: {
    title: 'dinamic',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1, viewport-fit=cover' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins&display=swap' },
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  // loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['boxicons/css/boxicons.min.css', '~/style/root.sass'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/notification.js',
    '@/plugins/dialog.js',
    '@/plugins/guide.js',
    { src: '@/plugins/qr.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    sass: ['~/style/mixins.sass']
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyAkr7KjZnaU0qwJ6ScGT7k9WvRXAbaoRsY',
          authDomain: 'iupayme-app.firebaseapp.com',
          databaseURL: 'https://iupayme-app.firebaseio.com',
          projectId: 'iupayme-app',
          storageBucket: 'iupayme-app.appspot.com',
          messagingSenderId: '669282080360',
          appId: '1:669282080360:web:df9abf2ae3d7a5f3498ddd',
          measurementId: 'G-SQ7Q0TYKG2'
        },
        services: {
          firestore: true,
          database: true,
          storage: true
        }
      }
    ]
  ],

  pwa: {
    manifest: {
      name: 'dinamic',
      theme_color: '#121624',
      background_color: '#f5f7f9',
      description: 'Cartera - Tarjetas - Cryptocurrency',
      lang: 'es',
      display: 'standalone',
      crossorigin: 'use-credentials'
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {}
  },

  loaders: {
    ts: {
      silent: true
    },
    tsx: {
      silent: true
    }
  }
}
