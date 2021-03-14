<template>
  <div class="con-02">
    <h3>
      Monto de deposito
    </h3>
    <h2>
      S/. 1413,40
    </h2>

    <div class="con-info">
      <div class="info-1 info">
        <p>
          Comisión:
        </p>

        S/. 8.00
      </div>
      <div class="info-2 info">
        <p>
          Total:
        </p>

        S/. 392.00
      </div>
    </div>
    <Button gradient margin-top block @click="$router.push('./03')">
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
export default class DWByAgente02 extends Vue {}
</script>
<style lang="sass" scoped>
.con-02
  padding: 15px
  padding-bottom: 0px
  h3
    font-size: .9rem
    text-align: center
    width: 100%
  h2
    text-align: center
    width: 100%
    font-size: 2rem
.con-info
  display: flex
  align-items: center
  justify-content: space-between
  padding: 10px 0px
.info
  display: flex
  align-items: center
  justify-content: center
  font-weight: bold
  font-size: .9rem
  p
    opacity: .4
    padding-right: 7px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
