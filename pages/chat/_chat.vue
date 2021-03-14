<template>
  <div
    :class="{ responseActive: response, menuPayActive }"
    class="chat"
  >
    <!-- // prev -->
    <Popup v-model="resendActive">
      <template #header>
        <h3>
          Reenviar Mensaje a...
        </h3>
      </template>
      <div v-if="resend" class="con-resend">
        <!-- <div class="message-resend">
          <p v-html="resend.text" />
        </div> -->

        <ul class="ul-users-resend">
          <li>
            <Avatar src="/avatars/avatar-9.png" />
            <p>
              Juan Reyes
            </p>
          </li>
          <li>
            <Avatar src="/avatars/avatar-1.png" />
            <p>
              Maria Laura
            </p>
          </li>
          <li>
            <Avatar src="/avatars/avatar-7.png" />
            <p>
              Yean carlos
            </p>
          </li>
          <li>
            <Avatar src="/avatars/avatar-8.png" />
            <p>
              Pepe Reyes
            </p>
          </li>
          <li>
            <Avatar src="/avatars/avatar-2.png" />
            <p>
              Sonia Laura
            </p>
          </li>
          <li>
            <Avatar src="/avatars/avatar-6.png" />
            <p>
              Jose carlos
            </p>
          </li>
        </ul>
      </div>
    </Popup>
    <transition name="fade-file">
      <previewFile v-if="urlPreview" :url="urlPreview" @close="urlPreview = null" />
    </transition>
    <preview-upload :chat="chat" :my-user="myUser" :preview="preview" @close="preview = null" />

    <transition name="fade-bg">
      <div v-if="menuPayActive" class="bg-menuPayActive" @click="menuPayActive = false" />
    </transition>

    <header class="header-chat">
      <button class="back" @click="$router.push('/chat/')">
        <i class="bx bx-chevron-left" />
      </button>
    </header>

    <contentChat
      ref="chat"
      :response.sync="response"
      :resend.sync="resend"
      :resend-active.sync="resendActive"
      :multiple="multiple"
      :selected="selected"
      :menu-pay-active.sync="menuPayActive"
      @handleClickSelectedMultiple="handleClickSelectedMultiple"
    />

    <footerChat
      :id="id"
      ref="footer"
      :multiple.sync="multiple"
      :selected="selected"
      :preview.sync="preview"
      :my-user="myUser"
      :response.sync="response"
      :active-emoji.sync="activeEmoji"
      :menu-pay-active.sync="menuPayActive"
      @deleteMessagesSelected="deleteMessagesSelected"
      @cancelSelected="cancelSelected"
      @handleSend="handleScrollTop"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
import Avatar from '@/components/common/avatar.vue'
import Popup from '@/components/common/popup.vue'
import previewFile from '@/components/chat/previewFile.vue'
import previewUpload from '@/components/chat/previewUpload.vue'
import contentChat from '@/components/chat/content.vue'
import footerChat from '@/components/chat/footer.vue'
@Component({
  transition: '',
  layout: ({ isMobile }: {isMobile: any}) => isMobile ? 'mobile' : 'default',
  components: {
    Button,
    Avatar,
    previewFile,
    previewUpload,
    contentChat,
    footerChat,
    Popup
  },
  head () {
    return {
      title: `${this.title} dinamic`
    }
  },
  asyncData ({ store }) {
    return {
      id: store.state.user
    }
  }
})
export default class chat extends Vue {
  id: any = null
  title: string = ''
  messages: any = null
  users: any = []
  writing: any = []
  myUser: any = null
  response: any = null
  resend: any = null
  resendActive: boolean = false
  preview: any = null
  cameraStream: any = null
  captureActive: boolean = false
  frontalCamera: boolean = true
  focusWindow: boolean = false
  isMobile: boolean = false
  urlPreview: string = ''
  activeEmoji: boolean = false
  menuPayActive: boolean = false
  multiple: boolean = false
  selected: any = []

  @Watch('menuPayActive')
  handleMenuPayActive (val) {
    if (val) {
      this.activeEmoji = false
    }
  }

  get chat (): any {
    return this.$route.query.chat
  }

  cancelSelected () {
    this.multiple = false
    this.selected = []
  }

  deleteMessagesSelected () {
    this.$dialog({
      title: 'Estas seguro de eliminar estos mensajes?',
      click: () => {
        this.selected.forEach((message) => {
          const refChat = this.$fireStore.collection('chats').doc(this.chat).collection('messages').doc(message.id)
          refChat.delete()
        })

        this.multiple = false
        this.selected = []
      }
    })
  }

  handleClickSelectedMultiple () {
    this.multiple = true
  }

