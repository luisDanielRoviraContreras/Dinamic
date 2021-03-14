<template>
  <div class="con-transfer-send">
    <div class="sec-1">
      <h3 class="h3">
        Cuenta de Origen
      </h3>

      <div class="con-accounts">
        <Header>
          <h3>
            Mi Cuenta
          </h3>
        </Header>

        <div class="con-users not-mobile">
          <div
            :class="{ active: form.user == 'default' }"
            class="user block"
            @click="form.user = 'default'"
          >
            <Avatar src="avatars/avatar-9.png" />
            <p>
              Paula Ramirez
            </p>
          </div>
        </div>

        <Divider>
          O
        </Divider>

        <Header>
          <h3>
            Sub Cuentas
          </h3>
        </Header>

        <div class="con-users not-scroll-mobile">
          <div
            :class="{ active: form.user == 'default' }"
            class="user block if-mobile"
            @click="form.user = 'default'"
          >
            <Avatar src="avatars/avatar-9.png" />
            <p>
              Paula Ramirez
            </p>
          </div>
          <div
            :class="{ active: form.user == 1 }"
            class="user"
            @click="form.user = 1"
          >
            <Avatar src="avatars/avatar-1.png" />
            <p>
              Dayan Ramirez
            </p>
          </div>
          <div
            :class="{ active: form.user == 2 }"
            class="user"
            @click="form.user = 2"
          >
            <Avatar src="avatars/avatar-6.png" />
            <p>
              Gabriel Flores
            </p>
          </div>
          <div
            :class="{ active: form.user == 3 }"
            class="user"
            @click="form.user = 3"
          >
            <Avatar src="avatars/avatar-7.png" />
            <p>
              Gabriel Flores
            </p>
          </div>
          <div
            :class="{ active: form.user == 4 }"
            class="user"
            @click="form.user = 4"
          >
            <Avatar src="avatars/avatar-8.png" />
            <p>
              Gabriel Flores
            </p>
          </div>
        </div>
      </div>

      <button class="add-user" @click="$router.push('/sub-accounts')">
        <i class="bx bx-plus" />
      </button>
    </div>
    <div class="sec-2">
      <h3 class="h3">
        <b>
          Cuenta Destino
        </b>
      </h3>

      <button class="scan-code" @click="toggleQr">
        <i class="bx bx-scan" />
        <p>
          Escanear QR
        </p>
      </button>

      <Divider>
        O
      </Divider>

      <Header>
        <h3 class="margin-top">
          Favoritos
        </h3>
      </Header>

      <div class="con-users not-scroll-mobile">
        <div
          :class="{ active: form.user == 5 }"
          class="user"
          @click="form.user = 5"
        >
          <Avatar src="avatars/avatar-2.png" />
          <p>
            Dayan Ramirez
          </p>
        </div>
        <div
          :class="{ active: form.user == 6 }"
          class="user"
          @click="form.user = 6"
        >
          <Avatar src="avatars/avatar-3.png" />
          <p>
            Gabriel Flores
          </p>
        </div>
        <div
          :class="{ active: form.user == 7 }"
          class="user"
          @click="form.user = 7"
        >
          <Avatar src="avatars/avatar-4.png" />
          <p>
            Gabriel Flores
          </p>
        </div>
        <div
          :class="{ active: form.user == 8 }"
          class="user"
          @click="form.user = 8"
        >
          <Avatar src="avatars/avatar-5.png" />
          <p>
            Gabriel Flores
          </p>
        </div>
      </div>

      <c-input
        v-model="form.number"
        :danger="!form.number && send"
      >
        Ingrese Nro del celular o Código de comercio
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

      <ul class="con-percent">
        <li>
          25%
        </li>
        <li>
          50%
        </li>
        <li>
          75%
        </li>
        <li>
          100%
        </li>
      </ul>

      <c-input
        v-model="form.description"
        :danger="!form.description && send"
      >
        Descripción
      </c-input>

      <div class="con-check-tooltip">
        <Checkbox
          v-model="form.save"
        >
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

      <Button
        margin-top
        class="btn-send"
        block
        gradient
        @click="handleSend"
      >
        <i class="bx bx-paper-plane" /> Enviar
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Action } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import Divider from '@/components/common/divider.vue'
import Header from '@/components/common/header.vue'
import Avatar from '@/components/common/avatar.vue'
import cInput from '@/components/common/input.vue'
import Checkbox from '@/components/common/checkbox.vue'
import Button from '@/components/common/button.vue'
import * as actions from '~/constants/actions'
@Component({
  components: {
    Divider,
    Header,
    Avatar,
    cInput,
    Checkbox,
    Button
  }
})
export default class transferSend extends Vue {
  send: boolean = false
  form: any = {
    user: 'default',
    number: '',
    description: '',
    amount: '',
    save: false
  }

