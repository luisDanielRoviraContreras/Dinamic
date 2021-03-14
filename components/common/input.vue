<template>
  <div
    :class="{ center, notMargin, labelCenter, marginTop, icon: $slots.icon, danger, copy, bold, gray, notDangerText, disabled }"
    class="con-input"
  >
    <label v-if="$slots.default" :for="_uid">
      <slot />
      <span v-if="$slots.right">
        <slot name="right" />
      </span>
    </label>
    <div class="content-input">
      <input
        v-if="!money && !card"
        :id="_uid"
        ref="input"
        :value="value"
        v-bind="$attrs"
        :type="passwordVisible ? 'text' : $attrs.type || 'text'"
        v-on="listeners"
      >

      <input
        v-if="money"
        v-money="moneyOptions"
        :value="value"
        v-on="listeners"
      >

      <input
        v-if="card"
        v-mask="'#### #### #### ####'"
        class="card"
        :value="value"
        v-on="listeners"
      >

      <div
        v-if="$slots.icon"
        class="con-icon"
        @click="focusInput"
      >
        <slot name="icon" />
      </div>

      <div
        v-if="$attrs.type == 'password'"
        class="con-password"
        @click="passwordVisible = !passwordVisible, focusInput()"
      >
        <i v-if="passwordVisible" class="bx bx-hide" />
        <i v-else class="bx bx-show" />
      </div>

      <div class="bg" />

      <div
        v-if="copy"
        class="copy"
        @click="handleCopy"
      >
        <i class="bx bx-copy" />
      </div>
    </div>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div v-if="notDangerText ? false : danger" class="danger">
        <p v-if="$slots.danger">
          <slot name="danger" />
        </p>

        <p v-else>
          Este campo es requerido
        </p>
      </div>
    </transition>
    <!-- <p v-if="$slots.alert" class="alert">
      <slot name="alert" />
    </p> -->
  </div>
</template>
<script lang="ts">
import { VMoney } from 'v-money'
import { VueMaskDirective } from 'v-mask'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  inheritAttrs: false,
  directives: { money: VMoney, mask: VueMaskDirective }
})
export default class InputComponent extends Vue {
  price: any = 123.45
  moneyOptions: any = {
    decimal: '.',
    thousands: ',',
    prefix: 'S/. ',
    precision: 2,
    masked: false /* doesn't work with directive */
  }

  passwordVisible: boolean = false
  @Prop({}) value: any
  @Prop({ type: Boolean }) center!: boolean
  @Prop({ type: Boolean }) labelCenter!: boolean
  @Prop({ type: Boolean }) notMargin!: boolean
  @Prop({ type: Boolean }) marginTop!: boolean
  @Prop({ type: Boolean }) danger!: boolean
  @Prop({ type: Boolean }) copy!: boolean
  @Prop({ type: Boolean }) bold!: boolean
  @Prop({ type: Boolean }) gray!: boolean
  @Prop({ type: Boolean }) notDangerText!: boolean
  @Prop({ type: Boolean }) money!: boolean
  @Prop({ type: Boolean }) disabled!: boolean
  @Prop({ type: Boolean }) card!: boolean

  handleCopy () {
    const input = (this.$refs.input as any)
    input.select()
    input.setSelectionRange(0, 99999)

    document.execCommand('copy')

    this.$notification({
      title: 'Texto Copiado!'
      // text: 'Ya se copio al portapapeles con éxito'
    })

    input.blur()
    input.select()
    input.setSelectionRange(0, 0)
  }

  get listeners () {
    return {
      ...this.$listeners,
      input: (evt: any) => {
        this.$emit('input', evt.target.value)
      }
    }
  }

  beforeEnter (el: any) {
    el.style.height = 0
  }

  enter (el: any, done: any) {
    const h = el.scrollHeight
    el.style.height = h - 1 + 'px'
    done()
  }

  leave (el: any, done: any) {
    el.style.minHeight = '0px'
    el.style.height = '0px'
  }

  focusInput () {
    (this.$refs.input as HTMLElement).focus()
  }
}
</script>
<style lang="sass" scoped>

