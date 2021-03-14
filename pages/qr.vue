<template>
  <div class="qr">
    <Card>
      <header>
        <div class="con-logo" @click="$router.push('/')">
          <c-logo/>
        </div>
      </header>
      <h1>
        Código QR
      </h1>

      <Divider />

      <div class="con-svg-text">
        <p>
          Escanee este código QR para enviar pagos al toque a esta billetera
        </p>

        <img src="/qr.png" alt="">
      </div>
    </Card>
  </div>
</template>
<script lang="ts">
import { Action } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
import Card from '@/components/common/card.vue'
import Divider from '@/components/common/divider.vue'
import InputCode from '@/components/common/input-code.vue'
import cLogo from '@/components/common/cLogo.vue'
import * as actions from '~/constants/actions'
@Component({
  head: {
    title: 'iu - Código QR',
    meta: [
      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { property: 'og:image', content: 'https://iupayme.herokuapp.com/qr.png' },
      { property: 'og:title', content: 'iu - Mi código QR' },
      { property: 'og:url', content: 'https://iupayme.herokuapp.com' },
      { name: 'twitter:card', content: 'summary_large_image' }
    ]
  },
  components: {
    Button,
    Card,
    Divider,
    InputCode,
    cLogo
  },
  layout: ({ isMobile }: {isMobile: any}) => isMobile ? 'clean' : 'clean'
})
export default class qr extends Vue {
  form: any = {
    code: ''
  }

  @Action(actions.AUTHENTICATED) authenticated!: Function

  handleEnter () {
    this.handleVerify()
  }

  change (val: string) {
    this.form.code = val
  }

  handleVerify () {
    this.$cookies.set('authenticated', true)

    this.authenticated(true)

    this.$router.push('/')
  }
}
</script>
<style lang="sass" scoped>
.qr
  width: 100%
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
  background: -color('bg-2')
  header
    margin-top: -65px
    margin-bottom: 15px
  .con-logo
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    padding: 20px
    cursor: pointer
    img
      width: 140px
  .con-svg-text
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    img
      max-width: 400px
      width: 100%
      border-radius: 30px
    p
      font-size: .8rem
      padding: 10px 15px
      padding-bottom: 0px
  .card
    max-width: 400px
    text-align: center
    padding: 0px
    h1
      font-size: 1.2rem
    h2
      font-size: 1rem
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
