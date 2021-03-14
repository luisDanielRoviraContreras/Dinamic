<template>
  <div class="recover-password">
    <Card>
      <header>
        <div class="con-logo">
          <c-logo />
        </div>
      </header>
      <h1>
        Cambiar Contraseña
      </h1>

      <Divider />

      <cInput
        v-model="form.password"
        :danger="form.password.length < 6 && send"
        type="password"
      >
        Contraseña nueva
      </cInput>
      <cInput
        v-model="form.confirmPassword"
        :danger="!form.confirmPassword && send"
        type="password"
      >
        Confirmar Contraseña
      </cInput>

      <Button margin-top gradient block @click="handleVerify">
        Enviar
      </Button>
    </Card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
import Card from '@/components/common/card.vue'
import Divider from '@/components/common/divider.vue'
import cInput from '@/components/common/input.vue'
import cLogo from '@/components/common/cLogo.vue'
@Component({
  components: {
    Button,
    Card,
    Divider,
    cInput,
    cLogo
  },
  layout: ({ isMobile }: {isMobile: any}) => isMobile ? 'clean' : 'clean'
})
export default class recoverPassword extends Vue {
  send: boolean = false
  form: any = {
    password: '',
    confirmPassword: ''
  }

  handleEnter () {
    this.handleVerify()
  }

  change (val: string) {
    this.form.code = val
  }

  handleVerify () {
    this.send = true
    if (this.form.password.length < 6 || !this.form.confirmPassword) {
      return
    }
    this.$dialog({
      title: 'Contraseña Cambiada!',
      text: 'Su nueva contraseña se cambio con éxito!',
      type: 'success',
      cancel: 'none',
      click: () => {
        this.$router.push('/login/')
      }
    })
  }
}
</script>
<style lang="sass" scoped>
.recover-password
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
    h1
      font-size: 1.2rem
      text-align: center
    h2
      font-size: 1rem
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
