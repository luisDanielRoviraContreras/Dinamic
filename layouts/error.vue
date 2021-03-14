<template>
  <div class="error">
    <div class="con-error">
      <img src="/404.svg" alt="">

      <p>
        ¡Lo siento! La página que estás buscando no se puede encontrar
      </p>

      <footer>
        <Button
          margin-top
          border
          @click="$router.push('/')"
        >
          Volver al Inicio
        </Button>
      </footer>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
@Component({
  layout: ({ isMobile }: {isMobile: any}) => isMobile ? 'clean' : 'clean',
  components: {
    Button
  }
})
export default class dosFa extends Vue {}
</script>
<style lang="sass" scoped>
.error
  width: 100%
  height: 100vh
  background: -color('bg')
  padding: 30px
  display: flex
  align-items: center
  justify-content: center
  .con-error
    width: 100%
    max-width: 400px
    position: relative
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    p
      font-size: .8rem
      padding-top: 10px
      font-weight: bold
      color: #8f999e
      text-align: center
    img
      width: 100%
      max-height: 50vh
</style>
