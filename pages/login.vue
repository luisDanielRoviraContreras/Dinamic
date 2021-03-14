<template>
  <div
    :class="{
      'illus-visible': isMobile && illus == 'active',
    }"
    class="con-login"
  >
    <button
      ref="qr"
      class="code-qr"
      :class="{'active': activeQr}"
      @click="activeQr = !activeQr"
    >
      <h5>
        Mi Código QR
      </h5>
      <img v-show="!activeQr" src="/qr.png" alt="">
      <i class="bx bx-x" />
    </button>
    <transition name="slide-qr">
      <div
        v-if="activeQr"
        class="con-code-qr"
      >
        <div class="con-qr">
          <h4>
            Mi Codigo QR
          </h4>
          <p>
            Este es el código QR de tu Billetera <b>Dinamic</b> muéstrelo para recibir al toque pagos desde otras billeteras
          </p>
          <img src="/qr.png" alt="">
          <footer>
            <Button gradient block @click="handleShare">
              <i class="bx bx-share-alt" /> Compartir mi QR
            </Button>

            <c-input value="https://Dinamic.herokuapp.com/qr/?id='1'" copy label-center>
              Copiar código QR
            </c-input>
          </footer>
        </div>
      </div>
    </transition>

    <div
      v-if="isMobile && illus == 'active'"
      class="con-intro"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <!-- @touchstart="onTouchStart"

      @touchmove="onTouchMove" -->
      <div class="con-logo">
        <img src="/logo_Dinamic_1.svg" alt="">
      </div>

      <div
        class="con-illustrations"
      >
        <div
          ref="illus"
          class="content-illus"
        >
          <transition :name="directionLess ? 'illus-invert' : 'illus'">
            <!-- v-if="illustrationActive === 0" -->
            <div
              class="con-illustration"
            >
              <img src="/illustration/pay.png" alt="">
              <p>
                Paga en cualquier lugar ya sea físicamente o de manera online
              </p>
            </div>
          </transition>
          <transition :name="directionLess ? 'illus-invert' : 'illus'">
            <!-- v-if="illustrationActive === 1" -->
            <div
              class="con-illustration"
            >
              <img src="/illustration/check.png" alt="">
              <p>
                Con <b>Dinamic</b> pagos, transferencias y recargas con plena seguridad
              </p>
            </div>
          </transition>
          <transition :name="directionLess ? 'illus-invert' : 'illus'">
            <!-- v-if="illustrationActive === 2" -->
            <div
              class="con-illustration"
            >
              <img src="/illustration/card.png" alt="">
              <p>
                Obtén tu tarjeta <b>Dinamic</b> al toque
              </p>
            </div>
          </transition>
        </div>
      </div>
      <div class="footer-illus">
        <div class="con-buttons con-buttons-illus">
          <button
            :class="{
              active: illustrationActive == 0
            }"
            @click="illustrationActive = 0"
          />
          <button
            :class="{
              active: illustrationActive == 1
            }"
            @click="illustrationActive = 1"
          />
          <button
            :class="{
              active: illustrationActive == 2
            }"
            @click="illustrationActive = 2"
          />
        </div>
        <footer
          :class="{'visible': true}"
          class="footer"
        >
          <Button block @click="handleLocalStorage(false), isMobile = false">
            Ingresar
          </Button>
          <Button block gradient @click="handleLocalStorage(true), $router.push('/register/')">
            Crear Cuenta
          </Button>
        </footer>
      </div>
    </div>

    <div class="con-slide">
      <transition name="slide">
        <div
          v-if="slideActive == 0"
          class="item-1 item"
        >
          <p>
            Compra, realiza pagos, transfiere, <br> has recargas todo con tu tarjeta <b>Dinamic!</b>
          </p>
        </div>
      </transition>
      <transition name="slide">
        <div v-if="slideActive == 1" class="item-2 item">
          <p>
            Compra con tu <b>tarjeta virtual Dinamic</b> <br> en cualquier comercio o de manera online
          </p>
        </div>
      </transition>
      <transition name="slide">
        <div v-if="slideActive == 2" class="item-3 item">
          <p>
            Ahora con <b>Dinamic</b> tus hijos pueden tener <br> su propia tarjeta
          </p>
        </div>
      </transition>
      <transition name="slide">
        <div v-if="slideActive == 3" class="item-4 item">
          <p>
            Chatea y envía dinero a tus amigos <br> de forma rápida y segura
          </p>
        </div>
      </transition>
      <div class="con-buttons">
        <button
          :class="{
            active: slideActive == 0
          }"
          @click="slideActive = 0"
        />
        <button
          :class="{
            active: slideActive == 1
          }"
          @click="slideActive = 1"
        />
        <button
          :class="{
            active: slideActive == 2
          }"
          @click="slideActive = 2"
        />
        <button
          :class="{
            active: slideActive == 3
          }"
          @click="slideActive = 3"
        />
      </div>
    </div>

    <div class="con-child">
      <nuxt-child />

      <footer>
        <nuxt-link to="/login/terms">
          Términos y condiciones
        </nuxt-link>
        <nuxt-link to="/login/FAQs">
          Preguntas Frecuentes
        </nuxt-link>
      </footer>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
