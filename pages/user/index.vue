<template>
  <div class="content-sub-page">
    <div class="sec-1">
      <header>
        <h3>
          Datos de la cuenta
        </h3>

        <Button :border="!edit" icon @click="edit = !edit">
          <i class="bx bx-pencil" />
        </Button>
      </header>
      <div class="row-1 row">
        <c-input
          v-model="form.name"
          :danger="!form.name && send && edit"
          :disabled="!edit"
        >
          Nombres
        </c-input>
        <cInput
          v-model="form.nationality"
          :danger="!form.nationality && send && edit"
          :disabled="!edit"
        >
          Nacionalidad
        </cInput>
        <input-cell
          v-model="form.number"
          :danger="!form.number && send && edit"
          :disabled="!edit"
        >
          Teléfono
        </input-cell>
        <input-date
          v-model="form.date"
          :danger="!form.date && send && edit"
          :disabled="!edit"
        >
          Fecha de nacimiento
        </input-date>
      </div>
      <div class="row-2 row">
        <c-input
          v-model="form.lastName"
          :danger="!form.lastName && send && edit"
          :disabled="!edit"
        >
          Apellidos
        </c-input>
        <cInput
          v-model="form.country"
          :danger="!form.country && send && edit"
          :disabled="!edit"
        >
          País
        </cInput>
        <cInput
          v-model="form.email"
          :danger="!form.email && send && edit"
          :disabled="!edit"
        >
          Correo electrónico
        </cInput>
        <Textarea
          v-model="form.direction"
          :danger="!form.direction && send && edit"
          :disabled="!edit"
        >
          Dirección
        </Textarea>
      </div>

      <footer v-if="edit">
        <Button margin-top block @click="handleCancel">
          Cancelar
        </Button>
        <Button margin-top gradient block @click="handleSend">
          Guardar
        </Button>
      </footer>
    </div>

    <div class="sec-2">
      <header>
        <Button icon class="btn" :border="!editImage" @click="editImage = !editImage">
          <i v-if="!editImage" class="bx bx-image-add" />
          <i v-else class="bx bx-x" />
        </Button>
        <Avatar v-if="!editImage" size="80px" src="/avatars/avatar-4.png" @click="editImage = !editImage" />

        <input-file v-else />
        <p>
          Melissa Bustamante
        </p>
      </header>

      <div class="con-qr">
        <img src="/qr.png" alt="">
        <p>
          Mi codigo QR
        </p>
      </div>
    </div>

    <p class="version">
      v1.0.1
    </p>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import cInput from '@/components/common/input.vue'
import Button from '@/components/common/button.vue'
import Avatar from '@/components/common/avatar.vue'
import Textarea from '@/components/common/textarea.vue'
import inputDate from '@/components/common/input-date.vue'
import inputCell from '@/components/common/input-cell.vue'
import inputFile from '@/components/common/input-file.vue'
@Component({
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  components: {
    cInput,
    Button,
    Avatar,
    Textarea,
    inputDate,
    inputCell,
    inputFile
  }
})
export default class userData extends Vue {
  editImage: boolean = false
  send: boolean = false
  edit: boolean = false

  form: any = {
    name: 'Melissa',
    lastName: 'Bustamante',
    date: '08-12-1995',
    country: 'Peru',
    nationality: 'Peru',
    number: '+51 12345678',
    direction: 'C. Comercial Lorem ipsum dolor, 95B 8ºD',
    email: 'bustamante@gmail.com'
  }

  handleSend () {
    this.send = true
    if (
      this.form.name === '' ||
      this.form.lastName === '' ||
      this.form.date === '' ||
      this.form.country === '' ||
      this.form.nationality === '' ||
      this.form.number === '' ||
      this.form.direction === '' ||
      this.form.email === ''
    ) {
      return
    }

    this.$notification({
      title: 'Datos Guardados',
      text: 'Los datos se guardaron con éxito',
      color: 'success'
    })
    this.send = false
    this.edit = false
  }

  handleCancel () {
    this.edit = false
    this.send = false

    this.form = {
      name: 'Melissa',
      lastName: 'Bustamante',
      date: '08-12-1995',
      country: 'Peru',
      nationality: 'Peru',
      number: '+51 12345678',
      direction: 'C. Comercial Lorem ipsum dolor, 95B 8ºD',
      email: 'bustamante@gmail.com'
    }
  }
}
</script>
<style lang="sass" scoped>
.version
  position: absolute
  right: 0px
  bottom: 0px
  font-weight: bold
  font-size: .8rem
  padding: 20px
  letter-spacing: 1px
.content-sub-page
  width: 100%
  height: auto
  border-radius: 20px
  max-width: 1000px
  display: flex
  align-items: flex-start
  justify-content: center
  .sec-1
    background: -color('bg')
    padding: 20px
    display: flex
    align-items: flex-start
    justify-content: center
    width: calc(100% - 300px)
    border-radius: 20px
    flex-wrap: wrap
    footer
      width: 100%
      display: flex
      align-items: center
      justify-content: center
      max-width: 400px
      button
        margin: 0px 10px
    header
      width: 100%
      display: flex
      align-items: center
      justify-content: space-between
  .row
    width: 50%
    padding: 10px
  .sec-2
    background: -color('bg')
    padding: 20px
    width: 280px
    border-radius: 20px
    margin-left: 20px
    padding-top: 0px
    header
      margin-top: -20px
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column
      font-size: .9rem
      position: relative
      /deep/.con-file
        margin-top: 40px
      .btn
        position: absolute
        right: 0px
        top: 0px
      p
        padding-top: 10px
        font-weight: bold
    .con-qr
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column
      padding-top: 20px
      img
        max-width: 180px
      p
        font-size: .9rem
        font-weight: bold
// responsive

@media (max-width: 850px)
  .content-sub-page
    .sec-1
      .row
        width: 100%
@media (max-width: 700px)
  .content-sub-page
    flex-direction: column
    .sec-1
      width: 100%
      padding-bottom: 80px
    .sec-2
      width: 100%
      order: -1
      margin-bottom: 20px
      margin-left: 0px
      margin-top: 50px
</style>
