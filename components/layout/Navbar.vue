<template>
  <nav
    :class="{ menuChat: $route.name.includes('chat') }"
    class="navbar"
  >
    <button
      class="menu"
      @click="$emit('click', true)"
    >
      <i class="bx bx-menu" />
    </button>
    <div class="navbar__buttons">
      <div class="btn">
        <span class="badge">
          99
        </span>
        <i class="bx bx-bell" />

        <span class="con-options">
          <!-- numero de notificaciones y el texto notificaciones
          buscar/remove todos
          ver todos -->
          <header>
            <span class="con-number">
              <b>
                5
              </b>
              Nuevas Notificaciones
            </span>
            <div class="con-btns">
              <button>
                <i class="bx bx-list-check" />
              </button>
              <button>Ver Todo</button>
            </div>
          </header>
          <ul>
            <li
              v-for="(notix, i) in notifications"
              :key="i"
            >
              <h4>
                {{ notix.title }}
              </h4>
              <p>
                {{ notix.text }}
              </p>
            </li>
          </ul>
        </span>
      </div>
      <div
        class="user-btn btn"
      >
        <i class="bx bx-user" />

        <div class="con-options">
          <header>
            <span class="con-number">
              <b>
                Melissa Bustamante
              </b>
            </span>
          </header>
          <ul>
            <li @click="$router.push('/user/')">
              <h4>
                Mi Usuario
              </h4>
            </li>
            <li @click="$router.push('/user/security')">
              <h4>
                Seguridad
              </h4>
            </li>
          </ul>

          <button class="sign-out" @click="handleSignOut">
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class NavBar extends Vue {
  menuVisible: boolean = false
  notifications: object = [
    {
      title: 'Withdrawal Error',
      text: 'You have Error withdrawed 0.116 BTC at 2020-03-04 17:27:36 (UTC)..'
    },
    {
      title: 'Deposit Warn',
      text: 'please contact us immediately.'
    },
    {
      title: 'Withdrawal Successful',
      text: 'You have successfully withdrawed 0.116 BTC at 2020-03-04 17:27:36 (UTC). If this activity is not your own operation, please contact us immediately.'
    }
  ]

  handleSignOut () {
    this.$router.push('/login/')
    this.$cookies.remove('authenticated')
  }
}
</script>
<style lang="sass">
.navbar
  width: auto
  position: fixed
  top: 0px
  right: 0px
  display: flex
  align-items: flex-start
  justify-content: space-between
  z-index: 1000
  &.menuChat
    .navbar__buttons
      padding-top: 0px
      .btn
        margin-top: 5px
        background: -color('bg-4')
  .user-btn
    .con-options
      max-width: 220px
  .menu
    width: 42px
    height: 42px
    border: 0px
    background: -color('bg')
    border-radius: 15px
    margin: 10px 5px
    cursor: pointer
    transition: all .25s ease
    box-shadow: 0px 5px 25px 0px rgba(0,0,0,.05)
    position: relative
    padding-top: 3px
    margin-left: 25px
    display: none
    margin-top: 20px
    i
      font-size: 1.4rem
  &__buttons
    padding: 10px 20px
    padding-bottom: 0px
    display: flex
    align-items: center
    justify-content: flex-end
    .btn
      width: 42px
      height: 42px
      border: 0px
      background: -color('bg')
      border-radius: 15px
      margin: 10px 5px
      cursor: pointer
      transition: all .25s ease
      box-shadow: 0px 5px 25px 0px rgba(0,0,0,.05)
      position: relative
      margin-bottom: 0px
      display: flex
      align-items: center
      justify-content: center
      .con-options-user
        width: 150px
        button
          width: 100%
          padding: 10px
          border: 0px
          background: transparent
          cursor: pointer
      .con-options
        position: absolute
        right: 0px
        top: 40px
        width: 350px
        background: -color('bg')
        opacity: 0
        visibility: hidden
        transition: all .25s ease
        border-radius: 15px 4px 15px 15px
        border-top: 3px solid -color('color')
        box-shadow: 0px 5px 25px 0px rgba(0,0,0,.05)
        transform: translate(0, -5px)
        color: -color('color')
        .sign-out
          width: calc(100% - 20px)
          padding: 10px
          background: -color('color')
          color: -color('bg')
          border-radius: inherit
          border: 0px
          margin: 10px
          cursor: pointer
        ul
          padding: 10px
          padding-top: 0px
          li
            padding: 10px
            border-bottom: 1px solid -color('color', .05)
            transition: all .25s ease
            color: -color('color')
            &:first-child
              border-radius: 15px 15px 0px 0px
            &:hover
              background: -color('bg-2')
            &:last-child
              border-bottom: 0px
              border-radius: 0px 0px 15px 15px
            h4
              padding: 5px
              text-align: left
              font-size: .9rem
            p
              text-align: left
              padding: 5px
              font-size: .8rem
        header
          display: flex
          align-items: center
          justify-content: space-between
          padding: 10px
          color: -color('color')
          font-size: .9rem
          .con-number
            padding: 5px
          .con-btns
            display: flex
            align-items: center
            justify-content: center
            button
              padding: 5px
              border: 0px
              background: transparent
              cursor: pointer
              display: flex
              align-items: center
              justify-content: center
              color: -color('color')
      .badge
        position: absolute
        top: -4px
        right: -4px
        background: -color('color-2')
        min-width: 20px
        min-height: 18px
        border-radius: 7px
        color: #fff
        font-size: .7rem
        display: flex
        align-items: center
        justify-content: center
        line-height: 18px
        padding-left: 1px
      &:hover
        background: -color('color') !important
        box-shadow: 0px 0px 0px 0px rgba(0,0,0,.05)
        transform: translate(0,5px)
        border-radius: 15px 15px 0px 0px
        .con-options
          opacity: 1
          visibility: visible
          transform: translate(0px)
        >i
          color: -color('bg')
      i
        font-size: 1.2rem
        color: -color('color')
// responsive
@media (max-width: 1150px)
  .navbar
    width: 100%
    .menu
      display: block
// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
