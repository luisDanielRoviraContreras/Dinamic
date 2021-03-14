<template>
  <div class="deposit-card">
    <header>
      <nuxt-link exact to="./">
        Débito
      </nuxt-link>
      <nuxt-link to="./credit">
        Crédito
      </nuxt-link>
    </header>

    <Card>
      <nuxt-child />
    </Card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Card from '@/components/common/card.vue'
@Component({
  components: {
    Card
  }
})
export default class DWCard extends Vue {}
</script>
<style lang="sass" scoped>
.deposit-card
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  margin-top: 20px
  .card
    margin-top: 0px
    max-width: 440px
  header
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    a
      display: block
      padding: 10px 15px
      color: -color('color')
      font-weight: bold
      font-size: .9rem
      position: relative
      opacity: .6
      transition: all .25s ease
      &:hover
        opacity: 1
      &:before
        content: ''
        left: 50%
        transform: translate(-50%)
        bottom: 0px
        width: 0px
        height: 3px
        background: -color('color')
        position: absolute
        transition: all .25s ease
        border-radius: 5px
      &.nuxt-link-active
        opacity: 1
        &:before
          width: 18px
// responsive

@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .deposit-card
    padding-bottom: 80px
</style>
