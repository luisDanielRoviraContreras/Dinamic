<template>
  <div
    :class="{ center, notMargin, danger, disabled }"
    class="con-textarea"
  >
    <label v-if="$slots.default" :for="_uid">
      <slot />
      <span>
        <slot name="right" />
      </span>
    </label>
    <textarea
      :id="_uid"
      :value="value"
      :type="$attrs.type || 'text'"
      v-on="listeners"
    />
    <!-- v-bind="$attrs" -->
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
export default class textareaComponent extends Vue {
  @Prop({}) value: any
  @Prop({ type: Boolean }) center!: boolean
  @Prop({ type: Boolean }) notMargin!: boolean
  @Prop({ type: Boolean }) danger!: boolean
  @Prop({ type: Boolean }) disabled!: boolean

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

  get listeners () {
    return {
      ...this.$listeners,
      input: (evt: any) => {
        this.$emit('input', evt.target.value)
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.textarea-enter-active, .textarea-leave-active
  transition: all .25s ease

.textarea-enter, .textarea-leave-to
  height: 0px
.con-textarea
  display: flex
  align-items: flex-start
  justify-content: flex-start
  flex-direction: column
  margin-top: 10px
  width: 100%
  &.disabled
    pointer-events: none
    textarea
      background: -color('bg-4')
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
  &.danger
    color: -color('color-2', 1)
    textarea
      background: -color('color-2', .1)
      border-radius: 18px 18px 0px 0px
      color: -color('color-2', 1)
      &:focus
        border: 2px solid -color('color-2', 1)
  .info
    display: flex
    align-items: center
    justify-content: center
    font-weight: bold
    font-size: .85rem
    p
      opacity: .4
      padding-right: 7px
  &.notMargin
    margin-top: 0px
  .alert
    width: 100%
    position: relative
    font-size: .65rem
    padding: 3px 6px
  &.center
    textarea
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
  textarea
    resize: none
    padding: 10px
    border: 2px solid -color('color', 0)
    transition: all .25s ease
    border-radius: 18px
    width: 100%
    box-sizing: border-box
    font-size: .75rem
    background: transparent
    min-height: 77px
    background: -color('bg-2')
    &:read-only
     font-weight: bold
     border: 2px solid -color('color', 0)
    &:focus
      border: 2px solid -color('color', 1)

// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
