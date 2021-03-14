<template>
  <div class="content-add-card">
    <header
      :class="{ headerVisible }"
      class="header-fixed"
    >
      <h3>
        {{ getTitle }}
      </h3>

      <Steps>
        <Step :ready="readyItem('step2') || readyItem('step3')" to="./">
          01
        </Step>
        <Step :ready="readyItem('step3')" :locked="!readyItem('step2') && !readyItem('step3')" to="./step2">
          02
        </Step>
        <Step :locked="!readyItem('step3')" to="./step3">
          03
        </Step>
      </Steps>
    </header>
    <nuxt-child />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Steps from '@/components/common/steps.vue'
import Step from '@/components/common/step.vue'
@Component({
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  components: {
    Steps,
    Step
  }
})
export default class addCard extends Vue {
  headerVisible: boolean = false

  get getTitle () {
    let title = 'Selecciona el tipo de tarjeta'
    if (this.$route.name === 'my-card-add-card-step2') {
      title = 'Seleccione la cuenta'
    } else if (this.$route.name === 'my-card-add-card-step3') {
      title = 'Dirección de Envió'
    }

    return title
  }

  lockedItem (name: string) {
    return this.$route.path.includes(name)
  }

  readyItem (name: string) {
    return this.$route.path.includes(name)
  }

  mounted () {
    setTimeout(() => {
      this.headerVisible = true
    }, 200)
  }
}
</script>
<style lang="sass">
.content-add-card
  width: 100%
  display: flex
  align-items: center
  justify-content: center

.header-fixed
  position: absolute
  left: 0px
  top: 50px
  width: 100%
  padding-left: 250px
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  opacity: 0
  transition: all .2s ease
  transform: translate(0,-20px)
  &.headerVisible
    opacity: 1
    transform: translate(0,0)
// responsive
@media (max-width: 1150px)
  .header-fixed
    padding-left: 0px
@media (max-width: 812px)
  .content-add-card
    flex-direction: column
  .header-fixed
    position: relative
    top: 0px
    margin-top: 80px

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