import cInput from '@/components/common/input.vue'
@Component({
  layout: ({ isMobile }) => isMobile ? 'mobile-login' : 'clean',
  components: {
    Button,
    cInput
  }
})
export default class ConLogin extends Vue {
  illustrationActive: number = 0
  illus: string = 'none'
  slideActive: number = 1
  interval: any = null
  slides: number = 3
  isMobile: boolean = true
  directionLess: boolean = false
  touchStart: any = {
    x: 0,
    y: 0
  }

  scrollLeft: number = 0
  slidePause: boolean = false
  vh: number = 0
  activeQr: boolean = false

  @Watch('isMobile')
  handleRoute (val) {
    if (!val) {
      document.body.classList.remove('illus-visible')
    }
  }

  @Watch('illustrationActive')
  handleIllustrationActive (val) {
    this.touchStart.x = 0
    this.touchStart.y = 0
    const illus = (this.$refs.illus as HTMLElement)
    if (val === 0) {
      illus.scrollLeft = 0
    } else if (val === 1) {
      illus.scrollLeft = window.innerWidth
    } else {
      illus.scrollLeft = (window.innerWidth * 2)
    }
  }

  @Watch('slideActive')
  handleActive () {
    clearInterval(this.interval)
    this.intervalSlide()
  }

  handleShare () {
    let newVariable: any

    // eslint-disable-next-line prefer-const
    newVariable = window.navigator

    if (newVariable && newVariable.share) {
      newVariable.share({
        title: 'iu - Mi código QR',
        url: 'https://Dinamic.herokuapp.com/qr/?id="1"'
      }).then(() => {
      })
    } else {
      window.open('https://api.whatsapp.com/send?text=Mi%20Código%20QR%20https%3A%2F%2FDinamic.herokuapp.com%2Fqr%2F?id="1"')
    }
  }

  handleLocalStorage (change: boolean) {
    localStorage.illus = 'none'
    this.slideActive = 0

    if (!localStorage.guide && !change) {
      this.$guide({
        el: this.$refs.qr,
        title: 'Mi Código QR',
        text: 'Este es el código QR de tu cuenta que puedes compartir para transferencias y mucho mas sin necesidad de ingresar a iu',
        click: () => {
          localStorage.guide = true
        }
      })
    }
  }

  intervalSlide () {
    this.interval = setInterval(() => {
      if (this.slideActive < this.slides) {
        this.slideActive++
      } else {
        this.slideActive = 0
      }
    }, 8000)
  }

