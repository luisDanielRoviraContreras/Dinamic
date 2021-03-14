<template>
  <div v-if="preview" ref="preview" class="preview">
    <!-- <div v-if="preview === 'foto'" class="con-preview">
      <video ref="videoFoto" id="stream"></video>
      <canvas ref="capture" id="capture"></canvas>
      <img ref="imageCapture" src="" alt="">
    </div> -->

    <div v-if="preview !== 'foto'" class="con-preview">
      <div :style="{ height: `${progress}%` }" class="upload">
        <div class="upload-percent">
          <span>
            <i class="bx bx-cloud-upload" />
          </span>
          <p>
            {{ progress }}%
          </p>
        </div>
      </div>
      <img v-if="preview.type == 'image'" class="image-file" :src="preview.blob" alt="">
      <video v-if="preview.type == 'video'" controls :src="preview.blob" />
      <audio v-if="preview.type == 'audio'" controls :src="preview.blob" />
    </div>

    <footer>
      <Button border icon @click="$emit('close')">
        <i class="bx bx-x" />
      </Button>
      <!-- <Button v-if="preview === 'foto' && !captureActive" @click="switchCamera" gradient icon>
        <svg
          version="1.1"
          id="Layer_1"
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
      </Button> -->
      <!-- <Button v-if="!captureActive && preview === 'foto'" @click="handleCaptureFoto" gradient icon>
        <i class="bx bxs-camera" />
      </Button> -->
      <!-- <Button v-if="captureActive && preview === 'foto'" @click="handleReloadCapture" gradient icon>
        <i class="bx bx-revision" />
      </Button> -->
      <Button v-if="preview !== 'foto' || (captureActive && preview === 'foto')" gradient icon @click="handleSendFile">
        <i class="bx bxs-send" />
      </Button>
    </footer>
  </div>
</template>
<script lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { Component, Vue, Prop } from 'vue-property-decorator'
import Button from '@/components/common/button.vue'
@Component({
  components: {
    Button
  }
})
export default class chatContent extends Vue {
  progress: any = 0
  @Prop({}) preview: any
  @Prop({}) myUser: any
  @Prop({}) chat: any

  handleSendFile () {
    const file = this.preview.isBlob ? this.preview.blob : this.preview.file
    const timestamp = this.$fireStoreObj.FieldValue.serverTimestamp()
    const id = uuidv4()
    const ref = this.$fireStorage.ref('images').child(id)
    const refChat = this.$fireStore.collection('chats').doc(this.chat).collection('messages')

    const refUpload = ref.put(file)

    refUpload.on('state_changed', (snapshot) => {
      this.progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed()
    })

    refUpload.then((snapshot) => {
      ref.getDownloadURL().then((url) => {
        const object: any = {
          avatar: this.myUser.avatar,
          date: (this.$parent as any).getDate(),
          name: this.myUser.name,
          text: '',
          user: this.myUser.id,
          updatedAt: timestamp,
          type: this.preview.type,
          file_url: url,
          notView: true
        }

        if ((this.$parent as any).response) {
          object.response = (this.$parent as any).response
        }

        const refChatLast = this.$fireStore.collection('chats').doc((this.$parent as any).chat)

        refChatLast.update({
          last: object
        })

        const id = uuidv4()

        refChatLast.update(
          {
            new: this.$fireStoreObj.FieldValue.arrayUnion(`${(this.$parent as any).id}_${id}`)
          }
        )

        refChat.add(object).then(() => {
          this.progress = 0
          this.$emit('close')
        })
      })
    })
  }
}
</script>
<style lang="sass" scoped>
.preview
  width: 100%
  height: 100%
  position: absolute
  z-index: 200
  top: 0px
  left: 0px
  background: -color('bg')
  display: flex
  align-items: center
  justify-content: center
  padding: 30px
  flex-direction: column
  .upload
    position: absolute
    bottom: 0px
    left: 0px
    z-index: 200
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    height: 100%
    background: -color('bg', .9)
    overflow: hidden
    transition: all .25s ease
    .upload-percent
      display: flex
      align-items: center
      justify-content: center
      i
        font-size: 9rem
        color: -color('color-2', .05)
      p
        color: -color('color-2')
        font-size: 1.6rem
        position: absolute
        display: block
        font-weight: bold
  footer
    display: flex
    align-items: center
    justify-content: center
    padding: 22px
    fill: #fff
    svg
      min-width: 20px
  img.image-file
    box-shadow: 0px 5px 20px 0px rgba(0,0,0,.1)
    max-width: 100%
    max-height: 100%
    border-radius: 20px
    display: block !important
    left: 0
    top: 0
    right: 0
    bottom: 0
    max-width: 100%
    max-height: 100%
    margin: auto
  .con-preview
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    border-radius: 20px
    overflow: hidden
    position: relative
    img:not(.image-file)
      position: relative
      display: none
      max-width: 100%
      max-height: auto
      object-fit: cover
      border-radius: 20px
    video
      width: 100%
      object-fit: cover
      height: auto
    canvas
      opacity: 0
      position: absolute
      z-index: -1
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
