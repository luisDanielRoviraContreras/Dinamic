<template>
  <div class="terms">
    <Button
      :class="{ active:back }"
      class="back"
      icon
      border
      @click="handleBack"
    >
      <i class="bx bx-left-arrow-alt" />
    </Button>
    <h3>
      Términos y condiciones
    </h3>
    <p class="p">
      Última actualización: el 3 de septiembre de 2029

      Al crear una cuenta de dinamic (tal y como se define en la Cláusula 1) o al usar cualquiera de los Servicios de dinamic (tal y como se definen a continuación), Usted acepta los siguientes términos y condiciones (en lo sucesivo los "Términos del servicio"). <br><br>

      Tal y como se utiliza en los presentes Términos del servicio, "nosotros" y "dinamic" se refieren a la Parte Contratante de dinamic correspondiente (según se define en la Cláusula 4 a continuación).<br><br>

      Los servicios que ofrece dinamic en virtud de los Términos del servicio incluyen varios productos y servicios para ayudarle a vender bienes y servicios a los compradores, ya sea online (en lo sucesivo "Servicios online"), en persona (en lo sucesivo "Servicios de PDV"), o ambos. Todos los servicios que ofrece dinamic se denominan en estos Términos de Servicios como los "Servicios". Cualquier función o herramienta nueva que se agregue a los Servicios actuales también estará sujeta a los Términos del servicio. Puede revisar la versión actual de los Términos del servicio en cualquier momento en. <br><br>
    </p>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
@Component({
  components: {
    Button
  }
})
export default class terms extends Vue {
  back: boolean = false
  mounted () {
    setTimeout(() => {
      this.back = true
    }, 300)
  }

  handleBack () {
    this.back = false
    setTimeout(() => {
      this.$router.push('/login/')
    }, 200)
  }
}
</script>
<style lang="sass">
.terms
  padding: 20px 30px
  max-width: 550px
  width: 100%
  padding-bottom: 0px
  .back
    position: absolute
    top: 0px
    left: 0px
    margin: 25px
    opacity: 0
    transition: all .25s ease
    &.active
      opacity: 1
  h3
    padding: 20px 0px
  p
    font-size: .7rem
    text-align: justify
// responsive

@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .terms
    margin-top: 40px
</style>
