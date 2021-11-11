import { access } from 'fs'
import { rm, mkdir, cp, rename, open } from 'fs/promises'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'manual2',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',

    // https://github.com/nuxt-community/eslint-module#readmea
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  eslint: {
    /* module options */
  },

  // Runtime Lint
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  },

  hooks: {
    generate: {
      done: (generator, error) => {
        console.log('generate done....')
        if (error) {
          return
        }
        const publishRoot = '~/generate-test'
        const distPath = generator.distPath
        const indexJspPath = `${publishRoot}/index.jsp`
        const distNuxtPath = generator.distNuxtPath
        const indexHtmlPath = `${distPath}/index.html`
        access(publishRoot, (error) => {
          if (!error) {
            const nuxtPublishPath = `${publishRoot}/${generator.options.build.publicPath}`
            rm(nuxtPublishPath, { recursive: true })
              .catch((error) => {
                console.log(`failed to remove ${nuxtPublishPath}`)
                console.log(error)
              })
            const indexJsp = `${publishRoot}/index.jsp`
            rm(indexJsp)
              .catch((error) => {
                console.log(`failed to remove ${indexJsp}`)
                console.log(error)
              })
            cp(distNuxtPath, nuxtPublishPath, { recursive: true })
              .catch((error) => {
                console.log(`failed to copy ${distNuxtPath} to ${nuxtPublishPath}`)
                console.log(error)
              })
            open(indexHtmlPath)
              .then((fd) => {
                const rstream = fd.createReadStream()
                return { rstream }
              }).then(({ rstream }) => {
                open(indexJspPath, 'w')
              })
          }
        })
        mkdir
      }
    }
  }
}
