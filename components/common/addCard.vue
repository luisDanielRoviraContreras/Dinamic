<template>
  <button class="add-card" @click="$emit('click')">
    <i class="bx bx-plus" /> Agregar Tarjeta
  </button>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
@Component({
  components: {
    Button
  }
})
export default class addCard extends Vue {}
</script>
<style lang="sass" scoped>
// responsive
.add-card
  width: 100%
  border: 2px dashed -color('color', .05)
  background: -color('bg-3')
  padding: 10px 20px
  display: flex
  align-items: center
  justify-content: center
  border-radius: 15px
  margin-top: 15px
  transition: all .25s ease
  cursor: pointer
  color: -color('color')
  i
    margin-right: 10px
    font-size: 1.3rem
  &:hover
    background: -color('bg-4')
    border: 2px solid -color('color', .0)
@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .add-card
    width: 190px
    height: 190px
    min-width: 190px
    z-index: 200
    flex-direction: column
    margin: 10px
    margin-right: 20px
    border-radius: 20px 0px 0px 20px
</style>
