<template>
  <div class="register-01">
    <h2>
      Escoge el diseño de tu tarjeta <b>Dinamic</b>
    </h2>
    <div
      class="con-cards"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <Data-card
        v-for="card in 6"
        :key="card"
        :active="visible == card"
        :exit="visible >= card + 1"
        :visible="isVisible(card)"
        :style="getStyle(card)"
        :src="`/cards-2/0${card}.svg`"
        @click="visible = card"
      />
      <Data-card
        v-for="card in 6"
        :key="card + 6"
        :active="visible == card + 6"
        :exit="visible >= card + 7"
        :visible="isVisible(card + 6)"
        :style="getStyle(card + 6)"
        :src="`/cards-2/0${card}.svg`"
        @click="visible = card + 6"
      />

      <div class="con-btn-count">
        <div class="con-fle">
          <Button :disabled="visible <= 1" transparent icon class="" @click="visible--">
            <i class="bx bx-left-arrow-alt" />
          </Button>
          <h4>
            {{ visible }} / 12
          </h4>
          <Button :disabled="visible >= 12" transparent icon @click="visible++">
            <i class="bx bx-right-arrow-alt" />
          </Button>
        </div>

        <Button margin-top gradient block @click="$router.push('./step2')">
          Aceptar
        </Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
import DataCard from '@/components/common/dataCard.vue'
@Component({
  components: {
    Button,
    DataCard
  }
})
export default class register01 extends Vue {
  visible: number = 1
  touchStart: any = {
    x: 0,
    y: 0
  }

  getStyle (n: number) {
    // const isMobile = window.innerWidth < 812
    if (n === this.visible) {
      return {
        transform: 'rotate(0deg) translate(0px)'
      }
    } else if (n === this.visible + 1) {
      return {
        transform: 'rotate(15deg) translate(310px,-40px)'
      }
    } else if (n === this.visible + 2) {
      return {
        transform: 'rotate(30deg) translate(605px,-150px)'
      }
    } else if (n === this.visible + 3) {
      return {
        transform: 'rotate(45deg) translate(870px,-340px)'
      }
    } else if (n === this.visible - 1) {
      return {
        transform: 'rotate(-15deg) translate(-310px,-40px)'
      }
    } else if (n === this.visible - 2) {
      return {
        transform: 'rotate(-30deg) translate(-605px,-150px)'
      }
    } else if (n === this.visible - 3) {
      return {
        transform: 'rotate(-45deg) translate(-870px,-340px)'
      }
    }
  }

  toggleVisible (to: boolean) {
    if (to && this.visible < 12) {
      this.visible++
    } else if (!to && this.visible > 1) {
      this.visible--
    }
  }

  onTouchStart (e: any) {
    this.touchStart = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    }
  }

  onTouchMove (e: any) {
    const dx = e.changedTouches[0].clientX - this.touchStart.x
    const dy = e.changedTouches[0].clientY - this.touchStart.y
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
      this.touchStart.x = 0
      this.touchStart.y = 0

      if (Math.sign(dx) === -1) {
        this.toggleVisible(true)
      } else {
        this.toggleVisible(false)
      }
    }
  }

  onTouchEnd (e: any) {
    const dx = e.changedTouches[0].clientX - this.touchStart.x
    const dy = e.changedTouches[0].clientY - this.touchStart.y
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
      if (Math.sign(dx) === -1) {
        this.toggleVisible(true)
      } else {
        this.toggleVisible(false)
      }
    }
  }

  isVisible (n: number) {
    const min = 4
    if (this.visible >= n + min || n >= this.visible + min) {
      return false
    } else {
      return true
    }
  }
}
</script>
<style lang="sass" scoped>
.register-01
  width: 100%
  h2
    width: 100%
    text-align: center
    font-weight: normal
    font-size: 1.1rem
    padding: 30px 15px
    padding-bottom: 0px
    b
      font-weight: bold
  .con-cards
    padding: 40px
    display: flex
    align-items: flex-start
    justify-content: center
    width: 100%
    height: calc(100vh - 273px)
    flex-wrap: nowrap
    overflow: hidden
    position: relative
    padding-top: 50px
    padding-bottom: 0px
    .con-btn-count
      margin-top: 220px
      width: 100%
      max-width: 300px
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column
      .con-fle
        display: flex
        align-items: center
        justify-content: space-between
        width: 100%
    /deep/ .data-card
      position: absolute
      cursor: pointer
      border-left: 0px !important
      .con-data-card
        transform: scale(.95) !important
    &:after
      content: ''
      position: absolute
      background: linear-gradient(90deg, -color('bg') 0%, -color('bg', 0) 100%)
      width: 200px
      height: 100%
      display: block
      left: 0px
      bottom: 0px
      z-index: 20
    &:before
      z-index: 20
      content: ''
      position: absolute
      background: linear-gradient(90deg, -color('bg', 0) 0%, -color('bg') 100%)
      width: 200px
      height: 100%
      display: block
      right: 0px
      bottom: 0px
// responsive

@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .register-01
    h2
      padding-top: 15px
    .con-cards
    .con-cards
      height: auto
      padding-bottom: 30px
      padding-top: 35px
      &:after
       display: none
      &:before
       display: none
</style>
