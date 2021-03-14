<template>
  <div class="password">
    <div class="con">
      <div class="con-logo">
        <c-logo />
      </div>
      <h2>
        Restablecer contraseña
      </h2>
      <p>
        Introduce tu email para restablecer la contraseña.
        recibirás un email con instrucciones para restablecer tu contraseña
      </p>
      <cInput
        v-model="form.user"
        :danger="!isValid(form.user) && send"
        margin-top
        placeholder="Correo electrónico"
      >
        <template #icon>
          <i class="bx bx-user" />
        </template>

        <template #danger>
          Correo inválido
        </template>
      </cInput>
      <Button
        margin-top
        block
        @click="handlePassword"
      >
        Enviar
      </Button>
      <Divider>
        O
      </Divider>
      <nuxt-link class="a" to="/login/">
        Iniciar sesión
      </nuxt-link>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import cInput from '@/components/common/input.vue'
import Button from '@/components/common/button.vue'
import Divider from '@/components/common/divider.vue'
import cLogo from '@/components/common/cLogo.vue'
@Component({
  components: {
    Button,
    cInput,
    Divider,
    cLogo
  }
})
export default class Password extends Vue {
  send: boolean = false
  form: any = {
    user: ''
  }

  isValid (val: any) {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val)
  }

  handlePassword () {
    this.send = true

    if (!this.isValid(this.form.user)) {
      return
    }

    this.$dialog({
      title: 'Datos enviados!',
      text: 'Revisa tu correo para establecer contraseña nueva!',
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
.password
  width: 100%
  position: relative
  display: flex
  align-items: center
  justify-content: center
  .con-logo
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    padding: 20px
    img
      width: 130px
  .con
    width: 100%
    max-width: 400px
    padding: 0px 15px
    >p
      font-size: .75rem
      text-align: center
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

@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .password
    .con
      h2
        font-size: 1rem
    .con-logo
      padding-bottom: 5px
      padding-top: 20px
      img
        width: 140px
</style>
