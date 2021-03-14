<template>
  <div class="con-transfer-send">
    <div class="sec-1">
      <h3 class="h3">
        Seleccione y llene los campos
      </h3>

      <div class="con-users not-scroll-mobile">
        <div
          :class="{
            active: form.user == 1
          }"
          class="user"
          @click="form.user = 1"
        >
          <Avatar src="/avatars/avatar-1.png" />
          <p>
            Dayan Ramirez
          </p>
        </div>
        <div
          :class="{
            active: form.user == 2
          }"
          class="user"
          @click="form.user = 2"
        >
          <Avatar src="/avatars/avatar-6.png" />
          <p>
            Gabriel Flores
          </p>
        </div>
        <div
          :class="{
            active: form.user == 3
          }"
          class="user"
          @click="form.user = 3"
        >
          <Avatar src="/avatars/avatar-7.png" />
          <p>
            Gabriel Flores
          </p>
        </div>
        <div
          :class="{
            active: form.user == 4
          }"
          class="user"
          @click="form.user = 4"
        >
          <Avatar src="/avatars/avatar-8.png" />
          <p>
            Gabriel Flores
          </p>
        </div>
      </div>

      <button class="add-user" @click="$router.push('/contacts')">
        <i class="bx bx-plus" />
      </button>
    </div>
    <div class="sec-2">
      <Button :class="{ activeQR }" block border class="con-qr" @click="activeQR = !activeQR">
        <img src="/qr.png" alt="">
        <p>
          Mi código QR
        </p>
      </Button>

      <Divider>
        O
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

      <div class="con-check-tooltip">
        <Checkbox v-model="form.save">
          Guardar Datos
        </Checkbox>
      </div>

      <Button
        margin-top
        class="btn-send"
        block
        gradient
        @click="handleSend"
      >
        <i class="bx bx-paper-plane" /> Solicitar
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Divider from '@/components/common/divider.vue'
import Header from '@/components/common/header.vue'
import Avatar from '@/components/common/avatar.vue'
import cInput from '@/components/common/input.vue'
import InputCell from '@/components/common/input-cell.vue'
import Checkbox from '@/components/common/checkbox.vue'
import Button from '@/components/common/button.vue'
@Component({
  components: {
    Divider,
    Header,
    Avatar,
    cInput,
    Checkbox,
    Button,
    InputCell
  }
})
export default class transferSend extends Vue {
  activeQR: boolean = false
  send: boolean = false
  form: any = {
    user: null,
    number: '',
    description: '',
    amount: '',
    save: false
  }

  handleSend () {
    this.send = true
    if (!this.form.number || !this.form.description || this.form.amount === 'S/. 0.00') {
      return
    }

    this.$dialog({
      title: 'Transferencia Solicitada!',
      text: 'Transferencia Solicitada con éxito',
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
.con-qr
  border-radius: 15px
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  font-weight: bold
  &.activeQR
    flex-direction: column
    padding: 0px
    img
      width: 100%
      max-width: 280px
      margin-right: 0px
  p
    padding: 10px
  img
    width: 40px
    margin-right: 10px
    transition: all .25s ease
.con-transfer-send
  display: flex
  align-items: flex-start
  justify-content: center
  width: 100%
  max-width: 1000px
  .con-users
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    overflow: auto
    padding-right: 20px
    .user
      display: flex
      align-items: center
      justify-content: flex-start
      background: -color('bg-4')
      border-radius: 20px
      padding: 5px
      font-weight: bold
      font-size: .8rem
      width: 100%
      margin-bottom: 15px
      cursor: pointer
      transition: all .25s ease
      &:hover
        background: -color('bg')
      p
        padding: 0px 10px
      &.block
        width: 100%
      &.active
        background: -color('color')
        color: -color('bg')
  .sec-1
    width: 230px
    border-radius: 20px
    box-shadow: 0px 4px 20px 0px rgba(0,0,0,.05)
    padding: 20px
    position: relative
    .add-user
      width: calc(100% - 20px)
      margin-right: 20px
      background: transparent
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
// responsive
@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .con-transfer-send
    flex-direction: column
    .con-users
      flex-direction: row
      justify-content: flex-start
      padding: 0px 15px
      .user
        width: 170px
        min-width: 170px
        margin-bottom: 0px
        ~ .user
          margin-left: 10px
        &:last-child
         border-radius: 20px
    .h3
      text-align: center
      width: 100%
      font-size: 1.1rem !important
    .sec-1
      width: 100%
      margin-top: 50px
      background: -color('bg')
      padding: 10px 0px
      border-radius: 0px
      .add-user
        display: none
    .sec-2
      width: 100%
      margin-top: 30px
      margin-left: 0px
      padding-bottom: 80px

</style>
