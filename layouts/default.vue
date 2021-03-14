<template>
  <div
    :class="{
      open: openSidebar
    }"
    class="content"
  >
    <div
      class="background"
      @click="toggleSidebar(false)"
    />
    <NavBar @click="toggleSidebar" />
    <nuxt />
    <SideBar :open="openSidebar" />
  </div>
</template>
<script lang="ts">
import { Action } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import NavBar from '@/components/layout/Navbar.vue'
import SideBar from '@/components/layout/Sidebar.vue'
import * as actions from '~/constants/actions'
@Component({
  components: {
    NavBar,
    SideBar
  }
})
export default class Default extends Vue {
  openSidebar: boolean = false
  id: any = null
  chats: any = []

  toggleSidebar (val: boolean) {
    this.openSidebar = val
  }

  @Action(actions.AUTHENTICATED) authenticated!: Function

  getChats (chats) {
    chats.forEach((chat) => {
      const ref = this.$fireStore.collection('chats').doc(chat)
      const refMessages = this.$fireStore.collection('chats').doc(chat).collection('messages').orderBy('updatedAt', 'desc').limit(1)

      refMessages.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const data = change.doc.data()
            if (data.notView && data.user !== this.id && !this.$route.fullPath.includes(chat)) {
              this.$notification({
                title: `Nuevo Mensaje (${data.name})`,
                text: data.text,
                tono: true,
                click: () => {
                  this.$router.push(`/chat/?chat=${chat}`)
                }
              })
            }
          }
        })
      })

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

  handleNotificationChat () {
    this.id = this.$cookies.get('user')
    const ref = this.$fireStore.collection('users').doc(this.id)
    ref.onSnapshot((doc) => {
      this.getChats(doc.data().chats)
    })
  }

  mounted () {
    // this.handleNotificationChat()
    if (localStorage.authenticated) {
      this.authenticated(true)
    }
  }
}
</script>
<style lang="sass" scoped>
.content
  &.open
    .background
      opacity: 1
      visibility: visible
      pointer-events: auto
  .background
    opacity: 0
    width: 100%
    height: 100vh
    position: absolute
    left: 0px
    top: 0px
    z-index: 100
    background: rgba(18, 22, 36, 0.45)
    visibility: hidden
    pointer-events: none
    transition: all .25s ease
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
