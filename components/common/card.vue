<template>
  <div class="card" @click="handleClick">
    <slot />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class card extends Vue {
  @Prop({}) to!: string

  handleClick () {
    if (this.to) {
      this.$router.push(this.to)
    }
  }
}
</script>
<style lang="sass" scoped>
.card
  padding: 18px
  background: -color('bg')
  border-radius: 15px
  box-shadow: 0px 5px 25px 0px rgba(0,0,0,.04)
  box-sizing: border-box
  margin: 15px
  position: relative
  width: calc(100% - 30px)
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