  toggleIllustration (to: boolean) {
    this.touchStart.x = 0
    this.touchStart.y = 0
    if (to) {
      if (this.illustrationActive < 2) {
        this.directionLess = false
        this.$nextTick(() => {
          this.illustrationActive++
        })
      }
    } else if (this.illustrationActive > 0 && !to) {
      this.directionLess = true
      this.$nextTick(() => {
        this.illustrationActive--
      })
    }

    this.slidePause = true
  }

  // side swipe
  onTouchStart (e: any) {
    this.touchStart = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    }
  }

  onTouchMove (e: any) {
    if (this.slidePause) {
      return
    }
    const dx = e.changedTouches[0].clientX - this.touchStart.x
    const dy = e.changedTouches[0].clientY - this.touchStart.y
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
      if (Math.sign(dx) === -1) {
        this.toggleIllustration(true)
      } else {
        this.toggleIllustration(false)
      }
    }
  }

  onTouchEnd (e: any) {
    this.slidePause = false
    const dx = e.changedTouches[0].clientX - this.touchStart.x
    const dy = e.changedTouches[0].clientY - this.touchStart.y
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
      if (Math.sign(dx) === -1) {
        this.toggleIllustration(true)
      } else {
        this.toggleIllustration(false)
      }
    }
    // const illus = (this.$refs.illus as HTMLElement)

    // this.$nextTick(() => {
    //   if (this.scrollLeft > (window.innerWidth * 2) - (window.innerWidth * 55 / 100)) {
    //     illus.scrollLeft = (window.innerWidth * 2)
    //   } else if (this.scrollLeft > window.innerWidth - (window.innerWidth * 55 / 100)) {
    //     illus.scrollLeft = window.innerWidth
    //   } else {
    //     illus.scrollLeft = 0
    //   }
    // })
  }

  mounted () {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    this.vh = window.innerHeight

    this.intervalSlide()
    this.isMobile = window.__NUXT__.layout === 'mobile-login'

    this.illus = localStorage.illus || 'active'

    if (this.illus !== 'none' && this.$refs.illus) {
      this.$nextTick(() => {
        document.body.classList.add('illus-visible')
      })
    } else if (!localStorage.guide && this.illus === 'none') {
      this.$guide({
        el: this.$refs.qr,
        title: 'Mi Código QR',
        text: 'Este es el código QR de tu cuenta que puedes compartir para transferencias y mucho mas sin necesidad de ingresar a iu',
        click: () => {
          localStorage.guide = true
        }
      })
    }
  }
}
</script>
<style lang="sass">
.illus-visible
  height: 100vh
  overflow: hidden
.slide-enter-active, .slide-leave-active
  transition: transform .25s ease, opacity .25s ease

.slide-enter
  opacity: 0
  transform: translate(-100px)
.slide-leave-to
  opacity: 0
  transform: translate(100px)

.slide-qr-enter-active, .slide-qr-leave-active
  transition: all .25s ease

.slide-qr-enter, .slide-qr-leave-to
  transform: translate(100%)

.con-code-qr
  width: 100%
  position: fixed
  top: 0px
  right: 0px
  height: 100vh
  background: -color('bg', .9)
  z-index: 1000
  display: flex
  align-items: center
  justify-content: center
  backdrop-filter: saturate(180%) blur(15px)
  .con-qr
    width: 100%
    max-width: 400px
    padding: 20px
    text-align: center
    >i
      margin-right: 8px
    footer
      display: flex
      align-items: center
      justify-content: center
      padding: 10px
      .button
        display: none
    p
      font-size: .8rem
      padding: 15px 0px
      b
        font-weight: bold
    img
      width: 100%
      border-radius: 20px
