<template>
  <div
    :class="{ center, notMargin, danger }"
    class="con-select"
  >
    <label v-if="label" :for="_uid">
      {{ label }}
      <span>
        <slot name="right" />
      </span>
    </label>
    <div class="con-s">
      <select
        :id="_uid"
        ref="select"
        :value="value"
        v-bind="$attrs"
        :type="$attrs.type || 'text'"
        @change="handleChange"
      >
        <slot />
      </select>

      <i class="bx bxs-chevron-down" />
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
    <p v-if="$slots.alert" class="alert">
      <slot name="alert" />
    </p>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  inheritAttrs: false
})
export default class SelectComponentX extends Vue {
  @Prop({}) value: any
  @Prop({ type: Boolean }) center!: boolean
  @Prop({ type: Boolean }) notMargin!: boolean
  @Prop({ type: String }) label!: string
  @Prop({ type: Boolean }) danger!: boolean

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

  handleChange (evt: any) {
    (this.$refs.select as HTMLElement).blur()
    this.$emit('change', evt.target.value)
    this.$emit('input', evt.target.value)
  }
}
</script>
<style lang="sass" scoped>
.con-select
  display: flex
  align-items: flex-start
  justify-content: flex-start
  flex-direction: column
  margin-top: 10px
  width: 100%
  &.danger
    color: -color('color-2', 1)
    select
      border-radius: 18px 18px 0px 0px
      background: -color('color-2', .1) !important
      color: -color('color-2', 1) !important
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
  .con-s
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    position: relative
    i
      position: absolute
      right: 12px
      font-size: .9rem
      z-index: 20
      pointer-events: none
      transition: all .25s ease
  &.notMargin
    margin-top: 0px
  .alert
    width: 100%
    position: relative
    font-size: .65rem
    padding: 3px 6px
  &.center
    label
      display: block
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
    span
      display: flex
      align-items: center
      justify-content: center
  select
    padding: 11px 15px
    border: 2px solid -color('color', 0)
    transition: all .25s ease
    border-radius: 15px
    width: 100%
    box-sizing: border-box
    font-size: .85rem
    background: #fff
    padding-right: 15px
    appearance: none
    display: block
    cursor: pointer
    background: -color('bg-2')
    font-weight: bold
    color: -color('color')
    option
      font-weight: bold
    &:focus
      border-radius: 15px 15px 0px 0px
      background: -color('bg-3')
      // border: 2px solid -color('color', 1)
      ~ i
        transform: rotate(180deg)

// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
