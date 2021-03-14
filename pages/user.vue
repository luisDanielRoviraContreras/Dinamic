<template>
  <div class="content-page con-user">
    <header class="header">
      <nuxt-link exact tag="button" to="/user/">
        Mis Datos
      </nuxt-link>
      <nuxt-link exact tag="button" to="/user/security">
        Seguridad
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
export default class user extends Vue {}
</script>
<style lang="sass" scoped>
.con-user
  /deep/ ~ .sidebar
    .active
      opacity: 0 !important

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
.content-mobile
  .header
    position: relative
    margin-bottom: 0px
    background: -color('bg-4')
    border-radius: 20px
    width: 100%
    max-width: 300px
    padding: 5px
    left: 0px
    transform: translate(0)
    button
      width: 100%
      border-radius: 16px
      padding-top: 10px
      padding-bottom: 10px
      margin-left: 0px
      margin-right: 0px
@media (max-width: 1150px)
  .con-user
    .header
      padding-left: 0px
@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .con-user
    .header
      width: 100%
</style>
