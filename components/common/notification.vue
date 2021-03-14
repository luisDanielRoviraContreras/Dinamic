<template>
  <transition name="noti">
    <div
      v-if="visible"
      :class="{ danger: color === 'danger' }"
      class="noti"
      @click="visible = false"
    >
      <h4>
        {{ title }}
      </h4>
      <p v-if="text" v-html="text" />
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
export default class Notification extends Vue {
  visible: boolean = false
  title: string = ''
  text: string = ''
  color: string = ''
  tono: boolean = true

  mounted () {
    this.visible = true

    setTimeout(() => {
      this.visible = false
    }, 4000)

    if (this.tono) {
      this.$nextTick(() => {
        const audio = new Audio('sms.mp3')
        audio.play()
      })
    }
  }
}
</script>
<style lang="sass" scoped>
#audio
  display: block

.noti-enter-active, .noti-leave-active
  transition: all .25s ease

.noti-enter, .noti-leave-to
  opacity: 0
  transform: translate(0,40px)

.noti
  position: fixed
  z-index: 100000
  left: 0px
  bottom: 0px
  margin: 20px
  width: 100%
  max-width: 400px
  background: #000
  border-radius: 20px 20px 20px 0px
  background: -color('bg')
  padding: 5px
  border-bottom: 2px solid -color('color', 1)
  padding-bottom: env(safe-area-inset-bottom)
  h4
    padding: 10px 20px
    font-size: 1.05rem
  p
    padding: 10px 20px
    padding-top: 0px
    font-size: .85rem
  &:after
    content: ''
    position: absolute
    width: 100%
    height: 100%
    border-radius: inherit
    background: -color('bg')
    left: 0px
    top: 0px
    z-index: -1
  &.danger
    color: -color('color-2', 1)
    border-bottom: 2px solid -color('color-2', 1)
    &:after
      background: -color('color-2', .15)
// responsive

@media (max-width: 600px)
  .noti
    width: 100%
    margin: 0px
    border-radius: 0px
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,.08)
    max-width: 100%
</style>
