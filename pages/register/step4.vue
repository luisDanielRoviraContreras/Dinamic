<template>
  <div class="register-4">
    <cInput
      v-model="form.email"
      :danger="!isValid(form.email) && send"
    >
      Correo electrónico

      <template #danger>
        Correo inválido
      </template>
    </cInput>
    <cInput
      v-model="form.password"
      :danger="form.password.length < 6 && send"
      type="password"
    >
      Contraseña (min 6 dígitos)
    </cInput>
    <cInput
      v-model="form.passwordRepeat"
      :danger="!form.passwordRepeat ? send && !form.passwordRepeat : form.passwordRepeat !== form.password"
      type="password"
    >
      Confirmar contraseña
      <template v-if="form.passwordRepeat" #danger>
        Contraseña diferente
      </template>
    </cInput>
    <Button block margin-top gradient @click="handleCreateAccount">
      Crear Cuenta
    </Button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
import cInput from '@/components/common/input.vue'
@Component({
  components: {
    Button,
    cInput
  }
})
export default class register04 extends Vue {
  send: boolean = false
  form: any = {
    email: '',
    password: '',
    passwordRepeat: ''
  }

  isValid (val: any) {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val)
  }

  handleCreateAccount () {
    this.send = true
    if (!this.isValid(this.form.email) || !this.form.password || this.form.password !== this.form.passwordRepeat) {
      return
    }
    this.send = false
    this.$nuxt.$loading.start()
    this.$router.push('/register/step5')
    setTimeout(() => {
      // this.$notification({
      //   title: 'Usuario Creado',
      //   text: 'Bienvenido a Dinamic',
      //   color: 'success'
      // })
    }, 1000)
  }
}
</script>
<style lang="sass" scoped>
.register-4
  width: 100%
  max-width: 350px
  padding: 20px 10px
  margin-top: 20px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
