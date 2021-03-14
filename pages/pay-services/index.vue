<template>
  <div class="content-sub-page">
    <div class="sec-1">
      <h3 class="h3">
        Tarjeta a usar
      </h3>

      <div class="con-cards not-scroll-mobile">
        <Data-card :active="form.card == 'default'" visible src="/cards/01.svg" @click="form.card = 'default'" />
        <Data-card :active="form.card == 1" visible src="/cards/02.svg" @click="form.card = 1" />
        <add-card @click="$router.push('/my-card/add-card/')" />
      </div>
    </div>
    <div class="sec-2">
      <div class="row-1">
        <Select
          v-model="form.paySave"
          label="Mis pagos guardados"
        >
          <option>
            Vodafone S/.10.00
          </option>
          <option>
            Luz - S/.44.00
          </option>
        </Select>
        <Select
          v-model="form.service"
          :danger="!form.service && send"
          label="Servicio que desea pagar"
        >
          <option>
            Internet
          </option>
          <option>
            Luz
          </option>
          <option>
            Agua
          </option>
          <option>
            Gas
          </option>
        </Select>
        <c-input
          v-model="form.numberAccount"
          :danger="!form.numberAccount && send"
        >
          Número de cuenta
        </c-input>
        <c-input
          v-model="form.ruc"
          :danger="!form.ruc && send"
        >
          RUC
        </c-input>
      </div>
      <div class="row-2">
        <c-input
          v-model="form.holder"
          :danger="!form.holder && send"
        >
          Titular
        </c-input>
        <c-input
          v-model="form.amount"
          :danger="send && form.amount === 'S/. 0.00'"
          type="number"
          money
        >
          Monto

          <template #right>
            <div class="info">
              <p>
                Disponible:
              </p>

              S/. 83400,83
            </div>
          </template>
        </c-input>
        <c-input
          v-model="form.description"
          :danger="!form.description && send"
        >
          Descripción
        </c-input>
        <div class="con-checkbox margin-top">
          <Checkbox>
            Guardar Datos
          </Checkbox>
        </div>
        <div class="con-checkbox">
          <Checkbox v-model="form.addPay">
            Agregar a Pagos automáticos
          </Checkbox>
        </div>
      </div>

      <Button
        block
        gradient
        class="pay"
        @click="handleSend"
      >
        Pagar
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DataCard from '@/components/common/dataCard.vue'
import Select from '@/components/common/Select.vue'
import cInput from '@/components/common/input.vue'
import Checkbox from '@/components/common/checkbox.vue'
import Button from '@/components/common/button.vue'
import addCard from '@/components/common/addCard.vue'
@Component({
  layout: ({ isMobile }: {isMobile: any}) => isMobile ? 'mobile' : 'default',
  components: {
    DataCard,
    Select,
    cInput,
    Checkbox,
    Button,
    addCard
  }
})
export default class payServicesPay extends Vue {
  send: boolean = false
  form: any = {
    card: 'default',
    service: '',
    holder: null,
    ruc: '',
    numberAccount: '',
    description: '',
    amount: '',
    save: false,
    addPay: false
  }

  mounted () {
    if (this.$route.query.automatic) {
      this.form.addPay = true
    }
  }

  handleSend () {
    this.send = true
    if (!this.form.numberAccount || !this.form.description || this.form.amount === 'S/. 0.00' || !this.form.ruc || !this.form.holder || !this.form.service) {
      return
    }

    this.$dialog({
      title: 'Servicio pagado!',
      text: 'El servicio se pago con éxito',
      type: 'success',
      cancel: 'none'
    })

    this.form.number = ''
    this.form.description = ''
    this.form.amount = ''
    this.send = false
  }
}
</script>
<style lang="sass" scoped>
.content-sub-page
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  max-width: 1000px
  padding: 20px
  .pay
    position: absolute
    bottom: -25px
    z-index: 100
    max-width: 260px
  .con-checkbox
    display: flex
    align-items: center
    justify-content: space-between
    &.margin-top
      margin-top: 10px
  .sec-2
    background: -color('bg')
    padding: 20px
    box-shadow: 0px 5px 20px 0px rgba(0,0,0,.05)
    border-radius: 20px
    width: calc(100% - 310px)
    display: flex
    align-items: flex-start
    justify-content: center
    position: relative
    margin-left: 30px
    padding-bottom: 40px
    .row-1
      padding: 0px 10px
      width: 50%
    .row-2
      padding: 0px 10px
      width: 50%
  .sec-1
    width: 260px
    position: relative
.h3
  position: absolute
  left: 0px
  top: -35px
  font-weight: bold
  font-size: .9rem
  b
    font-weight: bold
.con-cards
  .data-card
    margin: 10px 0px
// responsive

@media (max-width: 900px)
  .content-sub-page
    flex-direction: column
    padding: 0px
    .sec-1
      width: 100%
      .con-cards
        display: flex
        align-items: center
        justify-content: flex-start
        width: 100%
        overflow: auto
        padding: 0px 20px
        .data-card
          margin: 0px 10px
          img
            opacity: 0 !important
    .sec-2
      width: 100%
      margin-left: 0px
      padding-bottom: 80px
      flex-wrap: wrap
      margin-top: 30px
      .pay
        position: relative
@media (max-width: 650px)
  .content-sub-page
    padding-top: 60px
    .h3
      text-align: center
      width: 100%
    .sec-2
      flex-direction: column
      padding-bottom: 120px
      .row-1
        width: 100%
      .row-2
        width: 100%
      .pay
        width: 100%
        max-width: none
// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
