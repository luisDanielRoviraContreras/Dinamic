<template>
  <div
    class="content-mobile"
    :class="{
      open: isSidebarOpen,
      lessHeader: $route.name.includes('deposit-withdraw') ||
        $route.name.includes('transfer') ||
        $route.name.includes('pay-services') ||
        $route.name.includes('recharge-cell') ||
        $route.name.includes('my-card') ||
        $route.name.includes('movements') ||
        $route.name.includes('sub-accounts') ||
        $route.name.includes('contacts')
    }"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @touchmove="onTouchMove"
  >
    <client-only>
      <qr />
    </client-only>
    <!-- <div v-if="install" class="install">
      <p>
        Usar Nuestra Web App
      </p>
      <button class="not" @click="notApp">
        Ahora no
      </button>
      <button class="add" @click="installApp">
        Install App
      </button>
    </div> -->
    <!-- <div class="header">
      <button class="back">
        back
      </button>
    </div> -->

    <div
      class="close"
      @click="toggleSidebar(false)"
    >
      <i class="bx bx-x" />
    </div>
    <MobileSideBar :sidebar-left="sidebarLeft" :open="isSidebarOpen" />
    <MobileNavBar :nav-bar-top="navBarTop" @click="toggleSidebar" />
    <div
      ref="contents"
      :style="{
        left: `${sidebarLeft > 0 ? (sidebarLeft > 200 ? 200 : sidebarLeft) : 0}px`
      }"
      class="content-scale"
    >
      <div
        class="background"
        @click="toggleSidebar(false)"
      />
      <nuxt />
    </div>
    <FooterBar />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import MobileNavBar from '@/components/mobile/Navbar.vue'
import MobileSideBar from '@/components/mobile/Sidebar.vue'
import FooterBar from '@/components/mobile/Footerbar.vue'
import qr from '@/components/common/qr.vue'
@Component({
  components: {
    MobileNavBar,
    MobileSideBar,
    FooterBar,
    qr
  }
})
export default class Default extends Vue {
  install: boolean = false
  code: boolean = false
  deferredPrompt: any = null
  direction: string = ''
  sidebarLeft: number = 0
  navBarTop: number = 0
  pageYOffset: number = 0
  isSidebarOpen: boolean = false
  touchStart = {
    x: 0,
    y: 0
  }

  chats: any = []
  id: any = null

  @Watch('isSidebarOpen')
  handleIsSidebarOpen (val: boolean) {
    if (val) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

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
    if (!this.id) {
      return
    }
    const ref = this.$fireStore.collection('users').doc(this.id)
    ref.onSnapshot((doc) => {
      this.getChats(doc.data().chats)
    })
  }

  mounted () {
    this.handleNotificationChat()
    this.$router.afterEach(() => {
      this.toggleSidebar(false)
    })

    window.addEventListener('scroll', this.handleScroll)

    window.addEventListener('beforeinstallprompt', (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e
      // Update UI notify the user they can install the PWA
      this.install = !localStorage.noInstall
    })
  }

