<template>
  <transition name="popup">
    <div
      v-if="value"
      :class="[ type ]"
      class="popup"
      @click="handleClickParent"
    >
      <div ref="content" class="con-popup">
        <button class="close" @click="$emit('input', false)">
          <i class="bx bx-x" />
        </button>
        <header>
          <slot name="header" />
        </header>
        <div class="content-popup">
          <slot />
        </div>
        <footer>
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
@Component({
  components: {
    Button
  }
})
export default class Popup extends Vue {
  visible: boolean = false
  title: string = ''
  text: string = ''
  type: string = ''
  success: string = 'Aceptar'
  cancel: string = 'Cancelar'
  eventClick: any = null
  @Prop({}) value!: boolean

  mounted () {
    this.visible = true
  }

  handleClickParent (evt: any) {
    if (evt.target.closest('.con-popup')) {
      return
    }

    this.$emit('input', false)
  }
}
</script>
<style lang="sass" scoped>
.popup-enter-active, .popup-leave-active
  transition: all .25s ease

.popup-enter, .popup-leave-to
  opacity: 0
  .con-popup
    transform: translate(0,40px)

.popup
  position: fixed
  z-index: 10000
  top: 0px
  left: 0px
  width: 100%
  height: 100%
  background: -color('bg', .6)
  display: flex
  align-items: center
  justify-content: center
  backdrop-filter: saturate(180%) blur(15px)
  .con-popup
    width: 100%
    max-width: 400px
    transition: all .25s ease
    background: -color('bg')
    border-radius: 20px
    padding: 20px
    text-align: center
    box-shadow: 0px 5px 20px 0px rgba(0,0,0,.1)
    position: relative
    .content-popup
      font-size: .85rem
      padding: 10px
      /deep/b
        font-weight: bold
    .close
      position: absolute
      right: 0px
      top: 0px
      display: flex
      align-items: center
      justify-content: center
      width: 40px
      height: 40px
      border-radius: 14px
      border: 0px
      box-shadow: 0px 6px 20px 0px rgba(0,0,0,.1)
      background: -color('bg')
      cursor: pointer
      color: -color('color', .6)
      transform: translate(15px, -15px)
      transition: all .25s ease
      &:hover
        color: -color('color', 1)
        transform: translate(10px, -10px)
        box-shadow: 0px 6px 6px 0px rgba(0,0,0,.1)

      i
        font-size: 1.5rem
    footer
      display: flex
      align-items: center
      justify-content: center
      button
        border: 0px
        background: -color('bg')
        padding: 10px 20px
        cursor: pointer
        border-radius: 15px
        margin-left: 8px
        margin-right: 8px
        box-shadow: 0px 5px 20px 0px rgba(0,0,0,.1)
        min-width: 120px
        transition: all .25s ease
        &:hover
          transform: translate(0, -5px)
          box-shadow: 0px 10px 20px 0px rgba(0,0,0,.15)
    header
      width: 100%
      position: relative
      display: flex
      align-items: center
      justify-content: center
      padding: 10px
      padding-top: 0px
      .icon
        width: 50px
        border-radius: 20px
        display: flex
        align-items: center
        justify-content: center
        height: 50px
        background: rgba(255, 179, 0, 1)
        color: #fff
        font-size: 1.6rem
        box-shadow: 0px 3px 15px 0px rgba(255, 179, 0, .4)
  h4
    padding: 10px 20px
    font-size: 1.05rem
  p
    padding: 10px 20px
    padding-top: 0px
    font-size: .85rem
  &.danger
    color: -color('color-2', 1)
    border-bottom: 2px solid -color('color-2', 1)
    &:after
      background: -color('color-2', .15)
// responsive

@media (max-width: 600px)
  .popup
    width: 100%
    margin: 0px
    border-radius: 0px
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,.08)
    .con-popup
      .close
        transform: translate(0px, -15px)
</style>
