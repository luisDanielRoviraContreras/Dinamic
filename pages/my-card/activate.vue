<template>
  <div class="con-activate">
    <div class="content-activate">
      <h3>
        Tu tarjeta de <b>Dinamic</b> se esta Enviando...
      </h3>
      <Data-card visible transparent class="data-card" src="/cards/01.svg" />
      <p class="p">
        Normalmente el envió toma de 4 a 7 dias hábiles
      </p>
      <footer>
        <Button class="btn-activate" white block>
          Regresar
        </Button>
        <Button class="btn-activate" white block>
          Activar Tarjeta
        </Button>
      </footer>
    </div>
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
export default class addCardActive extends Vue {}
</script>
<style lang="sass" scoped>
.con-activate
  .content-activate
    width: 100%
    max-width: 440px
    color: -color('bg')
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    footer
      display: flex
      align-items: center
      justify-content: center
      width: 100%
    h3
      text-align: center
      margin-bottom: 25px
      max-width: 300px
    .p
      padding: 20px
      text-align: center
      font-size: .9rem
      margin-top: 20px
      max-width: 340px
    .btn-activate
      margin-top: 20px
      margin-left: 5px
      margin-right: 5px
// responsive

@media (max-width: 920px)
  .con-activate
    margin-top: 90px
    margin-bottom: 80px
// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