  dataURItoBlob (dataURI) {
    const byteString = atob(dataURI.split(',')[1])
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const buffer = new ArrayBuffer(byteString.length)
    const data = new DataView(buffer)
    for (let i = 0; i < byteString.length; i++) {
      data.setUint8(i, byteString.charCodeAt(i))
    }
    return new Blob([buffer], { type: mimeString })
  }

  @Watch('$route.fullPath')
  handleChageRouter (val) {
    if (this.$route.fullPath.includes('/chat/?chat')) {
      this.id = this.$cookies.get('user')
      this.getMyUser()
      // this.getData()
      // this.handleMessageWriting('')
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          this.handleChangeViewState()
        }
      })
    }
  }

  @Watch('response')
  handleResponseWatch (val: any) {
    const chat: any = this.$refs.chat

    this.$nextTick(() => {
      const footer: any = this.$refs.footer

      if (this.activeEmoji) {
        footer.$el.querySelector('#EmojiPicker').style.paddingBottom = val !== null ? `${footer.$el.querySelector('.con-response').offsetHeight + 10}px` : '0px'
      }

      if (val !== null) {
        chat.$el.style.paddingBottom = `${footer.$el.offsetHeight + (this.activeEmoji ? footer.$el.querySelector('#EmojiPicker').offsetHeight : footer.$el.querySelector('.con-response').offsetHeight + 10)}px`
        this.handleScrollTop()
      } else {
        chat.$el.style.paddingBottom = `${footer.$el.offsetHeight + (this.activeEmoji ? footer.$el.querySelector('#EmojiPicker').offsetHeight : 0)}px`
      }
    })
  }

  @Watch('activeEmoji')
  handleActiveEmoji (val: boolean) {
    const chat: any = this.$refs.chat

    this.$nextTick(() => {
      const footer: any = this.$refs.footer

      if (this.response !== null) {
        footer.$el.querySelector('#EmojiPicker').style.paddingBottom = `${footer.$el.querySelector('.con-response').offsetHeight + 10}px`
      }
      this.$nextTick(() => {
        if (val) {
          chat.$el.style.paddingBottom = `${footer.$el.offsetHeight + footer.$el.querySelector('#EmojiPicker').offsetHeight + (this.response !== null ? footer.$el.querySelector('.con-response').offsetHeight + 10 : 0)}px`
        } else {
          chat.$el.style.paddingBottom = `${footer.$el.offsetHeight + (this.response !== null ? footer.$el.querySelector('.con-response').offsetHeight + 10 : 0)}px`
        }
        this.handleScrollTop()
      })
    })
  }

  handleScrollTop () {
    if (this.$refs.chat) {
      this.$nextTick(() => {
        const chat: any = this.$refs.chat
        const h = chat.$el.scrollHeight
        chat.$el.scrollTop = h
      })
    }
  }

  getMyUser () {
    const ref = this.$fireStore.collection('users').doc(this.id)
    ref.onSnapshot((doc) => {
      this.myUser = {
        ...doc.data(),
        id: this.id
      }
    })
  }

  formatAMPM () {
    let hours: any = new Date().getHours()
    let minutes: any = new Date().getMinutes()
    const ampm = hours >= 12 ? 'p. m.' : 'a. m.'
    hours = hours % 12
    hours = hours || 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes
    const strTime = hours + ':' + minutes + ' ' + ampm
    return strTime
  }

  getDate () {
    const date = new Date().toJSON().slice(0, 10).split('-')
    return `${date[2]}/${date[1]}/${date[0]} - ${this.formatAMPM()}`
  }

  getMessageHtml (message) {
    const linkifyHtml = require('linkifyjs/html')
    const showdown = require('showdown')
    const converter = new showdown.Converter()
    // eslint-disable-next-line unicorn/escape-case
    const reg = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug

    let text = message
    text = message.replace(reg, (emo) => {
      return `<span class="emoji">${emo}</span>`
    })

    if (text.indexOf('emoji">') !== 13 || text.charAt(text.length - 1) !== '>') {
      text += '<span></span>'
    }

    const html = linkifyHtml(converter.makeHtml(text))
    return html
  }

  created () {
    this.id = this.$cookies.get('user')
    this.getMyUser()
  }

  handleChangeViewState () {
    const messagesNotView = document.querySelectorAll('.chat .notView')
    if (!messagesNotView) {
      return
    }
    messagesNotView.forEach((message: any) => {
      const refChatMessage = this.$fireStore.collection('chats').doc(this.chat).collection('messages').doc(message.dataset.id)
      refChatMessage.update({
        notView: false
      })

      const refChat = this.$fireStore.collection('chats').doc(this.chat)
      refChat.update({
        new: []
      })
    })

    const refChatLast = this.$fireStore.collection('chats').doc(this.chat)
    refChatLast.set(
      {
        last: {
          notView: false
        }
      },
      {
        merge: true
      }
    )

    window.removeEventListener('click', this.handleChangeViewState)
  }

  beforeDestroy () {
    window.removeEventListener('click', this.handleChangeViewState)
  }

  mounted () {
    this.isMobile = window.__NUXT__.layout === 'mobile'
    if (!this.chat) {
      return
    }
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.handleChangeViewState()
      }
    })
  }
}
</script>
<style lang="sass">
.fade-bg-enter-active, .fade-bg-leave-active
  transition: all .25s ease

