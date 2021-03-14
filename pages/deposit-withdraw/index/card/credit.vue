<template>
  <div class="debit">
    <Select v-model="form.myCard" label="Mis tarjetas guardadas">
      <option :disabled="!form.myCard" selected value="">
        Seleccione
      </option>
      <option>
        Mastercard •••• 4551
      </option>
      <option>
        Visa •••• 9901
      </option>
    </Select>

    <Divider>
      O
    </Divider>

    <div>
      <cInput v-model="form.number" card :danger="!form.number && send && !form.myCard">
        Número de tarjeta

        <template #icon>
          <i class="bx bx-credit-card" />
        </template>
      </cInput>

      <div class="con-inputs">
        <div class="m-a">
          <cInput v-model="form.mm" not-danger-text :danger="!form.mm && send && !form.myCard" placeholder="MM" />
          <span>
            /
          </span>
          <cInput v-model="form.aa" not-danger-text :danger="!form.aa && send && !form.myCard" placeholder="AA" />
        </div>
        <div class="cvv">
          <cInput v-model="form.cvv" not-danger-text :danger="!form.cvv && send && !form.myCard" placeholder="CVC / CVV" />
        </div>
      </div>
    </div>

    <Checkbox v-model="form.save">
      Guardar tarjeta
    </Checkbox>

    <div class="con-amount">
      <cInput
        v-model="form.amount"
        :danger="form.amount === 'S/. 0.00' && send"
        type="number"
        money
      >
        Monto
      </cInput>
      <Button
        gradient
        margin-top
        block
        @click="handleSend"
      >
        Agregar Fondos
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
import Divider from '@/components/common/divider.vue'
import Select from '@/components/common/Select.vue'
import cInput from '@/components/common/input.vue'
import Checkbox from '@/components/common/checkbox.vue'
@Component({
  components: {
    Divider,
    Button,
    Select,
    cInput,
    Checkbox
  }
})
export default class credit extends Vue {
  send: boolean = false
  form: any = {
    myCard: '',
    number: '',
    mm: '',
    aa: '',
    cvv: '',
    save: false,
    amount: ''
  }

  handleSend () {
    this.send = true

    if (this.form.myCard) {
      if (this.form.amount === 'S/. 0.00') {
        return
      }
    } else if (!this.form.number && !this.form.mm && !this.form.aa && !this.form.cvv && this.form.amount === 'S/. 0.00') {
      return
    }

    this.$dialog({
      title: 'Fondos agregados exitosamente!',
      text: 'En unos minutos podrá ver reflejado los fondos en su cuenta',
      type: 'success',
      cancel: 'none'
    })
  }
}
</script>
<style lang="sass" scoped>
.con-inputs
  display: flex
  align-items: center
  justify-content: space-between
  .m-a
    max-width: 180px
    display: flex
    align-items: center
    justify-content: center
    span
      display: block
      padding: 10px 8px
      display: flex
      align-items: center
      justify-content: center
      margin-top: 10px
      color: -color('bg-4')
  .cvv
    max-width: 110px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
