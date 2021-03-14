<template>
  <div class="content-page content-chat">
    <!-- <header class="header-chat"> -->
    <div class="con-users-chats">
      <!-- <button @click="newChat">
        nuevo
      </button> -->
      <header class="header-chats">
        <cInput placeholder="Buscar" type="text">
          <template #icon>
            <i class="bx bx-search" />
          </template>
        </cInput>
        <Button icon gradient @click="newChat">
          <i class="bx bxs-message-square-detail" />
        </Button>
      </header>
      <ul>
        <nuxt-link
          v-for="(chat, chatIndex) in chats"
          v-show="chat"
          :key="chatIndex"
          tag="li"
          exact
          :to="`/chat/?chat=${chat.id}`"
        >
          <Avatar
            v-for="(user, i, index) in chat.users"
            v-show="i.trim() != id.trim()"
            :key="index"
            :active="user.active"
            :src="`/avatars/avatar-${user.avatar}.png`"
          />
          <div class="con-info">
            <div class="info-1">
              <p
                v-for="(user, i) in chat.users"
                v-show="i != id"
                :key="i"
              >
                <!-- {{ i }}
                {{ id }} -->
              </p>
              <span v-if="isWriting(chat.writing)" class="writing">
                <div class="point point-1" />
                <div class="point point-2" />
                <div class="point point-3" />
              </span>
              <span v-if="chat.last && !isWriting(chat.writing)" v-html="chat.last.text" />
              <i v-if="chat.last.type == 'audio' && !isWriting(chat.writing)" class="bx bx-microphone" />
              <i v-if="chat.last.type == 'image' && !isWriting(chat.writing)" class="bx bx-image" />
              <i v-if="chat.last.type == 'video' && !isWriting(chat.writing)" class="bx bx-video" />
            </div>
            <div class="info-2">
              <span v-if="chat.last" class="date">{{ chat.last.date }}</span>
              <span v-if="chat.new" class="checks">
                <span v-if="getNew(chat.new) > 0" class="badge">
                  {{ getNew(chat.new) }}
                </span>
                <span v-else :class="{ notView: chat.last.notView }" class="check">
                  <i class="bx bx-check-double" />
                </span>
              </span>
            </div>
          </div>
        </nuxt-link>
      </ul>
    </div>
    <!-- {{ $route.query.chat }} {{ isMobile }} -->
    <div class="con-chat-parent">
      <nuxt-child v-if="$route.query.chat" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Avatar from '@/components/common/avatar.vue'
import Button from '@/components/common/button.vue'
import cInput from '@/components/common/input.vue'
@Component({
  transition: '',
  middleware: 'authenticated',
  layout: ({ isMobile }: {isMobile: any}) => isMobile ? 'mobile' : 'default',
  components: {
    Avatar,
    Button,
    cInput
  },
  asyncData ({ store }) {
    return {
      id: store.state.user
    }
  }
})
export default class chatParent extends Vue {
  id: string = ''
  users: any = []
  myUser: any = {}
  chats: any = []
  isMobile: boolean = false

  isWriting (writing) {
    delete writing[this.id]
    return Object.keys(writing).length > 0
  }

  newChat () {
    const ref = this.$fireStore.collection('chats')
    const refId = ref.doc()
    ref.doc(refId.id).set({
      users: {
        [this.id]: {
          name: this.myUser.name,
          avatar: this.myUser.avatar
        },
        EFdjQxBybOIZNhMl7cnO: {
          name: 'maria',
          avatar: 4
        }
      },
      new: [],
      writing: {},
      last: {}
    })

    const refUser = this.$fireStore.collection('users').doc(this.id)
    const refUser2 = this.$fireStore.collection('users').doc('EFdjQxBybOIZNhMl7cnO')

    refUser.update(
      {
        chats: this.$fireStoreObj.FieldValue.arrayUnion(refId.id)
      }
    )
    refUser2.update(
      {
        chats: this.$fireStoreObj.FieldValue.arrayUnion(refId.id)
      }
    )
  }

