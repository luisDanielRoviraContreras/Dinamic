<template>
  <div
    :class="{
      isMobile,
      disabled
    }"
    class="con-cards"
  >
    <div class="cards-arrows">
      <button
        v-if="!disabled"
        :disabled="active == 0"
        class="arrow"
        @click="handlePrev"
      >
        <i class="bx bxs-chevron-left" />
      </button>
      <div class="cards">
        <transition name="fade">
          <div v-if="isMobile ? true : active == 0" class="card">
            <slot name="card1" />
          </div>
        </transition>
        <transition name="fade">
          <div v-show="!disabled" v-if="isMobile ? true : active == 1" class="card">
            <slot name="card2" />
          </div>
        </transition>
        <transition name="fade">
          <div v-show="!disabled" v-if="isMobile ? true : active == 2" class="card">
            <slot name="card3" />
          </div>
        </transition>
      </div>
      <button
        v-if="!disabled"
        class="arrow"
        :disabled="active >= 2"
        @click="handleNext"
      >
        <i class="bx bxs-chevron-right" />
      </button>
    </div>

    <div v-if="!disabled" class="pages">
      <span
        :class="{ active: active == 0 }"
        @click="active = 0"
      />
      <span
        :class="{ active: active == 1 }"
        @click="active = 1"
      />
      <span
        :class="{ active: active == 2 }"
        @click="active = 2"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class CardsSlide extends Vue {
  active: number = 0

  @Prop({}) isMobile!: boolean
  @Prop({}) disabled!: boolean

  handlePrev () {
    if (this.active > 0) {
      this.active--
    }
  }

  handleNext () {
    if (this.active < 2) {
      this.active++
    }
  }
}
</script>
<style lang="sass" scoped>
.fade-enter-active, .fade-leave-active
  transition: all .25s ease

.fade-enter
  opacity: 0
  transform: translate(-30px)
.fade-leave-to
  opacity: 0
  transform: translate(30px)

.con-cards
  position: relative
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  &.isMobile
    padding-top: 10px
    .pages
      display: none
    .cards-arrows
      overflow: auto
      width: 100vw
      // position: absolute
      left: 0px
      display: flex
      align-items: center
      justify-content: flex-start
      .arrow
        display: none
    .cards
      display: flex
      align-items: center
      justify-content: flex-start
      overflow: auto !important
      width: 100% !important
      height: auto !important
      padding-right: 20px
      &:after
        width: 30px
        height: 100px
        display: block
        content: ''
        position: relative
        background: transparent
        min-width: 30px
      &::-webkit-scrollbar
        width: 5px
        height: 0px
        display: block
        background: -color('bg-2')
      .card
        margin-left: 30px
        position: relative !important
        overflow: hidden
        min-width: 260px
        &:last-child
          margin-right: 20px
    &.disabled
      display: flex
      align-items: center
      justify-content: center
      width: 100%
      pointer-events: none
      .cards
        padding-right: 0px
        width: 100%
        display: flex
        align-items: center
        justify-content: center
        &:after
          display: none
        .card
          margin-left: 0px
  .pages
    display: flex
    align-items: center
    justify-content: center
    margin-top: 20px
    span
      display: block
      width: 5px
      height: 5px
      background: -color('color', .3)
      margin: 10px 4px
      border-radius: 10px
      position: relative
      transition: all .25s ease
      cursor: pointer
      &:hover
        background: -color('color', .6)
      &.active
        width: 20px
        background: -color('color', 1)
  .cards-arrows
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    .arrow
      color: -color('color')
      width: 30px
      height: 30px
      background: transparent
      border: 0px
      cursor: pointer
      z-index: 20
      transition: all .25s ease
      display: block
      &:disabled
        opacity: .2
      i
        font-size: 1.2rem
    .cards
      width: 260px
      height: 180px
      .card
        width: 260px
        height: 180px
        border-radius: 20px
        display: flex
        align-items: center
        justify-content: center
        color: -color('bg')
        font-size: 1.5rem
        border: 0px
        backface-visibility: hidden
        position: absolute
        img
          width: 100%
// responsive

@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .con-cards
    .cards-arrows
      .cards
        .card
          min-width: 300px
          min-height: 190px
</style>
