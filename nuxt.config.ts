// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  experimental: { appManifest: false },
  modules: [
    '@nuxt/scripts',
    '@nuxtjs/google-fonts',
    'nuxt-svgo'
  ],
  svgo: {
    svgoConfig: {
      plugins: [
        {
          name: 'prefixIds',
          params: {
            prefixIds: false,
            prefixClassNames: false
          }
        }
      ]
    }
  },
  googleFonts: {
    families: {
      'Rouge+Script': true
    }
  }
})
