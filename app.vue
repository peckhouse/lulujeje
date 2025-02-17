<template>
  <div>
    <NuxtRouteAnnouncer />
  </div>
  <NuxtPage />
</template>
<script setup lang="ts">

useSeoMeta({
  title: 'Lulu & Jéjé',
  ogTitle: 'Lulu & Jéjé',
  description: 'We are Ludovic (Lulu) and Jérôme (Jéjé). We craft your online identity one pixel at a time, inspired by Shonan\'s seaside vibes.',
  ogDescription: 'We are Ludovic (Lulu) and Jérôme (Jéjé). We craft your online identity one pixel at a time, inspired by Shonan\'s seaside vibes.',
  ogImage: 'https://lulujeje.com/og-image.png',
  ogUrl: 'https://lulujeje.com',
  twitterCard: 'summary_large_image'
})

useHead({
  htmlAttrs: {
    lang: "en"
  }
})
</script>

<style lang="scss">
@use "~/assets/scss/main.scss" as *;
</style>
