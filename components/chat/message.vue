<template>
  <div
    class="message list-item"
    :style="{
      transform: `translate(${left}px)`
    }"
    :class="{
      send: sms.user.trim() === idUser.trim(),
      audio: sms.type === 'audio',
      notView: sms.notView && sms.user.trim() !== idUser.trim(),
      multiple: multiple && sms.user.trim() === idUser.trim(),
      isSelected,
      isDanger: left < -50,
      isRefer: left > 50
    }"
    @click="handleClickSMS"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @touchmove="onTouchMove"
  >
    <div class="icon-touch-ref">
      <i class="bx bxs-share" />
    </div>
    <div class="icon-touch-danger">
      <i class="bx bx-trash" />
    </div>
    <div class="con-checkbox-selected">
      <transition name="fade-check">
        <Checkbox v-show="sms.user.trim() === idUser.trim()" v-if="multiple" :value="isSelected" />
      </transition>
    </div>

    <div class="bg" />

    <div class="con-message">
      <div class="con-avatar">
        <Avatar :src="`/avatars/avatar-${sms.avatar}.png`" />
      </div>
      <div :class="`con-${sms.type}`" class="text">
        <button
          v-if="!multiple"
          :class="{
            'force-open': sms.type == 'image' || sms.type == 'video'
          }"
          class="btn-menu"
          @click="toggleMenuMessage($event, sms)"
        >
          <i class="bx bxs-chevron-down" />
        </button>
        <div class="menu">
          <ul>
            <li @click="$emit('handleClickResponse', $event, sms)">
              Responder Mensaje
            </li>
            <li @click="$emit('handleClickResend', $event, sms)">
              Reenviar Mensaje
            </li>
            <li @click="removeMenu($event), $emit('handleClickSelectedMultiple')">
              Seleccionar mensajes
            </li>
            <li v-if="sms.user.trim() === idUser.trim()" @click="handleRemoveMessage($event, sms)">
              Eliminar Mensaje
            </li>
          </ul>
        </div>

        <div
          v-if="sms.response"
          class="response"
          @click="$emit('handleClickResponseSMS', sms.response)"
        >
          <h4>{{ sms.response.name }}</h4>
          <p
            v-if="sms.response.type === 'text' || sms.response.type === 'money-send' || sms.response.type === 'money-get'"
            v-html="sms.response.text"
          />
          <p v-if="sms.response.type === 'audio'">
            <i class="bx bx-microphone" /> {{ sms.response.time }}
          </p>
          <p
            v-if="sms.response.type === 'image'"
          >
            <img :src="sms.response.file_url" alt="">
          </p>
          <p v-if="sms.response.type === 'video'">
            <i class="bx bxs-video" />
            <video :src="sms.response.file_url" />
          </p>
        </div>

        <p
          v-if="sms.type === 'text'"
          v-html="sms.text"
        />

        <div v-if="sms.type === 'money-send' || sms.type === 'money-get'" class="con-money">
          <span v-if="sms.type === 'money-get' && !sms.moneyAccept">
            {{ sms.user.trim() === idUser.trim() ? 'Solicitando Dinero' : 'Solicitud de envió' }}
          </span>
          <p>
            {{ sms.text }}
          </p>

          <footer v-if="sms.user.trim() === idUser.trim() && sms.type === 'money-send'">
            <i class="bx bx-right-top-arrow-circle" /> <span>Enviados</span>
          </footer>
          <footer v-if="sms.user.trim() != idUser.trim() && sms.type === 'money-send'">
            <i class="bx bx-left-down-arrow-circle" /> <span>Recibidos</span>
          </footer>

          <footer v-if="sms.type === 'money-get' && !sms.moneyAccept">
            <Button
              v-if="sms.user.trim() === idUser.trim()"
              @click="handleRemoveMessage($event, sms)"
            >
              Cancelar
            </Button>
            <Button
              v-if="sms.user.trim() != idUser.trim()"
              gradient
              @click="handleAcceptSend(sms)"
            >
              Enviar
            </Button>
          </footer>

          <footer v-if="sms.type === 'money-get' && sms.moneyAccept && sms.user.trim() === idUser.trim()">
            <i class="bx bx-left-down-arrow-circle" /> <span>Recibidos</span>
          </footer>
          <footer v-if="sms.type === 'money-get' && sms.moneyAccept && sms.user.trim() !== idUser.trim()">
            <i class="bx bx-right-top-arrow-circle" /> <span>Enviados</span>
          </footer>
        </div>

        <audio v-if="sms.type === 'audio'" ref="audio" controls>
          <source :src="sms.file_url" type="audio/mp3">
        </audio>

        <img
          v-if="sms.type === 'image'"
          :src="sms.file_url"
          :style="{
            height: `${naturalHeight}px`
          }"
          alt=""
          @click="$emit('openPreview', sms.file_url)"
        >

        <video
          v-if="sms.type === 'video'"
          controls

          :src="sms.file_url"
        />

        <footer class="footer-sms">
          <p v-if="sms.user.trim() !== idUser.trim()" class="name">
            {{ sms.name }}
          </p>

          <b>
            {{ sms.date }}
          </b>

          <span v-if="sms.user.trim() === idUser.trim()" :class="{ notViewCheck: !sms.notView }" class="view-check">
            <i class="bx bx-check-double" />
          </span>
        </footer>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
