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
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  twitterCard: 'summary_large_image',
})
</script>

<style lang="scss">
@use "~/assets/scss/main.scss" as *;
</style>
