<template>
  <div class="content-page">
    <Popup v-model="openPopup">
      <template #header>
        <h3>
          Tarjeta Activada
        </h3>
      </template>

      <div>
        <b>Felicidades</b> ya tienes la cuenta activada y puedes hacer operaciones como: <b>transferencias y pagos</b>
      </div>

      <template #footer>
        <Button margin-top gradient block @click="openPopup = false">
          Aceptar
        </Button>
      </template>
    </Popup>

    <div class="header-mobile">
      <h4>
        Saldo Total
      </h4>
      <h3>
        s/. 163.562,02
      </h3>
    </div>
    <div class="con-secs">
      <div class="sec1">
        <Card class="not-mobile">
          <Header>
            <nuxt-link to="/wallet/" tag="h3">
              Saldo
            </nuxt-link>
          </Header>

          <div class="content-card">
            <nuxt-link to="/wallet/" tag="h3">
              S/. 83402,83
            </nuxt-link>
          </div>

          <footer class="footer-trending">
            <div class="trending">
              <i class="bx bx-trending-up" /> <b>+$ 6.220.13</b>
            </div>
            <div class="trending">
              <i class="bx bx-trending-down" /><b>-$ 992.60</b>
            </div>
          </footer>
        </Card>
        <Card class="not-mobile">
          <Header>
            <h3 @click="$router.push('user')">
              Información
            </h3>

            <template #interactions>
              <Button border @click="$router.push('user')">
                <i class="bx bx-pencil" />
              </Button>
            </template>
          </Header>

          <ul class="ul-info">
            <li>
              <span>
                <i class="bx bxs-city" />
                Ciudad:
              </span>
              <b>
                Lima
              </b>
            </li>
            <li>
              <span>
                <i class="bx bx-map" />
                Dirección:
              </span>
              <b>
                Peru
              </b>
            </li>
            <li>
              <span>
                <i class="bx bx-wallet" />
                Wallet ID:
              </span>
              <b>
                4sfd4sedrt56fgjfgasasfzxcvb
              </b>
            </li>
          </ul>
        </Card>
        <Card class="not-mobile">
          <Header>
            <nuxt-link to="/user/security" tag="h3">
              Seguridad
            </nuxt-link>

            <template #interactions>
              <Button transparent @click="$router.push('/user/security')">
                <i class="bx bx-dots-horizontal-rounded" />
              </Button>
            </template>
          </Header>

          <ul class="ul-secure">
            <li>
              <div class="icon-text">
                <i class="bx bx-check-shield" />
                <b>
                  Habilitar 2FA
                </b>
              </div>
              <c-switch />
            </li>
            <li>
              <div class="icon-text">
                <i class="bx bx-lock-alt" />
                <b>
                  Contraseña
                </b>
              </div>
              <Button border>
                Cambiar
              </Button>
            </li>
          </ul>
        </Card>
      </div>
      <div class="sec2">
        <Card>
          <Cards-slide :disabled="!verified" :is-mobile="isMobile">
            <template #card1>
              <dataCard :disabled="!verified" to="/my-card" visible src="/cards/01.svg" />
            </template>
            <template #card2>
              <dataCard :disabled="!verified" to="/my-card" visible src="/cards/02.svg" />
            </template>
            <template #card3>
              <dataCard :disabled="!verified" to="/my-card" visible src="/cards/03.svg" />
            </template>
          </Cards-slide>

          <div v-if="!verified" class="check-user">
            <p>
              Ya tienes tu tarjeta <b>iu</b> ahora solo falta que la actives, realizando los siguientes pasos
            </p>

            <div class="con-btns-verified">
              <Button :transparent="verifiedManual" block @click="verifiedManual = false">
                Escanear DNI
              </Button>
              <Button block :transparent="!verifiedManual" @click="verifiedManual = true">
                Manualmente
              </Button>
            </div>

            <Divider text>
              Escanear DNI
            </Divider>

            <input-document
              v-if="verifiedManual"
              v-model="formVerified.document"
              :danger="formVerified.document.length < 4 && sendVerified"
            >
              Documento de identidad
            </input-document>

            <button v-if="!verifiedManual" class="btn-scan" @click="handleScan">
              <div class="con-scan">
                <i class="bx bx-barcode-reader" />
              </div>
              <p>
                Escanear el código de barras de tu <b>DNI</b>
              </p>
            </button>

            <inputFile
              v-model="formVerified.frontal"
              :danger="!formVerified.frontal && sendVerified"
            >
              Foto documento de identidad (frontal)
            </inputFile>

            <inputFile
              v-model="formVerified.posterior"
              :danger="!formVerified.posterior && sendVerified"
            >
              Foto documento de identidad (posterior)
            </inputFile>

            <inputFile
              v-model="formVerified.selfie"
              :danger="!formVerified.selfie && sendVerified"
            >
              Tómate un Selfie
            </inputFile>

            <Divider>
              +
            </Divider>

            <h4>Información de uno de tus Padres o Representante Legal</h4>

            <input-document
              v-if="verifiedManual"
              v-model="formVerified.documentParent"
              :danger="formVerified.documentParent.length < 4 && sendVerified"
            >
              Documento de identidad
            </input-document>

            <button v-else class="btn-scan">
              <div class="con-scan">
                <i class="bx bx-barcode-reader" />
              </div>
              <p>
                Escanear el código de barras de tu <b>DNI</b>
              </p>
            </button>

            <inputFile
              v-model="formVerified.frontalParent"
              :danger="!formVerified.frontalParent && sendVerified"
            >
              Foto Documento de identidad (frontal)
            </inputFile>

            <inputFile
              v-model="formVerified.posteriorParent"
              :danger="!formVerified.posteriorParent && sendVerified"
            >
              Foto Documento de identidad (posterior)
            </inputFile>

            <input-cell
              v-model="formVerified.number"
              :danger="formVerified.number.length < 4 && sendVerified"
            >
              Número de teléfono
            </input-cell>
          </div>

          <Button
            v-if="!verified"
            margin-top
            gradient
            block
            my-class="activate-btn"
            @click="handleActiveCard"
          >
            Activar Tarjeta
          </Button>

          <div v-else class="con-transfer">
            <div class="buttons-mobile">
              <ul>
                <nuxt-link tag="li" to="/recharge-cell">
                  <span>
                    <i class="bx bx-mobile-alt" />
                  </span>
                  <p>
                    Recargar <br>
                    Celular
                  </p>
                </nuxt-link>
                <nuxt-link tag="li" to="/pay-services">
                  <span>
                    <i class="bx bxs-shopping-bags" />
                  </span>
                  <p>
                    Pagar <br>
                    Servicios
                  </p>
                </nuxt-link>
                <nuxt-link tag="li" to="/my-card">
                  <span>
                    <i class="bx bx-credit-card" />
                  </span>
                  <p>
                    Mi tarjeta <br>
                    iu
                  </p>
                </nuxt-link>
                <nuxt-link tag="li" to="/movements">
                  <span>
                    <i class="bx bx-line-chart" />
                  </span>
                  <p>
                    Movimientos
                  </p>
                </nuxt-link>
                <nuxt-link tag="li" to="/sub-accounts">
                  <span>
                    <i class="bx bx-user-plus" />
                  </span>
                  <p>
                    Sub Cuentas
                  </p>
                </nuxt-link>
                <nuxt-link tag="li" to="/deposit-withdraw">
                  <span>
                    <i class="bx bx-money" />
                  </span>
                  <p>
                    Depositar <br>
                    Retirar
                  </p>
                </nuxt-link>
              </ul>
            </div>
            <div class="nav">
              <nuxt-link to="/transfer" tag="h3">
                Transacciones
              </nuxt-link>

              <div class="nav-buttons">
                <Button
                  :transparent="transfer == 'get'"
                  @click="transfer = 'send'"
                >
                  Enviar
                </Button>
                <Button
                  :transparent="transfer == 'send'"
                  @click="transfer = 'get'"
                >
                  Solicitar
                </Button>
              </div>
            </div>

            <div v-if="transfer == 'send'" class="content-inputs">
              <c-input
                v-model="form.sendTo"
                :danger="send && !form.sendTo"
                center
              >
                Enviar a

                <!-- <template #alert>
                  Por favor ingrese el Wallet ID o Correo de destino
                </template> -->
              </c-input>

              <div class="con-inputs">
                <c-input
                  v-model="form.amount"
                  :danger="send && form.amount === 'S/. 0.00'"
                  type="number"
                  money
                >
                  Monto
                </c-input>
                <c-input
                  v-model="form.reason"
                  :danger="send && !form.reason"
                >
                  Motivo
                </c-input>
              </div>

              <div class="con-texts">
                <span>
                  Comision: <b>s/. 30.00</b>
                </span>
                <span>
                  Total: <b>s/. 303.00</b>
                </span>
              </div>

              <Button class="btn-send" block gradient @click="transferSend">
                <i class="bx bx-paper-plane" /> Enviar
              </Button>
            </div>

            <div v-if="transfer == 'get'" class="content-inputs">
              <input-cell
                v-model="form.phone"
                :danger="send && formGet.phone.length < 4"
              >
                Número de teléfono
              </input-cell>

              <div class="con-inputs">
                <c-input
                  v-model="formGet.amount"
                  :danger="send && formGet.amount === 'S/. 0.00'"
                  type="number"
                  money
                >
                  Monto
                </c-input>
                <c-input
                  v-model="formGet.reason"
                  :danger="send && !formGet.reason"
                >
                  Motivo
                </c-input>
              </div>

              <div class="con-texts">
                <span>
                  Comision: <b>S/. 3</b>
                </span>
                <span>
                  Total: <b>S/.303.00</b>
                </span>
              </div>

              <Button
                class="btn-send"
                block
                gradient
                @click="transferGet"
              >
                <i class="bx bxs-left-down-arrow-circle" /> Solicitar
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <div class="sec3">
        <Card to="/pay-services">
          <h4>
            Pagar <br>
            Servicios
          </h4>
          <img src="~/assets/tarjeta-de-credito.svg" alt="">
        </Card>
        <Card to="/recharge-cell">
          <h4>
            Recargar <br>
            Celular
          </h4>
          <img src="~/assets/digital-wallet.svg" alt="">
        </Card>
        <Card to="/movements">
          <h4>
            Movimientos
          </h4>
          <img src="~/assets/retorno-de-la-inversion.svg" alt="">
        </Card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Action, State } from 'vuex-class'