.code-qr
  position: fixed
  right: 0px
  top: 0px
  z-index: 1001
  padding: 5px
  background: -color('bg')
  display: flex
  align-items: center
  justify-content: center
  border-radius: 0px 0px 0px 20px
  box-shadow: 0px 4px 20px 0px rgba(0,0,0,.1)
  border: 0px
  flex-direction: column
  transition: all .25s ease
  cursor: pointer
  width: 70px
  height: 60px
  &.active
    h5
      opacity: 0
    i
      transform: rotate(0)
      opacity: 1
      display: block
  i
    font-size: 2rem
    transform: rotate(90deg)
    transition: all .25s ease
    opacity: 0
    position: absolute
  h5
    font-size: .5rem
    z-index: 10
  img
    transition: all .25s ease
    width: 35px
    height: 35px
    border-radius: inherit
    max-width: 370px
    max-height: 370px
    z-index: 10

.con-intro
  width: 100%
  height: 100vh
  // height: unquote('calc(var(--vh, 1vh) * 100)')
  position: fixed
  z-index: 10000
  left: 0px
  top: 0px
  background: -color('bg')
  display: flex
  align-items: center
  justify-content: stretch
  flex-direction: column
  overflow: hidden
  display: none
  padding-bottom: calc(52px + env(safe-area-inset-bottom))
  .footer-illus
    width: 100%
  .footer
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
    padding: 20px
    pointer-events: none
    opacity: 0
    transition: all .25s ease
    transform: scale(.8)
    &.visible
      transform: scale(1)
      opacity: 1
      pointer-events: auto
    button
      max-width: calc(50% - 5px)
  .con-buttons
    position: relative
    display: flex
    align-items: center
    justify-content: center
    margin-top: 20px
    button
      width: 14px
      height: 6px
      display: block
      margin-right: 10px
      border: 0px
      background: -color('bg-4')
      border-radius: 10px
      cursor: pointer
      display: flex
      align-items: center
      justify-content: center
      position: relative
      transition: all .25s ease
      &:after
        content: ''
        position: absolute
        width: 100%
        height: 14px
        background: transparent
        min-width: 14px
      &.active
        width: 30px
        background: -color('color-2')
  .con-illustrations
    width: 100%
    height: auto
    position: relative
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    height: calc(100vh - 260px - env(safe-area-inset-bottom))
    p
      padding: 10px 15px
    .content-illus
      height: auto
      width: 100%
      display: flex
      align-items: center
      justify-content: flex-start
      overflow: hidden
      scroll-behavior: smooth
      &::-webkit-scrollbar
        height: 0px
    &::-webkit-scrollbar
      height: 0px
    .con-illustration
      width: 100vw
      min-width: 100vw
      display: flex
      align-items: center
      justify-content: center
      text-align: center
      flex-direction: column
      position: relative
      padding: 10px
      p
        min-height: 50px
        display: block
        b
          font-weight: 600
      img
        width: 100%
        max-width: 320px
        max-height: 460px
  .con-logo
    width: 100%
    padding: 20px
    display: flex
    align-items: center
    justify-content: center
    padding-bottom: 0px
    img
      width: 100%
      max-width: 80px
      background: #fff

.con-login
  display: flex
  align-items: center
  justify-content: center
  min-height: 100vh
.con-child
  width: 630px
  background: -color('bg')
  height: 100vh
  border-radius: 30px 0px 0px 30px
  margin-left: -30px
  position: relative
  z-index: 2
  padding-bottom: 100px
  display: flex
  align-items: center
  justify-content: center
  z-index: 100
  position: relative
  >footer
    position: absolute
    bottom: 10px
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    margin-bottom: env(safe-area-inset-bottom)
    a
      padding: 10px
      color: -color('color')
      font-size: .8rem
      transition: all .25s ease
      &:hover
        opacity: .6
