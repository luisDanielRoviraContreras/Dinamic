<template>
  <div class="content-sub-page">
    <h3>
      Agregar Usuario
    </h3>
    <cInput
      v-model="form.name"
      :danger="!form.name && send"
    >
      Nombres
    </cInput>
    <cInput
      v-model="form.lastName"
      :danger="!form.lastName && send"
    >
      Apellidos
    </cInput>
    <inputDocument
      v-model="form.document"
      :danger="form.document.length < 4 && send"
    >
      Documento de Identidad
    </inputDocument>
    <inputDate
      v-model="form.date"
      :danger="!form.date && send"
    >
      Fecha de nacimiento
    </inputDate>
    <Button gradient margin-top block @click="handleSend">
      Crear Usuario
    </Button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import cInput from '@/components/common/input.vue'
import inputDocument from '@/components/common/input-document.vue'
import inputDate from '@/components/common/input-date.vue'
import Button from '@/components/common/button.vue'
@Component({
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  components: {
    cInput,
    Button,
    inputDocument,
    inputDate
  }
})
export default class subAccountsIndex extends Vue {
  send: boolean = false
  form: any = {
    name: '',
    lastName: '',
    document: '',
    date: ''
  }

  handleSend () {
    this.send = true
    if (!this.form.name || !this.form.lastName || !this.form.document) {
      return
    }

    this.$notification({
      title: 'Recarga Exitosa!',
      text: 'Recarga efectuada con éxito'
    })

    this.form.number = ''
    this.form.description = ''
    this.form.amount = ''
    this.send = false
  }
}
</script>
<style lang="sass" scoped>
.content-sub-page
  width: 100%
  height: auto
  background: -color('bg')
  padding: 20px
  border-radius: 20px
  h3
    text-align: center
    width: 100%
    font-size: 1rem
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