import { Component, Vue, Watch } from 'vue-property-decorator'
import Card from '@/components/common/card.vue'
import Header from '@/components/common/header.vue'
import Button from '@/components/common/button.vue'
import cSwitch from '@/components/common/switch.vue'
import CardsSlide from '@/components/cardsSlide.vue'
import cInput from '@/components/common/input.vue'
import inputFile from '@/components/common/input-file.vue'
import dataCard from '@/components/common/dataCard.vue'
import Divider from '@/components/common/divider.vue'
import inputCell from '@/components/common/input-cell.vue'
import inputDocument from '@/components/common/input-document.vue'
import Popup from '@/components/common/popup.vue'
import * as actions from '~/constants/actions'
@Component({
  middleware: 'authenticated',
  asyncData ({ isMobile }) {
    return {
      isMobile
    }
  },
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  components: {
    Card,
    Header,
    Button,
    cSwitch,
    CardsSlide,
    cInput,
    dataCard,
    Divider,
    inputFile,
    inputCell,
    inputDocument,
    Popup
  }
})
export default class inicio extends Vue {
  openPopup: boolean = false
  transfer: string = 'send'
  send: boolean = false
  sendVerified: boolean = false
  verifiedManual: boolean = false
  form: any = {
    sendTo: '',
    amount: '',
    reason: ''
  }

