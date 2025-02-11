<template>
  <DeadCatMask />

  <main ref="deadKitten" class="lulujeje-dead-kitten">
    <p class="lulujeje-dead-kitten__description" v-html="blameOnUser" />
  </main>

  <main ref="homePage" class="lulujeje-home lulujeje-home--circles-bg-animation">
    <div class="lulujeje-home__main-content">
      <h1><Logo />Lulu & Jéjé</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nunc lacus, finibus vitae est eu, lobortis posuere eros.
        In nec nulla sagittis justo cursus porttitor quis eget orci.
      </p>

      <button @click="animateMask">Don't click</button>
    </div>
  </main>

  <footer class="lulujeje-home__footer">You can always drop us an email at <a href="mailto:hello@lulugege.com" title="Drop us an email!">hello@lulugege.com</a></footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Logo from '~/assets/icons/logo.svg'
import DeadCatMask from '~/assets/icons/dead-cat-mask.svg'

// Don't click button mask animation
const homePage = useTemplateRef<HTMLDivElement>('homePage')
const deadKitten = useTemplateRef<HTMLDivElement>('deadKitten')
const animateMask = () => {
  homePage.value?.classList.add('lulujeje-home--mask-animation')
  setTimeout(() => {
    deadKitten.value?.classList.add('lulujeje-dead-kitten--mask-animation')
  }, 800)

  setTimeout(() => {
    typewriter()
  }, 1500)
}

// Dead kitten type text
const sentences = ref([
  'We told you not to click!',
  'Your curiosity killed the cat...',
  'Number of dead kitties: '
])
const blameOnUser = ref('')
const deadKittenCount = ref(20)

const timer = (ms: number) => new Promise(res => setTimeout(res, ms))
const typewriter = async () => {
  for (const [sentenceIndex, sentence] of sentences.value.entries()) {
    for (let charIndex=0; charIndex <= sentence.length; charIndex++) {
      const currentChar = sentence.charAt(charIndex)
      blameOnUser.value+= currentChar
      await timer(40)
    }

    if (sentenceIndex < sentences.value.length - 1)blameOnUser.value+= '<br/>'
    await timer(60)
  }

  await timer(60)
  blameOnUser.value+= `<span>${deadKittenCount.value}</span>`
}
</script>

<style lang="scss">
@use "~/assets/scss/mixin.scss" as *;

:root {
  --bg-color-radial-light: #FFC8FA;
  --bg-color-radial-dark: #FFAEF8;

  --bg-color: #FFBBF9;

  --bg-color-dead-kitten: #FF2C2C;

  --logo-letter-color: #FFCCFC;
  --logo-bg-color: #FF2C2C;

  --text-color: #FF2C2C;

  --button-bg-color: #FF2C2C;
  --button-color: #FFFFFF;

  --dead-kitten-text: #FFFFFF;
  --dead-kitten-number: #FFBBF9;

  --footer-text-color: #FF2C2C;
}

