<template>
  <label
    :class="{ danger }"
    class="checkbox"
    :for="_uid"
  >
    <div class="check">
      <input :id="_uid" :checked="value" type="checkbox" @change="handleChange">
      <i class="bx bx-check" />
      <div class="bg" />
    </div>
    <p>
      <slot />
    </p>
  </label>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class Checkbox extends Vue {
  @Prop({ default: '' }) value: any
  @Prop({ default: false }) danger!: boolean

  handleChange () {
    this.$emit('input', !this.value)
    this.$emit('change', !this.value)
  }
}
</script>
<style lang="sass" scoped>
.checkbox
  position: relative
  display: flex
  align-items: center
  justify-content: flex-start
  padding: 10px 0px
  &.danger
    color: -color('color-2')
    .check
      .bg
        border: 2px solid -color('color-2', .2)
  p
    cursor: pointer
    font-size: .9rem
  .check
    width: 25px
    height: 25px
    border: 2px
    display: flex
    align-items: center
    justify-content: center
    border-radius: 8px
    position: relative
    z-index: 10
    margin-right: 10px
    cursor: pointer
    .bg
      width: 100%
      height: 100%
      position: absolute
      top: 0px
      left: 0px
      border-radius: inherit
      border: 2px solid -color('color', .1)
      z-index: -2
      transition: all .25s ease
    input
      width: 25px
      height: 25px
      opacity: 0
      cursor: pointer
      &:checked
        ~ .bg
          background: -color('color')
        ~ i
          opacity: 1
          transform: scale(1)
    i
      transform: scale(.5)
      position: absolute
      opacity: 0
      transition: all .25s ease
      font-size: 1.4rem
      margin-top: -1px
      color: #fff
      z-index: -1

// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