  formGet: any = {
    phone: '',
    amount: '',
    reason: ''
  }

  formVerified: any = {
    number: '',
    selfie: '',
    document: '',
    documentParent: '',
    posterior: '',
    frontal: '',
    posteriorParent: '',
    frontalParent: ''
  }

  @State(state => state.verified) verified!: boolean

  @Action(actions.VERIFIED) handleVerified!: Function

  @Watch('transfer')
  handleTransferChange () {
    this.send = false
  }

  handleScan () {
  }

  handleActiveCard () {
    this.sendVerified = true
    if (!this.formVerified.selfie || !this.formVerified.number || !this.formVerified.posterior || !this.formVerified.frontal || !this.formVerified.posteriorParent || !this.formVerified.frontalParent) {
      return
    }

    if (this.verifiedManual) {
      if (this.formVerified.document.length < 4 || this.formVerified.documentParent.length < 4) {
        return
      }
    }
    this.handleVerified(true)
    this.sendVerified = false
    this.openPopup = true
  }

  transferSend () {
    const form = this.form
    this.send = true
    if (!form.sendTo && form.amount === 'S/. 0.00' && !form.reason) {
      return
    }
    this.$dialog({
      title: 'Alerta!',
      text: 'Esta por efectuar una transacción de envió, estas seguro?',
      click: () => {
        this.send = false
        this.$dialog({
          title: 'Transferencia efectuada con éxito!',
          text: 'Para finalizar la transferencia se envió un correo de confirmación',
          type: 'success',
          cancel: 'none'
        })
      }
    })
  }