html, body {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.lulujeje-dead-kitten {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

  background-image: url( '~/assets/images/deadcat.png' );
  background-color: var(--bg-color-dead-kitten);
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

  &--mask-animation {
    background-size: 256px 213px;
  }

  &__description {
    color: var(--dead-kitten-text);
    font-family: "Roboto", serif;
    text-align: center;
    line-height: 24px;
    font-weight: 500;
    font-size: 18px;
    width: 300px;

    span {
      color: var(--dead-kitten-number);
    }
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
  height: 400vh;
  width: 400%;
  z-index: 2;
  left: 50%;
  top: 50%;

  &__main-content {
    text-align: center;
    width: 300px;

    h1 {
      margin: 0 0 16px;
      cursor: pointer;
      font-size: 0;
    }

    svg {
      height: auto;
      width: 100%;

      .logo-background {
        transition: all 0.5s ease-in-out;
        fill: var(--logo-bg-color);
      }

      .logo-letter {
        transition: all 0.5s ease-in-out;
        fill: var(--logo-letter-color);
      }
    }

    p {
      font-family: "Roboto", serif;
      color: var(--text-color);
      line-height: 20px;
      margin: 0 0 24px;
      font-weight: 500;
      font-size: 14px;
    }

    button {
      @include button-reset();

      background-color: var(--button-bg-color);
      font-family: "Roboto", serif;
      color: var(--button-color);
      text-transform: uppercase;
      text-decoration: none;
      border-radius: 100px;
      text-align: center;
      padding: 16px 0;
      font-weight: 600;
      font-size: 16px;
      display: block;
      margin: auto;
      width: 50%;

      &:hover {
        animation: button-shake 0.6s infinite;
      }
    }
  }

  &__footer {
    color: var(--footer-text-color);
    font-family: "Roboto", serif;
    padding: 0 24px 24px;
    position: absolute;
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    z-index: 3;
    width: calc(100% - 48px);
    bottom: 0;
    margin: 0;

    a {
      text-decoration: none;
      font-weight: 600;
      color: #ff2c2c;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &--circles-bg-animation {
    will-change: background;
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 0px, var(--bg-color-radial-dark) 50px, var(--bg-color-radial-light) 50px, var(--bg-color-radial-light) 100px);
    animation: circles-gradients 1.6s ease infinite;
  }

  &--mask-animation {
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

@keyframes circles-gradients {
  0% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 0px, var(--bg-color-radial-dark) 50px, var(--bg-color-radial-light) 50px, var(--bg-color-radial-light) 100px);
  }
  5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 5px, var(--bg-color-radial-dark) 55px, var(--bg-color-radial-light) 55px, var(--bg-color-radial-light) 105px);
  }
  10% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 10px, var(--bg-color-radial-dark) 60px, var(--bg-color-radial-light) 60px, var(--bg-color-radial-light) 110px);
  }
  15% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 15px, var(--bg-color-radial-dark) 65px, var(--bg-color-radial-light) 65px, var(--bg-color-radial-light) 115px);
  }
  20% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 20px, var(--bg-color-radial-dark) 70px, var(--bg-color-radial-light) 70px, var(--bg-color-radial-light) 120px);
  }
  25% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 25px, var(--bg-color-radial-dark) 75px, var(--bg-color-radial-light) 75px, var(--bg-color-radial-light) 125px);
  }
  30% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 30px, var(--bg-color-radial-dark) 80px, var(--bg-color-radial-light) 80px, var(--bg-color-radial-light) 130px);
  }
  35% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 35px, var(--bg-color-radial-dark) 85px, var(--bg-color-radial-light) 85px, var(--bg-color-radial-light) 135px);
  }
  40% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 40px, var(--bg-color-radial-dark) 90px, var(--bg-color-radial-light) 90px, var(--bg-color-radial-light) 140px);
  }
  45% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 45px, var(--bg-color-radial-dark) 95px, var(--bg-color-radial-light) 95px, var(--bg-color-radial-light) 145px);
  }
  50% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 50px, var(--bg-color-radial-dark) 100px, var(--bg-color-radial-light) 100px, var(--bg-color-radial-light) 150px);
  }
  55% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 55px, var(--bg-color-radial-dark) 105px, var(--bg-color-radial-light) 105px, var(--bg-color-radial-light) 155px);
  }
  60% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 60px, var(--bg-color-radial-dark) 110px, var(--bg-color-radial-light) 110px, var(--bg-color-radial-light) 160px);
  }
  65% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 65px, var(--bg-color-radial-dark) 115px, var(--bg-color-radial-light) 115px, var(--bg-color-radial-light) 165px);
  }
  70% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 70px, var(--bg-color-radial-dark) 120px, var(--bg-color-radial-light) 120px, var(--bg-color-radial-light) 170px);
  }
  75% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 75px, var(--bg-color-radial-dark) 125px, var(--bg-color-radial-light) 125px, var(--bg-color-radial-light) 175px);
  }
  80% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 80px, var(--bg-color-radial-dark) 130px, var(--bg-color-radial-light) 130px, var(--bg-color-radial-light) 180px);
  }
  85% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 85px, var(--bg-color-radial-dark) 135px, var(--bg-color-radial-light) 135px, var(--bg-color-radial-light) 185px);
  }
  90% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 90px, var(--bg-color-radial-dark) 140px, var(--bg-color-radial-light) 140px, var(--bg-color-radial-light) 190px);
  }
  95% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 95px, var(--bg-color-radial-dark) 145px, var(--bg-color-radial-light) 145px, var(--bg-color-radial-light) 195px);
  }
  100% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 100px, var(--bg-color-radial-dark) 150px, var(--bg-color-radial-light) 150px, var(--bg-color-radial-light) 200px);
  }
}

@keyframes button-shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>
