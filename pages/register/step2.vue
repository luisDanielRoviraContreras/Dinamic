<template>
  <div class="register-02">
    <div class="con-date">
      <InputDate
        v-model="form.date"
        :danger="form.date.split('-').includes('') && send"
        label-center
      >
        Ingrese su fecha de nacimiento
      </InputDate>
    </div>

    <h3>
      Términos y condiciones
    </h3>

    <p class="terms-02">
      Última actualización: el 3 de septiembre de 2029

      Al crear una cuenta de Dinamic (tal y como se define en la Cláusula 1) o al usar cualquiera de los Servicios de Dinamic (tal y como se definen a continuación), Usted acepta los siguientes términos y condiciones (en lo sucesivo los "Términos del servicio"). <br><br>

      Tal y como se utiliza en los presentes Términos del servicio, "nosotros" y "Dinamic" se refieren a la Parte Contratante de Dinamic correspondiente (según se define en la Cláusula 4 a continuación).<br><br>

      Los servicios que ofrece Dinamic en virtud de los Términos del servicio incluyen varios productos y servicios para ayudarle a vender bienes y servicios a los compradores, ya sea online (en lo sucesivo "Servicios online"), en persona (en lo sucesivo "Servicios de PDV"), o ambos. Todos los servicios que ofrece Dinamic se denominan en estos Términos de Servicios como los "Servicios". Cualquier función o herramienta nueva que se agregue a los Servicios actuales también estará sujeta a los Términos del servicio. Puede revisar la versión actual de los Términos del servicio en cualquier momento en. <br><br>
    </p>

    <footer>
      <Checkbox
        v-model="terms"
        :danger="!terms && send"
      >
        Acepto los términos <br> y condiciones del servicio
      </Checkbox>

      <Button gradient @click="handleSend">
        Aceptar
      </Button>
    </footer>
    <!-- <nuxt-link to="./step2">Siguiente</nuxt-link> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
import Checkbox from '@/components/common/checkbox.vue'
import InputDate from '@/components/common/input-date.vue'
@Component({
  components: {
    Button,
    Checkbox,
    InputDate
  }
})
export default class register02 extends Vue {
  send: boolean = false
  terms: boolean = false
  form: any = {
    date: ''
  }

  handleSend () {
    this.send = true
    const date = this.form.date.split('-')
    if (date.includes('')) {
      return
    }
    this.$router.push('./step3')
  }
}
</script>
<style lang="sass" scoped>
.register-02
  width: 100%
  max-width: 500px
  padding: 20px
  .con-date
    padding: 20px 0px
    margin-bottom: 20px
  h3
    padding-bottom: 15px
    font-size: 1rem
  p
    padding-top: 0px
  .terms-02
    font-size: .8rem
  footer
    display: flex
    align-items: center
    justify-content: space-between
// responsive

@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .register-02
    padding-bottom: 80px
    footer
      position: fixed
      bottom: 0px
      background: -color('bg')
      width: 100%
      left: 0px
      padding: 0px 10px
      padding-bottom: env(safe-area-inset-bottom)
      border-radius: 15px 15px 0px 0px
      box-shadow: 0px -5px 20px 0px rgba(0,0,0,.1)
      /deep/.checkbox
        p
          font-size: .75rem !important
          br
            display: none
</style>
