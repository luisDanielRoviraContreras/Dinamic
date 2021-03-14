<template>
  <transition name="dialog">
    <div
      v-if="visible"
      :class="[ type ]"
      class="dialog"
    >
      <div ref="content" class="con-dialog">
        <header>
          <div v-if="type === 'success'" class="icon success">
            <i class="bx bx-check" />
          </div>
          <div v-else-if="type === 'danger'" class="icon danger">
            <i class="bx bx-error-alt" />
          </div>
          <div v-else class="icon warn">
            <i class="bx bx-error" />
          </div>
        </header>
        <div class="content-dialog">
          <h4>
            {{ title }}
          </h4>
          <p v-if="text" v-html="text" />
        </div>
        <footer>
          <button v-if="cancel !== 'none'" @click="visible = false">
            {{ cancel }}
          </Button>
          <button @click="handleClick">
            {{ success }}
          </Button>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
@Component({
  components: {
    Button
  }
})
export default class Dialog extends Vue {
  visible: boolean = false
  title: string = ''
  text: string = ''
  type: string = 'warn'
  success: string = 'Aceptar'
  cancel: string = 'Cancelar'
  eventClick: any = null

  mounted () {
    this.visible = true
  }

  handleClick () {
    this.visible = false
    if (this.eventClick) {
      this.eventClick()
    }
  }
}
</script>
<style lang="sass" scoped>
.dialog-enter-active, .dialog-leave-active
  transition: all .25s ease

.dialog-enter, .dialog-leave-to
  opacity: 0
  .con-dialog
    transform: translate(0,40px)

.dialog
  position: fixed
  z-index: 10000
  top: 0px
  left: 0px
  width: 100%
  height: 100%
  background: -color('bg', .4)
  display: flex
  align-items: center
  justify-content: center
  backdrop-filter: saturate(180%) blur(15px)
  .con-dialog
    width: 100%
    max-width: 400px
    transition: all .25s ease
    background: -color('bg')
    border-radius: 20px
    padding: 20px
    text-align: center
    box-shadow: 0px 5px 20px 0px rgba(0,0,0,.1)
    footer
      display: flex
      align-items: center
      justify-content: center
      margin-bottom: -40px
      margin-top: 20px
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
      margin-top: -40px
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
        &.success
          background: #26c165
          box-shadow: 0px 3px 15px 0px rgba(38, 193, 101, .4)
        &.danger
          background: -color('color-2')
          box-shadow: 0px 3px 15px 0px -color('color-2', .4)
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
  .dialog
    width: 100%
    margin: 0px
    border-radius: 0px
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,.08)
</style>
