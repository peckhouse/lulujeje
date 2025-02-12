// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  experimental: { appManifest: false },
  modules: [
    '@nuxt/scripts',
    '@nuxtjs/supabase',
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
      'Roboto': {
        wght: '200..900'
      }
    }
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/',
      callback: '/confirm'
    }
  }
})
