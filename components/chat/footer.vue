<template>
  <footer
    ref="footer"
    class="footer"
  >
    <div v-if="multiple" class="con-multiple">
      <div class="con-close-multiple">
        <Button
          icon
          border
          @click="$emit('cancelSelected')"
        >
          <i class="bx bx-x" />
        </Button>

        <p>
          {{ SelectedLength }} Seleccionados
        </p>
      </div>
      <Button
        icon
        gradient
        @click="$emit('deleteMessagesSelected')"
      >
        <i class="bx bx-trash" />
      </Button>
    </div>

    <transition name="response">
      <menuPay v-if="menuPayActive" :my-user="myUser" @emitInput="$emit('update:menuPayActive', false)" />
    </transition>
    <transition name="response">
      <VEmojiPicker v-if="activeEmoji" class="picker" @select="selectEmoji" />
    </transition>
    <transition name="response">
      <div v-if="response" class="con-response">
        <div class="response-sms">
          <h4>{{ response.name }}</h4>
          <p v-if="response.type == 'text' || response.type == 'money-send' || response.type == 'money-get'" v-html="response.text" />
          <p v-if="response.type == 'audio'">
            <i class="bx bx-microphone" /> {{ response.time }}
          </p>
          <p v-if="response.type == 'image'">
            <img :src="response.file_url" alt="">
          </p>
          <p v-if="response.type == 'video'">
            <i class="bx bxs-video" />
            <video :src="response.file_url" />
          </p>
        </div>
        <button @click="$emit('update:response', null)">
          <i class="bx bx-x" />
        </button>
      </div>
    </transition>
    <div
      :class="{
        notText,
        recorderActive
      }"
      class="con-textarea"
    >
      <textarea
        ref="message"
        v-model="message"
        placeholder="Escribe un mensaje"
        @keypress.enter.prevent="handleSend"
      />

      <div class="con-file-voice">
        <transition name="files">
          <div v-if="menuFiles" class="menu-files">
            <ul>
              <!-- <li>
                <input
                  type="file"
                  accept=".xlsx,.xls,.doc,.docx,.ppt,.pptx,.txt,.pdf"
                  @change="handleChangeFile($event, true)"
                />
                <i class="bx bxs-file-blank" />
              </li> -->
              <!-- <li @click="handleStartVideoFoto">
                <i class="bx bxs-camera" />
              </li> -->
              <!-- <li @click="handlePrint">
                <i class='bx bx-screenshot'></i>
              </li> -->
              <li>
                <input type="file" accept="image/*,video/*,audio/*" @change="handleChangeFile($event,false)">
                <i class="bx bxs-image" />
              </li>
            </ul>
          </div>
        </transition>
        <button class="files-btn" :class="{'active': menuFiles}" @click="toggleMenuFiles">
          <i class="bx bx-paperclip" />
        </button>
        <Button v-if="recorderActive" icon @click="handleAudioCancel">
          <i class="bx bx-x" />
        </Button>
        <transition name="fade-voice">
          <button v-if="!message" class="voice" :class="{ recorderActive }" @click="handleAudio">
            <i v-if="!recorderActive" class="bx bx-microphone" />
            <span>
              {{ min }} : {{ sec > 10 ? sec : `0${sec}` }}
            </span>
          </button>
        </transition>
        <Button v-if="recorderActive" icon gradient @click="handleAudioStop">
          <i class="bx bxs-send" />
        </Button>
      </div>

      <div class="con-send-emoji">
        <button class="emoji-btn" @click="$emit('update:menuPayActive', !menuPayActive)">
          <i class="bx bx-dollar-circle" />
        </button>
        <button :disabled="menuPayActive" :class="{ activeEmoji }" class="emoji-btn" @click="$emit('update:activeEmoji', !activeEmoji)" @mouseenter="handleRandomEmoji">
          {{ getEmoji }}
        </button>
        <Button :disabled="!message" icon gradient @click="handleSend">
          <i class="bx bxs-send" />
        </Button>
      </div>

      <div class="bg" />
    </div>
  </footer>
</template>
<script lang="ts">
import { v4 as uuidv4 } from 'uuid'
import VEmojiPicker from 'v-emoji-picker'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Recorder from 'js-audio-recorder'
import Button from '@/components/common/button.vue'
import menuPay from '@/components/chat/menuPay.vue'
@Component({
  components: {
    Button,
    VEmojiPicker,
    menuPay
  }
})
export default class footerChat extends Vue {
  @Prop({}) response: any
  @Prop({}) activeEmoji: any
  @Prop({}) menuPayActive: any
  @Prop({}) myUser: any
  @Prop({}) multiple: any
  @Prop({}) id: any
  @Prop({}) selected: any

