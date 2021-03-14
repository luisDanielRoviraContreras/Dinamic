<template>
  <transition name="loadingx">
    <div
      v-if="loading"
      class="loading-page"
    >
      <div class="load" />
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class nameComponent extends Vue {
  loading: boolean = true

  mounted () {
    this.loading = false
  }

  start () {
    this.loading = true
  }

  finish () {
    this.loading = false
  }
}
</script>
<style lang="sass" scoped>
.loadingx-enter-active, .loadingx-leave-active
  transition: all .25s ease

.loadingx-enter, .loadingx-leave-to
  opacity: 0

// responsive
.loading-page
  position: fixed
  width: 100%
  z-index: 9500
  height: 100%
  background: -color('bg-2', 1)
  top: 0px
  left: 0px
  display: flex
  align-items: center
  justify-content: center
  .load
    display: block
    width: 40px
    height: 40px
    position: relative
    &:after
      content: ''
      position: absolute
      width: 100%
      height: 100%
      border-radius: 50%
      border: 3px solid -color('color', 1)
      border-top: 3px solid -color('bg', 0)
      border-left: 3px solid -color('bg', 0)
      border-bottom: 3px solid -color('bg', 0)
      box-sizing: border-box
      transition: all .25s ease
      display: block
      box-shadow: 0px 0px 0px 0px -color('color',1)
      animation: loading .6s ease infinite
    &:before
      content: ''
      position: absolute
      width: 100%
      height: 100%
      border-radius: 50%
      border: 3px dashed -color('color',1)
      border-top: 3px solid -color('bg', 0)
      border-left: 3px solid -color('bg', 0)
      border-bottom: 3px solid -color('bg', 0)
      box-sizing: border-box
      transition: all .25s ease
      display: block
      box-shadow: 0px 0px 0px 0px -color('color',1)
      animation: loading .6s linear infinite

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
