<template>
  <div class="register-5">
    <img src="/illustration/register.png" alt="">

    <h2>
      Bienvenido a <b>Dinamic</b>
    </h2>

    <p>
      Ya estás registrado, ahora solo ingresa, activa y recarga tu billetera para realizar todos tus pagos
    </p>

    <Button margin-top gradient @click="$router.push('/login/')">
      Ingresar
    </Button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
import cInput from '@/components/common/input.vue'
import inputFile from '@/components/common/input-file.vue'
@Component({
  components: {
    Button,
    cInput,
    inputFile
  }
})
export default class register05 extends Vue {}
</script>
<style lang="sass" scoped>
.register-5
  width: 100%
  max-width: 500px
  padding: 20px 10px
  margin-top: 20px
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  p
    text-align: center
    font-size: .8rem
    max-width: 400px
    padding: 10px
  .button
    min-width: 300px
  h2
    font-weight: normal
    padding: 10px
  b
    font-weight: bold
  img
    width: 100%
    max-width: 500px
  .row
    width: 33%
    padding: 15px
</style>
