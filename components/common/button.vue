<template>
  <button
    class="button"
    :class="[{
      border,
      transparent,
      block,
      gradient,
      icon,
      pink,
      gray,
      marginTop,
      white,
      loading,
    }, myClass]"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
    <div v-if="loading" class="load" />
  </button>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class Button extends Vue {
  @Prop({ type: Boolean }) border!: boolean
  @Prop({ type: Boolean }) transparent!: boolean
  @Prop({ type: Boolean }) block!: boolean
  @Prop({ type: Boolean }) gradient!: boolean
  @Prop({ type: Boolean }) icon!: boolean
  @Prop({ type: Boolean }) pink!: boolean
  @Prop({ type: Boolean }) gray!: boolean
  @Prop({ type: Boolean }) marginTop!: boolean
  @Prop({ type: Boolean }) white!: boolean
  @Prop({ type: Boolean }) loading!: boolean
  @Prop({ type: String }) myClass!: string
}
</script>
<style lang="sass" scoped>
.button
  padding: 0px 15px
  background: transparent
  border: 0px
  background: -color('color')
  color: -color('bg')
  border-radius: 15px
  cursor: pointer
  min-width: 50px
  box-sizing: border-box
  border: 2px solid transparent
  transition: all .25s ease
  max-height: 37px
  min-height: 37px
  display: flex
  align-items: center
  justify-content: center
  margin: 0px 5px
  box-shadow: 0px 3px 15px 0px -color('color', .05)
  &.loading
    color: -color('bg', .15)
    pointer-events: none
    user-select: none
  .load
    display: block
    width: 30px
    height: 30px
    position: absolute
    &:after
      content: ''
      position: absolute
      width: 100%
      height: 100%
      border-radius: 50%
      border: 3px solid -color('bg', 1)
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
      border: 3px dashed -color('bg',1)
      border-top: 3px solid -color('bg', 0)
      border-left: 3px solid -color('bg', 0)
      border-bottom: 3px solid -color('bg', 0)
      box-sizing: border-box
      transition: all .25s ease
      display: block
      box-shadow: 0px 0px 0px 0px -color('color',1)
      animation: loading .6s linear infinite
  &:disabled
    opacity: .5
    pointer-events: none
  &.white
    background: -color('bg')
    color: -color('color')
    box-shadow: 0px 3px 15px 0px -color('bg', .05)
  &.marginTop
    margin-top: 20px !important
  &.gray
    background: -color('bg-2')
    color: -color('color')
    font-weight: 500
    &:hover
      background: -color('color')
      color: -color('bg')
  &.pink
    background: -color('color-2')
    color: #fff
  &.icon
    width: 37px
    height: 37px
    padding: 0px
    min-width: 37px
  &.gradient
    background: linear-gradient(19deg, -color('color-2') 0%, -color('color-3') 100%)
    color: #fff
    box-shadow: 0px 4px 20px 0px -color('color-2', .35)
    &:hover
      transform: translate(0,3px)
      box-shadow: 0px 0px 0px 0px -color('color-2', .35)
  &.block
    width: 100%
    margin: 0px
    max-height: none
    padding: 11px 15px
    border-radius: 17px
  &:last-child
    margin-right: 0px
  i
    font-size: 1.2rem
  &:active
    opacity: .7
  &:not(.border):not(.transparent):not(.gradient):not(.gray):not(.white)
    &:hover
      opacity: .85
      // background: -color('color-2')
      // color: -color('bg')
  &.border
    border: 2px solid -color('color', .15)
    background: -color('bg')
    color: -color('color')
    box-shadow: 0px 3px 15px 0px -color('bg', .0)
    &:hover
      border: 2px solid -color('color', 1)
  &.transparent
    border: 2px solid transparent
    background: transparent
    color: -color('color')
    box-shadow: 0px 3px 15px 0px -color('bg', .0)
    &:hover
      border: 2px solid -color('color', 1)
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
