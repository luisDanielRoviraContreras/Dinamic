<template>
  <div
    :class="{ responsive }"
    class="steps"
  >
    <div class="con-btns">
      <slot />
      {{ locked }}
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class Steps extends Vue {
  @Prop({}) locked!: any
  @Prop({ type: Boolean }) responsive!: boolean
}
</script>
<style lang="sass" scoped>
.steps
  position: relative
  display: flex
  align-items: center
  justify-content: center
  padding: 10px
  .con-btns
    display: flex
    align-items: center
    justify-content: center
  .arrow
    width: 50px
    height: 50px
    border: 0px
    background: transparent
// responsive

@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .responsive
    .step
      margin: 0px 5px
      padding: 8px 13px
      ~ .step
        &:after
          left: -14px
</style>
