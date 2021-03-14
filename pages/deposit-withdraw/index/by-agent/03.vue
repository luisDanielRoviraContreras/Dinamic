<template>
  <div class="con-03">
    <h3>
      Codigo de operacion
    </h3>
    <h2>
      33A5 - GGP9 - 77XQ
    </h2>

    <div class="con-time">
      <h4>
        Código Valido por:
      </h4>
      <p>
        14m : 39s
      </p>
    </div>

    <Button margin-top block gradient @click="$router.push('/deposit-withdraw/by-agent/')">
      Regresar
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
export default class DWByAgente03 extends Vue {}
</script>
<style lang="sass" scoped>
.con-03
  padding: 15px
  padding-bottom: 0px
  h3
    font-size: .9rem
    text-align: center
    width: 100%
  h2
    text-align: center
    width: 100%
    font-size: 1.7rem
    padding: 20px
  .con-time
    text-align: center
    width: 100%
    p
      font-weight: bold
      padding: 10px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
