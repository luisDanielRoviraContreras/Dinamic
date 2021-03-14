<template>
  <div class="login">
    <div class="con">
      <div class="con-logo">
        <c-logo />
      </div>
      <h2>
        Ingresar
      </h2>
      <cInput
        v-model="form.user"
        :danger="send && form.user === ''"
        margin-top
        placeholder="Número de celular"
        @keypress.enter="handleLogin"
      >
        <template #icon>
          <i class="bx bx-user" />
        </template>
      </cInput>
      <cInput
        v-model="form.password"
        :danger="send && form.password === ''"
        margin-top
        type="password"
        placeholder="Contraseña"
        @keypress.enter="handleLogin"
      >
        <template #icon>
          <i class="bx bx-lock-alt" />
        </template>
      </cInput>
      <Button :loading="loading" margin-top block @click="handleLogin">
        Ingresar
      </Button>
      <nuxt-link class="a" to="/login/password">
        ¿ Olvidaste la contraseña ?
      </nuxt-link>
      <Button gradient margin-top block @click="$router.push('/register/')">
        Registrarse
      </Button>

      <div class="install">
        <button @click="installApp">
          <i class="bx bxl-apple" />
          <div class="text">
            <p>
              Descargar App
              <b>
                iOS
              </b>
            </p>
          </div>
        </button>
        <button @click="installApp">
          <i class="bx bxl-android" />
          <div class="text">
            <p>
              Descargar App
              <b>
                Android
              </b>
            </p>
          </div>
        </button>
        <button @click="installApp">
          <i class="bx bxl-windows" />
          <div class="text">
            <p>
              Descargar App
              <b>
                Windows
              </b>
            </p>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Action } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import cInput from '@/components/common/input.vue'
import Button from '@/components/common/button.vue'
import cLogo from '@/components/common/cLogo.vue'
import * as actions from '~/constants/actions'
@Component({
  components: {
    Button,
    cInput,
    cLogo
  }
})
export default class Login extends Vue {
  deferredPrompt: any = null
  send: boolean = false
  loading: boolean = false
  form: any = {
    user: '',
    password: '',
    ref: ''
  }

  @Action(actions.USER) setUser!: Function

  mounted () {
    window.addEventListener('beforeinstallprompt', (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e
      // Update UI notify the user they can install the PWA
    })
  }

  installApp () {
    // Show the install prompt
    if (!this.deferredPrompt) {
      return
    }
    this.deferredPrompt.prompt()
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult: any) => {})
  }

  handleLogin () {
    this.send = true

    // notification not user
    // this.$notification({
    //   title: 'Oops algo salio mal',
    //   text: 'Correo electrónico incorrecto o contraseña'
    //   // color: 'danger'
    // })

    if (this.form.user === '' || this.form.password === '') {
      return
    }

    if (this.form.user.toLowerCase() === 'pedro') {
      this.setUser('AosQw0ubq6pjtMHrFlyK')
      this.$cookies.set('user', 'AosQw0ubq6pjtMHrFlyK')
    } else if (this.form.user.toLowerCase() === 'maria') {
      this.setUser('EFdjQxBybOIZNhMl7cnO')
      this.$cookies.set('user', 'EFdjQxBybOIZNhMl7cnO')
    } else if (this.form.user.toLowerCase() === 'luis') {
      this.setUser('atYOQ1F4c74qXSGd7DB8')
      this.$cookies.set('user', 'atYOQ1F4c74qXSGd7DB8')
    } else if (this.form.user.toLowerCase() === 'mervin') {
      this.setUser('vJMAYQ4aY5NLxYuc81rv')
      this.$cookies.set('user', 'vJMAYQ4aY5NLxYuc81rv')
    }

    this.$router.push('/2fa')
  }
}
</script>
<style lang="sass" scoped>
.login
  width: 100%
  position: relative
  display: flex
  align-items: center
  justify-content: center
  .install
    display: flex
    align-items: center
    justify-content: center
    padding: 20px 0px
    flex-wrap: wrap
    button
      background: transparent
      border: 0px
      display: flex
      align-items: center
      justify-content: flex-start
      flex-direction: column
      text-align: center
      background: -color('bg-2')
      border-radius: 15px
      padding: 5px
      margin: 10px 5px
      cursor: pointer
      transition: all .25s ease
      max-width: 100px
      width: calc(33% - 6px)
      color: -color('color')
      &:hover
        background: -color('bg-3')
      i
        font-size: 1.4rem
        padding: 0px
        padding: 3px
      .text
        padding: 0px 6px
        font-size: .65rem
      b
        font-weight: bold
  .con-logo
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    padding: 20px
    img
      width: 140px
  .con
    width: 100%
    max-width: 400px
    padding: 0px 15px
    h2
      width: 100%
      text-align: center
      font-size: 1.2rem
      padding: 10px
    .a
      color: -color('color')
      width: 100%
      text-align: center
      cursor: pointer
      display: block
      margin-top: 20px
      font-size: .8rem
      transition: all .25s ease
      font-weight: bold
      &:hover
        opacity: .6
// responsive
@media all and (display-mode: standalone)
  .login
    .install
      display: none !important
@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .login
    .con-logo
      img
        width: 80px
@media (max-width: 360px)
  .login
    .install
      button
        margin: 0px
        border-radius: 0px
        width: 33%
        &:first-child
          border-radius: 15px 0px 0px 15px
        &:last-child
          border-radius: 0px 15px 15px 0px
</style>
