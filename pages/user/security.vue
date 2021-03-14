<template>
  <div class="content-sub-page">
    <Divider>
      Contraseña
    </Divider>
    <Button v-if="!changePassword" block gradient @click="changePassword = true">
      Cambiar Contraseña
    </Button>

    <div v-else class="con-inputs">
      <cInput
        v-model="formPassword.password"
        :danger="!formPassword.password && sendPassword"
        type="password"
      >
        Contraseña actual
      </cInput>
      <cInput
        v-model="formPassword.newPassword"
        :danger="!formPassword.newPassword && sendPassword"
        type="password"
      >
        Nueva contraseña
      </cInput>

      <Button margin-top block gradient @click="handleChangePassword">
        Aceptar
      </Button>
    </div>

    <Divider>
      2FA
    </Divider>

    <div class="con-2fa">
      <div class="item">
        <div class="text">
          <img src="/google-authenticator.svg" alt="">
          Autenticación de Google
        </div>

        <c-switch />
      </div>
    </div>
    <Button margin-top border block>
      Autenticación SMS
    </Button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import cInput from '@/components/common/input.vue'
import Button from '@/components/common/button.vue'
import Divider from '@/components/common/divider.vue'
import cSwitch from '@/components/common/switch.vue'
@Component({
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  components: {
    cInput,
    Button,
    Divider,
    cSwitch
  }
})
export default class userData extends Vue {
  sendPassword: boolean = false
  changePassword: boolean = false

  formPassword: any = {
    password: '',
    newPassword: ''
  }

  handleChangePassword () {
    this.sendPassword = true
    if (!this.formPassword.password || !this.formPassword.newPassword) {
      return
    }

    this.formPassword = {
      password: '',
      newPassword: ''
    }
    this.sendPassword = false
    this.changePassword = false
  }
}
</script>
<style lang="sass" scoped>
.content-sub-page
  width: 100%
  height: auto
  background: -color('bg')
  padding: 20px
  border-radius: 20px
  max-width: 400px
  .con-2fa
    .item
      display: flex
      align-items: center
      justify-content: space-between
      .text
        font-size: .8rem
        display: flex
        align-items: center
        justify-content: flex-start
      img
        max-width: 30px
        margin-right: 10px
// responsive

@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .content-sub-page
    padding-bottom: 80px
    margin-top: 40px
    padding-top: 5px
</style>
