<template>
  <!-- :style="{
      transform: `translate(0,${navBarTop}px)`
    }" -->
  <div
    v-if="!$route.name.includes('chat')"
    class="mobile-navbar"
  >
    <div class="menu-text">
      <button class="menu" @click="$emit('click', true)">
        <span class="line-1 line" />
        <span class="line-2 line" />
        <span class="line-3 line" />
      </button>
      <h2>
        {{ getName }}
      </h2>
    </div>

    <div class="btns">
      <button class="bell" @click="toggleQr">
        <i class="bx bx-scan" />
      </button>
      <button class="bell" @click="$router.push('/notifications')">
        <span class="badge">
          14
        </span>
        <i class="bx bx-bell" />
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Action } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as actions from '~/constants/actions'
@Component
export default class MobileNavbar extends Vue {
  @Prop({}) navBarTop!: number

  @Action(actions.QR) toggleQr!: Function

  get getName () {
    const name: any = this.$route.name
    // return this.names[this.$route.name] || null
    if (name.includes('deposit-withdraw-withdraw')) {
      return 'Retirar'
    } else if (name.includes('deposit-withdraw')) {
      return 'Depositar'
    }

    return null
  }
}
</script>
<style lang="sass" scoped>
.mobile-navbar
  position: absolute
  top: 0px
  width: 100%
  background: rgb(18, 22, 36)
  display: flex
  align-items: center
  justify-content: space-between
  z-index: 8000
  transition: top .25s ease
  touch-action: none
  .menu-text
    display: flex
    align-items: center
    justify-content: center
    h2
      display: block
      color: #fff
      font-size: .9rem
      font-weight: normal
      letter-spacing: 1px
  .badge
    min-width: 18px
    background: -color('color-2')
    color: #fff
    border-radius: 6px
    position: absolute
    top: 6px
    right: 4px
    font-weight: bold
    font-size: .7rem
  .btns
    padding-right: 15px
  .bell
    width: 40px
    height: 50px
    background: transparent
    color: #fff
    border: 0px
    position: relative
    i
      font-size: 1.4rem
  .menu
    width: 60px
    padding: 0px 17px
    padding-left: 18px
    height: 50px
    background: transparent
    color: #fff
    border: 0px
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    .line
      width: 25px
      height: 2px
      background: #fff
      position: relative
      display: block
      margin: 3px 0px
      &.line-1
        width: 15px
        align-self: flex-start
      &.line-3
        width: 15px
        align-self: flex-end
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
