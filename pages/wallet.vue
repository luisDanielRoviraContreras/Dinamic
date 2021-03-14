<template>
  <div class="content-page con-wallet">
    <div class="content-wallet">
      <button class="add-card-btn if-mobile" @click="$router.push('/my-card/add-card/')">
        + Agregar
      </button>
      <div class="sec-1">
        <div class="content-cards">
          <div
            class="card"
            @click="handleClickCard(1)"
          >
            <dataCard :active="getCardSelected == 1" visible src="/cards/01.svg" />
          </div>
          <div
            class="card"
            @click="handleClickCard(2)"
          >
            <dataCard :active="getCardSelected == 2" visible src="/cards/02.svg" />
          </div>
        </div>

        <add-card @click="$router.push('/my-card/add-card/')" />
      </div>
      <div class="sec-2">
        <Card class="card-1">
          <Header>
            <h3>
              Saldo Total
            </h3>

            <template #interactions>
              <div class="trending red">
                <i class="bx bx-trending-down" /><b>-$ 992.60</b>
              </div>
              <div class="trending green">
                <i class="bx bx-trending-up" /> <b>+$ 6.220.13</b>
              </div>
            </template>
          </Header>

          <h3 class="balance">
            S/. 83402,83
          </h3>

          <footer>
            <Button pink @click="$router.push('/transfer')">
              Enviar
            </Button>
            <Button gray @click="$router.push('/transfer/receive')">
              Recibir
            </Button>
          </footer>
        </Card>
        <Card class="card-2">
          <Header>
            <div class="con-btns">
              <Button border icon @click="chart = (chart == 'line' ? 'bar' : 'line')">
                <i v-if="chart == 'line'" class="bx bx-bar-chart-square" />
                <i v-else class="bx bx-chart" />
              </Button>
              <Button border icon>
                <i class="bx bx-calendar" />
              </Button>
            </div>
            <template #interactions>
              <div class="con-legend">
                <div class="legend-income">
                  <span /> Ingresos
                </div>
                <div class="legend-withdrawals">
                  <span /> Retiros
                </div>
              </div>
            </template>
          </Header>
          <div class="con-chart">
            <ChartLine v-if="chart == 'line'" style="height: 200px" />
            <ChartBar v-else style="height: 200px" />
          </div>
        </Card>
        <Card class="card-3">
          <Header>
            <h3>
              Historial de Transacciones
            </h3>

            <template #interactions>
              <c-input not-margin placeholder="Buscar" />
            </template>
          </Header>

          <Table>
            <template #thead>
              <th class="not-mobile">
                Nro
              </th>
              <th>
                <i class="bx bx-transfer" />
              </th>
              <th>
                ID
              </th>
              <th class="not-mobile">
                Tipo de transferencia
              </th>
              <th>
                Usuario
              </th>
              <th class="not-mobile">
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
                <td class="not-mobile">
                  {{ i+=1 }}
                </td>
                <td>
                  <i class="bx bx-up-arrow-alt" />
                </td>
                <td>
                  00014530092
                </td>
                <td class="not-mobile">
                  Deposito
                </td>
                <td>
                  Luis Daniel
                </td>
                <td class="not-mobile">
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
        </Card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Card from '@/components/common/card.vue'
import Header from '@/components/common/header.vue'
import ChartBar from '@/components/chart/bar.vue'
import ChartLine from '@/components/chart/line.vue'
import cInput from '@/components/common/input.vue'
import Button from '@/components/common/button.vue'
import Table from '@/components/common/table.vue'
import dataCard from '@/components/common/dataCard.vue'
import addCard from '@/components/common/addCard.vue'
@Component({
  middleware: 'authenticated',
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  components: {
    Card,
    Header,
    ChartBar,
    ChartLine,
    cInput,
    Button,
    Table,
    dataCard,
    addCard
  }
})
export default class wallet extends Vue {
  chart: string = 'line'
  cardSelected: boolean = false

  handleClickCard (n: number) {
    this.$router.push(`./wallet?card=${n}`)
  }

  get getCardSelected () {
    return this.$route.query.card || 1
  }
}
</script>
<style lang="sass" scoped>
.con-wallet
  .content-wallet
    width: 100%
    display: flex
    align-items: flex-start
    justify-content: center
    max-width: 1200px
  .add-card-btn
    position: absolute
    right: 10px
    top: 55px
    background: -color('color-2')
    border-radius: 12px
    border: 0px
    padding: 7px 12px
    color: #fff
    font-size: .75rem
    z-index: 20
  .sec-1
    min-width: 260px
    margin-right: 10px
    margin-left: 10px
    .content-cards
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column
      .card
        margin: 10px 0px
        position: relative

  .sec-2
    display: flex
    flex-wrap: wrap
    width: 100%
    .card-1
      width: calc(50% - 30px)
      display: flex
      align-items: center
      justify-content: space-between
      flex-direction: column
      footer
        width: 100%
        display: flex
        align-items: center
        justify-content: space-between
        button
          width: 100%
      .balance
        font-size: 2.2rem
        width: 100%
        text-align: center
        padding: 30px 10px
        font-weight: 500
      .trending
        padding: 7px 10px
        margin-left: 10px
        border-radius: 16px
        display: flex
        justify-content: center
        align-items: center
        b
          font-weight: 600
          font-size: .8rem
        &.red
          background: -color(color-2, .1)
          color: -color(color-2, 1)
        &.green
          background: -color(green, .1)
          color: -color(green, 1)
        i
          font-size: 1.2rem
          margin-right: 8px
    .card-2
      width: calc(50% - 30px)
      .con-btns
        display: flex
        align-items: flex-start
        justify-content: center
      .con-legend
        display: flex
        align-items: flex-start
        justify-content: center
        div
          display: flex
          align-items: center
          justify-content: center
          padding-left: 15px
          font-size: .75rem
          font-weight: 600
          &.legend-income
            span
              background: -color('purpure')
          &.legend-withdrawals
            span
              background: -color('orange')
          span
            display: block
            position: relative
            width: 10px
            height: 10px
            border-radius: 50%
            margin-right: 5px
    .card-3
      width: 100%
// responsive

@media (max-width: 1000px)
  .con-wallet
    .content-wallet
      flex-direction: column
    .sec-1
      width: calc(100% - 20px)
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column
      .add-card
        max-width: 260px
        margin: auto
        min-height: 160px
        flex-direction: column !important
        h4
          margin-left: 0px !important
          margin-top: 20px
          text-align: center
    .sec-2
      .card-1
        width: calc(100% - 30px)
      .card-2
        width: calc(100% - 30px)
      .card-3
        width: calc(100% - 30px)
@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .con-wallet
    padding-top: 60px !important
    .sec-1
      width: 100%
      margin: 30px 0px
      margin-bottom: 20px
      margin-top: 35px
      flex-direction: row
      overflow: auto
      align-items: flex-start
      justify-content: flex-start
      &::-webkit-scrollbar
        height: 0px
      .content-cards
        display: flex
        flex-direction: row
        .card
          margin: 0px 10px
      .add-card
        flex-direction: row
        margin: 0px 10px
        width: calc(100% - 20px)
        min-width: 260px
        border-radius: 20px 0px 0px 20px
        h4
          padding-top: 0px
          margin-left: 15px
    .sec-2
      .card-1
        width: 100%
        margin: 10px 0px
      .card-2
        width: 100%
        margin: 10px 0px
      .card-3
        width: 100%
        margin: 10px 0px
      .card-3
        padding-bottom: 80px
        padding-left: 0px
        padding-right: 0px
        .header
          padding: 0px 20px
          h3
            font-size: .9rem
</style>
