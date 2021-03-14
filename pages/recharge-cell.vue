<template>
  <div class="content-page recharge-cell">
    <div class="con-page">
      <div class="sec-1">
        <h3 class="h3">
          Tarjeta a usar
        </h3>

        <div class="con-cards not-scroll-mobile">
          <Data-card :active="form.card == 'default'" visible src="/cards/01.svg" @click="form.card = 'default'" />
          <Data-card :active="form.card == 2" visible src="/cards/02.svg" @click="form.card = 2" />
          <add-card @click="$router.push('/my-card/add-card/')" />
        </div>
      </div>
      <div class="sec-2">
        <div class="row-1">
          <Select label="Números Guardados">
            <option>
              +51 12345678
            </option>
            <option>
              +51 01020304
            </option>
          </Select>
          <Divider>
            o
          </Divider>
          <Input-cell
            v-model="form.number"
            :danger="form.number.length < 4 && send"
          >
            Número de Celular
          </Input-cell>
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
          <div class="con-info">
            <div class="info-1 info">
              <p>
                Comisión:
              </p>

              S/. 8.00
            </div>
            <div class="info-2 info">
              <p>
                Total:
              </p>

              S/. 392.00
            </div>
          </div>
        </div>

        <Button block gradient class="pay" @click="handleSend">
          Recargar
        </Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DataCard from '@/components/common/dataCard.vue'
import Select from '@/components/common/Select.vue'
import cInput from '@/components/common/input.vue'
import InputCell from '@/components/common/input-cell.vue'
import Checkbox from '@/components/common/checkbox.vue'
import Button from '@/components/common/button.vue'
import Divider from '@/components/common/divider.vue'
import addCard from '@/components/common/addCard.vue'
@Component({
  middleware: 'authenticated',
  layout: ({ isMobile }: {isMobile: any}) => isMobile ? 'mobile' : 'default',
  components: {
    DataCard,
    Select,
    cInput,
    Checkbox,
    Button,
    InputCell,
    Divider,
    addCard
  }
})
export default class RechargeCell extends Vue {
  send: boolean = false
  form: any = {
    number: '',
    description: '',
    amount: '',
    save: false,
    card: 'default'
  }

  handleSend () {
    this.send = true
    if (!this.form.number || !this.form.description || this.form.amount === 'S/. 0.00') {
      return
    }

    this.$dialog({
      title: 'Recarga Exitosa!',
      text: 'Recarga efectuada con éxito',
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
.con-page
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  max-width: 1000px
  padding: 20px
  .con-info
    display: flex
    align-items: center
    justify-content: space-between
    padding: 10px 0px
  .info
    display: flex
    align-items: center
    justify-content: center
    font-weight: bold
    font-size: .9rem
    p
      opacity: .4
      padding-right: 7px
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
    max-width: 400px
    .row-1
      padding: 0px 10px
      width: 100%
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
.content-mobile
  .recharge-cell
    padding-top: 40px

@media (max-width: 900px)
  .con-page
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
      .add-card
        width: 190px
        height: 190px
        min-width: 190px
        z-index: 200
        flex-direction: column
        margin: 10px
        margin-right: 20px
        border-radius: 20px 0px 0px 20px
    .sec-2
      width: 100%
      margin-left: 0px
      padding-bottom: 80px
      flex-wrap: wrap
      margin-top: 30px
      .pay
        position: relative
@media (max-width: 650px)
  .con-page
    padding-top: 70px
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
