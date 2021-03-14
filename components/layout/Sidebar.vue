<template>
  <div
    :class="{
      open
    }"
    class="sidebar"
  >
    <div class="con-logo" @click="$router.push('/')">
      <c-logo />
    </div>

    <div class="con-options">
      <div
        ref="active"
        class="active"
        :style="{
          top: `${effectTop}px`
        }"
      />
      <nuxt-link ref="index" to="/">
        <i class="bx bx-home-alt" />
        <span>
          Inicio
        </span>
        <i class="bx bxs-chevron-right arrow" />
      </nuxt-link>
      <nuxt-link ref="wallet" to="/wallet">
        <i class="bx bx-wallet" />
        <span>
          Billetera
        </span>
        <i class="bx bxs-chevron-right arrow" />
      </nuxt-link>
      <nuxt-link ref="deposit-withdraw" to="/deposit-withdraw">
        <svg
          id="Capa_1"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          style="enable-background:new 0 0 512 512;"
          xml:space="preserve"
        >
          <g>
            <g>
              <path
                d="M503.649,248.931c-7.445-11.262-18.841-18.892-32.09-21.485c-13.25-2.595-26.68,0.176-37.817,7.798l-84.525,57.81
                c-7.754-11.87-21.15-19.736-36.356-19.736h-53.556c-9.067-8.861-29.363-22.7-67.679-22.7c-48.812,0-69.786,20.663-74.035,25.515
                l-16.985,17.362l-9.117-17.463L0,323.795l88.389,169.301l91.488-47.763l-9.471-18.139H336.76l154.222-110.022
                C512.998,301.465,518.561,271.491,503.649,248.931z M101.123,452.536L40.56,336.53l38.195-19.94l60.563,116.006L101.123,452.536z
                M473.525,292.7L327.138,397.132H154.714l-39.474-75.61l24.19-24.728l0.334-0.211l0.563-0.779
                c1.58-1.674,15.403-15.126,51.299-15.126c34.715,0,46.822,14.024,48.284,15.897l3.782,6.802h69.169
                c7.358,0,13.344,5.986,13.344,13.344s-5.986,13.344-13.344,13.344h-90.281v30.061h90.281c21.023,0,38.597-15.024,42.563-34.898
                l95.291-65.172c4.439-3.039,9.794-4.14,15.07-3.109c5.279,1.033,9.821,4.074,12.787,8.561
                C484.513,274.497,482.298,286.441,473.525,292.7z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M377.593,18.904H162.118c-20.104,0-36.461,16.356-36.461,36.461V183.23c0,20.105,16.356,36.461,36.461,36.461h215.476
                c20.104,0,36.46-16.356,36.46-36.461V55.365C414.054,35.261,397.698,18.904,377.593,18.904z M383.993,183.23
                c-0.001,3.529-2.871,6.401-6.4,6.401H162.118c-3.529,0-6.401-2.87-6.401-6.401v-71.364h228.276V183.23z M383.993,81.806H155.717
                v-26.44c0-3.529,2.87-6.401,6.401-6.401h215.476c3.528,0,6.4,2.872,6.4,6.401V81.806z"
              />
            </g>
          </g>
          <g>
            <g>
              <rect x="173.752" y="141.422" width="47.097" height="30.057" />
            </g>
          </g>
        </svg>
        <span>
          Depositar y Retirar
        </span>
        <i class="bx bxs-chevron-right arrow" />
      </nuxt-link>
      <nuxt-link ref="transfer" to="/transfer">
        <i class="bx bx-transfer" />
        <span>
          Transferencias
        </span>
        <i class="bx bxs-chevron-right arrow" />
      </nuxt-link>
      <nuxt-link ref="pay-services" to="/pay-services">
        <i class="bx bxs-shopping-bags" />
        <span>
          Pagar Servicios
        </span>
        <i class="bx bxs-chevron-right arrow" />
      </nuxt-link>
      <nuxt-link ref="recharge-cell" to="/recharge-cell">
        <i class="bx bx-mobile" />
        <span>
          Recargar Celular
        </span>
        <i class="bx bxs-chevron-right arrow" />
      </nuxt-link>
      <nuxt-link ref="my-card" to="/my-card">
        <i class="bx bx-credit-card" />
        <span>
          Mi tarjeta iupayme
        </span>
        <i class="bx bxs-chevron-right arrow" />
      </nuxt-link>
      <nuxt-link ref="movements" to="/movements">
        <i class="bx bx-trending-up" />
        <span>
          Movimientos
        </span>
        <i class="bx bxs-chevron-right arrow" />
      </nuxt-link>
      <span class="line" />
      <nuxt-link ref="sub-accounts" to="/sub-accounts">
        <i class="bx bxs-user-detail" />
        <span>
          Sub-Cuentas
        </span>
        <i class="bx bxs-chevron-right arrow" />
      </nuxt-link>
      <nuxt-link ref="contacts" to="/contacts">
        <i class="bx bx-user-check" />
        <span>
          Contactos Favoritos
        </span>
        <i class="bx bxs-chevron-right arrow" />
      </nuxt-link>
      <nuxt-link ref="chat" to="/chat">
        <i class="bx bx-message-square-detail" />
        <span>
          Chat
        </span>
        <i class="bx bxs-chevron-right arrow" />
      </nuxt-link>
    </div>

    <footer class="footer-sidebar">
      <button :class="{'active': themeDarken}" :title="`Theme ${ !themeDarken ? 'Dark' : 'Light'}`" class="li-darken switch-dark" @click="ChangeTheme">
        <div class="switch-con">
          <span class="circle">
            <!-- <i v-if="themeDarken" class="bx bx-brightness"></i> -->
            <i v-if="themeDarken" class="bx bxs-sun" />
            <i v-else class="bx bxs-moon" />
          </span>
        </div>
      </button>
    </footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import cLogo from '@/components/common/cLogo.vue'