.con-slide
  width: calc(100% - 600px)
  position: relative
  height: 100vh
  z-index: 10
  .con-buttons
    z-index: 10
    position: absolute
    bottom: 0px
    display: flex
    align-items: center
    justify-content: center
    padding: 40px
    button
      width: 6px
      height: 6px
      display: block
      margin-right: 10px
      border: 0px
      background: #fff
      border-radius: 10px
      cursor: pointer
      display: flex
      align-items: center
      justify-content: center
      position: relative
      transition: all .25s ease
      &:after
        content: ''
        position: absolute
        width: 100%
        height: 14px
        background: transparent
        min-width: 14px
      &.active
        width: 20px
  .item
    width: 100%
    height: 100vh
    position: absolute
    background-size: cover
    background-position: -200px
    display: flex
    align-items: flex-end
    justify-content: flex-start
    color: #fff
    font-size: 1.5rem
    padding: 40px
    z-index: 1
    p
      margin-bottom: 40px
    &:after
      content: ''
      position: absolute
      bottom: 0px
      left: 0px
      width: 100%
      height: 400px
      background-image: linear-gradient(180deg, rgba(0,0,0,0) 25%, rgba(0,0,0,.5) 100%)
      z-index: -1
    b
      font-weight: bold
      font-style: italic
  .item-1
    background-image: url('/illustration/bg-2.png')
  .item-2
    background-image: url('/06.jpg')
  .item-3
    background-image: url('/illustration/bg-4.png')
  .item-4
    background-image: url('/illustration/bg-3.png')
// responsive
@media all and (display-mode: standalone)
  .con-intro
    height: 100vh
    padding-bottom: 0px
  .con-child
    min-height: calc(100vh - 300px)
  .con-slide
    height: 330px

@media (max-width: 1280px)
  .con-slide
    width: calc(100% - 470px)
  .con-child
    width: 500px
@media (max-width: 1000px)
  .con-slide
    width: 100%
    height: 40vh
    .con-buttons
      padding: 20px
      margin-bottom: 30px
      left: 50%
      transform: translate(-50%)
    .item
      height: 100%
      background-size: cover
      background-position: 0 0px
      p
        margin-bottom: 35px
        font-size: 1.3rem
  .con-login
    flex-direction: column
  .con-child
    position: absolute
    bottom: 0px
    width: 100%
    margin-left: 0px
    border-radius: 30px 30px 0px 0px
    height: calc(60vh + 30px)
    margin-top: -30px
@media (max-width: 1000px)
  .con-slide
    .item
      p
        width: 100%
        text-align: center

@media (orientation: portrait)
  .illus-enter-active, .illus-leave-active
    transition: all .25s ease

  .illus-enter
    transform: translate(100%)
  .illus-leave-to
    transform: translate(-100%)

  .illus-invert-enter-active, .illus-invert-leave-active
    transition: all .25s ease

  .illus-invert-enter
    transform: translate(-100%)
  .illus-invert-leave-to
    transform: translate(100%)

@media (max-width: 812px) and (orientation: landscape)
  .con-child
    height: auto
    position: relative
  .con-intro
    overflow-y: auto
    display: block
    .con-logo
      padding: 10px
      margin-top: 0px
      margin-bottom: 0px
    .con-illustrations
      padding-bottom: 0px
      overflow: hidden
      .footer
        padding: 10px
      .content-illus
        height: auto
      .con-illustration
        position: relative
        flex-direction: row
        height: calc(100vh - 130px)
        p
          padding: 20px
          max-width: 400px
        img
          position: absolute
          top: 0px
          left: 0px
          z-index: -1
          height: 100vh
          width: auto
          opacity: .6
@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .con-code-qr
    .con-qr
      footer
        .button
          display: flex
        .con-input
          display: none
  .con-intro
    display: flex
  .con-child
    height: auto
    position: relative
    min-height: calc(100vh - 220px)
    padding-bottom: 30px
  .con-slide
    height: 250px
    .item
      p
        font-size: .85rem
        br
          display: none
@media (max-height: 640px) and (max-width: 812px)
  .con-slide
    display: none
  .con-child
    min-height: 100vh
    margin-top: 0px
@media (max-width: 360px)
  .con-child
    > footer
      a
        padding: 10px 5px
        font-size: .7rem
        font-weight: bold
</style>
