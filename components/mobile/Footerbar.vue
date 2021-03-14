<template>
  <div
    v-if="!$route.fullPath.includes('/chat/?chat')"
    class="footer-bar"
    @scroll.prevent
  >
    <nuxt-link ref="index" tag="button" exact to="/">
      <i class="bx bx-home-alt" />
    </nuxt-link>
    <nuxt-link ref="wallet" tag="button" to="/wallet">
      <i class="bx bx-wallet" />
    </nuxt-link>
    <button
      ref="morado"
      class="morado"
      :class="{ active: activeSubButtons }"
      @click="handleClickSub"
      @blur="handleBlurSub"
    >
      <i class="bx bx-transfer" />
      <div :class="{ active: activeSubButtons }" class="btn1" @click="toggleQr">
        <span>Escanear QR</span>
        <img src="~/assets/qr.svg" alt="">
      </div>
      <nuxt-link :class="{ active: activeSubButtons }" class="btn3" tag="div" to="/transfer">
        <span>Mostrar mi QR</span>
        <img src="~/assets/qr2.svg" alt="">
      </nuxt-link>
      <!-- <nuxt-link :class="{ active: activeSubButtons }" class="btn3" tag="div" to="/transfer">
        <span>Historial</span>
        <img src="~/assets/historico.svg" alt="">
      </nuxt-link> -->
    </button>
    <nuxt-link ref="chat" tag="button" to="/chat">
      <i class="bx bx-message-square-detail" />
    </nuxt-link>
    <nuxt-link ref="user" tag="button" to="/user">
      <i class="bx bx-user" />
    </nuxt-link>

    <span
      ref="line"
      class="line"
    >
      <div ref="effect" class="effect" />
    </span>
  </div>
</template>
<script lang="ts">
import { Action } from 'vuex-class'
import { Component, Vue, Watch } from 'vue-property-decorator'
import * as actions from '~/constants/actions'
@Component
export default class FooterBar extends Vue {
  offsetLeft: number = 0
  activeSubButtons: boolean = false

  @Action(actions.QR) toggleQr!: Function

  handleClickSub () {
    this.$nextTick(() => {
      this.activeSubButtons = !this.activeSubButtons
    })
  }

  handleBlurSub () {
    this.$nextTick(() => {
      this.activeSubButtons = false
    })
  }

  @Watch('$route.path')
  handleRouter (val: string) {
    const id = val.replace('/', '')
    const el: any = (this.$refs[id] || this.$refs.index)
    if (!el) {
      return
    }
    const left = el.$el.offsetLeft + (el.$el.offsetWidth / 2) - 2
    const line = (this.$refs.line as HTMLElement)
    const effect = (this.$refs.effect as HTMLElement)
    if (left > line.offsetLeft) {
      effect.style.width = `${left - line.offsetLeft}px`
      setTimeout(() => {
        effect.style.width = '4px'
        line.style.left = `${left}px`
      }, 200)
    } else {
      effect.style.width = `${line.offsetLeft - left + 1}px`
      effect.style.transform = `translate(-${line.offsetLeft - left - 1}px)`
      setTimeout(() => {
        effect.style.width = '4px'
        effect.style.transform = 'translate(0%)'
        line.style.left = `${left}px`
      }, 200)
    }
    setTimeout(() => {
      if (this.$refs.morado) {
        (this.$refs.morado as HTMLElement).blur()
      }
    }, 200)
  }
}
</script>
<style lang="sass" scoped>
.footer-bar
  position: fixed
  bottom: 0px
  width: 100%
  background: rgb(18, 22, 36)
  color: #fff
  display: flex
  align-items: flex-start
  justify-content: space-around
  border-radius: 30px 30px 0px 0px
  padding: 0px 15px
  padding-bottom: 5px
  padding-bottom: env(safe-area-inset-bottom)
  min-height: 65px
  z-index: 10000
  transition: all .25s ease
  touch-action: none
  .line
    position: absolute
    left: 47px
    top: 50px
    border-radius: 10px
    background: #fff
    width: 4px
    height: 4px
    transition: all .25s ease
    opacity: 0
    .effect
      width: 4px
      height: 4px
      background: inherit
      position: absolute
      left: 0px
      top: 0px
      border-radius: 10px
      transition: all .25s ease
  >button
    width: calc(20% - 6px)
    height: 60px
    display: flex
    align-items: center
    justify-content: center
    margin: 0px
    background: transparent
    color: #fff
    border: 0px
    opacity: .3
    outline: none
    transition: all .25s ease
    &.morado
      background: linear-gradient(19deg, -color('color-2') 0%, -color('color-3') 100%)
      opacity: 1
      border-radius: 24px
      height: 60px
      width: 60px
      margin-top: -18px
      position: relative
      transition: all .25s ease
      &.active
        transform: scale(1.1)
      div.active
        opacity: 1 !important
        pointer-events: auto
        transform: scale(1)
        &.btn1.active
          top: -50px !important
          left: -40px !important
        &.btn2.active
          top: -65px
          left: 3px
        &.btn3.active
          top: -50px
          left: 50px
      div
        background: linear-gradient(19deg, -color('color-2') 0%, -color('color-3') 100%)
        position: absolute
        border: 0px
        width: 50px
        height: 50px
        border-radius: 20px
        display: flex
        align-items: center
        justify-content: center
        opacity: 0
        transition: all .25s ease, opacity .15s
        top: 3px
        left: 3px
        pointer-events: none
        z-index: -1
        transform: scale(.5)
        span
          font-size: .55rem
          white-space: nowrap
          position: absolute
          top: -22px
          color: #fff
          font-weight: bold
          background: linear-gradient(19deg, -color('color-2') 0%, -color('color-3') 100%)
          padding: 3px 6px
          border: 0px
          display: block
          border-radius: 8px
        img
          width: 26px
          z-index: 10
    &.nuxt-link-active
      opacity: 1
      ~ .line
        opacity: 1
    i
      font-size: 1.5rem
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
