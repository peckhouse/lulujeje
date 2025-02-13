<template>
  <div class="main-content">
    <DeadCatMask />

    <main ref="deadKitten" class="lulujeje-dead-kitten">
      <p class="lulujeje-dead-kitten__description" v-html="blameOnUser" />
      <button ref="closeButton" @click="toggleClass" aria-label="Go back"><CrossIcon /></button>
    </main>

    <main ref="homePage" class="lulujeje-home" :class="`lulujeje-home--bg-${currentPattern}`">
      <div class="lulujeje-home__main-content">
        <h1 @click="switchColorAndPattern"><Logo />Lulu & Jéjé</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nunc lacus, finibus vitae est eu, lobortis posuere eros.
          In nec nulla sagittis justo cursus porttitor quis eget orci.
        </p>

        <button @click="animateMask">Don't click</button>
      </div>
    </main>

    <footer v-if="!blameOnUser" class="lulujeje-home__footer">You can always drop us an email at <a href="mailto:hello@lulugege.com" title="Drop us an email!">hello@lulujeje.com</a></footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import CrossIcon from '~/assets/icons/cross.svg'
import Logo from '~/assets/icons/logo.svg'
import DeadCatMask from '~/assets/icons/dead-cat-mask.svg'

type Counter = { counter: number }

const deadKittenCounter = ref<number>(0)
const supabase = useSupabaseClient<Counter>()

const fetchCounter = async () => {
  const { data, error } = await supabase
    .from('deadkitten')
    .select('counter')
    .single()

  if (data && !error) {
    deadKittenCounter.value = data.counter
  }
}

const incrementDeadKittenCounter = async () => {
  deadKittenCounter.value++
  await supabase
    .from('deadkitten')
    .update({ counter: deadKittenCounter.value })
    .eq('id', 1)
}

type ColorScheme = {
  colorScheme: number
  schemeName: string
  bgColor: string
  bgColorRadialLight: string
  bgColorRadialDark: string
  logoLetterColor: string
  logoBgColor: string
  textColor: string
  buttonBgColor: string
  buttonColor: string
  deadKittenBgColor: string
  deadKittenText: string
  deadKittenNumber: string
  footerTextColor: string
}
//Color switcher
const COLORS: ColorScheme[] = [
  {
    colorScheme: 0,
    schemeName: 'pink',
    bgColor: '#FFC8FA',
    bgColorRadialLight: '#FFC8FA',
    bgColorRadialDark: '#FFAEF8',
    logoLetterColor: '#FFFFFF',
    logoBgColor: '#FF2C2C',
    textColor: '#FF2C2C',
    buttonBgColor: '#FF2C2C',
    buttonColor: '#FFFFFF',
    deadKittenBgColor: '#FF2C2C',
    deadKittenText: '#FFFFFF',
    deadKittenNumber: '#FFBBF9',
    footerTextColor: '#FF2C2C'
  },
  {
    colorScheme: 1,
    schemeName: 'blue',
    bgColor: '#D5F5F4',
    bgColorRadialLight: '#D5F5F4',
    bgColorRadialDark: '#B1EDED',
    logoLetterColor: '#FFFFFF',
    logoBgColor: '#335A03',
    textColor: '#335A03',
    buttonBgColor: '#335A03',
    buttonColor: '#FFFFFF',
    deadKittenBgColor: '#335A03',
    deadKittenText: '#FFFFFF',
    deadKittenNumber: '#D5F5F4',
    footerTextColor: '#335A03'
  },
  {
    colorScheme: 2,
    schemeName: 'yellow',
    bgColor: '#F5FF65',
    bgColorRadialLight: '#F5FF65',
    bgColorRadialDark: '#F0FF00',
    logoLetterColor: '#FFFFFF',
    logoBgColor: '#2B00BA',
    textColor: '#2B00BA',
    buttonBgColor: '#2B00BA',
    buttonColor: '#FFFFFF',
    deadKittenBgColor: '#2B00BA',
    deadKittenText: '#FFFFFF',
    deadKittenNumber: '#F5FF65',
    footerTextColor: '#2B00BA'
  }
]

const currentColor = ref<ColorScheme | null>(null)
const colorList = [0, 1, 2]
const randomColor = () => {
  if (currentColor.value === null) {
    currentColor.value = COLORS[Math.floor(Math.random() * COLORS.length)]
    return
  }

  const possibleColors = COLORS.filter(color => color.colorScheme !== currentColor.value?.colorScheme)
  currentColor.value = possibleColors[Math.floor(Math.random() * possibleColors.length)]
}