  installApp () {
    // Hide the app provided install promotion
    this.install = false
    // Show the install prompt
    this.deferredPrompt.prompt()
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult: any) => {})
  }

  notApp () {
    this.install = false
    localStorage.noInstall = true
  }

  handleScroll (evt: any) {
    if (this.pageYOffset < window.pageYOffset) {
      this.navBarTop--
      this.direction = 'down'
      if (this.navBarTop < -50) {
        this.navBarTop = -50
      }
    } else {
      this.direction = 'up'
      this.navBarTop++
      if (this.navBarTop > 0) {
        this.navBarTop = 0
      }
    }

    if (window.pageYOffset <= 0) {
      this.navBarTop = 0
    }

    this.pageYOffset = window.pageYOffset
  }

  toggleSidebar (to: boolean) {
    const content = (document.querySelector('.content-scale') as HTMLElement)
    if (!content) {
      return
    }
    content.style.transition = 'all .2s ease'
    setTimeout(() => {
      content.style.transition = ''
    }, 250)
    this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
    this.sidebarLeft = to ? 280 : 0
  }

  // side swipe
  onTouchMove (e: any) {
    // const content = (document.querySelector('.content-scale') as HTMLElement)
    // content.style.transition = 'all 0s ease'
    const dx = e.changedTouches[0].clientX - this.touchStart.x
    // const dy = e.changedTouches[0].clientY - this.touchStart.y
    if (this.touchStart.x < 20) {
      this.sidebarLeft = dx
    } else if (e.srcElement.closest('.mobile-sidebar') || e.srcElement.closest('.background')) {
      this.sidebarLeft = 280 + dx
    }

    if (this.sidebarLeft >= 160) {
      this.isSidebarOpen = true
    } else {
      this.isSidebarOpen = false
    }
    if (this.sidebarLeft >= 280) {
      this.sidebarLeft = 280
    }

    if (this.sidebarLeft > 40) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    // console.dir(dx)
    // console.dir(this.touchStart.x)
  }

  onTouchStart (e: any) {
    this.touchStart = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    }
  }

  onTouchEnd (e: any) {
    // const dx = e.changedTouches[0].clientX - this.touchStart.x
    // const dy = e.changedTouches[0].clientY - this.touchStart.y
    // const navbar = (document.querySelector('.mobile-navbar') as HTMLElement)
    const sidebar = (document.querySelector('.mobile-sidebar') as HTMLElement)
    // const content = (document.querySelector('.content-scale') as HTMLElement)
    // content.style.transition = ''
    // navbar.style.transition = 'all .25s ease'
    sidebar.style.transition = 'all .25s ease'

    // if (Math.sign(dy) === -1) {
    //   if (this.navBarTop > -15) {
    //     this.navBarTop = 0
    //   } else {
    //     this.navBarTop = -50
    //   }
    // } else if (Math.sign(dy) === 1) {
    //   if (this.navBarTop > -35) {
    //     this.navBarTop = 0
    //   } else {
    //     this.navBarTop = -50
    //   }
    // }

    // if (dy > 30 && !this.isSidebarOpen && dy > dx) {
    //   this.navBarTop = 0
    // } else if (dy < -30 && !this.isSidebarOpen && dy > dx) {
    //   this.navBarTop = -50
    // } else if (dy < 30 && dy > -30 && !this.isSidebarOpen && dy > dx) {
    //   if (this.navBarTop < -25) {
    //     this.navBarTop = -50
    //   } else {
    //     this.navBarTop = 0
    //   }
    // }

    if (this.sidebarLeft > 140) {
      this.sidebarLeft = 280
      this.isSidebarOpen = true
    } else {
      this.sidebarLeft = 0
      this.isSidebarOpen = false
    }

    setTimeout(() => {
      // navbar.style.transition = ''
      sidebar.style.transition = ''
    }, 250)
  }
}
</script>
<style lang="sass" scoped>
.content-mobile
  width: 100%
  transition: all .25s ease
  overflow-x: hidden
  &.lessHeader
    .header
      height: 100px
      &:after
        height: 50px
  .header
    position: absolute
    height: 100px
    background: #121624
    width: 100%
    top: 0px
    transition: all .2s ease
    z-index: -1
    &:after
      content: ''
      width: 100%
      height: 30px
      border-radius: 35px 0px 0px 0px
      background: -color('bg-2')
      position: absolute
      bottom: 0px
      left: 0px
  .install
    position: fixed
    bottom: 0px
    padding: 15px
    padding-bottom: calc(100px + env(safe-area-inset-bottom))
    width: 100%
    z-index: 9000
    background: -color('bg')
    display: flex
    align-items: center
    justify-content: center
    flex-wrap: wrap
    p
      width: 100%
      text-align: center
      padding: 10px
      padding-top: 0px
    button.not
      width: calc(50% - 5px)
      padding: 12px 20px
      background: -color('bg-2')
      border: 0px
      border-radius: 12px
      color: -color('color')
      letter-spacing: 1px
      font-weight: bold
      margin-right: 5px
    button.add
      width: calc(50% - 5px)
      padding: 12px 20px
      background: -color('color-2')
      border: 0px
      border-radius: 12px
      color: #fff
      letter-spacing: 1px
      font-weight: bold
      margin-left: 5px
  .content-scale
    position: relative
    transition: all .2s ease, left 0s
    z-index: 4000
    top: 0px
    overflow-x: hidden
    left: 0px
  .close
    position: fixed
    right: 0px
    z-index: 10000
    top: 0px
    width: 65px
    height: 65px
    display: flex
    align-items: center
    justify-content: center
    opacity: 0
    visibility: hidden
    transition: all .15s ease
    transform: translate(20px)
    i
      font-size: 1.7rem
  &.open
    .header
      transform: translate(0,-100%)
    .close
      opacity: 1
      visibility: visible
      transform: translate(0px)
      transition: all .25s ease .2s
    .footer-bar
      transform: translate(0,calc(100% + 20px)) !important
    .mobile-navbar
      // transform: translate(0,-100%) !important
      top: -60px
    .content-scale
      transform: scale(.7) translate(65%) !important
      // height: 70vh
      left: 0px !important
      // margin-top: 15vh
      transition: all .2s ease !important
      z-index: 10000
      background: -color('bg')
      border-radius: 30px
      overflow: hidden
      height: 100vh
      box-shadow: 0px 0px 40px 0px rgba(0,0,0,.05)
    .background
      opacity: 1
      visibility: visible
      pointer-events: auto
  .background
    opacity: 0
    width: 100%
    height: 100vh
    position: fixed
    left: 0px
    top: 0px
    z-index: 100
    background: rgba(18, 22, 36, 0)
    visibility: hidden
    pointer-events: none
    transition: all .25s ease
  .content-page
    padding-left: 0px
    padding-right: 0px
    padding-top: 100px
    overflow: hidden
    &:after
      content: ''
      position: absolute
      top: 0px
      left: 0px
      width: 100%
      height: 50px
      background: #121624
      z-index: -2
    // padding-bottom: 100px
@media all and (display-mode: standalone)
  .content-mobile
    .install
      display: none
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
