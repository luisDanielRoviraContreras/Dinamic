<template>
  <div class="con-agent">
    <header>
      <Steps>
        <Step :ready="readyItem('02') || readyItem('03')" to="./">
          01
        </Step>
        <Step :ready="readyItem('03')" :locked="!readyItem('02') && !readyItem('03')" to="./02">
          02
        </Step>
        <Step :locked="!readyItem('03')" to="./03">
          03
        </Step>
      </Steps>
    </header>

    <div class="con-agent-child">
      <nuxt-child />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Steps from '@/components/common/steps.vue'
import Step from '@/components/common/step.vue'
@Component({
  components: {
    Steps,
    Step
  }
})
export default class DWByAgente extends Vue {
  lockedItem (name: string) {
    return this.$route.path.includes(name)
  }

  readyItem (name: string) {
    return this.$route.path.includes(name)
  }
}
</script>
<style lang="sass" scoped>
.con-agent
  padding-top: 40px
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  .con-agent-child
    width: 100%
    max-width: 400px
    background: -color('bg')
    padding: 20px
    border-radius: 20px
    margin-top: 30px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
