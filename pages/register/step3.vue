<template>
  <div class="register-3">
    <div v-if="subStep == 0" class="get-number">
      <Input-cell
        v-model="form.phone"
        autofocus
        type="number"
      >
        Validemos tu número celular
      </Input-cell>
      <Button
        :disabled="form.phone.length < 3"
        block
        margin-top
        gradient
        @click="subStep = 1"
      >
        Enviar SMS
      </Button>
    </div>

    <div v-if="subStep == 1" class="get-code">
      <input-code
        center
        @enter="handleEnter"
        @change="change"
      >
        Ingrese el código de verificación
      </input-code>
      <div class="btn-reload">
        <Button :disabled="form.code.length < 6" block margin-top gradient @click="handleVerify">
          Verificar
        </Button>
        <Button class="btn-reload" margin-top gray icon @click="subStep = 0, form.phone = ''">
          <i class="bx bx-sync" />
        </Button>
      </div>
      <p>
        No llega el mensaje <span @click="handleResend">Reenviar</span>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
import cInput from '@/components/common/input.vue'
import InputCell from '@/components/common/input-cell.vue'
import InputCode from '@/components/common/input-code.vue'
@Component({
  components: {
    Button,
    cInput,
    InputCell,
    InputCode
  }
})
export default class register03 extends Vue {
  subStep: number = 0
  form: any = {
    phone: '',
    code: ''
  }

  handleEnter () {
    this.handleVerify()
  }

  handleResend () {
    this.$notification({
      title: 'Mensaje Reenviado',
      text: `Se ha reenviado el mensaje al número: ${this.form.phone}`,
      color: 'success'
    })
  }

  change (val: string) {
    this.form.code = val
  }

  handleVerify () {
    this.$router.push('./step4/')
  }
}
</script>
<style lang="sass" scoped>
.register-3
  width: 100%
  max-width: 360px
  padding: 20px 10px
  margin-top: 20px
  .btn-reload
    display: flex
    align-items: center
    justify-content: center
    .btn-reload
      min-width: 46px
      min-height: 46px
      i
        font-size: 1.4rem
  .con-input-code
    display: flex
    align-items: flex-end
    justify-content: center
    button
      max-width: 42px !important
      max-height: 42px !important
      width: 42px !important
      height: 42px !important
  p
    width: 100%
    text-align: center
    padding: 20px 10px
    display: block
    font-size: .8rem
    span
      font-weight: bold
      text-decoration: underline
      color: -color('color')
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
