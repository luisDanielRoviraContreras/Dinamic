module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  plugins: ["@typescript-eslint"],
  parserOptions: {
    parser: 'babel-eslint',
    parser: "@typescript-eslint/parser"
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    "vue/no-v-html": "off"
  }
}
