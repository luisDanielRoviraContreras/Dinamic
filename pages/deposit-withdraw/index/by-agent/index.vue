<template>
  <div class="con-01">
    <cInput
      v-model="form.amount"
      :danger="form.amount === 'S/. 0.00' && send"
      money
    >
      Cantidad a cargar
    </cInput>
    <Button gradient margin-top block @click="handleSend">
      Siguiente
    </Button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import cInput from '@/components/common/input.vue'
import Button from '@/components/common/button.vue'
@Component({
  components: {
    cInput,
    Button
  }
})
export default class DWByAgente01 extends Vue {
  send: boolean = false
  form: any = {
    amount: ''
  }

  handleSend () {
    this.send = true
    if (this.form.amount === 'S/. 0.00') {
      return
    }

    this.$router.push('./02')
  }
}
</script>
<style lang="sass" scoped>
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
