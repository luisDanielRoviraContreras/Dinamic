<template>
  <div v-if="activeQR" class="qr">
    <header>
      <Button icon @click="closeQr">
        <i class="bx bxs-chevron-left" />
      </Button>

      <p>
        Escanear código <b>QR</b>
      </p>
    </header>
    <!-- <p class="error">{{ error }}</p> -->

    <!-- <p class="decode-result">Code: <b>{{ result }}</b></p> -->

    <div v-if="loading" class="loading">
      <div class="load" />
    </div>

    <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit" />

    <footer>
      <Button icon gradient @click="switchCamera">
        <svg
          id="Layer_1"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          style="enable-background:new 0 0 512 512;"
          xml:space="preserve"
        >
          <g>
            <g>
              <g>
                <path
                  d="M448,283.913V106.667C448,83.136,428.865,64,405.333,64h-44.5c-2.802,0-5.552-1.135-7.542-3.125l-30.167-30.167
                c-6.042-6.042-14.083-9.375-22.625-9.375h-89c-8.542,0-16.583,3.333-22.625,9.375l-30.167,30.167
                c-1.99,1.99-4.74,3.125-7.542,3.125h-44.5C83.135,64,64,83.136,64,106.667v177.271c-52.268,21.991-64,47.516-64,65.448
                c0,49.456,86.173,87.819,205.922,94.824l-13.138,13.139c-4.171,4.168-4.171,10.928,0,15.096l15.092,15.095
                c4.171,4.168,10.928,4.168,15.099,0l48.329-48.331c8.337-8.339,8.337-21.854,0-30.191l-43.598-43.598
                c-4.171-4.169-10.928-4.169-15.098,0l-15.094,15.094c-4.171,4.169-4.171,10.928,0,15.098l5.66,5.66
                c-106.594-7.333-159.148-40.878-160.474-51.814c0.281-2.297,6.702-12.151,31.395-23.557c7.832,9.35,19.444,15.432,32.57,15.432
                h298.667c13.13,0,24.745-6.085,32.577-15.44c24.573,11.337,31.145,21.363,31.409,23.221
                c-1.522,8.069-39.167,39.939-141.677,50.552l-10.618,1.1c-5.865,0.607-10.125,5.853-9.518,11.719l2.201,21.234
                c0.607,5.865,5.853,10.125,11.717,9.518l10.619-1.1C439.681,430.994,512,393.724,512,349.386
                C512,331.409,500.296,305.818,448,283.913z M256,277.333c-47.052,0-85.333-38.281-85.333-85.333
                c0-47.052,38.281-85.333,85.333-85.333s85.333,38.281,85.333,85.333C341.333,239.052,303.052,277.333,256,277.333z M384,149.333
                c-11.76,0-21.333-9.573-21.333-21.333c0-11.76,9.573-21.333,21.333-21.333c11.76,0,21.333,9.573,21.333,21.333
                C405.333,139.761,395.76,149.333,384,149.333z"
                />
                <circle cx="256" cy="192" r="64" />
              </g>
            </g>
          </g>
        </svg>
      </Button>
    </footer>
  </div>
</template>
<script lang="ts">
import { Action, State } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
import * as actions from '~/constants/actions'
@Component({
  components: {
    Button
  }
})
export default class qr extends Vue {
  result: string = ''
  error: string = ''
  camera: string = 'rear'
  noRearCamera: boolean = false
  noFrontCamera: boolean = false
  loading: boolean = false

  @State(state => state.qr) activeQR!: boolean

  @Action(actions.QR) toggleQr!: Function

  closeQr () {
    this.toggleQr()
  }

  switchCamera () {
    switch (this.camera) {
      case 'front':
        this.camera = 'rear'
        break
      case 'rear':
        this.camera = 'front'
        break
    }
  }

  onDecode (result: any) {
    if (!result) {
      return
    }
    this.result = result
    this.$notification({
      title: 'Código QR Escaneado',
      text: 'Los campos para efectuar la transferencia se llenaron automáticamente con el QR escaneado',
      color: 'success'
    })
    setTimeout(() => {
      this.$router.push('/transfer')
      this.$emit('code')
    }, 300)
  }

  async onInit (promise: any) {
    this.loading = true
    try {
      await promise
    } catch (error) {
      const triedFrontCamera = this.camera === 'front'
      const triedRearCamera = this.camera === 'rear'

      const cameraMissingError = error.name === 'OverconstrainedError'

      if (triedRearCamera && cameraMissingError) {
        this.noRearCamera = true
      }

      if (triedFrontCamera && cameraMissingError) {
        this.noFrontCamera = true
      }
    } finally {
      this.loading = false
    }
  }
}
</script>
<style lang="sass" scoped>
// responsive
.loading
  position: absolute
  width: 100vw
  display: flex
  align-items: center
  justify-content: center
  height: 100vh
.load
  display: block
  width: 40px
  height: 40px
  position: relative
  &:after
    content: ''
    position: absolute
    width: 100%
    height: 100%
    border-radius: 50%
    border: 3px solid -color('color', 1)
    border-top: 3px solid -color('bg', 0)
    border-left: 3px solid -color('bg', 0)
    border-bottom: 3px solid -color('bg', 0)
    box-sizing: border-box
    transition: all .25s ease
    display: block
    box-shadow: 0px 0px 0px 0px -color('color',1)
    animation: loading .6s ease infinite
  &:before
    content: ''
    position: absolute
    width: 100%
    height: 100%
    border-radius: 50%
    border: 3px dashed -color('color',1)
    border-top: 3px solid -color('bg', 0)
    border-left: 3px solid -color('bg', 0)
    border-bottom: 3px solid -color('bg', 0)
    box-sizing: border-box
    transition: all .25s ease
    display: block
    box-shadow: 0px 0px 0px 0px -color('color',1)
    animation: loading .6s linear infinite
.qr
  position: fixed
  top: 0px
  height: 100vh
  width: 100%
  z-index: 10001
  background: -color('bg')
  header
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    z-index: 100
    display: flex
    align-items: center
    justify-content: space-between
    background: -color('color')
    color: -color('bg')
    border-radius: 0px 0px 0px 25px
    button
      min-width: 50px !important
      max-width: 50px !important
      max-height: 50px !important
      min-height: 50px !important
    p
      padding: 20px
      b
        font-weight: bold
  footer
    width: 100%
    padding: 15px
    position: fixed
    bottom: 0px
    display: flex
    align-items: center
    justify-content: center
    padding-bottom: 50px
    button
      min-width: 50px !important
      max-width: 50px !important
      max-height: 50px !important
      min-height: 50px !important
    svg
      min-width: 24px
      fill: #fff
  .decode-result
    position: absolute
    bottom: 0px
    padding: 20px
    background: -color('bg')
    width: 100%
    z-index: 100
    border-radius: 20px 20px 0px 0px
    b
      font-size: .8rem
// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
