// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  experimental: { appManifest: false },
  modules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      'Rouge+Script': true
    }
  }
})
