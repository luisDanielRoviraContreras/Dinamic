<template>
  <div class="step-3">
    <Card>
      <Checkbox v-model="form.virtual">
        Esta tarjeta es Virtual
      </Checkbox>
      <Checkbox v-model="form.myDirection">
        Usar mi dirección de usuario
      </Checkbox>
      <Divider>
        O
      </Divider>
      <Select
        v-model="form.country"
        :danger="!form.country && send"
        label="País"
      >
        <option value="1">
          Peru
        </option>
      </Select>
      <Select
        v-model="form.city"
        :danger="!form.city && send"
        label="Ciudad"
      >
        <option value="1">
          Lima
        </option>
      </Select>
      <Select
        v-model="form.state"
        :danger="!form.state && send"
        label="Estado"
      >
        <option value="1">
          La Victoria
        </option>
      </Select>
      <Textarea
        v-model="form.direction"
        :danger="!form.direction && send"
      >
        Dirección
      </Textarea>
      <Checkbox
        v-model="form.terms"
        :danger="!form.terms && send"
      >
        Acepto los términos <br>
        y condiciones de servicio
      </Checkbox>
      <Button
        gradient
        block
        class="next"
        @click="handleSend"
      >
        Enviar Tarjeta Dinamic
      </Button>
    </Card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Card from '@/components/common/card.vue'
import Select from '@/components/common/Select.vue'
import Button from '@/components/common/button.vue'
import Checkbox from '@/components/common/checkbox.vue'
import Divider from '@/components/common/divider.vue'
import Textarea from '@/components/common/textarea.vue'
@Component({
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  components: {
    Card,
    Select,
    Button,
    Checkbox,
    Divider,
    Textarea
  }
})
export default class addCardStep3 extends Vue {
  send: boolean = false

  form: any = {
    virtual: false,
    myDirection: false,
    country: '',
    city: '',
    state: '',
    direction: '',
    terms: false
  }

  handleSend () {
    this.send = true
    if (this.form.virtual || this.form.myDirection) {
      this.$router.push('/my-card/activate/')
    } else if (!this.form.country && !this.form.city && !this.form.state && !this.form.direction) {
      return
    }

    this.$router.push('/my-card/activate/')
    this.send = false
  }
}
</script>
<style lang="sass" scoped>
.step-3
  width: 100%
  max-width: 400px
  .card
    width: 100%
    margin-top: 40px
.next
  margin-bottom: -30px !important
.data-card
  margin-top: 20px
  margin-bottom: 20px
// responsive
@media (max-width: 812px)
  .step-3
    .card
      margin: 0px
      padding-bottom: 130px
      margin-top: 30px
// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
