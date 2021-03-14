<template>
  <transition name="guide">
    <div
      v-if="visible"
      :class="{ danger: color === 'danger' }"
      class="guide not-effect"
      @click="handleClick"
    >
      <div class="message">
        <h4>
          {{ title }}
        </h4>
        <p v-if="text">
          {{ text }}
        </p>
        <Button @click="handleClick">
          Entendido
        </Button>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
@Component({
  components: {
    Button
  }
})
export default class guide extends Vue {
  visible: boolean = false
  title: string = ''
  text: string = ''
  color: string = ''
  el: any = null
  eventClick: any = null

  handleClick () {
    if (this.eventClick) {
      this.eventClick()
    }
    this.visible = false
  }

  @Watch('visible')
  handleVisible (val: boolean) {
    if (!val) {
      const body: any | null = document.body || null
      if (body === null) { return }
      body.querySelector('#__nuxt').classList.remove('con-guide')
      body.style.overflow = ''
    }
  }

  mounted () {
    this.visible = true
    // this.el.style.pointerEvents = 'auto'
    // document.body.style.pointerEvents = 'none'
    const body: any | null = document.body || null
    if (body === null) { return }
    body.querySelector('#__nuxt').classList.add('con-guide')
    this.$nextTick(() => {
      (body as HTMLElement).style.overflow = 'hidden'
      const left: any = (this.el as HTMLElement).getBoundingClientRect().left
      const top: any = (this.el as HTMLElement).getBoundingClientRect().top
      const cln = (this.el as any).cloneNode(true);

      (this.$el as HTMLElement).style.left = `${left}px`;
      (this.$el as HTMLElement).style.top = `${top}px`

      cln.classList.add('clone');
      (this.$el as HTMLElement).appendChild(cln)
      body.appendChild(this.$el)
    })

    window.addEventListener('resize', () => {
      const left = (this.el as HTMLElement).getBoundingClientRect().left
      const top = (this.el as HTMLElement).getBoundingClientRect().top;
      (this.$el as HTMLElement).style.left = `${left}px`;
      (this.$el as HTMLElement).style.top = `${top}px`
    })
  }
}
</script>
<style lang="sass" scoped>
.guide-enter-active, .guide-leave-active
  transition: all .25s ease

.guide-enter, .guide-leave-to
  opacity: 0
  transform: scale(.7)

.guide
  position: absolute
  left: 0px
  top: 0px
  width: auto
  height: auto
  border-radius: 20px
  padding: 0px
  z-index: 100
  flex-direction: column
  pointer-events: auto !important
  /deep/.clone
    position: relative
  .message
    position: absolute
    width: 300px
    color: #fff
    right: 50px
    bottom: 0px
    transform: translate(0, 100%)
    &:after
      content: ''
      background: -color('color-2', 1)
      background:
      width: 500px
      height: 500px
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index: -1
      border-radius: 50%
      box-shadow: 0px 5px 20px 0px -color('color-2', .2)
    &:before
      content: ''
      background: -color('color-2', .25)
      background:
      width: 620px
      height: 620px
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index: -1
      border-radius: 50%
  // &:after
  //   content: ''
  //   position: absolute
  //   right: -140px
  //   top: -140px
  //   border-radius: 50%
  //   border: 45px solid -color('color-2')
  //   display: block
  //   width: 200px
  //   height: 200px
  //   box-sizing: border-box
  //   z-index: -1
  //   box-shadow: 0px 5px 20px 0px -color('color-2', .3)
  // &:before
  //   z-index: -1
  //   content: ''
  //   position: absolute
  //   right: -140px
  //   top: -140px
  //   border-radius: 50%
  //   border: 45px solid -color('color-2', .2)
  //   display: block
  //   width: 235px
  //   height: 235px
  //   box-sizing: border-box
  h4
    padding: 10px 0px
    font-size: .9rem
  p
    padding: 10px 0px
    padding-top: 0px
    font-size: .8rem
  &.danger
    color: -color('color-2', 1)
    border-bottom: 2px solid -color('color-2', 1)
    &:after
      background: -color('color-2', .15)
// responsive

@media (max-width: 600px)
  .guide
    .message
      width: 100vw
      right: 0px
      padding: 0px 20px
      &:before
        width: 550px
        height: 550px
      &:after
        width: 450px
        height: 450px
</style>