  @Action(actions.QR) toggleQr!: Function

  handleSend () {
    this.send = true
    if (!this.form.number || !this.form.description || this.form.amount === 'S/. 0.00') {
      return
    }

    this.$dialog({
      title: 'Transferencia Enviada!',
      text: 'Transferencia efectuada con éxito',
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
.con-transfer-send
  display: flex
  align-items: flex-start
  justify-content: center
  width: 100%
  max-width: 1000px
  .con-users
    padding: 10px 0px
    display: flex
    align-items: center
    justify-content: flex-start
    overflow: auto
    .user
      display: flex
      align-items: center
      justify-content: flex-start
      background: -color('bg-4')
      border-radius: 20px
      padding: 5px
      font-weight: bold
      font-size: .8rem
      min-width: 170px
      cursor: pointer
      transition: all .25s ease
      &:hover
        background: -color('bg')
      &:last-child
        border-radius: 20px 0px 0px 20px
      ~ .user
        margin-left: 10px
      p
        padding: 0px 10px
      &.block
        width: 100%
      &.active
        background: -color('color')
        color: -color('bg')
  .sec-1
    width: 55%
    border-radius: 20px
    box-shadow: 0px 4px 20px 0px rgba(0,0,0,.05)
    padding: 20px
    position: relative
    max-width: 500px
    .add-user
      width: calc(100% - 20px)
      margin-right: 20px
      background: transparent
      margin-top: 20px
      border: 2px dashed -color('color', .05)
      border-radius: 12px
      padding: 10px 20px
      background: -color('bg-3')
      transition: all .25s ease
      cursor: pointer
      &:hover
        background: -color('bg-4')
        border: 2px solid -color('color', .05)
      i
        font-size: 1.4rem
        color: -color('color')
  h3
    font-size: .9rem
    &.margin-top
      margin-top: 20px
  .h3
    position: absolute
    left: 0px
    top: -35px
    font-weight: bold
    font-size: .9rem
    b
      font-weight: bold
  .sec-2
    width: 45%
    background: -color('bg')
    border-radius: 20px
    box-shadow: 0px 4px 20px 0px rgba(0,0,0,.05)
    padding: 20px
    position: relative
    margin-left: -20px
    .header
      h3
        margin-top: 0px
    .btn-send
      i
        margin-right: 7px
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
    .con-percent
      width: 100%
      display: flex
      align-items: center
      justify-content: space-between
      margin-top: 5px
      margin-bottom: 5px
      li
        padding: 10px 20px
        width: calc(25% - 10px)
        background: -color('bg-2')
        border-radius: 16px
        text-align: center
        cursor: pointer
        transition: all .25s ease
        // border: 2px solid -color('color', .05)
        font-size: .85rem
        font-weight: bold
        &:hover
          background: -color('bg-4')
    .h3
      position: absolute
      left: 0px
      top: -35px
      font-weight: bold
      font-size: .9rem
      b
        font-weight: bold

.scan-code
  width: 100%
  display: flex
  align-items: center
  font-weight: bold
  justify-content: center
  background: -color('bg-2')
  padding: 10px
  margin-bottom: 10px
  border-radius: 15px
  cursor: pointer
  transition: all .25s ease
  border: 0px
  &:hover
    background: -color('bg-3')
  i
    margin-right: 10px
    font-size: 2rem

// responsive
@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .con-transfer-send
    flex-direction: column
    .con-users
      padding-left: 15px
      padding-right: 15px
      .user
        &.block
          width: 100%
          border-radius: 20px
    .h3
      text-align: center
      width: 100%
      font-size: 1.1rem !important
    .sec-1
      width: 100%
      margin-top: 50px
      background: -color('bg')
      padding: 15px 0px
      border-radius: 0px
      .divider
        display: none
        .bx-user
      .header
        display: none
      .add-user
        display: none
      .header
        padding: 0px 15px
      .add-user
        width: 100%
    .sec-2
      width: 100%
      margin-top: 70px
      margin-left: 0px
      padding-bottom: 80px
      .con-users
        width: 100vw
        margin-left: -20px

</style>