@Component({
  components: {
    cLogo
  }
})
export default class NavBar extends Vue {
  effectTop: number = 0

  themeDarken: boolean = false

  @Prop({}) open!: boolean

  @Watch('$route.path')
  handleRouter (val: string) {
    const id = val.split('/')[1]
    const el: any = (this.$refs[id] || this.$refs.index)

    const top = el.$el.offsetTop
    this.effectTop = top
  }

  @Watch('themeDarken')
  handleTheme (val: boolean) {
    document.body.classList.add('not-transition')
    if (val) {
      document.body.classList.add('darken')
    } else {
      document.body.classList.remove('darken')
    }
    setTimeout(() => {
      document.body.classList.remove('not-transition')
    }, 200)
  }

  ChangeTheme () {
    this.themeDarken = !this.themeDarken
  }
}
</script>
<style lang="sass" scoped>
.sidebar
  width: calc(100% - 20px)
  height: 100%
  max-width: 240px
  background: -color('bg')
  position: fixed
  top: 0px
  left: 0px
  border-radius: 0px 30px 30px 0px
  z-index: 2000
  transition: all .25s ease
  padding-bottom: 60px
  .con-logo
    min-height: 120px
    display: flex
    align-items: center
    justify-content: center
    font-weight: bold
    font-size: 1.5rem
    width: 100%
    color: -color('color')
    img
      width: 80px
    b
      color: -color('color-2')
  .con-options
    width: 100%
    height: auto
    margin-left: 10px
    position: relative
    .active
      position: absolute
      left: -10px
      height: 30px
      width: 5px
      background: -color('color')
      border-radius: 0px 15px 15px 0px
      margin-top: 5px
      transition: all .25s ease
    .line
      width: calc(100% - 50px)
      position: relative
      margin: 20px 15px
      height: 2px
      background: -color('color', .05)
      display: block
    a
      width: 100%
      box-sizing: border-box
      position: relative
      padding: 11px 10px
      padding-left: 15px
      border-radius: 15px
      cursor: pointer
      font-size: .9rem
      margin: 5px 0px
      // font-weight: bold
      display: flex
      align-items: center
      justify-content: flex-start
      color: -color('color')
      transition: all .25s ease
      z-index: 100
      overflow: hidden
      &:hover:not(.nuxt-link-active)
        background: -color('bg-2')
        padding-left: 20px
      &:after
        content: ''
        position: absolute
        left: 0px
        top: 0px
        width: 0px
        height: 100%
        background: -color('color')
        z-index: -1
        border-radius: inherit
        transition: all .25s ease
        box-shadow: 0px 0px 0px 0px -color('color', .1)
      i
        font-size: 1.1rem
        margin-right: 10px
        &.arrow
          position: absolute
          right: 0px
          opacity: 0
          transition: all .25s ease
          transform: scale(0)
          color: -color('bg')
      svg
        margin-right: 10px
        width: 19px
        display: block
        fill: -color('color')
      &.nuxt-link-active:not(:first-of-type), &.nuxt-link-exact-active
        color: -color('bg')
        transform: translate(10px)
        &:after
          width: 100%
          opacity: 1
          box-shadow: 0px 5px 20px 0px -color('color', .1)
          transform: translate(0px)
        i
          &.arrow
            opacity: 1
            transform: scale(1)
        svg
          fill: -color('bg')

.footer-sidebar
  position: absolute
  bottom: 0px
  padding: 15px

.switch-dark
  position: relative
  width: auto !important
  background: transparent
  border: 0px
  display: flex
  align-items: center
  cursor: pointer
  &:hover
    .switch-con
      background: -color('bg-2')
    .circle
      i
        opacity: 1
  &:active
    .circle
      width: 23px
      border-radius: 15px
      i
        transform: translate(20px)
  &.active
    .switch-con
      background: -color('bg-2') !important
    &:active
      .circle
        width: 23px
        border-radius: 15px
        transform: translate(16px)
        // box-shadow: 0px 5px 15px 0px rgba(0,0,0,1)
        i
          transform: translate(-19px)
    .circle
      transform: translate(22px)
      i
        transform: translate(-22px)
  .switch-con
    width: 50px
    height: 27px
    background: -color('bg-2')
    border-radius: 20px
    box-shadow: inset 0px 0px 4px 0px rgba(0,0,0,.05)
  .circle
    width: 17px
    height: 17px
    background: -color('bg')
    position: relative
    display: flex
    align-items: center
    justify-content: center
    border-radius: 50%
    margin: 5px
    box-shadow: 0px 3px 15px 0px rgba(0,0,0,.15)
    transition: transform .25s ease, width .25s ease !important
    transform: translate(0px)
    z-index: 10
    i
      transform: translate(23px)
      transition: transform .25s ease, font-size .25s ease, opacity .25s ease  !important
      font-size: .8rem !important
      z-index: -1
      color: -color('color')

// responsive
@media (max-height: 750px)
  .sidebar
    .con-logo
      min-height: 60px
@media (max-height: 675px)
  .sidebar
    .con-options
      a
        padding: 8px 10px
@media (max-width: 1150px)
  .sidebar
    transform: translate(calc(-100% - 50px))
    &.open
      transform: translate(0) !important

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
