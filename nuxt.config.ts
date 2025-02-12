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
    url: 'https://jgacwrkyryimvrobcznt.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnYWN3cmt5cnlpbXZyb2Jjem50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzNjQ0NzcsImV4cCI6MjA1NDk0MDQ3N30.EvDrPnk1iaHZj7D2Pwgg0UknenaH3GquW49etycopDA',
    redirectOptions: {
      login: '/',
      callback: '/confirm'
    }
  }
})
