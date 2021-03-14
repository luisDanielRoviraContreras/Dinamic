<template>
  <div
    :class="{
      'activate-bg': $route.name.includes('activate')
    }"
    class="content-page fullScreen"
  >
    <nuxt-child />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  middleware: 'authenticated',
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default'
})
export default class myCard extends Vue {}
</script>
<style lang="sass" scoped>
.fullScreen
  padding-top: 0px !important
  padding-left: 240px
  padding-right: 0px
  padding-bottom: 0px
.activate-bg
  background: -color('color-2')
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
