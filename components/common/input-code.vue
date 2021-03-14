<template>
  <div
    :class="{ center, notMargin, labelCenter, marginTop, icon: $slots.icon, danger }"
    class="con-input-code"
  >
    <label v-if="$slots.default" :for="_uid">
      <slot />
      <span v-if="$slots.right">
        <slot name="right" />
      </span>
    </label>
    <div class="content-input">
      <input
        v-for="(input, index) in 6"
        :id="_uid+`input-${index}`"
        :key="index"
        :ref="`input${input}`"
        v-model="values[index]"
        type="number"
        :autofocus="index === 0"
        required
        @input="handleInput($event, input, index)"
        @keydown="keydown($event, input)"
        @keyup="$emit('change', values.join(''))"
        @keypress.enter="handleEnter($event, input)"
      >
    </div>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div v-if="danger" class="danger">
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
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component({
  inheritAttrs: false
})
export default class InputComponent extends Vue {
  passwordVisible: boolean = false
  values: any = [
    '',
    '',
    '',
    '',
    '',
    ''
  ]

  @Prop({}) value: any
  @Prop({ type: Boolean }) center!: boolean
  @Prop({ type: Boolean }) labelCenter!: boolean
  @Prop({ type: Boolean }) notMargin!: boolean
  @Prop({ type: Boolean }) marginTop!: boolean
  @Prop({ type: Boolean }) danger!: boolean

  @Watch('passwordVisible')
  handleVisiblePassword (val: boolean) {
    if (val) {
      (this.$refs.input1 as HTMLElement).focus()
    }
  }

  handleEnter (evt: any, input: any) {
    if (input === 6) {
      this.$emit('enter', evt)
    }
  }

  keydown (evt: any, input: number) {
    if (!evt.target.value && evt.code === 'Backspace' && this.$refs[`input${input - 1}`]) {
      (this.$refs[`input${input - 1}`] as any)[0].focus()
    }
  }

  handleInput (evt: any, input: number, i: number) {
    if (evt.target.value.length > 1) {
      this.values[i] = evt.target.value[0]
    }
    if (evt.inputType === 'deleteContentBackward') {
      return
    }

    if ((this.$refs[`input${input + 1}`] as any) && evt.target.value) {
      (this.$refs[`input${input + 1}`] as any)[0].focus()
    } else if (!evt.target.value && this.$refs[`input${input - 1}`]) {
      (this.$refs[`input${input - 1}`] as any)[0].focus()
    }

    this.$emit('change', this.values.join(''))
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

.con-input-code
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
  &:hover
    .bg
      background: -color('bg-3', 1) !important
  &.danger
    border-radius: 18px 18px 0px 0px
    color: -color('color-2', 1)
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
  &.center
    label
      display: block
      text-align: center
  label
    font-weight: 600
    font-size: .8rem
    padding: 5px 0px
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
    display: block
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
    input
      padding: 11px 0px
      transition: all .25s ease
      border-radius: inherit
      box-sizing: border-box
      background: transparent
      width: 100%
      display: block
      border: 0px solid -color('color', 0)
      color: inherit
      border-bottom: 2px solid -color('color', .1)
      border-radius: 0px
      appearance: none
      margin: 0px 8px
      text-align: center
      font-weight: bold
      font-size: 1.2rem
      caret-color: -color('color-2', 1)
      &:valid
        border-bottom: 2px solid -color('color', 1)
      &::placeholder
        color: inherit
        opacity: .6
      &:read-only
        background: -color('bg-2')
        font-weight: bold
        border: 2px solid -color('color', 0)
      &:focus
        border-bottom: 2px solid -color('color-2', 1)

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button
  appearance: none
  margin: 0

input[type=number]
  -moz-appearance: textfield
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