.fade-bg-enter, .fade-bg-leave-to
  opacity: 0

.chat
  .con-popup
    padding: 15px !important

.con-resend
  h3
    padding: 10px
  .ul-users-resend
    li
      display: flex
      align-items: center
      justify-content: flex-start
      padding: 5px
      transition: all .25s ease
      border-radius: 15px
      cursor: pointer
      margin: 2px 0px
      &:hover
        background: -color('bg-2')
      p
        padding: 10px

.bg-menuPayActive
  position: absolute
  top: 0px
  left: 0px
  width: 100%
  height: 100%
  background: -color('bg', .8)
  backdrop-filter: saturate(180%) blur(15px)
  z-index: 50

.header-chat
  width: 100%
  height: 54px
  background: -color('bg')
  position: relative
  display: flex
  align-items: center
  justify-content: flex-start
  box-shadow: 0px 5px 15px 0px rgba(0,0,0,.05)
  .back
    width: 50px
    border-radius: 0px 12px 12px 0px
    padding: 5px
    display: flex
    align-items: center
    justify-content: flex-end
    border: 0px
    background: -color('color-2')
    color: #fff
    i
      font-size: 1.2rem
.writing
  display: flex
  align-items: center
  justify-content: center
  padding: 6px 0px
  .point
    position: relative
    width: 5px
    height: 5px
    margin: 0px 2px
    border-radius: 50%
    background: -color('color')
    &.point-1
      animation: .9s ease point infinite
    &.point-2
      animation: .9s ease point infinite .3s
    &.point-3
      animation: .9s ease point infinite .6s

@keyframes point
  0%
    opacity: .3
  50%
    opacity: 1
    transform: translate(0, -3px)
  100%
    opacity: .3

#EmojiPicker.picker
  position: absolute
  width: 100%
  top: 0px
  right: 0px
  transform: translate(0, -100%)
  background: -color('bg') !important
  border: 0px
  z-index: -3
  display: block
  .container-emoji
    height: 245px
  .category
    padding-top: 10px
    padding-bottom: 10px
    transition: all .25s ease
    border-bottom: 3px solid transparent
    svg
      max-height: 22px !important
    &.active
      border-bottom: 3px solid #3085ff
      svg
        fill: #3085ff
    &:hover
      opacity: .5
  .svg
    display: flex
    align-items: center
    justify-content: center
  .container-search
    display: none
  .grid-emojis
    grid-template-columns: none !important
    display: flex
    align-items: flex-start
    justify-content: flex-start
    flex-wrap: wrap
    padding: 5px
    padding-top: 0px
    span
      display: flex
      align-items: center
      justify-content: center
      width: 40px !important
      height: 40px !important
      padding-bottom: 5px

.files-enter-active, .files-leave-active
  transition: all .25s ease

.files-enter, .files-leave-to
  opacity: 0
  transform: translate(0px, -80%) !important

.response-enter-active, .response-leave-active
  transition: all .25s ease

.response-enter, .response-leave-to
  transform: translate(0, 10%) !important

.list-item
  transition: all .3s ease

.list-enter
  opacity: 0
  transform: translate(-100px) scale(.5)
  footer
    opacity: 0
    transform: translate(0, 50%) !important
  &.send
    transform: translate(100px) !important

.list-leave-to
  margin-top: -80px
  opacity: 0
  margin-bottom: 0px

.chat
  width: 100%
  height: 100vh
  overflow: hidden
  position: relative
// responsive

@media (min-width: 813px)
  .header-chat
    .back
      display: none
@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .con-chat
    padding-top: 54px !important
    height: calc(100vh - 54px) !important
    padding-bottom: 80px
    bottom: 0px
    position: absolute !important
  .header-chat
    position: fixed
    z-index: 200
  .preview-image-video
    .con-preview-image-video
      .close
        top: 0px
        right: 0px
      img
        max-width: calc(100% - 10px)
        max-height: calc(100% - 10px)
  .chat
    .footer
      padding: 10px 5px
      .con-textarea
        .con-send-emoji
          .emoji-btn
            width: 35px
        .con-file-voice
          button
            min-width: 35px
</style>
