<template>
  <div
    ref="chat"
    class="con-chat"
    :class="{ smooth }"
  >
    <div
      class="view-more-sms"
      @click="getMoreMessages"
    >
      <i class="bx bx-chat" />
      <p>
        Cargar Mensajes anteriores
      </p>
    </div>
    <transition-group name="list">
      <message
        v-for="(sms) in getMessagesFilter"
        :id="sms.id"
        :ref="sms.id"
        :key="sms.id"
        :id-user="id"
        :data-id="sms.id"
        :data-user="sms.user"
        :sms="sms"
        :chat="$parent.chat"
        :multiple="multiple"
        :is-selected="selected.includes(sms)"
        @handleClickResend="handleClickResend"
        @handleClickResponse="handleClickResponse"
        @handleClickResponseSMS="handleClickResponseSMS"
        @openPreview="openPreview"
        @selectedMultiple="selectedMultiple"
        @handleClickSelectedMultiple="$emit('handleClickSelectedMultiple')"
        @deleteMessage="deleteMessage"
        @loadImage="handleScrollTop"
      />
    </transition-group>
    <transition-group name="list">
      <div
        v-for="(user, index, i) in writing"
        :key="i+1"
        class="message-writing list-item"
      >
        <div class="con-avatar">
          <Avatar :src="`/avatars/avatar-${user.avatar}.png`" />
        </div>

        <div class="text">
          <p>
            <span class="writing">
              <div class="point point-1" />
              <div class="point point-2" />
              <div class="point point-3" />
            </span>
          </p>
          <footer>
            <p
              class="name"
            >
              {{ user.name }}
            </p>
          </footer>
        </div>
      </div>
    </transition-group>
    <transition name="down">
      <Button v-if="visibleDown" icon white class="down" @click="handleScrollTop">
        <i class="bx bx-down-arrow-alt" />
      </Button>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
import Avatar from '@/components/common/avatar.vue'
import message from '@/components/chat/message.vue'
@Component({
  components: {
    Button,
    Avatar,
    message
  }
})
export default class chatContent extends Vue {
  id: any = null
  messages: any = []
  writing: any = []
  visibleDown: boolean = false
  smooth: boolean = false
  limit: number = 30
  allMsgIds: any = []
  notScroll: boolean = false

  @Prop({}) selected: any
  @Prop({}) response: any
  @Prop({}) multiple: any
  @Prop({}) menuPayActive: any

  get getMessagesFilter () {
    const messages = []
    const total = this.messages.length
    this.messages.forEach((item, i) => {
      if (i > total - this.limit) {
        messages.push(item)
      }
    })
    return messages
  }

  getMoreMessages () {
    this.notScroll = true
    this.limit += 30
  }

  deleteMessage (id) {
    this.allMsgIds.splice(this.allMsgIds.indexOf(id), 1)
    setTimeout(() => {
      this.messages = this.messages.filter((item) => {
        return item.id !== id
      })
      const refChat = this.$fireStore.collection('chats').doc((this.$parent as any).chat).collection('messages').doc(id)
      refChat.delete()
    }, 300)
  }

  selectedMultiple (message) {
    if ((this.$parent as any).selected.includes(message)) {
      (this.$parent as any).selected.splice((this.$parent as any).selected.indexOf(message), 1)
    } else {
      (this.$parent as any).selected.push(message)
    }
  }

  @Watch('writing')
  handleWriting () {
    this.handleScrollTop()
  }

