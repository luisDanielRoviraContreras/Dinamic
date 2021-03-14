<template>
  <div class="step-2">
    <Card>
      <Select
        v-model="form.account"
        label="Seleccione la cuenta de la nueva tarjeta"
        :danger="!form.account && send"
      >
        <option value="1">
          Mi Cuenta
        </option>
        <option value="2">
          Sub cuenta 1
        </option>
        <option value="3">
          Sub cuenta 2
        </option>
      </Select>
      <Data-card visible class="data-card" src="/cards/01.svg" @click="$router.push('/my-card/add-card/')" />
      <Button class="next" gradient block @click="handleSend">
        Siguiente
      </Button>
    </Card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Card from '@/components/common/card.vue'
import Select from '@/components/common/Select.vue'
import DataCard from '@/components/common/dataCard.vue'
import Button from '@/components/common/button.vue'
@Component({
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  components: {
    Card,
    DataCard,
    Select,
    Button
  }
})
export default class addCardStep2 extends Vue {
  send: boolean = false

  form: any = {
    account: ''
  }

  handleSend () {
    this.send = true
    if (!this.form.account) {
      return
    }

    this.send = false
    this.$router.push('./step3')
  }
}
</script>
<style lang="sass" scoped>
.step-2
  width: 100%
  max-width: 360px
  .card
    width: 100%
.next
  margin-bottom: -30px !important
.data-card
  margin: auto
  margin-top: 20px
  margin-bottom: 20px

// responsive
@media (max-width: 812px)
  .step-2
    max-width: 100%
    .card
      margin: 0px
      margin-top: 30px
      margin-bottom: 80px
// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
