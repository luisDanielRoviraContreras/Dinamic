<template>
  <div class="table not-scroll-mobile">
    <table>
      <thead>
        <tr>
          <slot name="thead" />
        </tr>
      </thead>
      <tbody>
        <slot name="tbody" />
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Table extends Vue {}
</script>
<style lang="sass" scoped>
.table
  width: 100%
  position: relative
  max-height: 300px
  overflow: auto
  padding-top: 10px
  table
    width: 100%
    thead
      th
        font-size: .8rem
    tr
      td
        padding: 10px
        text-align: center
        font-size: .7rem
        &.green
          color: -color('green', 1)
          font-weight: bold
        i
          font-size: 1rem
          width: 30px
          height: 30px
          background: -color('green', .1)
          border-radius: 10px
          display: flex
          align-items: center
          justify-content: center
          color: -color('green', 1)
          margin: auto
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