const currentPattern = ref<number | null>(null)
const patternList = [0, 1, 2, 3, 4]
const randomPattern = () => {
  if (currentPattern.value === null) {
    currentPattern.value = patternList[Math.floor(Math.random() * patternList.length)]
    return
  }

  const possiblePatterns = patternList.filter(pattern => pattern !== currentPattern.value)
  currentPattern.value = possiblePatterns[Math.floor(Math.random() * possiblePatterns.length)]
}

const switchColorAndPattern = () => {
  randomColor()
  randomPattern()
}

// ES7 timer
const timer = (ms: number) => new Promise(res => setTimeout(res, ms))

// Don't click button mask animation
const homePage = useTemplateRef<HTMLDivElement>('homePage')
const deadKitten = useTemplateRef<HTMLDivElement>('deadKitten')
const closeButton = useTemplateRef<HTMLDivElement>('closeButton')
const timeOut = ref<NodeJS.Timeout | null>(null)

const toggleClass = () => {
  homePage.value?.classList.toggle('lulujeje-home--mask-animation')
  setTimeout(() => {
    deadKitten.value?.classList.toggle('lulujeje-dead-kitten--mask-animation')
  }, 800)
}

const animateMask = () => {
  incrementDeadKittenCounter()
  toggleClass()
  if (timeOut.value) clearTimeout(timeOut.value)
  blameOnUser.value = ''
  closeButton.value?.classList.remove('fade-up')
  timeOut.value =  setTimeout(typewriter, 1500)
}

// Dead kitten type text
const sentences = ref([
  'We told you not to click!',
  'Your curiosity killed the cat...',
  'Number of dead kitties: '
])
const blameOnUser = ref('')

const typewriter = async () => {
  for (const [sentenceIndex, sentence] of sentences.value.entries()) {
    for (let charIndex=0; charIndex <= sentence.length; charIndex++) {
      const currentChar = sentence.charAt(charIndex)
      blameOnUser.value+= currentChar
      await timer(40)
    }

    if (sentenceIndex < sentences.value.length - 1) blameOnUser.value+= '<br/>'
    await timer(60)
  }

  await timer(60)
  blameOnUser.value+= `<span>${deadKittenCounter.value}</span>`
  closeButton.value?.classList.add('fade-up')
}

onBeforeMount(() => {
  switchColorAndPattern()
})

onMounted(() => {
  fetchCounter()
})
</script>

<style lang="scss">
@use "~/assets/scss/mixin.scss" as *;