.input-enter-active, .input-leave-active
  transition: all .25s ease

.input-enter, .input-leave-to
  height: 0px

.card
  font-weight: bold

.con-input
  display: flex
  align-items: flex-start
  justify-content: flex-start
  flex-direction: column
  margin-top: 10px
  width: 100%
  border-radius: 18px
  color: -color('color')
  z-index: 10
  position: relative
  &.disabled
    pointer-events: none
    .content-input
      .bg
        background: -color('bg-4')
  &.gray
    .content-input
      .bg
        background: -color('bg-4')
  &.bold
    input
      &::placeholder
        font-weight: bold
  .copy
    position: absolute
    right: -10px
    width: 30px
    height: 30px
    border-radius: 10px
    background: -color('color')
    color: -color('bg')
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    transition: all .25s ease
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,.1)
    z-index: 1000
    &:hover
      transform: translate(0, -4px)
      box-shadow: 0px 4px 14px 0px rgba(0,0,0,.1)
    i
      font-size: 1rem
  &:hover
    .bg
      background: -color('bg-3', 1) !important
  &.danger
    border-radius: 18px 18px 0px 0px
    color: -color('color-2', 1)
    &.notDangerText
      border-radius: 18px !important
    .bg
      background: -color('color-2', .1) !important
      border: 2px solid transparent !important
      // border-bottom: 2px solid -color('color-2', .1) !important
      transition: all .25s ease, border-radius .15s ease 0s !important
  .danger
    width: 100%
    position: relative
    background: -color('color-2', .15)
    color: -color('color-2', 1)
    padding: 0px 10px
    font-size: .75rem
    font-weight: bold
    border-radius: 0px 0px 10px 10px
    overflow: hidden
    transition: all .25s ease
    p
      padding: 5px
  &.icon
    input
      padding-left: 0px !important
      &:focus
        padding-left: 8px !important
  .info
    display: flex
    align-items: center
    justify-content: center
    font-weight: bold
    font-size: .85rem
    p
      opacity: .4
      padding-right: 7px
  &.marginTop
    margin-top: 20px
  &.notMargin
    margin-top: 0px
  .alert
    width: 100%
    position: relative
    font-size: .65rem
    padding: 3px 6px
  &.labelCenter
    label
      text-align: center
      display: flex
      align-items: center
      justify-content: center
  &.center
    input
      text-align: center
  label
    font-weight: 600
    font-size: .9rem
    padding: 5px 0px
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
    span
      display: flex
      align-items: center
      justify-content: center
  .content-input
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    position: relative
    border-radius: inherit
    color: inherit
    .con-password
      min-width: 46px
      min-height: 46px
      border-radius: inherit
      display: flex
      align-items: center
      justify-content: center
      margin-left: 4px
      transition: all .25s ease
      cursor: pointer
      z-index: 10
      &:hover
        opacity: .6
      i
        font-size: 1.2rem
    .bg
      width: 100%
      height: 100%
      position: absolute
      left: 0px
      top: 0px
      border-radius: inherit
      background: -color('bg-2')
      z-index: -1
      border: 2px solid -color('color', 0)
      transition: all .25s ease, border-radius .15s ease .15s
    .con-icon
      order: -1
      min-width: 46px
      min-height: 46px
      border-radius: 18px
      display: flex
      align-items: center
      justify-content: center
      margin-left: 4px
      transition: all .25s ease
      i
        font-size: 1.3rem
    input
      padding: 11px 15px
      transition: all .25s ease
      border-radius: inherit
      width: 100%
      box-sizing: border-box
      font-size: .85rem
      background: transparent
      width: 100%
      display: block
      border: 2px solid -color('color', 0)
      color: inherit
      &::placeholder
        color: inherit
        opacity: .6
      &:read-only
        font-weight: bold
      &:focus
        ~ .bg
          border: 2px solid -color('color', 1)
        ~ .con-icon
          background: -color('bg')
          box-shadow: 0px 4px 20px 0px rgba(0,0,0,.08)
          transform: translate(0, -10px)

// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
