<template>
  <div class="dosFa">
    <Card>
      <header>
        <div class="con-logo">
          <c-logo />
        </div>
      </header>
      <h1>
        Autenticación de dos factores
      </h1>

      <Divider />

      <h2>
        Autenticación de Google
      </h2>

      <div class="con-svg-text">
        <img src="/google-authenticator.svg" alt="">
        <p>
          Ingrese el código de 6 dígitos en su aplicación Google Authenticator
        </p>
      </div>

      <input-code
        center
        @enter="handleEnter"
        @change="change"
      >
        Ingrese el código de verificación
      </input-code>

      <Button margin-top gradient block @click="handleVerify">
        Verificar
      </Button>
    </Card>
  </div>
</template>
<script lang="ts">
import { Action } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
import Card from '@/components/common/card.vue'
import Divider from '@/components/common/divider.vue'
import InputCode from '@/components/common/input-code.vue'
import cLogo from '@/components/common/cLogo.vue'
import * as actions from '~/constants/actions'
@Component({
  components: {
    Button,
    Card,
    Divider,
    InputCode,
    cLogo
  },
  layout: ({ isMobile }: {isMobile: any}) => isMobile ? 'clean' : 'clean'
})
export default class dosFa extends Vue {
  form: any = {
    code: ''
  }

  @Action(actions.AUTHENTICATED) authenticated!: Function

  handleEnter () {
    this.handleVerify()
  }

  change (val: string) {
    this.form.code = val
  }

  handleVerify () {
    this.$cookies.set('authenticated', true)

    this.authenticated(true)

    this.$router.push('/')
  }
}
</script>
<style lang="sass" scoped>
.dosFa
  width: 100%
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
  background: -color('bg-2')
  header
    margin-top: -90px
    margin-bottom: 30px
  .con-logo
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    padding: 20px
    img
      width: 140px
  .con-svg-text
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    img
      max-width: 40px
      margin-top: 10px
      margin-bottom: 10px
    p
      font-size: .8rem
  .card
    max-width: 400px
    text-align: center
    h1
      font-size: 1.2rem
    h2
      font-size: 1rem
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
