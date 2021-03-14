<template>
  <div
    :class="{
      open
    }"
    :style="{
      transform: `translate(${getPercentLeft - 100}%)`
    }"
    class="mobile-sidebar"
  >
    <div class="con-logo">
      <c-logo />
    </div>
    <ul>
      <nuxt-link ref="index" exact tag="li" to="/">
        <i class="bx bx-home-alt" />
        <span>
          Inicio
        </span>
      </nuxt-link>
      <nuxt-link ref="wallet" tag="li" to="/wallet">
        <i class="bx bx-wallet" />
        <span>
          Billetera
        </span>
      </nuxt-link>
      <nuxt-link ref="deposit-withdraw" tag="li" to="/deposit-withdraw">
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
      </nuxt-link>
      <nuxt-link ref="transfer" tag="li" to="/transfer">
        <i class="bx bx-transfer" />
        <span>
          Transferencias
        </span>
      </nuxt-link>
      <nuxt-link ref="pay-services" tag="li" to="/pay-services">
        <i class="bx bxs-shopping-bags" />
        <span>
          Pagar Servicios
        </span>
      </nuxt-link>
      <nuxt-link ref="recharge-cell" tag="li" to="/recharge-cell">
        <i class="bx bx-mobile" />
        <span>
          Recargar Celular
        </span>
      </nuxt-link>
      <nuxt-link ref="my-card" tag="li" to="/my-card">
        <i class="bx bx-credit-card" />
        <span>
          Mi tarjeta iupayme
        </span>
      </nuxt-link>
      <nuxt-link ref="movements" tag="li" to="/movements">
        <i class="bx bx-trending-up" />
        <span>
          Movimientos
        </span>
      </nuxt-link>
      <span class="line" />
      <nuxt-link ref="sub-accounts" tag="li" to="/sub-accounts">
        <i class="bx bxs-user-detail" />
        <span>
          Sub-Cuentas
        </span>
      </nuxt-link>
      <nuxt-link ref="contacts" tag="li" to="/contacts">
        <i class="bx bx-user-check" />
        <span>
          Contactos Favoritos
        </span>
      </nuxt-link>
      <nuxt-link ref="chat" tag="li" to="/chat">
        <i class="bx bx-message-square-detail" />
        <span>
          Chat
        </span>
      </nuxt-link>
      <nuxt-link ref="user" tag="li" to="/user">
        <i class="bx bx-user" />
        <span>
          Mi Cuenta
        </span>
      </nuxt-link>
      <li>
        <button :class="{'active': themeDarken}" :title="`Theme ${ !themeDarken ? 'Dark' : 'Light'}`" class="li-darken switch-dark" @click="ChangeTheme">
          <div class="switch-con">
            <span class="circle">
              <!-- <i v-if="themeDarken" class="bx bx-brightness"></i> -->
              <i v-if="themeDarken" class="bx bxs-sun" />
              <i v-else class="bx bxs-moon" />
            </span>
          </div>
        </button>
      </li>
    </ul>
    <button class="sign-off" @click="handleSignOut">
      Cerrar Sesión
    </button>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import cLogo from '@/components/common/cLogo.vue'
@Component({
  components: {
    cLogo
  }
})
export default class MobileSidebar extends Vue {
  @Prop({ default: false }) open!: boolean
  @Prop({ default: null }) sidebarLeft!: number
  themeDarken: boolean = false

  handleSignOut () {
    this.$router.push('/login')
    this.$cookies.remove('authenticated')
  }

  get getPercentLeft () {
    let percent = this.sidebarLeft * 100 / 280

    if (percent > 100) {
      percent = 100
    } else if (percent < 0) {
      percent = 0
    }

    return percent
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
      background: -color('bg-4') !important
    &:active
      .circle
        background: -color('bg') !important
        width: 23px
        border-radius: 15px
        transform: translate(16px)
        // box-shadow: 0px 5px 15px 0px rgba(0,0,0,1)
        i
          transform: translate(-15px)
    .circle
      transform: translate(22px)
      i
        transform: translate(-15px)
  .switch-con
    width: 50px
    height: 27px
    background: -color('bg-2')
    border-radius: 20px
    box-shadow: inset 0px 0px 4px 0px rgba(0,0,0,.05)
    position: relative
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
.mobile-sidebar
  width: calc(100% - 30px)
  position: fixed
  max-width: 280px
  height: 100%
  background: -color('bg-2')
  z-index: 9000
  transform: translate(-100%)
  // transition: all .2s ease
  padding-bottom: env(safe-area-inset-bottom)
  // box-shadow: 0px 0px 25px 0px rgba(0,0,0,.04)
  border-radius: 0px 20px 20px 0px
  display: flex
  flex-direction: column
  justify-content: flex-start
  justify-content: space-between
  transition: background .2s ease
  .sign-off
    width: calc(100% - 50px)
    background: #121624
    border: 0px
    padding: 10px 20px
    color: #fff
    border-radius: 14px
    margin: 10px
    margin-left: 20px
    transition: all .25s ease
  &.open
    // background: transparent
    .sign-off
      width: calc(100vw - 40px)
  .con-logo
    width: 100%
    padding: 10px 25px
    min-height: 80px
    display: flex
    align-items: center
    justify-content: flex-start
    img
      max-width: 60px
      width: 100%
  ul
    overflow: auto
    max-height: calc(100vh - 145px)
    padding-bottom: 20px
    padding-top: 15px
    box-sizing: border-box
    padding-right: 10px
    li
      padding: 12px 20px
      display: flex
      align-items: center
      justify-content: flex-start
      font-size: .85rem
      transition: all .25s ease, background .25s ease .2s
      border-radius: 0px 25px 25px 0px
      margin-top: 4px
      &.nuxt-link-active
        color: -color('color-2')
        padding-left: 25px
        svg
          fill: -color('color-2')
      i
        font-size: 1.1rem
        margin-right: 10px
      svg
        margin-right: 10px
        width: 19px
        display: block
        fill: -color('color')
// responsive
// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
