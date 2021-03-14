<template>
  <div class="register">
    <header>
      <div class="con-back-logo">
        <Button icon transparent @click="$router.push('/login/')">
          <i class="bx bx-left-arrow-alt" />
        </Button>

        <div class="con-logo" @click="$router.push('/login/')">
          <c-logo mini />
        </div>
      </div>

      <h1>
        Registrarse
      </h1>

      <div class="con-steps">
        <Steps responsive>
          <Step :ready="stepNumber > 1" to="./">
            01
          </Step>
          <Step :ready="stepNumber > 2" :locked="!readyItem('step2') && !readyItem('step3') && !readyItem('step4') && !readyItem('step5')" to="./step2">
            02
          </Step>
          <Step :ready="stepNumber > 3" :locked="!readyItem('step3') && !readyItem('step4') && !readyItem('step5')" to="./step3">
            03
          </Step>
          <Step :ready="stepNumber > 4" :locked="!readyItem('step4') && !readyItem('step5')" to="./step4">
            04
          </Step>
          <!-- <Step :locked="!readyItem('step5')" to="./step5">
            05
          </Step> -->
        </Steps>
      </div>
    </header>

    <div class="con-register">
      <nuxt-child />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
import Steps from '@/components/common/steps.vue'
import Step from '@/components/common/step.vue'
import cLogo from '@/components/common/cLogo.vue'
@Component({
  layout: 'clean',
  components: {
    Button,
    Steps,
    Step,
    cLogo
  }
})
export default class register extends Vue {
  stepNumber: number = 0

  @Watch('$route.path')
  handleStep () {
    const route = this.$route.name
    let n: any = 0
    if (route!.split('-')[1]) {
      n = route!.split('-')[1].split('step')[1]
    }
    this.stepNumber = n || 0
  }

  mounted () {
    this.handleStep()
  }

  lockedItem (name: string) {
    return this.$route.path.includes(name)
  }

  readyItem (name: string) {
    return this.$route.path.includes(name)
  }
}
</script>
<style lang="sass" scoped>
.register
  width: 100%
  min-height: 100vh
  background: -color('bg')
  overflow: auto
  height: auto
  overflow-x: hidden
  .con-logo
    padding-right: 10px
    height: 37px
    display: flex
    align-items: center
    justify-content: center
    img
      width: 70px
  header
    .con-back-logo
      display: flex
      align-items: center
      justify-content: space-between
      padding: 15px
      i
        font-size: 1.6rem !important
    h1
      width: 100%
      text-align: center
      font-size: 1.2rem
      padding: 15px
  .con-register
    display: flex
    align-items: center
    justify-content: center
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
