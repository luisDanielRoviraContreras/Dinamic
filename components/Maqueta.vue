<template>
  <div class="chat">
    hello world
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
@Component({
  components: {
    Button
  }
})
export default class chat extends Vue {}
</script>
<style lang="sass" scoped>
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