  transferGet () {
    const formGet = this.formGet
    this.send = true
    if (formGet.phone.length < 4 && formGet.amount === 'S/. 0.00' && !formGet.reason) {
      return
    }
    this.$dialog({
      title: 'Alerta!',
      text: 'Esta por solicitar una transferencia, estas seguro?',
      click: () => {
        this.send = false
        this.$dialog({
          title: 'Solicitud enviada éxito!',
          text: 'Para finalizar la solicitud se envió un correo de confirmación',
          type: 'success',
          cancel: 'none'
        })
      }
    })
  }
}
</script>
<style lang="sass" scoped>
.con-btns-verified
  display: flex
  align-items: center
  justify-content: center
  padding: 5px
  background: -color('bg-2')
  border-radius: 17px
  .button
    border-radius: 17px 0px 0px 17px
    &:last-child
      border-radius: 0px 17px 17px 0px
.check-user
  width: 100%
  max-height: 405px
  overflow-x: auto
  z-index: -1
  padding: 10px
  >h4
    text-align: center
    padding: 10px 5px
    font-size: .9rem
    padding-top: 0px
  >p
    font-size: .8rem
    text-align: center
    padding: 20px 0px
    b
      font-weight: bold
      font-style: italic
  .btn-scan
    width: 100%
    padding: 10px
    border-radius: 20px
    display: flex
    align-items: center
    justify-content: center
    background: -color('bg-2')
    border: 0px
    cursor: pointer
    color: -color('color')
    i
      font-size: 1.6rem
      width: 50px
      height: 50px
      background: -color('bg-3')
      display: flex
      align-items: center
      justify-content: center
      border-radius: 15px
    p
      padding: 0px 10px
      text-align: left
      b
        font-weight: bold

.con-secs
  display: flex
  align-items: stretch
  justify-content: center
  padding: 10px
  max-width: 1200px
  margin: auto
  width: 100%
  .con-transfer
    width: 100%
  .sec1
    width: 40%
    display: flex
    align-items: flex-start
    justify-content: flex-start
    flex-direction: column
    .card
      min-height: 190px
      h3
        cursor: pointer
  .sec2
    width: 35%
    .card
      min-height: 630px
  .sec3
    width: 25%
  .content-card
    padding: 20px 0px
    padding-top: 15px
    padding-bottom: 20px
    h3
      font-size: 1.6rem
  .footer-trending
    display: flex
    align-items: center
    justify-content: flex-start
    .trending
      display: flex
      align-items: center
      justify-content: center
      padding: 0px 10px
      &:first-child
        padding-left: 0px
      b
        font-size: .8rem
    i
      width: 30px
      height: 30px
      background: -color('bg-3')
      display: flex
      align-items: center
      justify-content: center
      margin-right: 10px
      border-radius: 10px
      font-size: 1.2rem

.ul-info
  padding-top: 10px
  li
    padding: 6px 0px
    display: flex
    align-items: center
    justify-content: flex-start
    i
      margin-right: 5px
      color: -color('color')
      font-size: 1.1rem
    span
      min-width: 110px
      display: block
      color: -color('color', .5)
      font-weight: bold
      font-size: .9rem
    b
      color: -color('color', 1)
      font-size: .9rem

.ul-secure
  li
    display: flex
    padding: 8px 0px
    display: flex
    align-items: center
    justify-content: space-between
    &::last-child
      padding-top: 0px
    .icon-text
      display: flex
      align-items: center
      justify-content: space-between
      font-size: .9rem
    i
      width: 40px
      height: 40px
      display: flex
      align-items: center
      justify-content: center
      background: -color('bg')
      box-shadow: 0px 3px 20px 0px rgba(0,0,0,.08)
      border-radius: 14px
      margin-right: 10px
      font-size: 1.25rem