  getNew (news) {
    return news.filter((item) => {
      return !item.includes(this.id)
    }).length
  }

  getChats (chats) {
    chats.forEach((chat) => {
      const ref = this.$fireStore.collection('chats').doc(chat)
      ref.onSnapshot((doc) => {
        const i = this.chats.find((chatFind: any) => chatFind.id === doc.id)
        if (!i) {
          this.chats.push({
            ...doc.data(),
            id: doc.id
          })
        } else {
          this.chats.splice(i, 1, {
            ...doc.data(),
            id: doc.id
          })
        }
      })
    })
  }

  created () {
    this.id = this.$cookies.get('user')
    if (!this.id) {
      return
    }
    const ref = this.$fireStore.collection('users').doc(this.id)
    ref.onSnapshot((doc) => {
      this.myUser = JSON.parse(JSON.stringify(doc.data()))
      this.getChats(doc.data().chats)
    })
  }

  mounted () {
    this.isMobile = window.__NUXT__.layout === 'mobile'
  }
}
</script>
<style lang="sass" scoped>
.header-chats
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  background: -color('bg')
  padding: 4px 10px
  .con-input
    margin-top: 0px

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
.content-chat
  padding-top: 0px
  padding-bottom: 0px
  padding-right: 0px
  padding-left: 240px
  &:after
    display: none
  header.header-chat
    width: 100%
    position: absolute
    top: 0px
    height: 54px
    background: -color('bg')
    z-index: 500
    box-shadow: 0px 5px 20px 0px rgba(0,0,0,.05)
.con-chat-parent
  width: calc(100% - 300px)
  background: -color('bg')
  top: 0px
.con-users-chats
  position: relative
  width: 300px
  height: 100vh
  padding: 0px
  ul
    padding: 15px
    li
      padding: 14px
      cursor: pointer
      display: flex
      align-items: center
      .checks
        display: flex
        align-items: flex-end
        justify-content: flex-end
        line-height: .85rem
      .avatar
        width: 38px
        height: 38px
      .con-info
        display: flex
        align-items: center
        justify-content: space-between
        width: calc(100% - 38px)
        .info-1
          display: flex
          align-items: flex-start
          justify-content: flex-start
          flex-direction: column
          padding-left: 10px
          max-width: calc(100% - 20px)
          p
            font-size: .75rem
            font-weight: bold
          span
            max-width: 100%
            font-size: .7rem
            white-space: nowrap
            overflow: hidden
            /deep/p
              white-space: nowrap
              overflow: hidden
              text-overflow: ellipsis
        .info-2
          display: flex
          align-items: flex-end
          justify-content: flex-end
          flex-direction: column
          position: relative
          padding-top: 20px
          .check
            opacity: 1
            font-size: 1rem
            &.notView
              opacity: .3
          .badge
            min-width: 18px
            background: -color('color-2')
            color: #fff
            display: block
            position: relative
            padding: 2px 5px
            text-align: center
            border-radius: 6px
          .date
            font-size: .5rem
            white-space: nowrap
            position: absolute
            top: 5px
            right: 0px
          span
            font-size: .8rem
      &.nuxt-link-active
        background: #5c25ff
        border-radius: 20px
        color: #fff
        .writing
          .point
            background: #fff !important
// responsive

@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .content-chat
    padding-top: 0px !important
    .con-chat-parent
      width: 100%
      padding-top: 0px
      z-index: 10
      /deep/.con-chat
        padding-top: 10px
        padding-left: 0px
        padding-right: 0px
      // /deep/.chat
      //   height: calc(100vh - 104px)
    .con-users-chats
      padding-top: 0px
      width: 100%
      position: absolute
      left: 0px
      background: -color('bg-2')
      z-index: 1
    header.header-chat
      top: 0px
      position: relative
</style>
