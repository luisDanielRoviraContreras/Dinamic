<template>
  <div class="chat-pay-menu">
    <header v-if="!isVisibleForm">
      <Button icon @click="allFalse">
        <i class="bx bx-arrow-back" />
      </Button>
      <h3 v-if="activeSendMoney">
        Enviar Dinero
      </h3>
      <h3 v-else-if="activeGetMoney">
        Solicitar Dinero
      </h3>
      <h3 v-else-if="activeFoundMoney">
        Crear Chancha
      </h3>
      <h3 v-else-if="activeQRMoney">
        Compartir QR
      </h3>
      <h3 v-else-if="activeUserMoney">
        Compartir usuario
      </h3>
      <Button transparent icon @click="$emit('emitInput', false)">
        <i class="bx bx-x" />
      </Button>
    </header>

    <ul v-if="isVisibleForm">
      <li @click="allFalse(),activeSendMoney = true">
        <img src="/icons-chat/1.svg" alt="">
        <p>
          Enviar Dinero
        </p>
      </li>
      <li @click="allFalse(),activeGetMoney = true">
        <img src="/icons-chat/2.svg" alt="">
        <p>
          Solicitar Dinero
        </p>
      </li>
      <li @click="allFalse(),activeFoundMoney = true">
        <img src="/icons-chat/5.svg" alt="">
        <p>
          Crear Chancha
        </p>
      </li>
      <li @click="allFalse(),activeQRMoney = true">
        <img src="/icons-chat/3.svg" alt="">
        <p>
          Compartir QR
        </p>
      </li>
      <li @click="allFalse(),activeUserMoney = true">
        <img src="/icons-chat/4.svg" alt="">
        <p>
          Compartir usuario
        </p>
      </li>
    </ul>

    <div v-if="activeSendMoney" class="con-form-money con-form-money__send">
      <div class="con-form">
        <cInput
          v-model="formSend.amount"
          :danger="formSend.amount === 'S/. 0.00' && send"
          not-margin
          type="number"
          money
        >
          Monto
        </cInput>
        <Button margin-top block gradient @click="handleSend('money-send', formSend.amount)">
          Enviar
        </Button>
      </div>
    </div>
    <div v-if="activeGetMoney" class="con-form-money con-form-money__send">
      <div class="con-form">
        <cInput
          v-model="formGet.amount"
          :danger="formGet.amount === 'S/. 0.00' && send"
          not-margin
          type="number"
          money
        >
          Monto
        </cInput>
        <Button margin-top block gradient @click="handleSend('money-get', formGet.amount)">
          Solicitar
        </Button>
      </div>
    </div>
    <div v-if="activeFoundMoney" class="con-form-money con-form-money__found">
      <div class="con-form">
        <cInput
          v-model="formFound.amount"
          :danger="formFound.amount === 'S/. 0.00' && send"
          not-margin
          type="number"
          money
        >
          Monto total
        </cInput>
        <Checkbox v-model="split">
          Dividir en partes iguales entre los integrantes
        </Checkbox>
        <h4>
          Integrantes
        </h4>
        <ul class="space">
          <li
            v-for="(user, i) in usersFound"
            :key="i"
            :class="{ disabled: !user.check }"
          >
            <div>
              <Checkbox v-model="user.check" @change="handleChangeCheck" />
              <Avatar :src="user.avatar" />
              <p>
                {{ user.name }}
              </p>
            </div>
            <span>
              <cInput
                v-model="user.amount"
                not-margin
                type="number"
                money
                :disabled="split || !user.check"
              />
            </span>
          </li>
        </ul>
        <Button margin-top block gradient>
          Crear
        </Button>
      </div>
    </div>
    <div v-if="activeQRMoney" class="con-form-money con-form-money__qr">
      <div class="con-form">
        <img src="/qr.png" alt="">
        <Button block gradient>
          Compartir
        </Button>
      </div>
    </div>
    <div v-if="activeUserMoney" class="con-form-money con-form-money__user">
      <div class="con-form">
        <ul>
          <li>
            <Avatar src="/avatars/avatar-9.png" />
            <p>
              Juan Reyes
            </p>
          </li>
          <li>
            <Avatar src="/avatars/avatar-1.png" />
            <p>
              Maria Laura
            </p>
          </li>
          <li>
            <Avatar src="/avatars/avatar-7.png" />
            <p>
              Yean carlos
            </p>
          </li>
          <li>
            <Avatar src="/avatars/avatar-8.png" />
            <p>
              Pepe Reyes
            </p>
          </li>
          <li>
            <Avatar src="/avatars/avatar-2.png" />
            <p>
              Sonia Laura
            </p>
          </li>
          <li>
            <Avatar src="/avatars/avatar-6.png" />
            <p>
              Jose carlos
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
import Checkbox from '@/components/common/checkbox.vue'
import cInput from '@/components/common/input.vue'
import Popup from '@/components/common/popup.vue'
import Avatar from '@/components/common/avatar.vue'
@Component({
  components: {
    Button,
    Popup,
    cInput,
    Avatar,
    Checkbox
  }
})
export default class chatPayMenu extends Vue {
  @Prop({}) myUser: any
  @Prop({}) id: any
  send: boolean = false
  activeSendMoney: boolean = false
  activeGetMoney: boolean = false
  activeFoundMoney: boolean = false
  activeQRMoney: boolean = false
  activeUserMoney: boolean = false
  split: boolean = true
  formSend: any = {
    amount: ''
  }

  formGet: any = {
    amount: ''
  }

  formFound: any = {
    amount: ''
  }

