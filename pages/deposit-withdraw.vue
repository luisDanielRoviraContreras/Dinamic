<template>
  <div class="content-page con-deposit-withdraw">
    <header class="header">
      <nuxt-link :class="{ notActive: getNotActive }" tag="button" to="/deposit-withdraw">
        Depositar
      </nuxt-link>
      <nuxt-link tag="button" to="/deposit-withdraw/withdraw/">
        Retirar
      </nuxt-link>
    </header>

    <div class="content-deposit-withdraw">
      <nuxt-child />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  middleware: 'authenticated',
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default'
})
export default class depositWithdraw extends Vue {
  get getNotActive () {
    return this.$route.name === 'deposit-withdraw-withdraw' || this.$route.name === 'deposit-withdraw-withdraw-cash'
  }
}
</script>
<style lang="sass" scoped>
.con-deposit-withdraw
  position: relative
  align-items: flex-start
  .content-deposit-withdraw
    margin-top: 50px
    width: 100%
    max-width: 900px
  .header
    width: auto
    position: fixed
    top: 0px
    left: 50%
    display: flex
    align-items: center
    justify-content: center
    padding-left: 240px
    z-index: 9000
    transform: translate(-50%)
    button
      cursor: pointer
      padding: 12px 16px
      border-radius: 0px 0px 15px 15px
      border: 0px
      margin: 0px 8px
      background: transparent
      font-weight: bold
      padding-top: 20px
      transition: all .25s ease
      position: relative
      color: -color('color')
      &:after
        content: ''
        position: absolute
        left: 0px
        top: 0px
        width: 100%
        height: 0%
        transition: all .25s ease
        background: -color('color')
        border-radius: inherit
        z-index: -1
      &.nuxt-link-active:not(.notActive)
        color: -color('bg')
        &:after
          height: 100%

// responsive
.content-mobile
  .header
    position: relative
    margin-bottom: 40px
    background: -color('bg-4')
    border-radius: 20px
    width: 100%
    max-width: 300px
    padding: 5px
    button
      width: 100%
      border-radius: 16px
      padding-top: 10px
      padding-bottom: 10px
  .con-deposit-withdraw
    padding-top: 70px !important

@media (max-width: 1150px)
  .con-deposit-withdraw
    .header
      padding-left: 0px
@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .con-deposit-withdraw
    display: block
    .content-deposit-withdraw
      margin-top: 0px
</style>
