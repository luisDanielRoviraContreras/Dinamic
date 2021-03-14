<template>
  <!-- <transition name="card"> -->
  <div
    v-if="visible"
    :class="{ active, transparent, exit, hidden, disabled, back }"
    class="data-card"
    v-on="listeners"
  >
    <div class="con-data-card">
      <div class="secret">
        058
      </div>
      <span class="circle" />
      <img :src="src" alt="">
      <!-- <img class="bg not-darken" :src="src" alt=""> -->
      <div class="logo">
        <img src="/logo-b.png" alt="">
      </div>
      <div v-if="!disabled" class="money">
        S/. 1843,35
      </div>
      <div v-else class="money">
        S/. 0000,00
      </div>
      <div class="wifi">
        <i class="bx bx-wifi-2" />
      </div>
      <div class="chip">
        <img src="/cards/sim.svg" alt="">
      </div>
      <div class="mastercard">
        <!-- <i class="bx bxl-mastercard" /> -->
        <i class="bx bxl-mastercard" />
        <p>mastercard</p>
      </div>
      <div v-if="!disabled" class="code">
        <b>
          0012
        </b>
        <b v-if="back">
          6641
        </b>
        <b v-else>
          <i class="bx bxs-checkbox" />
          <i class="bx bxs-checkbox" />
          <i class="bx bxs-checkbox" />
          <i class="bx bxs-checkbox" />
        </b>
        <b v-if="back">
          0094
        </b>
        <b v-else>
          <i class="bx bxs-checkbox" />
          <i class="bx bxs-checkbox" />
          <i class="bx bxs-checkbox" />
          <i class="bx bxs-checkbox" />
        </b>
        <b>
          4563
        </b>
      </div>
      <div v-else class="code">
        <b>
          0000
        </b>
        <b>
          0000
        </b>
        <b>
          0000
        </b>
        <b>
          0000
        </b>
      </div>
    </div>
  </div>
  <!-- </transition> -->
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class dataCard extends Vue {
  @Prop({}) src!: string
  @Prop({ type: Boolean }) active!: boolean
  @Prop({ type: Boolean }) visible!: boolean
  @Prop({ type: Boolean }) transparent!: boolean
  @Prop({ type: Boolean }) exit!: boolean
  @Prop({ type: Boolean }) hidden!: boolean
  @Prop({ type: Boolean }) disabled!: boolean
  @Prop({ type: Boolean }) back!: boolean
  @Prop({}) to!: string

  get listeners () {
    return {
      ...this.$listeners,
      click: () => {
        this.handleClick()
        this.$emit('click')
      }
    }
  }

  handleClick () {
    if (this.to) {
      this.$router.push(this.to)
    }
  }
}
</script>
<style lang="sass" scoped>
.data-card
  max-width: 260px
  width: 100%
  position: relative
  border-radius: 16px
  min-width: 260px
  transition: transform .2s ease, opacity .25s ease, border .2s ease
  z-index: 10
  cursor: pointer
  overflow: hidden
  min-height: 165px
  .con-data-card
    width: 100%
    position: relative
    transition: all .25s ease
  .secret
    display: none
  &.back
    background: #1c2632
    .secret
      display: block
      position: absolute
      bottom: 68px
      background: #555b6b
      padding: 7px 10px
      left: 14px
      border-radius: 10px 10px 10px 2px
      font-weight: bold
      color: #fff
      font-size: .85rem
      letter-spacing: 1px
    &:after
      content: ''
      position: absolute
      left: 0px
      bottom: 20px
      width: 100%
      background: #39414f
      height: 40px
    .code
      bottom: 110px
      align-items: center
      justify-content: flex-start
      left: 12px
      opacity: .4
      font-size: 1rem
      b
        padding: 0px 4px !important
    .wifi,.mastercard,.logo,.money
      display: none
    img
      display: none
  &.disabled
    pointer-events: none
    user-select: none
    img
      filter: grayscale(100%)
    .bg
      display: none
  &:hover
    opacity: .75
  &.hidden
    opacity: 0
    pointer-events: none
  &.transparent
    background: -color('bg',.1)
    box-shadow: 0px 4px 20px 0px rgba(0,0,0,.1)
    img
      opacity: 0
    .bg
      opacity: 0
  &.active
    background: -color('bg')
    border-left: 3px solid -color('color')
    .con-data-card
      transform: scale(.92)
  img
    width: 100%
    display: block
    border-radius: 20px
    transition: all .25s ease
    &.bg
      width: calc(100% - 20px)
      position: absolute
      top: 25px
      left: 10px
      filter: blur(25px)
      opacity: .5
      z-index: -1
  .money
    position: absolute
    left: 15px
    bottom: 15px
    color: #fff
    font-weight: bold
    font-size: 1rem
  .wifi
    position: absolute
    right: 12px
    top: 12px
    color: #fff
    transform: rotate(90deg)
    i
      font-size: 1.7rem
  .logo
    position: absolute
    top: 8px
    left: 15px
    color: #fff
    img
      width: 80px
  .chip
    position: absolute
    top: 36px
    left: 10px
    color: #fff
    img
      transform: rotate(90deg)
      width: 45px
  .mastercard
    position: absolute
    bottom: 10px
    right: 15px
    color: #fff
    color: #fff
    height: 50px
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    i
      font-size: 2.6rem
      margin-bottom: -8px
    p
      font-size: .45rem
  .code
    position: absolute
    bottom: 60px
    left: 0px
    width: 100%
    text-align: center
    color: #fff
    font-size: .9rem
    display: flex
    align-items: center
    justify-content: center
    b
      padding: 0px 12px
      font-weight: normal
      display: flex
      align-items: center
      justify-content: center
      &:first-child
        padding: 0px 14px
      &:last-child
        padding: 0px 14px
      i
        font-size: .7rem
        margin-top: 0px
// responsive

@media (max-width: 812px)
  .data-card
    max-width: 300px
    min-width: 300px

</style>