  message: string = ''
  recorderActive: boolean = false
  min: number = 0
  sec: number = 0
  notText: boolean = false
  emojis: any = ['😊', '😃', '😏', '😍', '😘', '😚', '😳', '😌', '😆', '😁', '😆', '😁', '😉', '😜', '😝', '😝', '😀', '😗', '😙', '😛', '😴', '😟', '😦', '😧', '😮', '😬', '😕', '😯', '😑', '😒', '😅', '😓', '😥', '😩', '😔', '😞', '😖', '😨', '😰', '😣', '😢', '😭', '😂', '😲', '😲', '😭', '😂', '😲', '😱', '😫', '😠', '😡', '😤', '😪', '😋', '😷', '😷', '😎', '😵', '👿', '😈', '😐', '😶', '😇']
  indexEmoji: number = 0
  recorder: any = null
  timeVoice: any = null
  menuFiles: boolean = false

  get SelectedLength () {
    return this.selected.length
  }

  get getEmoji () {
    // return this.emojis[this.indexEmoji]
    return '😊'
  }

  @Watch('message')
  handleMessageWriting (val) {
    const refChat = this.$fireStore.collection('chats').doc((this.$parent as any).chat)
    if (val) {
      refChat.set(
        {
          writing: {
            [this.id]: {
              name: this.myUser.name,
              id: this.id,
              avatar: this.myUser.avatar
            }
          }
        },
        {
          merge: true
        }
      )
    } else {
      refChat.update({
        [`writing.${this.id}`]: this.$fireStoreObj.FieldValue.delete()
      })
    }
  }

  handleChangeFile (evt: any, doc: boolean) {
    const _this = this
    function getBase64 (file: any) {
      const reader: any = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        let type = 'image'
        if (reader.result.includes('video')) {
          type = 'video'
        } else if (reader.result.includes('audio')) {
          type = 'audio'
        }
        _this.$emit('update:preview', {
          blob: reader.result,
          file,
          type
        })
      }
    }
    if (!doc) {
      const file = evt.target.files[0]
      getBase64(file)
    }
  }

  getSrcAudio (blob) {
    const blobUrl = URL.createObjectURL(blob)
    return blobUrl
  }

  handleAudio () {
    let contadorS = 0
    let contadorM = 0

    this.timeVoice = setInterval(() => {
      if (contadorS === 60) {
        contadorS = 0
        contadorM++
        this.min = contadorM

        if (contadorM === 60) {
          contadorM = 0
        }
      }
      this.sec = contadorS
      contadorS++
    }, 1000)

    this.recorderActive = true
    this.recorder = new Recorder()
    this.recorder.start()
  }

  handleAudioCancel () {
    this.recorderActive = false
    clearInterval(this.timeVoice)
    this.sec = 0
    this.min = 0
    this.recorder.stop()
    this.recorder.destroy().then(() => {
      this.recorder = null
    })
  }

  handleAudioStop () {
    const sec = this.sec
    const min = this.min

    const timestamp = this.$fireStoreObj.FieldValue.serverTimestamp()
    const id = uuidv4()
    const blob = this.recorder.getWAVBlob()
    const ref = this.$fireStorage.ref('audios').child(id)
    const refChat = this.$fireStore.collection('chats').doc((this.$parent as any).chat).collection('messages')

    this.handleAudioCancel()

    ref.put(blob).then((snapshot) => {
      ref.getDownloadURL().then((url) => {
        const object: any = {
          avatar: this.myUser.avatar,
          date: (this.$parent as any).getDate(),
          name: this.myUser.name,
          text: (this.$parent as any).getMessageHtml(this.message),
          user: this.myUser.id,
          updatedAt: timestamp,
          type: 'audio',
          file_url: url,
          time: `${min}: ${sec > 10 ? sec : `0${sec}`}`,
          notView: true
        }

        if (this.response) {
          object.response = this.response
        }

        refChat.add(object)
      })
    })
  }

  toggleMenuFiles (evt: any) {
    const _this = this
    this.menuFiles = !this.menuFiles

    const handleClick = (evtClick: any) => {
      if (!evtClick.target.closest('.menu-files') && !evtClick.target.closest('.files-btn')) {
        _this.menuFiles = false
        window.removeEventListener('click', handleClick)
      }
    }
    window.addEventListener('click', handleClick)
  }

  handleRandomEmoji () {
    this.indexEmoji = Math.round(Math.random() * (62 - 1) + 1)
  }

  selectEmoji (emoji) {
    this.message += emoji.data
  }

  handleSend () {
    if (!this.message) {
      this.notText = true
      setTimeout(() => {
        this.notText = false
      }, 300)
      return
    }
    const timestamp = this.$fireStoreObj.FieldValue.serverTimestamp()
    const refWriting = this.$fireStore.collection('chats').doc((this.$parent as any).chat)
    refWriting.update({
      [`writing.${(this.$parent as any).id}`]: this.$fireStoreObj.FieldValue.delete()
    })
    const refChat = this.$fireStore.collection('chats').doc((this.$parent as any).chat).collection('messages')

    const object: any = {
      avatar: this.myUser.avatar,
      date: (this.$parent as any).getDate(),
      name: this.myUser.name,
      text: (this.$parent as any).getMessageHtml(this.message),
      user: this.myUser.id,
      updatedAt: timestamp,
      type: 'text',
      notView: true
    }

    if (this.response) {
      object.response = this.response
    }

    const refChatLast = this.$fireStore.collection('chats').doc((this.$parent as any).chat)

    refChatLast.update({
      last: object
    })

    const id = uuidv4()

    refChatLast.update(
      {
        new: this.$fireStoreObj.FieldValue.arrayUnion(`${(this.$parent as any).id}_${id}`)
      }
    )

    refChat.add(object)

    this.message = ''
    this.$emit('update:response', null)
    this.$emit('handleSend')
  }

  mounted () {
    this.handleMessageWriting('')
  }
}
</script>
<style lang="sass">
.fade-voice-enter-active, .fade-voice-leave-active
  transition: all .2s ease

