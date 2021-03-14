<template>
  <div class="con-page my-card">
    <div class="sec-1">
      <h3 class="h3">
        Mi Tarjeta Dinamic
      </h3>

      <div class="con-cards not-scroll-mobile">
        <Data-card visible active src="/cards/01.svg" />
        <Data-card visible src="/cards/02.svg" />
        <add-card @click="$router.push('/my-card/add-card/')" />
      </div>
    </div>
    <div class="sec-2">
      <header>
        Historial de transacciones

        <div class="con-search">
          <c-input gray placeholder="Buscar" />
        </div>
      </header>

      <div class="con-table">
        <Table>
          <template #thead>
            <th>
              Nro
            </th>
            <th>
              <i class="bx bx-transfer" />
            </th>
            <th>
              ID
            </th>
            <th class="no-mobile">
              Tipo de transferencia
            </th>
            <th>
              Usuario
            </th>
            <th>
              Estado
            </th>
            <th>
              Monto
            </th>
            <th>
              Fecha
            </th>
          </template>

          <template #tbody>
            <tr
              v-for="(td, i) in 10"
              :key="i"
            >
              <td>
                {{ i+=1 }}
              </td>
              <td>
                <i class="bx bx-up-arrow-alt" />
              </td>
              <td>
                00014530092
              </td>
              <td class="no-mobile">
                Deposito
              </td>
              <td>
                Luis Daniel
              </td>
              <td>
                Aceptada
              </td>
              <td class="green">
                + $200
              </td>
              <td>
                2020-02-24
              </td>
            </tr>
          </template>
        </Table>
      </div>
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
import Table from '@/components/common/table.vue'
import addCard from '@/components/common/addCard.vue'
@Component({
  layout: ({ isMobile }: {isMobile: any}) => isMobile ? 'mobile' : 'default',
  components: {
    DataCard,
    Select,
    cInput,
    Checkbox,
    Button,
    Table,
    addCard
  }
})
export default class RechargeCell extends Vue {}
</script>
<style lang="sass" scoped>
.con-page
  display: flex
  align-items: center
  justify-content: center
  width: 100%
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
    padding: 20px
    border-radius: 20px
    width: 100%
    display: flex
    align-items: flex-start
    justify-content: center
    flex-direction: column
    position: relative
    margin-left: 30px
    padding-bottom: 40px
    height: 100vh
    .con-table
      width: 100%
      overflow: auto
      .table
        min-width: 600px
    header
      display: flex
      align-items: center
      justify-content: space-between
      width: 100%
      padding: 0px 10px
    .table
      max-height: none
    .row-1
      padding: 0px 10px
      width: 100%
  .sec-1
    position: relative
    background: -color('bg')
    height: 100vh
    padding: 20px
    box-shadow: inset 20px 15px 15px 0px rgba(0,0,0,.05)
    margin-left: -20px
    padding-left: 40px
.h3
  position: relative
  font-weight: bold
  font-size: .9rem
  padding-top: 30px
  b
    font-weight: bold
.con-cards
  .data-card
    margin: 10px 0px
// responsive
.content-mobile
  .my-card
    padding-top: 50px

@media (max-width: 1400px)
  .con-page
    .sec-2
      margin-left: 0px
@media (max-width: 1260px)
  .con-page
    .no-mobile
      display: none
@media (max-width: 1150px)
  .con-page
    .sec-1
      padding-top: 60px
@media (max-width: 900px)
  .con-page
    display: block
    padding-top: 70px
    .sec-2
      width: 100%
      height: auto
      padding-bottom: 80px
      .table
        overflow: auto
        table
          min-width: 600px
    .h3
      text-align: center
      width: 100%
    .sec-1
      width: 100%
      margin-left: 0px
      height: auto
      background: transparent
      padding: 0px
      box-shadow: none
      padding-bottom: 0px
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

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
