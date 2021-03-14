<template>
  <div :class="{ mini }" class="c-logo">
    <template v-if="!mini">
      <img class="not-darken" src="/logo.png" alt="">
      <img class="if-darken" src="/logo-b.png" alt="">
    </template>
    <template v-else>
      <img class="not-darken" src="/logo2.png" alt="">
      <img class="if-darken" src="/logo2-b.png" alt="">
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class cLogo extends Vue {
  @Prop({ type: Boolean }) mini: boolean
}
</script>
<style lang="sass">
.c-logo
  width: 150px
  &.mini
    width: 20px
  img
    width: 100%
</style>
