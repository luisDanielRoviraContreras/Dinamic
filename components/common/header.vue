<template>
  <div class="header">
    <div>
      <slot />
    </div>

    <div class="interactions">
      <slot name="interactions" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Header extends Vue {}
</script>
<style lang="sass" scoped>
.header
  width: 100%
  position: relative
  display: flex
  align-items: center
  justify-content: space-between
  h3
    font-size: 1.1rem
  .interactions
    display: flex
    align-items: center
    justify-content: center
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