.sec2
  .btn-send
    margin-top: 20px
    margin-bottom: 10px
    i
      margin-right: 8px
  .con-cards
    margin-top: -60px
  .con-texts
    display: flex
    align-items: center
    justify-content: center
    span
      width: 50%
      position: relative
      display: flex
      align-items: center
      justify-content: space-between
      padding: 10px 5px
      font-size: .85rem
      font-weight: bold
  .con-inputs
    display: flex
    align-items: center
    justify-content: space-between
    .con-input
      width: calc(50% - 5px)
.nav
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  margin-top: 30px
  h3
    margin-bottom: 10px
    cursor: pointer
  .nav-buttons
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
    margin: 10px
    // border: 2px solid -color('color', .1)
    background: -color('bg-4')
    border-radius: 15px
    padding: 5px
    button
      width: calc(50% - 3px)
      margin: 0px

.sec3
  display: flex
  align-items: flex-start
  justify-content: flex-start
  flex-direction: column
  .card
    width: 190px
    height: 190px
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    overflow: hidden
    transition: all .25s ease
    cursor: pointer
    h4
      text-align: left
      width: 100%
      padding-bottom: 15px
      position: absolute
      top: 20px
      left: 20px
  img
    max-width: 120px
    margin-bottom: -120px
    // opacity: .15
// responsive

@media (max-width: 1400px)
  .con-secs
    .sec1
      width: calc(50% - 95px)
    .sec2
      width: calc(50% - 95px)
    .sec3
      width: 190px
@media (max-width: 1300px)
  .con-secs
    flex-wrap: wrap
    .sec1
      width: 50%
    .sec2
      width: 50%
    .sec3
      width: 100%
      flex-direction: row
      .card
        width: 33%
        height: 140px
@media (min-width: 920px)
  .buttons-mobile,.header-mobile
    display: none
  .sec3
    .card
      &:hover
        transform: translate(0, -8px)
@media (max-width: 920px)
  .content-mobile
    .content-page
      flex-direction: column
      padding-top: 50px
  .header-mobile
    position: relative
    width: 100%
    color: #fff
    padding-bottom: 50px
    text-align: center
    z-index: -1
    &:after
      content: ''
      position: absolute
      bottom: -25px
      width: 200%
      left: -50%
      height: 250%
      background: #121624
      z-index: -1
      border-radius: 50%
    h3
      font-size: 1.9rem
      font-weight: 500
    h4
      font-size: .9rem
      font-weight: 500

  .buttons-mobile
    padding: 0px 20px
    ul
      display: flex
      align-items: flex-start
      justify-content: center
      flex-wrap: wrap
      padding-top: 20px
      li
        display: flex
        align-items: center
        justify-content: flex-start
        flex-direction: column
        width: 33%
        margin-top: 25px
        span
          box-shadow: 0px 4px 20px 0px rgba(0,0,0,.04)
          width: 70px
          height: 70px
          display: block
          display: flex
          align-items: center
          justify-content: center
          background: #fff
          border-radius: 25px
          i
            font-size: 1.7rem
        p
          font-size: .7rem
          max-width: 100%
          text-align: center
          padding-top: 6px
          font-weight: 600
          opacity: .6

  .con-secs
    flex-wrap: wrap
    padding: 0px
    padding-bottom: 0px
    .con-inputs
      flex-wrap: wrap
      .con-input
        width: 100%
    .card
      margin: 10px 0px
      width: 100%
    .sec1
      width: 100%
      .card:last-child
        padding-bottom: 75px
    .sec2
      width: 100%
      order: -1
      .card
        background: transparent
        box-shadow: none
    .sec3
      flex-wrap: wrap
      display: none
      .card
        width: 100%

@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .con-secs
    .sec1
      .card
        min-height: auto
  .sec2
    padding-bottom: 70px
    .activate-btn
      width: calc(100% - 30px) !important
      margin-left: 15px
    .card
      padding: 0px
      .nav
        padding: 0px 20px
      .content-inputs
        background: -color('bg')
        padding: 20px
        border-radius: 20px
  .check-user
    padding: 20px
    overflow: hidden
    height: auto
    max-height: none
    background: -color('bg')
    width: 100%
    border-radius: 20px
    margin-top: -20px
</style>
