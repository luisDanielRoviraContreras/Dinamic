<template>
  <div class="content-sub-page withdraw-content">
    <header>
      <nuxt-link exact to="./">
        Cajero
      </nuxt-link>
      <nuxt-link to="/deposit-withdraw/withdraw/cash">
        Avance de efectivo
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
export default class depositWithdraw extends Vue {
}
</script>
<style lang="sass" scoped>
.withdraw-content
  margin-top: 0px
  max-width: 440px
  margin-left: auto
  margin-right: auto
  .card
    margin-top: 0px
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

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
