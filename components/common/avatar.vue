<template>
  <div
    :style="{
      width: size,
      height: size
    }"
    class="avatar"
    v-on="$listeners"
  >
    <img :src="src" alt="">
    <i v-if="plus" class="bx bx-plus" />

    <div v-if="active" class="badge" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class Avatar extends Vue {
  @Prop({}) src!: string
  @Prop({}) size!: string
  @Prop({ type: Boolean }) plus!: boolean
  @Prop({ type: Boolean }) active!: boolean
}
</script>
<style lang="sass" scoped>
// responsive
.badge
  position: absolute
  right: 0px
  width: 10px
  border-radius: 50%
  height: 10px
  background: #53d769
  top: 0px
.avatar
  width: 50px
  height: 50px
  border-radius: 35%
  display: flex
  align-items: center
  justify-content: center
  transition: all .25s ease
  cursor: pointer
  position: relative
  img
    max-width: 100%
    border-radius: inherit
    max-height: 100%
  i
    font-size: 1.5rem
    background: -color('bg-4')
    width: 50px
    height: 50px
    border-radius: inherit
    display: flex
    align-items: center
    justify-content: center
  &:hover
    opacity: .6

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
