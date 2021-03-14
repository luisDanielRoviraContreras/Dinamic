<template>
  <div class="content-page con-pay-services">
    <header class="header">
      <nuxt-link :exact="$route.name == 'pay-services-automatic'" tag="button" to="/pay-services">
        Pagar Servicio
      </nuxt-link>
      <nuxt-link exact tag="button" to="/pay-services/automatic">
        Pagos Automáticos
      </nuxt-link>
    </header>

    <div class="con-child">
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
export default class PayServices extends Vue {}
</script>
<style lang="sass" scoped>
.con-child
  width: 100%
  display: flex
  align-items: center
  justify-content: center
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
    &.nuxt-link-active
      color: -color('bg')
      &:after
        height: 100%
// responsive
// responsive
.content-mobile
  .header
    position: relative
    margin-left: auto
    margin-bottom: 0px
    background: -color('bg-4')
    border-radius: 20px
    width: calc(100% - 20px)
    max-width: 340px
    margin-left: auto
    margin-right: auto
    padding: 5px
    left: 0px
    transform: translate(0px)
    button
      width: 100%
      border-radius: 16px
      padding-top: 10px
      padding-bottom: 10px
      font-size: .8rem
      padding: 10px 5px
  .con-pay-services
    padding-top: 70px !important
@media (max-width: 1150px)
  .con-pay-services
    .header
      padding-left: 0px
// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
