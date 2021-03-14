<template>
  <div class="con-gift-card">
    <div class="sec-1">
      <h3>
        Escanear Código QR
      </h3>

      <div class="con-code">
        <img src="/qr.png" alt="">
      </div>
    </div>
    <div class="sec-2">
      <c-input
        v-model="form.code"
        :danger="!form.code && send"
      >
        Código secreto
      </c-input>

      <Button
        margin-top
        block
        gradient
        @click="handleSend"
      >
        Aceptar
      </Button>
    </div>
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
export default class DWGiftCard extends Vue {
  send: boolean = false
  form: any = {
    code: ''
  }

  handleSend () {
    this.send = true
    if (!this.form.code) {
      return
    }

    this.$dialog({
      title: 'Verificando el código!',
      text: 'Estamos verificando los datos proporcionados, pronto te avisaremos por correo electrónico y notificación',
      type: 'success',
      cancel: 'none'
    })

    this.send = false
    this.form.code = ''
  }
}
</script>
<style lang="sass" scoped>
.con-gift-card
  display: flex
  align-items: center
  justify-content: center
  padding-top: 80px
  .sec-1
    background: -color('bg')
    border-radius: 20px
    position: relative
    h3
      position: absolute
      top: -35px
      font-size: .9rem
    .con-code
      img
        max-width: 200px
        border-radius: 20px
  .sec-2
    background: -color('bg')
    border-radius: 20px
    padding: 20px
    max-width: 300px
    margin-left: 20px
    width: 100%
// responsive
@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .con-gift-card
    flex-direction: column
    .sec-2
      margin-left: 0px
      margin-top: 20px
      padding-bottom: 90px
      width: 100%
      max-width: none

</style>
