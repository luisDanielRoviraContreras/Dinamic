<template>
  <div class="content-preview-file">
    <div
      class="preview-image-video"
    >
      <div class="preview-bg" @click="$emit('close')" />
      <div class="con-preview-image-video">
        <Button gradient icon class="close" @click="$emit('close')">
          <i class="bx bx-x" />
        </Button>
        <img :src="url" alt="">
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
@Component({
  components: {
    Button
  }
})
export default class previewFile extends Vue {
  @Prop({}) url: string
}
</script>
<style lang="sass" scoped>
.fade-file-enter-active, .fade-file-leave-active
  transition: all .25s ease

.fade-file-enter, .fade-file-leave-to
  opacity: 0
  img
    transform: scale(.7)

.content-preview-file
  position: fixed
  top: 0px
  left: 0px
  width: 100%
  height: 100%
  background: -color('bg')
  z-index: 10000
  display: flex
  align-items: center
  justify-content: center
  .preview-bg
    position: absolute
    left: 0px
    top: 0px
    z-index: -1
    width: 100%
    height: 100%
    background: transparent
  .con-preview-image-video
    position: relative
    display: flex
    align-items: center
    justify-content: center
    img
      max-width: calc(100vw - 80px)
      max-height: calc(100vh - 80px)
      border-radius: 20px
      transition: all .25s ease
    .close
      position: absolute
      right: -10px
      top: -10px
      margin: 0px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