html, body {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.main-content {
  --bg-color: v-bind(currentColor.bgColor);

  --bg-color-radial-light: v-bind(currentColor.bgColorRadialLight);
  --bg-color-radial-dark: v-bind(currentColor.bgColorRadialDark);
  --logo-letter-color: v-bind(currentColor.logoLetterColor);
  --logo-bg-color: v-bind(currentColor.logoBgColor);
  --text-color: v-bind(currentColor.textColor);
  --button-bg-color: v-bind(currentColor.buttonBgColor);
  --button-color: v-bind(currentColor.buttonColor);

  --dead-kitten-bg-color: v-bind(currentColor.deadKittenBgColor);
  --dead-kitten-text: v-bind(currentColor.deadKittenText);
  --dead-kitten-number: v-bind(currentColor.deadKittenNumber);

  --footer-text-color: v-bind(currentColor.footerTextColor);
}

.lulujeje-dead-kitten {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

  background-image: url( '~/assets/images/deadcat.png' );
  background-color: var(--dead-kitten-bg-color);
  background-position: center center;
  background-size: 0 0;
  background-blend-mode: overlay;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  z-index: 1;
  left: 0;
  top: 0;

  p {
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

  button {
    @include button-reset();

    transition: all 0.6s ease-in;

    left: calc(50% - 12px);
    pointer-events: none;
    position: absolute;
    color: #FFFFFF;
    cursor: pointer;
    bottom: -40px;
    height: 32px;
    width: 32px;
    opacity: 0;

    &.fade-up {
      pointer-events: auto;
      bottom: 40px;
      opacity: 1;
    }

    svg {
      height: 32px;
      width: 32px;
    }
  }

  &--mask-animation {
    background-size: 256px 213px;
  }
}

.lulujeje-home {
  transform: translate3d(-50%, -50%, 0);
  transform-origin: center;
  transform-box: fill-box;

  clip-path: url(#dead-cat-mask);
  background-color: var(--bg-color);
  background-blend-mode: overlay;
  background-repeat: repeat;
  background-position: 0 0;
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
        transition: all 0.2s ease-in-out;
        fill: var(--logo-bg-color);
      }

      .logo-letter {
        transition: all 0.2s ease-in-out;
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
    width: calc(100% - 48px);
    padding: 0 24px 24px;
    position: absolute;
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    z-index: 3;
    bottom: 0;
    margin: 0;

    a {
      color: var(--footer-text-color);
      text-decoration: none;
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &--bg-0 {
    will-change: background;
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 0px, var(--bg-color-radial-dark) 15px, var(--bg-color-radial-light) 15px, var(--bg-color-radial-light) 30px);
    animation: bg0 1.6s linear infinite;
  }

  &--bg-1 {
    animation: bg1 4s linear infinite;
    background-image: url('~/assets/images/bg-1a.png');
    background-size: 200px 200px;
  }

  &--bg-2 {
    animation: bg1 4s linear infinite;
    background-image: url('~/assets/images/bg-1b.png');
    background-size: 200px 200px;
  }

  &--bg-3 {
    animation: bg2a 4s linear infinite;
    background-image: url('~/assets/images/bg-2a.png');
    background-size: 140px 140px;
  }

  &--bg-4 {
    animation: bg2b 4s linear infinite;
    background-image: url('~/assets/images/bg-2b.png');
    background-size: 140px 140px;
  }

  &--mask-animation {
    animation: mask-animation 0.8s forwards cubic-bezier(0.83, 0, 0.17, 1);
  }
}

@keyframes bg0 {
  0% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 0px, var(--bg-color-radial-dark) 20px, var(--bg-color-radial-light) 20px, var(--bg-color-radial-light) 40px);
  }
  2.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 1px, var(--bg-color-radial-dark) 21px, var(--bg-color-radial-light) 21px, var(--bg-color-radial-light) 41px);
  }
  5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 2px, var(--bg-color-radial-dark) 22px, var(--bg-color-radial-light) 22px, var(--bg-color-radial-light) 42px);
  }
  7.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 3px, var(--bg-color-radial-dark) 23px, var(--bg-color-radial-light) 23px, var(--bg-color-radial-light) 43px);
  }
  10% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 4px, var(--bg-color-radial-dark) 24px, var(--bg-color-radial-light) 24px, var(--bg-color-radial-light) 44px);
  }
  12.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 5px, var(--bg-color-radial-dark) 25px, var(--bg-color-radial-light) 25px, var(--bg-color-radial-light) 45px);
  }
  15% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 6px, var(--bg-color-radial-dark) 26px, var(--bg-color-radial-light) 26px, var(--bg-color-radial-light) 46px);
  }
  17.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 7px, var(--bg-color-radial-dark) 27px, var(--bg-color-radial-light) 27px, var(--bg-color-radial-light) 47px);
  }
  20% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 8px, var(--bg-color-radial-dark) 28px, var(--bg-color-radial-light) 28px, var(--bg-color-radial-light) 48px);
  }
  22.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 9px, var(--bg-color-radial-dark) 29px, var(--bg-color-radial-light) 29px, var(--bg-color-radial-light) 49px);
  }
  25% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 10px, var(--bg-color-radial-dark) 30px, var(--bg-color-radial-light) 30px, var(--bg-color-radial-light) 50px);
  }
  27.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 11px, var(--bg-color-radial-dark) 31px, var(--bg-color-radial-light) 31px, var(--bg-color-radial-light) 51px);
  }
  30% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 12px, var(--bg-color-radial-dark) 32px, var(--bg-color-radial-light) 32px, var(--bg-color-radial-light) 52px);
  }
  32.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 13px, var(--bg-color-radial-dark) 33px, var(--bg-color-radial-light) 33px, var(--bg-color-radial-light) 53px);
  }
  35% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 14px, var(--bg-color-radial-dark) 34px, var(--bg-color-radial-light) 34px, var(--bg-color-radial-light) 54px);
  }
  37.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 15px, var(--bg-color-radial-dark) 35px, var(--bg-color-radial-light) 35px, var(--bg-color-radial-light) 55px);
  }
  40% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 16px, var(--bg-color-radial-dark) 36px, var(--bg-color-radial-light) 36px, var(--bg-color-radial-light) 56px);
  }
  42.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 17px, var(--bg-color-radial-dark) 37px, var(--bg-color-radial-light) 37px, var(--bg-color-radial-light) 57px);
  }
  45% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 18px, var(--bg-color-radial-dark) 38px, var(--bg-color-radial-light) 38px, var(--bg-color-radial-light) 58px);
  }
  47.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 19px, var(--bg-color-radial-dark) 39px, var(--bg-color-radial-light) 39px, var(--bg-color-radial-light) 59px);
  }
  50% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 20px, var(--bg-color-radial-dark) 40px, var(--bg-color-radial-light) 40px, var(--bg-color-radial-light) 60px);
  }
  52.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 21px, var(--bg-color-radial-dark) 41px, var(--bg-color-radial-light) 41px, var(--bg-color-radial-light) 61px);
  }
  55% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 22px, var(--bg-color-radial-dark) 42px, var(--bg-color-radial-light) 42px, var(--bg-color-radial-light) 62px);
  }
  57.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 23px, var(--bg-color-radial-dark) 43px, var(--bg-color-radial-light) 43px, var(--bg-color-radial-light) 63px);
  }
  60% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 24px, var(--bg-color-radial-dark) 44px, var(--bg-color-radial-light) 44px, var(--bg-color-radial-light) 64px);
  }
  62.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 25px, var(--bg-color-radial-dark) 45px, var(--bg-color-radial-light) 45px, var(--bg-color-radial-light) 65px);
  }
  65% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 26px, var(--bg-color-radial-dark) 46px, var(--bg-color-radial-light) 46px, var(--bg-color-radial-light) 66px);
  }
  67.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 27px, var(--bg-color-radial-dark) 47px, var(--bg-color-radial-light) 47px, var(--bg-color-radial-light) 67px);
  }
  70% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 28px, var(--bg-color-radial-dark) 48px, var(--bg-color-radial-light) 48px, var(--bg-color-radial-light) 68px);
  }
  72.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 29px, var(--bg-color-radial-dark) 49px, var(--bg-color-radial-light) 49px, var(--bg-color-radial-light) 69px);
  }
  75% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 30px, var(--bg-color-radial-dark) 50px, var(--bg-color-radial-light) 50px, var(--bg-color-radial-light) 70px);
  }
  77.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 31px, var(--bg-color-radial-dark) 51px, var(--bg-color-radial-light) 51px, var(--bg-color-radial-light) 71px);
  }
  80% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 32px, var(--bg-color-radial-dark) 52px, var(--bg-color-radial-light) 52px, var(--bg-color-radial-light) 72px);
  }
  82.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 33px, var(--bg-color-radial-dark) 53px, var(--bg-color-radial-light) 53px, var(--bg-color-radial-light) 73px);
  }
  85% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 34px, var(--bg-color-radial-dark) 54px, var(--bg-color-radial-light) 54px, var(--bg-color-radial-light) 74px);
  }
  87.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 35px, var(--bg-color-radial-dark) 55px, var(--bg-color-radial-light) 55px, var(--bg-color-radial-light) 75px);
  }
  90% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 36px, var(--bg-color-radial-dark) 56px, var(--bg-color-radial-light) 56px, var(--bg-color-radial-light) 76px);
  }
  92.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 37px, var(--bg-color-radial-dark) 57px, var(--bg-color-radial-light) 57px, var(--bg-color-radial-light) 77px);
  }
  95% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 38px, var(--bg-color-radial-dark) 58px, var(--bg-color-radial-light) 58px, var(--bg-color-radial-light) 78px);
  }
  97.5% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 39px, var(--bg-color-radial-dark) 59px, var(--bg-color-radial-light) 59px, var(--bg-color-radial-light) 79px);
  }
  100% {
    background: repeating-radial-gradient(circle, var(--bg-color-radial-dark) 40px, var(--bg-color-radial-dark) 60px, var(--bg-color-radial-light) 60px, var(--bg-color-radial-light) 80px);
  }
}

@keyframes bg1 {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 200px 0;
  }
}

@keyframes bg2a {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -140px -140px;
  }
}

@keyframes bg2b {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 140px -140px;
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
