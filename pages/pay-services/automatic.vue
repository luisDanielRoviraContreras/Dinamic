<template>
  <div class="content-sub-page">
    <h3>
      Pagar Servicio
    </h3>
    <div class="con-cards">
      <Card>
        Spotify
      </Card>
      <Card>
        Netflix
      </Card>
      <Card>
        Movistar
      </Card>
      <Card>
        Disney +
      </Card>
      <Card>
        XboX Game Pass
      </Card>

      <button class="add-pay" @click="$router.push('/pay-services/?automatic=true')">
        <i class="bx bx-plus" />
        Agregar
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Card from '@/components/common/card.vue'
@Component({
  layout: ({ isMobile }: {isMobile: any}) => isMobile ? 'mobile' : 'default',
  components: {
    Card
  }
})
export default class payServicesAutomatic extends Vue {}
</script>
<style lang="sass" scoped>
.content-sub-page
  h3
    padding-left: 20px
    font-size: .9rem
.con-cards
  display: flex
  align-items: flex-start
  width: 100%
  flex-wrap: wrap
  justify-content: flex-start
  max-width: 1200px
  .add-pay
    width: 200px
    height: 200px
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    margin: 15px
    border: 2px dashed -color('color', .05)
    border-radius: 20px
    background: transparent
    background: -color('bg-3')
    transition: all .25s ease
    cursor: pointer
    color: -color('color')
    &:hover
      background: -color('bg-4')

    i
      font-size: 2rem
  .card
    width: 200px
    height: 200px
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    cursor: pointer
// responsive
@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .content-sub-page
    text-align: center
    padding-top: 25px
    .con-cards
      .card
        width: calc(50% - 20px)
        height: auto
        min-height: 100px
        margin: 10px
      .add-pay
        width: 100%
        height: auto
        padding: 10px

</style>
