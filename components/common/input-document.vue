<template>
  <div
    :class="{ center, notMargin, labelCenter, marginTop, icon: $slots.icon, danger }"
    class="con-input-document"
  >
    <label v-if="$slots.default" :for="_uid">
      <slot />
      <span v-if="$slots.right">
        <slot name="right" />
      </span>
    </label>
    <div class="content-input">
      <Select
        :value="typeDoc"
        @change="changeValue"
      >
        <option
          v-for="(doc, index) in docs"
          :key="index"
          :value="doc"
        >
          {{ doc }}
        </option>
      </Select>
      <cInput
        ref="input"
        v-model="myValue"
        not-margin
        :autofocus="$attrs.autofocus"
        v-on="listeners"
      />
      <!-- <div class="bg" /> -->
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
import { Component, Vue, Prop } from 'vue-property-decorator'
import Select from '@/components/common/Select.vue'
import cInput from '@/components/common/input.vue'
@Component({
  inheritAttrs: false,
  components: {
    Select,
    cInput
  }
})
export default class InputDocument extends Vue {
  myValue: string = ''
  typeDoc: string = 'DNI'
  docs: object = ['DNI', 'CE', 'PAS']
  passwordVisible: boolean = false
  @Prop({}) value: any
  @Prop({ type: Boolean }) center!: boolean
  @Prop({ type: Boolean }) labelCenter!: boolean
  @Prop({ type: Boolean }) notMargin!: boolean
  @Prop({ type: Boolean }) marginTop!: boolean
  @Prop({ type: Boolean }) danger!: boolean

  changeValue (val: string) {
    this.typeDoc = val
  }

  get listeners () {
    return {
      ...this.$listeners,
      input: (evt: any) => {
        this.$emit('input', this.getMyValue)
      }
    }
  }

  get getMyValue () {
    return this.typeDoc + this.myValue
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
<style lang="sass">

.input-enter-active, .input-leave-active
  transition: all .25s ease

.input-enter, .input-leave-to
  height: 0px

.con-input-document
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
  .con-select
    margin: 0px
    max-width: 70px
    position: relative
    select
      border-radius: 15px 0px 0px 15px
      &:focus
        border-radius: 15px 0px 0px 0px
  .con-input
    border-radius: 0px 15px 15px 0px
    &:after
      content: ''
      left: 0px
      position: absolute
      width: 2px
      height: 20px
      top: 50%
      transform: translate(0,-50%)
      background: -color('color', .1)
      z-index: 10
  &:hover
    .bg
      background: -color('bg-3', 1) !important
  &.danger
    border-radius: 18px 18px 0px 0px
    color: -color('color-2', 1)
    .con-select
      select
        border-radius: 18px 0px 0px 0px
        background: -color('color-2', .1)
        color: -color('color-2', 1)
    .con-input
      border-radius: 0px 18px 0px 0px
      &:after
        background: -color('color-2', .4)
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
        background: -color('bg-2')
        font-weight: bold
        border: 2px solid -color('color', 0)
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
