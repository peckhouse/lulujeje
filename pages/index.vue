<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <main class="lulujeje-home">
    <div class="lulujeje-home__top-plane"></div>
    <div class="lulujeje-home__coming-soon">
      <h1>Lulu & Jéjé</h1>
      <h2>
        We are Ludovic (Lulu) and Jerome (Jeje). <br>
        We craft your online identity one pixel at a time, <br>
        from our little creative nook<br>
        on Shonan's sunny coastline.
      </h2>
    </div>
    <div class="lulujeje-home__bottom-plane"></div>
  </main>
</template>

<style lang="scss">
:root {
  --visual-distortion-zapper: 720px;
  --animation-duration: 4s;
  --bg-color: #FDBBF9;
  --lines: #FFCCFC;
}

html, body {
  overflow: hidden;
  height: 100%;
}

body {
  background: linear-gradient(var(--bg-color) 40%, var(--lines) 50%, var(--lines) 40%, var(--bg-color) 100%);  
  position: relative;
  height: 100%;
}

.lulujeje-home {
  perspective: var(--visual-distortion-zapper);
  perspective-origin: 50% 50%;
  position: absolute;
  margin: 0 auto;
  height: 100%;
  width: 100%;

  &__coming-soon {
    transform: translate3d(-50%, -50%, 0);
    position: absolute;
    text-align: center;
    width: 100%;
    z-index: 99;
    left: 50%;
    top: 50%;
  }

  h1 {
    font-family: "Rouge Script", serif;
    margin: 0 auto 24px;
    font-style: normal;
    font-weight: 700;
    font-size: 80px;
    color: #FF2C2B;
  }

  h2 {
    font-family: sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #FF2C2B;
  }

  &__top-plane,
  &__bottom-plane {
    width: 200%;
    height: 130%;
    position: absolute;
    bottom: -30%;
    left: -50%;
    background-image: -webkit-linear-gradient(var(--lines) 2px, transparent 2px), -webkit-linear-gradient(left, var(--lines) 2px, transparent 2px);
    background-size: 100px 100px,100px 100px;
    background-position: -1px -1px,-1px -1px;
    transform: rotateX(85deg);
    animation: planeMoveTop var(--animation-duration) infinite linear;
  }

  &__bottom-plane {
    animation: planeMoveBot var(--animation-duration) infinite linear;
    transform: rotateX(-85deg);
    top: -30%;
  }
}

@keyframes planeMoveTop {
  from {
    background-position: 0px -100px,0px 0px;
  }
  to {
    background-position: 0px 0px, 100px 0px;
  }
}

@keyframes planeMoveBot {
  from {
    background-position: 0px 0px,0px 0px;
  }
  to {
    background-position: 0px -100px, 100px 0px;
  }
}
</style>