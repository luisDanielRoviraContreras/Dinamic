<template>
  <div class="content-page sub-accounts">
    <div class="con-users">
      <div class="users not-scroll-mobile">
        <div class="user" @click="$router.push('/sub-accounts?user=Juan Reyes')">
          <Avatar src="avatars/avatar-9.png" />
          <p>
            Juan Reyes
          </p>
        </div>
        <div class="user" @click="$router.push('/sub-accounts?user=Maria Laura')">
          <Avatar src="avatars/avatar-1.png" />
          <p>
            Maria Laura
          </p>
        </div>
        <div class="user" @click="$router.push('/sub-accounts?user=Yean carlos')">
          <Avatar src="avatars/avatar-7.png" />
          <p>
            Yean carlos
          </p>
        </div>
        <div class="user" @click="$router.push('/sub-accounts/new')">
          <Avatar plus />
          <p>
            Agregar Usuario
          </p>
        </div>
      </div>

      <div class="con-view-user">
        <nuxt-child />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Avatar from '@/components/common/avatar.vue'
@Component({
  middleware: 'authenticated',
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  components: {
    Avatar
  }
})
export default class subAccounts extends Vue {}
</script>
<style lang="sass" scoped>
.sub-accounts
  align-items: flex-start
.con-users
  display: flex
  align-items: flex-start
  justify-content: center
  width: 100%
  max-width: 500px
  .users
    width: 140px
    padding: 20px
    padding-top: 0px
    display: flex
    align-items: center
    justify-content: flex-start
    flex-direction: column
    .user
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
      margin-bottom: 20px
      cursor: pointer
      p
        font-size: .8rem
        text-align: center
        padding-top: 5px
  .con-view-user
    width: calc(100% - 140px)
// responsive
.content-mobile
  .sub-accounts
    padding-top: 70px
@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .con-users
    display: block
    max-width: 100%
    .con-view-user
      width: 100%
      .content-sub-page
        padding-bottom: 80px
    .users
      width: 100%
      flex-direction: row
      align-items: flex-start
      justify-content: flex-start
      flex-wrap: nowrap
      overflow: auto
      padding-bottom: 0px
      .user
        margin-right: 20px
        min-width: 120px
</style>
