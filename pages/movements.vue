<template>
  <div class="content-page movements">
    <div class="sec-1">
      <header>
        <h4>
          Historial de transacciones
        </h4>

        <div class="con-search">
          <c-input gray bold placeholder="Buscar" />
        </div>
      </header>

      <div class="con-table not-scroll-mobile">
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
@Component({
  middleware: 'authenticated',
  layout: ({ isMobile }: {isMobile: any}) => isMobile ? 'mobile' : 'default',
  components: {
    DataCard,
    Select,
    cInput,
    Checkbox,
    Button,
    Table
  }
})
export default class Movements extends Vue {}
</script>
<style lang="sass" scoped>
.content-page
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
  .add-card
    width: calc(100% - 20px)
    margin-left: 10px
    border: 2px dashed -color('color', .05)
    background: -color('bg-3')
    padding: 10px 20px
    display: flex
    align-items: center
    justify-content: center
    border-radius: 15px
    margin-top: 15px
    transition: all .25s ease
    cursor: pointer
    i
      margin-right: 10px
      font-size: 1.3rem
    &:hover
      background: -color('bg-4')
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
  .sec-1
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
    max-width: 1000px
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
      padding: 0px 15px
    .table
      max-height: none
    .row-1
      padding: 0px 10px
      width: 100%
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
  .movements
    padding-top: 60px
@media (max-width: 1400px)
  .content-page
    .sec-1
      margin-left: 0px
@media (max-width: 1260px)
  .content-page
    .no-mobile
      display: none
@media (max-width: 900px)
  .content-page
    display: block
    padding-top: 70px
    background: #fff
    .sec-1
      width: 100%
      height: auto
      padding-bottom: 80px
      padding-left: 0px
      padding-right: 0px
      padding-top: 0px
      header
        padding: 10px
        padding-top: 0px
        .con-search
          width: 100%
        h4
          display: none
      .table
        overflow: auto
        padding-left: 10px
        table
          min-width: 600px
    .h3
      text-align: center
      width: 100%

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
