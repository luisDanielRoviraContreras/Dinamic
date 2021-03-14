<template>
  <div class="sub-section dw-transfer">
    <div class="sec-1 sec">
      <Card>
        <h3>
          Cuenta dinamic
        </h3>

        <c-input copy center readonly value="0022-4561-1001-4322-9998-7600">
          Número de cuenta
        </c-input>

        <c-input copy center readonly value="Dinamic">
          Nombre
        </c-input>

        <c-input copy center readonly value="Dinamic 15074 000 000 000">
          Dirección
        </c-input>
      </Card>
    </div>
    <div class="sec-2 sec">
      <Card>
        <c-input
          v-model="form.amount"
          :danger="form.amount === 'S/. 0.00' && send"
          not-margin
          type="number"
          money
        >
          Monto
        </c-input>

        <input-file
          :danger="!form.voucher && send"
          @change="handleFileVoucher"
        >
          Comprobante
        </input-file>

        <Button gradient style="margin-top: 15px" block @click="handleSend">
          Enviar
        </Button>
      </Card>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Card from '@/components/common/card.vue'
import Button from '@/components/common/button.vue'
import cInput from '@/components/common/input.vue'
import InputFile from '@/components/common/input-file.vue'
@Component({
  components: {
    Card,
    cInput,
    Button,
    InputFile
  }
})
export default class DWTransfer extends Vue {
  send: boolean = false
  form: any = {
    amount: '',
    voucher: ''
  }

  handleFileVoucher (value: any) {
    this.form.voucher = value
  }

  handleSend () {
    this.send = true

    if (this.form.amount === 'S/. 0.00' || !this.form.voucher) {
      return
    }

    this.$dialog({
      title: 'Verificando Deposito!',
      text: 'Estamos verificando los datos proporcionados, pronto te avisaremos por correo electrónico y notificación',
      type: 'success',
      cancel: 'none'
    })

    this.form.amount = ''
    this.send = false
  }
}
</script>
<style lang="sass" scoped>
.dw-transfer
  display: flex
  align-items: flex-start
  justify-content: center
  padding-top: 40px
  .sec
    width: 50%
  .sec-1
    .card
      padding-top: 30px
    h3
      background: -color('bg')
      position: absolute
      display: inline-block
      margin: auto
      top: 0px
      left: 50%
      transform: translate(-50%, -50%)
      font-size: .9rem
      border-radius: 15px
      padding: 10px 20px
      box-shadow: 0px 5px 20px 0px rgba(0,0,0,.05)
      text-align: center

// responsive
.content-mobile
  .dw-transfer
    .sec-2
      .card
        padding-bottom: 80px
@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .dw-transfer
    flex-direction: column
    .sec
      width: 100%
      .card
        margin: 10px 0px
        width: 100%
</style>
