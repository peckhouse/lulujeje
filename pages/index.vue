<script setup lang="ts">
import Logo from '~/assets/icons/logo.svg'
import DeadCatMask from '~/assets/icons/dead-cat-mask.svg'
import DeadCat from '~/assets/icons/dead-cat-mask.svg'

const homePage = useTemplateRef<HTMLDivElement>('homePage')
const deadKitten = useTemplateRef<HTMLDivElement>('deadKitten')
const animateMask = () => {
  if (homePage.value == null || deadKitten.value === null) return

  homePage.value.classList.toggle('mask-animation')
  setTimeout(() => {
    deadKitten.value.classList.toggle('mask-animation')
  }, 800)
}


</script>

<template>
  <DeadCatMask />

  <main ref="deadKitten" class="lulujeje-dead-kitten">
    <DeadCat />
  </main>

  <main ref="homePage" class="lulujeje-home">
    <div class="lulujeje-home__main-content">
      <h1
        @click="animateMask"
      >
        <Logo />
        Lulu & Jéjé
      </h1>
    </div>
  </main>
</template>

<style lang="scss">
:root {
  --bg-color: #FFBBF9;
  --bg-color-dead: #FF2C2C;
  --logo-letter-color: #FFCCFC;
  --logo-bg-color: #FF2C2C;
}

.lulujeje-dead-kitten {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

  background-image: url( '~/assets/images/deadcat.png' );
  background-color: var(--bg-color-dead);
  background-position: center center;
  background-size: 0 0;
  background-blend-mode: overlay;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100vh;
  width: 100%;
  z-index: 1;

  &.mask-animation {
    background-size: 513px 426px;
  }
}


.lulujeje-home {
  transform: translate3d(-50%, -50%, 0);
  transform-origin: center;
  transform-box: fill-box;

  background-image: url('~/assets/images/home-background.png');
  background-color: var(--bg-color);
  clip-path: url(#dead-cat-mask);
  background-blend-mode: overlay;
  background-size: auto 120px;
  justify-content: center;
  align-items: center;
  position: absolute;
  display: flex;
  height: 200vh;
  width: 200%;
  z-index: 2;
  left: 50%;
  top: 50%;
  &__main-content {
    width: 300px;
    h1 {
      font-size: 0;
      margin: 0;
    }

    svg {
      height: auto;
      width: 100%;

      .logo-background {
        fill: var(--logo-bg-color);
      }

      .logo-letter {
        fill: var(--logo-letter-color);
      }
    }
  }

  &.mask-animation {
    animation: mask-animation 0.8s forwards cubic-bezier(0.83, 0, 0.17, 1);
  }
}

@keyframes mask-animation {
  0% {
    width: 2052px;
    height: 1704px;
  }
  100% {
    width: 0;
    height: 0;
  }
}
</style>