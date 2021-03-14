<template>
  <div class="notifications">
    <header>
      <button class="back" @click="$router.push('/')">
        <i class="bx bxs-chevron-left" />
      </button>

      <div class="con-title-bell">
        <h2>
          Notificaciones
        </h2>

        <button class="bell">
          <i class="bx bx-bell" />
          <span class="badge">
            14
          </span>
        </button>
      </div>
    </header>

    <div class="con-noti">
      <div class="notis">
        <ul>
          <li
            v-for="noti in 10"
            :key="noti"
            :class="{
              'active': noti < 4
            }"
          >
            <div class="effect" />
            <div class="left">
              <h5>Transferencia</h5>
              <b>
                s/. 400,00
              </b>
            </div>
            <div class="right">
              <span>
                08/02/20
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  middleware: 'authenticated',
  layout: ({ isMobile }: {isMobile: any}) => isMobile ? 'clean' : 'default'
})
export default class Notifications extends Vue {}
</script>
<style lang="sass" scoped>
.notifications
  width: 100%
  min-height: 100vh
  .back
    position: relative
    width: 50px
    height: 30px
    border-radius: 0px 10px 10px 0px
    border: 0px
    background: -color('color-2')
    display: flex
    padding-right: 7px
    align-items: center
    justify-content: flex-end
    i
      font-size: 1.2rem
      color: #fff
  .con-noti
    width: 100%
    height: auto
    position: relative
    z-index: 10
    &:after
      width: 100%
      height: 40px
      background: #121624
      content: ''
      position: absolute
      z-index: -2
      display: block
      top: 0px
    &:before
      width: 100%
      height: 40px
      background: -color('bg')
      content: ''
      position: absolute
      z-index: -1
      display: block
      top: 0px
      border-radius: 25px 0px 0px 0px
    .notis
      padding: 20px
      padding-top: 25px
      ul
        width: 100%
        li
          width: calc(100% - 30px)
          padding: 15px
          display: flex
          align-items: flex-end
          justify-content: space-between
          background: -color('bg-4')
          border-radius: 20px
          padding-left: 20px
          position: relative
          margin-left: 30px
          margin-bottom: 20px
          z-index: 10
          opacity: .5
          .effect
            width: 20px
            height: 100%
            position: absolute
            z-index: -1
            background: transparent
            left: 0px
            top: 0px
            border-radius: 20px 0px 0px 20px
            border-left: 3px solid -color('color-2')
            display: none
          &.active
            opacity: 1
            &:after
              background: -color('color-2')
            .effect
              display: block
          &:last-child
            &:before
              display: none
          &:after
            position: absolute
            left: -30px
            top: 50%
            transform: translate(0, -50%)
            width: 7px
            height: 7px
            background: -color('color')
            border-radius: 50%
            content: ''
          &:before
            position: absolute
            left: -27px
            top: calc(50% + 10px)
            width: 1px
            height: 100%
            background: -color('bg-3')
            border-radius: 50%
            content: ''
          .left
            b
              font-size: .8rem
          .right
            display: flex
            align-items: flex-end
            justify-content: flex-end
          span
            font-size: .7rem
  header
    display: flex
    align-items: center
    justify-content: space-between
    z-index: 10
    position: relative
    &:after
      width: 100%
      height: 50%
      background: #121624
      content: ''
      position: absolute
      z-index: -1
      display: block
      top: 0px
    &:before
      width: calc(100% - 60px)
      height: 50%
      background: #121624
      content: ''
      position: absolute
      z-index: -1
      display: block
      top: 50%
      border-radius: 0px 0px 20px 0px
    .con-title-bell
      display: flex
      align-items: center
      justify-content: space-between
      .badge
        min-width: 19px
        background: -color('color-2')
        color: #fff
        border-radius: 6px
        position: absolute
        top: 6px
        right: 18px
        font-weight: bold
        font-size: .7rem
      .bell
        width: 60px
        height: 50px
        padding-right: 10px
        background: transparent
        color: -color('color')
        border: 0px
        position: relative
        background: -color('bg')
        border-radius: 20px 0px 0px 0px
        i
          font-size: 1.4rem
      h2
        font-size: .9rem
        font-weight: normal
        padding: 0px 20px
        color: #fff
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