import Avatar from '@/components/common/avatar.vue'
import Checkbox from '@/components/common/checkbox.vue'
@Component({
  components: {
    Button,
    Avatar,
    Checkbox
  }
})
export default class message extends Vue {
  @Prop({}) sms: any
  @Prop({}) idUser: any
  @Prop({}) multiple: any
  @Prop({}) isSelected: any
  left: number = 0
  open: boolean = false
  timeout: any = null
  lastTap: any = 0
  naturalHeight: number = 0
  touchStart = {
    x: 0,
    y: 0
  }

  mounted () {
    if (this.sms.type === 'image') {
      const img = document.createElement('img')
      img.src = this.sms.file_url
      const poll = setInterval(() => {
        if (img.naturalWidth) {
          clearInterval(poll)
          this.naturalHeight = img.naturalHeight
        }
      }, 10)
      img.onload = () => {
        this.$emit('loadImage')
      }
    }
  }

  handleClickSMS () {
    if (this.multiple && this.sms.user === this.idUser) {
      this.$emit('selectedMultiple', this.sms)
    }
  }

  removeMenu (evt) {
    evt.target.closest('.text').classList.remove('open-menu')
  }

  handleRemoveMessage (evt, message) {
    this.$dialog({
      title: 'Estas seguro de eliminar este mensaje?',
      click: () => {
        this.$emit('deleteMessage', message.id)
      }
    })
  }

  toggleMenuMessage (evt: any, message: any) {
    const parent = evt.target.closest('.text')
    const messageEl = evt.target.closest('.message')
    messageEl.classList.add('open-menu')
    if (parent) {
      parent.classList.add('open-menu')
    }
    function handleClick (evtClick: any) {
      if ((!evtClick.target.closest('.menu') && !evtClick.target.closest('.btn-menu')) || evtClick.target.closest('.text') !== parent) {
        if (parent) {
          parent.classList.remove('open-menu')
        }
        messageEl.classList.remove('open-menu')
        window.removeEventListener('click', handleClick)
      }
    }
    setTimeout(() => {
      window.addEventListener('click', handleClick)
    }, 300)
  }

  handleAcceptSend (message: any) {
    const refChat = this.$fireStore.collection('chats').doc(`${this.$route.query.chat}`).collection('messages').doc(message.id)

    refChat.update({
      moneyAccept: true
    })
  }

  onTouchStart (e: any) {
    this.touchStart = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    }
  }

  onTouchEnd (e: any) {
    if (!this.multiple) {
      const currentTime = new Date().getTime()
      const tapLength = currentTime - this.lastTap
      clearTimeout(this.timeout)
      if (tapLength < 500 && tapLength > 0) {
        this.toggleMenuMessage(e, this.sms)
        event.preventDefault()
      } else {
        this.timeout = setTimeout(() => {
          clearTimeout(this.timeout)
        }, 500)
      }
      this.lastTap = currentTime
    }

    if (this.left > 60) {
      this.left = 0
      this.$emit('handleClickResponse', e, this.sms)
    } else if (this.left < -60) {
      this.handleRemoveMessage(e, this.sms)
      this.left = 0
    } else {
      this.left = 0
    }
  }

  onTouchMove (e: any) {
    const dx = e.changedTouches[0].clientX - this.touchStart.x
    if (this.touchStart.x > 20) {
      this.left = Math.ceil(dx)
    }

    if (dx > 70) {
      this.left = 70
    }

    if (dx < -70) {
      this.left = -70
    }

    if (Math.sign(dx) !== 1 && !e.target.closest('.send')) {
      this.left = 0
    }
  }
}
</script>
<style lang="sass" scoped>
.fade-check-enter-active, .fade-check-leave-active
  transition: all .2s ease