.fade-voice-enter, .fade-voice-leave-to
  opacity: 0
  margin-left: -40px
  color: transparent

.footer
  position: relative
  bottom: 0px
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  background: -color('bg')
  transform: translate(0,-100%)
  padding: 10px
  box-shadow: 0px -10px 10px 0px rgba(0,0,0, .03)
  z-index: 100
  padding-bottom: calc(10px + env(safe-area-inset-bottom))
  .con-multiple
    position: absolute
    left: 0px
    top: 0px
    z-index: 100
    width: 100%
    height: 100%
    background: -color('bg')
    display: flex
    align-items: center
    justify-content: space-between
    padding: 0px 20px
    .con-close-multiple
      display: flex
      align-items: center
      justify-content: center
      p
        font-size: .9rem
        padding-left: 10px
  &:after
    content: ''
    width: 100%
    z-index: -1
    height: 100%
    background: -color('bg')
    position: absolute
    left: 0px
    top: 0px
  .con-textarea
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    border-radius: 15px
    position: relative
    z-index: 10
    &.recorderActive
      textarea
        overflow: hidden
        white-space: nowrap
    &.notText
      .bg
        border: 2px solid -color('color-2', .3)
    .con-file-voice
      display: flex
      align-items: center
      order: -1
      margin-left: 10px
      position: relative
      z-index: 10
      /deep/.button
        &:last-child
          margin-right: 5px
      .files-btn
        &.active
          background: -color('bg-4')
          opacity: 1
          transform: scale(1.1)
          i
            transform: rotate(45deg)
      .menu-files
        position: absolute
        top: 0px
        left: 0px
        transform: translate(0px, calc(-100% - 15px))
        z-index: 5
        border-radius: 14px
        ul
          li
            width: 40px
            height: 40px
            display: flex
            align-items: center
            justify-content: center
            background: -color('color-2')
            margin-top: 8px
            border-radius: 14px
            color: #fff
            cursor: pointer
            position: relative
            input
              position: absolute
              z-index: 10
              width: 100%
              height: 100%
              opacity: 0
              cursor: pointer
            &:hover
              background: -color('color-3')
            &:nth-child(1)
              transition: all .25s ease, margin .25s ease .2s
              z-index: 1
            &:nth-child(2)
              transition: all .25s ease, margin .25s ease .1s
              z-index: 2
            &:nth-child(3)
              transition: all .25s ease, margin .25s ease 0s
              z-index: 3
            i
              font-size: 1.3rem

      .voice
        transition: all .25s ease
        span
          white-space: nowrap
          font-weight: bold
          width: 0px
        &.recorderActive
          background: -color('color')
          color: #fff
          opacity: 1
          min-width: 80px
          display: flex
          align-items: center
          justify-content: center
          span
            width: 40px
          &:after
            content: ''
      button:not(.button)
        min-width: 40px
        height: 40px
        display: flex
        align-items: center
        justify-content: center
        border-radius: 14px
        border: 0px
        background: transparent
        cursor: pointer
        opacity: .5
        transition: all .25s ease
        span
          width: 0px
          overflow: hidden
          transition: all .25s ease
        &:hover
          opacity: 1
        i
          font-size: 1.3rem
          transition: transform .25s ease
    .con-send-emoji
      display: flex
      align-items: center
      justify-content: center
      padding-left: 10px
      padding-right: 10px
      .button
        transform: translate(0,-8px)
        &:disabled
          opacity: 1
          transform: translate(0,0px)
          box-shadow: 0px 0px 0px 0px -color('color-2', .35)
        &:hover
          transform: translate(0,-5px)
      .emoji-btn
        width: 40px
        height: 40px
        display: flex
        align-items: center
        justify-content: center
        border-radius: 14px
        border: 0px
        background: transparent
        cursor: pointer
        font-size: 1.2rem
        filter: grayscale(100%)
        opacity: .5
        transition: all .25s ease
        &:disabled
          opacity: .4
          pointer-events: none
        i
          font-size: 1.5rem
        &.activeEmoji
          filter: grayscale(0%)
          opacity: 1
          font-size: 1.4rem
          background: -color('bg')
          border-radius: 0px 0px 15px 15px
          transform: scale(1.1)
          box-shadow: 0px 5px 10px 0px rgba(0,0,0,.1)
        &:hover
          filter: grayscale(0%)
          opacity: 1
  .con-response
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    transform: translate(0, -99%)
    background: -color('bg')
    padding: 10px
    padding-bottom: 0px
    display: flex
    align-items: center
    justify-content: center
    box-shadow: 0px -10px 10px 0px rgba(0,0,0, .03)
    z-index: -2
    min-height: 78px
    video
      max-height: 80px
      border-radius: 20px
    img
      max-height: 80px
      border-radius: 20px
    h4
      padding-bottom: 5px
    i
      font-size: 1.1rem
      margin-right: 10px
    button
      display: flex
      align-items: center
      justify-content: center
      width: 42px
      height: 42px
      border: 0px
      margin-left: 10px
      border-radius: 14px
      cursor: pointer
      transition: all .25s ease
      &:hover
        opacity: .7
      i
        font-size: 1.25rem
        margin-right: 0px
    .response-sms
      background: -color('bg-2')
      padding: 12px
      font-size: .8rem
      border-radius: 10px 10px 10px 6px
      border-left: 4px solid #3085ff
      width: calc(100% - 50px)
      display: flex
      align-items: flex-start
      justify-content: flex-start
      flex-direction: column
      p
        display: flex
        align-items: center
        justify-content: center
  .bg
    border: 2px solid transparent
    position: absolute
    left: 0px
    top: 0px
    width: 100%
    height: 100%
    z-index: -1
    border-radius: inherit
    transition: all .25s ease
    border: 2px solid -color('bg-3')
    background: -color('bg-2')
  textarea
    padding: 9px 12px
    width: calc(100% - 100px)
    resize: none
    height: 40px
    border: 0px
    background: transparent
    transition: all .25s ease
    font-size: .9rem
    padding-left: 8px
    &:focus
      ~ .bg
        background: -color('bg-3')
    &::placeholder
      color: -color('color', .45)
      white-space: nowrap
// responsive

@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .footer
    position: fixed
    width: 100vw
    transform: translate(0px)
    .fade-voice-enter-active, .fade-voice-leave-active
    transition: all .2s ease

    .fade-voice-enter, .fade-voice-leave-to
      opacity: 0
      margin-left: -35px !important
      color: transparent
    .con-textarea
      textarea
        padding-left: 0px
      .con-send-emoji
        padding-left: 0px
        padding-right: 0px
      .con-file-voice
        margin-left: 5px
        button:not(.button)
          min-width: 35px
</style>
