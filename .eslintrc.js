module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    // https://typescript.nuxtjs.org/guide/lint/
    '@nuxtjs/eslint-config-typescript',
    // https://github.com/nuxt/eslint-plugin-nuxt#readme
    'plugin:nuxt/recommended',
    // https://eslint.vuejs.org/user-guide/#installation
    'plugin:vue/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {}
}