.fade-check-enter, .fade-check-leave-to
  opacity: 0
  margin-right: -35px

.icon-touch-ref
  position: absolute
  font-size: 1.4rem
  opacity: 0
  visibility: hidden
  color: -color('color', .4)
  transform: translate(-60px, -50%)
  transition: all .25s ease
  left: 0px
  top: 50%

.icon-touch-danger
  position: absolute
  font-size: 1.4rem
  opacity: 0
  visibility: hidden
  color: -color('color-2')
  transform: translate(60px, -50%)
  transition: all .25s ease
  right: 0px
  top: 50%

.send
  .con-money
    footer
      border-top: 1px solid -color('bg',.2)
.con-money
  padding: 10px 15px
  >span
    text-align: center
    width: 100%
    display: block
  footer
    display: flex
    align-items: center
    justify-content: center
    border-top: 1px solid -color('color', .1)
    padding: 5px 0px
    padding-bottom: 0px
    button
      width: 100%
      margin: 0px
    i
      padding-right: 5px
      font-size: 1.2rem
  p
    font-size: 1.4rem
    padding: 10px
    font-weight: bold
    text-align: center

.message
  width: 100%
  padding: 15px
  padding-bottom: 22px
  display: flex
  align-items: flex-start
  justify-content: flex-start
  transform-origin: left top
  transition: all .25s ease, transform .1s ease
  position: relative
  margin-bottom: 5px
  border-radius: 20px
  &:last-child
   .menu
     transform: translate(0,-100%) !important
  &.isDanger
    background: -color('color-2', .2)
    .notViewCheck
      color: -color('color-2') !important
    .text,.btn-menu
      background: -color('color-2') !important
    .icon-touch-danger
      opacity: 1
      visibility: visible
      transform: translate(40px, -50%)
  &.isRefer
    background: -color('bg-3')
    .icon-touch-ref
      opacity: 1
      visibility: visible
      transform: translate(-40px, -50%)
  &.open-menu
    z-index: 50
  &.isSelected
    .bg
      opacity: 1
      visibility: visible
      background: rgba(92, 37, 255, .2) !important
  &.multiple
    cursor: pointer
    .response
      pointer-events: none
    &:hover
      .bg
        opacity: 1
        visibility: visible
  .con-message
    display: flex
    align-self: flex-start
  .bg
    position: absolute
    width: 100%
    height: 100%
    background: rgba(92, 37, 255, .1)
    left: 0px
    visibility: hidden
    opacity: 0
    transition: all .25s ease
    top: 0px
    z-index: 10
    pointer-events: none
  .con-checkbox-selected
    justify-self: flex-start
    align-self: center
    /deep/label
      padding: 0px !important
  &.notView
    opacity: 1
  &.view
    opacity: .5 !important
  /deep/p:only-child
    .emoji
      font-size: 1.15rem
      &:only-child
        font-size: 2rem
  &.audio
    align-items: center
    .con-audio
      display: flex
      align-items: center
      margin: 0px 8px
      justify-content: center
      audio
        border-radius: 30px !important
        border: 3px solid -color('bg-4')
  &.send
    transform-origin: right top
    justify-content: space-between
    color: #fff
    .btn-menu
      right: 0px !important
      left: auto !important
    .menu
      left: auto !important
      right: -6px !important
      transform-origin: top right !important
    .con-audio
      audio
        border: 3px solid #3085ff
    .con-avatar
      order: 2
    .text
      background: #3085ff
      color: #fff
      border-radius: 18px 18px 5px 18px
      &:hover
        .btn-menu
          opacity: 1 !important
          pointer-events: auto !important
          transform: translate(6px, -15px) scale(1) !important
          box-shadow: -4px 4px 10px 0px rgba(0,0,0,.05) !important
      &.con-video
        >video:not(:-webkit-full-screen)
          border: 3px solid #3085ff
      .response
        border-left: 3px solid #fff
      .btn-menu
        background: #3085ff
        color: #fff
      p
        color: #fff
      footer
        left: auto
        right: 0px
  .con-avatar
    .avatar
      width: 38px
      height: 38px
  .text
    background: -color('bg-3')
    max-width: 500px
    border-radius: 18px 18px 18px 5px
    margin: 0px 8px
    position: relative
    font-size: .85rem
    /deep/a
      color: inherit
      text-decoration: underline
    &.con-video
      background: transparent
      video
        max-width: 100%
        border-radius: 20px
        max-height: 500px
    &.con-image
      background: transparent
      img
        border-radius: 20px
        max-width: 100%
        max-height: 500px
    &.con-audio
      background: transparent
    &.open-menu
      .menu
        opacity: 1
        transform: scale(1)
        visibility: visible
      .btn-menu
        opacity: 0 !important
    &:hover
      .btn-menu
        opacity: 1
        pointer-events: auto
        transform: translate(-6px, -15px) scale(1)
        box-shadow: -4px 4px 10px 0px rgba(0,0,0,.05)
    .btn-menu
      position: absolute
      left: 0px
      top: 0px
      padding: 0px
      width: 28px
      height: 28px
      border: 0px
      background: -color('bg-3')
      border-radius: 10px
      color: -color('color')
      display: flex
      align-items: center
      justify-content: center
      cursor: pointer
      box-shadow: 0px 0px 0px 0px rgba(0,0,0,.05)
      opacity: 0
      transition: all .2s ease
      transform: translate(0) scale(.7)
      z-index: 10
      i
        font-size: .95rem
    .menu
      position: absolute
      left: -6px
      top: -15px
      background: -color('bg')
      border-radius: 10px
      padding: 6px 0px
      box-shadow: 0px 5px 15px 0px rgba(0,0,0,.1)
      z-index: 100
      min-width: 160px
      visibility: hidden
      opacity: 0
      transform: scale(.4)
      transition: all .2s ease
      transform-origin: top left
      ul
        li
          padding: 6px 10px
          font-size: .7rem
          font-weight: bold
          color: -color('color')
          cursor: pointer
          transition: all .25s ease
          border-radius: 3px
          &:hover
            background: -color('bg-2')
    .response
      border-left: 3px solid -color('color')
      padding: 10px
      width: calc(100% - 10px)
      display: block
      box-shadow: 0px 5px 20px 0px rgba(0,0,0,.05)
      background: rgba(255,255,255,.1)
      border-radius: 15px 15px 15px 0px
      margin: 5px
      min-width: 140px
      cursor: pointer
      transition: all .25s ease
      min-width: 200px
      >p
        display: flex
        align-items: center
        justify-content: flex-start
        i
          margin-right: 8px
          font-size: 1.2rem
      img,video
        width: 100%
        max-width: 100px
        border-radius: 10px
      &:hover
        opacity: .8
    >p
      padding: 10px 15px
      p
        padding-bottom: 10px
        &:last-child
          padding-bottom: 0px
    blockquote
      border-left: 4px solid #fff
      padding: 10px
      width: 100%
      display: block
      border-radius: 7px
    p
      color: -color('color')
    a
      text-decoration: underline
      color: inherit !important
    .footer-sms
      position: absolute
      bottom: 0px
      left: 0px
      display: flex
      align-items: center
      justify-content: center
      transform: translate(0, 100%)
      color: -color('color')
      transition: all .25s ease .35s
      p
        font-size: .7rem
        white-space: nowrap
        padding: 4px
      b
        font-size: .6rem
        opacity: .7
        padding: 4px
        white-space: nowrap
      .view-check
        font-size: 1.05rem
        opacity: .3
      .notViewCheck
        opacity: 1
        color: #3085ff
// responsive

@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .message
    .text
      .btn-menu
        &.force-open
          opacity: 1
          pointer-events: auto
          transform: translate(-6px, -15px) scale(1)
          box-shadow: -4px 4px 10px 0px rgba(0,0,0,.05)
  .send
    .btn-menu
      &.force-open
        opacity: 1 !important
        pointer-events: auto !important
        transform: translate(6px, -15px) scale(1) !important
        box-shadow: -4px 4px 10px 0px rgba(0,0,0,.05) !important
</style>
