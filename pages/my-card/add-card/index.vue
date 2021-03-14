<template>
  <div class="step-1">
    <div class="con-cards">
      <div class="card-child" @click="selectedCard">
        <header>
          <h3>
            dinamic Go
          </h3>
          <div class="des">
            <span>
              1% Comisión (1 por usuario)
            </span>

            <b>
              01/12
            </b>
          </div>
        </header>

        <Data-card visible src="/cards/01.svg" />
      </div>
      <div class="card-child" @click="selectedCard">
        <header>
          <h3>
            dinamic Next
          </h3>
          <div class="des">
            <span>
              2% Comisión (1 por usuario)
            </span>

            <b>
              01/33
            </b>
          </div>
        </header>

        <Data-card visible src="/cards/02.svg" />
      </div>
      <div class="card-child" @click="selectedCard">
        <header>
          <h3>
            dinamic Pro
          </h3>
          <div class="des">
            <span>
              3% Comisión (Sin limite)
            </span>

            <b>
              01/99
            </b>
          </div>
        </header>

        <Data-card visible src="/cards/03.svg" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DataCard from '@/components/common/dataCard.vue'
@Component({
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  components: {
    DataCard
  }
})
export default class addCardStep1 extends Vue {
  selectedCard () {
    this.$router.push('./step2')
  }
}
</script>
<style lang="sass" scoped>
.con-cards
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  flex-wrap: wrap
  .card-child
    padding: 15px
    margin: 5px 15px
    border-radius: 20px
    transition: all .25s ease
    cursor: pointer
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,.05)
    header
      padding: 10px
      padding-bottom: 15px
      .des
        display: flex
        align-items: center
        justify-content: space-between
        width: 100%
        font-size: .8rem
        padding-top: 3px
        span
          opacity: .7
        b
          font-weight: bold
    &:hover
      background: -color('bg')
      box-shadow: 0px 5px 20px 0px rgba(0,0,0,.05)
      transform: translate(0,-6px)
// responsive

@media (max-width: 812px)
  .con-cards
    flex-direction: column
    padding-bottom: 80px
// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
