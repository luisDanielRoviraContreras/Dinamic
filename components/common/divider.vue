<template>
  <div :class="{ text }" class="divider">
    <span />
    <div v-if="$slots.default">
      <slot />
    </div>
    <span />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class Divider extends Vue {
  @Prop({ type: Boolean }) text!: boolean
}
</script>
<style lang="sass" scoped>
.divider
  position: relative
  display: flex
  align-items: center
  justify-content: space-between
  margin: 10px 0px
  &.text
    div
      font-size: .8rem
      white-space: nowrap
  div
    padding: 0px 15px
    font-weight: bold
  span
    display: block
    width: calc(100% - 15px)
    height: 2px
    background: -color('color', .1)
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