  handleChangeViewState () {
    const messagesNotView = document.querySelectorAll('.chat .notView')
    if (!messagesNotView) {
      return
    }
    messagesNotView.forEach((message: any) => {
      const refChatMessage = this.$fireStore.collection('chats').doc((this.$parent as any).chat).collection('messages').doc(message.dataset.id)
      refChatMessage.update({
        notView: false
      })

      const refChat = this.$fireStore.collection('chats').doc((this.$parent as any).chat)
      refChat.update({
        new: []
      })
    })

    const refChatLast = this.$fireStore.collection('chats').doc((this.$parent as any).chat)
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

  @Watch('messages')
  handleMessageWritings () {
    window.addEventListener('click', this.handleChangeViewState)
    this.$nextTick(() => {
      const messagesNotView = document.querySelectorAll('.notView')
      if (messagesNotView.length > 0) {
        this.title = messagesNotView.length > 1 ? `Nuevos Mensajes (${messagesNotView.length}) |` : 'Nuevo Mensaje |'
      } else {
        this.title = ''
      }

      this.handleScrollTop()
    })
  }

  handleScrollTop () {
    if (this.notScroll || !this.$refs.chat) {
      return
    }
    setTimeout(() => {
      const chat: any = this.$refs.chat
      const h = chat.scrollHeight
      chat.scrollTop = h
    }, 100)
    // this.$nextTick(() => {
    //   const chat: any = this.$refs.chat
    //   const h = chat.scrollHeight
    //   chat.scrollTop = h
    // })
  }

  openPreview (url) {
    (this.$parent as any).urlPreview = url
  }

  handleClickResend (evt, message) {
    this.$emit('update:resend', message)
    this.$emit('update:resend-active', true)
    evt.target.closest('.text').classList.remove('open-menu')
  }

  handleClickResponse (evt, message) {
    this.$emit('update:response', message)
    if (evt.target.closest('.text')) {
      evt.target.closest('.text').classList.remove('open-menu')
    }
    (this.$parent.$el.querySelector('.con-textarea textarea') as HTMLElement).focus()
  }

  handleClickResponseSMS (response) {
    const [sms]: any = this.$refs[response.id]
    const top = sms.$el.offsetTop
    setTimeout(() => {
      sms.$el.classList.add('view')
    }, 150)
    this.$nextTick(() => {
      const chat: any = this.$refs.chat
      chat.scrollTop = top - 100
    })

    setTimeout(() => {
      sms.$el.classList.remove('view')
    }, 450)
  }

  getData () {
    const refMessages = this.$fireStore.collection('chats').doc((this.$parent as any).chat).collection('messages').orderBy('updatedAt', 'asc')
    refMessages.onSnapshot((querySnapshot) => {
      const messages = []
      querySnapshot.forEach((doc) => {
        // if (!this.allMsgIds.includes(doc.id)) {
        //   this.allMsgIds.push(doc.id)
        //   this.messages.push({
        //     id: doc.id,
        //     ...doc.data()
        //   })
        // }
        messages.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setTimeout(() => {
        this.smooth = true
        setTimeout(() => {
          this.handleScrollTop()
        }, 300)
      }, 300)

      this.messages = messages
    })

    const refUsers = this.$fireStore.collection('chats').doc((this.$parent as any).chat)
    refUsers.onSnapshot((doc) => {
      const writing = doc.data().writing
      delete writing[this.id]
      this.writing = writing
    })
  }

  mounted () {
    this.id = this.$cookies.get('user')
    this.getData()

    window.addEventListener('resize', () => {
      this.smooth = false
      this.handleScrollTop()
      setTimeout(() => {
        this.smooth = true
      }, 100)
    });

    (this.$refs.chat as any).addEventListener('scroll', (evt) => {
      if (evt.target.scrollTop + 1200 > evt.target.scrollHeight) {
        this.visibleDown = false
        this.notScroll = false
      } else {
        this.visibleDown = true
      }
    })
  }
}
</script>
<style lang="sass" scoped>
.down-enter-active, .down-leave-active
  transition: all .25s

.down-enter, .down-leave-to
  opacity: 0
  transform: scale(.6)

.message-writing
  width: 100%
  padding: 15px
  padding-bottom: 22px
  display: flex
  align-items: flex-start
  justify-content: flex-start
  transform-origin: left top
  transition: all .25s ease
  position: relative
  .text
    background: -color('bg-3')
    max-width: 500px
    border-radius: 18px 18px 18px 5px
    margin: 0px 8px
    position: relative
    font-size: .85rem
    padding: 12px 15px
    padding-bottom: 11px
    footer
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
  .con-avatar
    .avatar
      width: 38px
      height: 38px
.con-chat
  padding-top: 0px
  width: 100%
  position: relative
  overflow: auto !important
  padding-bottom: 80px
  height: calc(100vh - 54px)
  overflow-x: hidden !important
  &.smooth
    scroll-behavior: smooth
  .view-more-sms
    width: 100%
    padding: 15px
    display: flex
    align-items: center
    justify-content: center
    background: -color('bg-3')
    transition: all .25s ease
    cursor: pointer
    &:hover
      opacity: .6
    i
      margin-right: 10px
      font-size: 1.2rem
  .down
    position: fixed
    bottom: 80px
    right: 22px
    box-shadow: 0px 5px 20px 0px rgba(0,0,0,.1)
    i
      font-size: 1.4rem
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