  usersFound: any = [
    {
      name: 'Juan Reyes',
      amount: '',
      avatar: '/avatars/avatar-9.png',
      check: false
    },
    {
      name: 'Maria Laura',
      amount: '',
      avatar: '/avatars/avatar-1.png',
      check: false
    },
    {
      name: 'Yean carlos',
      amount: '',
      avatar: '/avatars/avatar-7.png',
      check: false
    }
  ]

  handleChangeCheck (val) {
    if (this.split) {
      const valNumber = this.formFound.amount.replace('S/.', '')
      this.usersFound.map((item) => {
        if (item.check) {
          item.amount = (valNumber / this.getUsersFound.length).toFixed(2)
        } else {
          item.amount = 0.00
        }
      })
    }
  }

  @Watch('split')
  handleSplit () {
    if (this.split) {
      const valNumber = this.formFound.amount.replace('S/.', '')
      this.usersFound.map((item) => {
        if (item.check) {
          item.amount = (valNumber / this.getUsersFound.length).toFixed(2)
        }
      })
    }
  }

  @Watch('formFound.amount')
  handleFoundAmount (val) {
    if (this.split) {
      const valNumber = val.replace('S/.', '')
      this.usersFound.map((item) => {
        if (item.check) {
          item.amount = (valNumber / this.getUsersFound.length).toFixed(2)
        }
      })
    }
  }

  get getUsersFound () {
    return this.usersFound.filter((item) => {
      return item.check
    })
  }

  formatDate () {
    let hours: any = new Date().getHours()
    let minutes: any = new Date().getMinutes()
    const ampm = hours >= 12 ? 'p. m.' : 'a. m.'
    hours = hours % 12
    hours = hours || 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes
    const strTime = hours + ':' + minutes + ' ' + ampm
    return strTime
  }

  getDate () {
    const date = new Date().toJSON().slice(0, 10).split('-')
    return `${date[2]}/${date[1]}/${date[0]} - ${this.formatDate()}`
  }

  get isVisibleForm () {
    return !this.activeSendMoney && !this.activeGetMoney && !this.activeFoundMoney && !this.activeQRMoney && !this.activeUserMoney
  }

  handleSend (type, amount) {
    this.send = true

    if (amount === 'S/. 0.00') {
      return
    }

    const timestamp = this.$fireStoreObj.FieldValue.serverTimestamp()
    const refWriting = this.$fireStore.collection('chats').doc(`${this.$route.query.chat}`)
    refWriting.update({
      [`writing.${this.myUser.id}`]: this.$fireStoreObj.FieldValue.delete()
    })
    const refChat = this.$fireStore.collection('chats').doc(`${this.$route.query.chat}`).collection('messages')

    const object: any = {
      avatar: this.myUser.avatar,
      date: this.getDate(),
      name: this.myUser.name,
      text: amount,
      user: this.myUser.id,
      updatedAt: timestamp,
      type,
      notView: true
    }

    const refChatLast = this.$fireStore.collection('chats').doc(`${this.$route.query.chat}`)

    refChatLast.update({
      last: object
    })

    const id = uuidv4()

    refChatLast.update(
      {
        new: this.$fireStoreObj.FieldValue.arrayUnion(`${this.myUser.id}_${id}`)
      }
    )

    refChat.add(object)

    this.formSend.amount = ''
    this.send = false
    this.$emit('emitInput', false)
  }

  allFalse () {
    this.activeSendMoney = false
    this.activeGetMoney = false
    this.activeFoundMoney = false
    this.activeQRMoney = false
    this.activeUserMoney = false
  }
}
</script>
<style lang="sass" scoped>
.con-form-money
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  &.con-form-money__user
    .con-form
      max-width: 100%
      padding-bottom: 10px
  .con-form
    padding: 20px
    width: 100%
    max-width: 400px
    padding-top: 10px
    >ul
      padding: 10px 0px
      padding-top: 0px
      max-height: 200px
      overflow: auto
      &.space
        >li
          justify-content: space-between !important
      >li
        width: 100%
        display: flex
        align-items: center
        justify-content: flex-start
        padding: 5px 0px
        cursor: pointer
        &.disabled
          opacity: .5
        div
          display: flex
          align-items: center
          justify-content: flex-start
        p
          padding: 10px
    h4
      width: 100%
      text-align: center
    img
      max-width: 100%
      max-height: 200px
      margin: auto
      display: block
.chat-pay-menu
  width: 100%
  position: absolute
  background: -color('bg')
  top: 0px
  left: 0px
  transform: translate(0, -100%)
  box-shadow: 0px -10px 10px 0px rgba(0, 0, 0, 0.03)
  z-index: -1
  header
    width: 100%
    text-align: center
    // background: -color('bg-2')
    font-size: .8rem
    padding: 10px 10px
    display: flex
    align-items: center
    justify-content: space-between
  >ul
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    padding: 15px
    padding-top: 20px
    >li
      width: calc(20% - 20px)
      height: auto
      min-height: 116px
      background: -color('bg')
      box-shadow: 0px 5px 20px 0px rgba(0,0,0,.05)
      font-size: .7rem
      display: flex
      align-items: center
      justify-content: center
      padding: 10px
      border-radius: 20px
      cursor: pointer
      flex-direction: column
      transition: all .25s ease
      max-width: 140px
      margin: 0px 10px
      &:hover
        box-shadow: 0px 0px 0px 0px rgba(0,0,0,.05)
        transform: translate(0,5px)
      img
        width: 50px
      p
        padding-top: 10px
        text-align: center
// responsive

@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .chat-pay-menu
    >ul
      flex-wrap: wrap
      padding-bottom: 0px
      padding-top: 10px
      >li
        width: calc(33% - 14px)
        margin: 7px
        padding: 5px
        img
          width: 35px
</style>
