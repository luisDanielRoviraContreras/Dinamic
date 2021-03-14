<template>
  <div class="cash">
    <Steps responsive>
      <Step :ready="stepNumber > 1" @click="stepNumber = 1">
        01
      </Step>
      <Step :ready="stepNumber > 2" :locked="stepNumber == 1" @click="stepNumber = 2">
        02
      </Step>
    </Steps>

    <div v-if="stepNumber == 1">
      <c-input
        v-model="form.amount"
        :danger="form.amount === 'S/. 0.00' && send"
        type="number"
        money
      >
        Monto
      </c-input>

      <Button gradient margin-top block @click="handleSend">
        Generar Código
      </Button>
    </div>

    <div v-else class="con-code">
      <c-input value="5AS - RE9 - 0K1" readonly label-center copy center>
        Código de retiro
      </c-input>

      <p class="p">
        Usa este código para efectuar la operación en el cash o agente
      </p>

      <Button margin-top block gradient @click="stepNumber = 1">
        Regresar
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
import cInput from '@/components/common/input.vue'
import Steps from '@/components/common/steps.vue'
import Step from '@/components/common/step.vue'
@Component({
  components: {
    Button,
    Steps,
    Step,
    cInput
  }
})
export default class cash extends Vue {
  stepNumber: number = 1
  send: boolean = false
  form: any = {
    amount: ''
  }

  handleSend () {
    this.send = true
    if (this.form.amount === 'S/. 0.00') {
      return
    }

    this.stepNumber = 2
    this.send = false
  }

  lockedItem (name: string) {
    return this.$route.path.includes(name)
  }

  readyItem (name: string) {
    return this.$route.path.includes(name)
  }
}
</script>
<style lang="sass" scoped>
.cash
  .con-code
    p
      font-size: .7rem
      font-weight: bold
      text-align: center
      width: 100%
      padding: 10px 15px
      max-width: 300px
      margin-left: auto
      margin-right: auto
      margin-top: 10px
    /deep/input
      font-size: 1.3rem
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
