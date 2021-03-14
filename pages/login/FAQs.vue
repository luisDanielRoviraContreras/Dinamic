<template>
  <div class="faq">
    <Button
      :class="{ active: back }"
      class="back"
      border
      icon
      @click="handleBack"
    >
      <i class="bx bx-left-arrow-alt" />
    </Button>
    <h3>
      ¿Cual es la edad minima para registrarme?
    </h3>
    <p class="p">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquet sem quis ipsum viverra euismod. In mattis quam ipsum, vitae ultricies justo pharetra eu.
    </p>
    <h3>
      ¿Cuanto tardan en enviar mi tarjeta?
    </h3>
    <p class="p">
      consectetur adipiscing elit. Etiam maximus faucibus maximus. In euismod magna et orci lobortis, et iaculis urna lacinia. Nullam nunc diam, congue et commodo eu, facilisis quis sem. Aenean a cursus arcu. Curabitur vel sagittis leo. Fusce molestie mauris lobortis, elementum metus sit amet, pretium enim. Ut sit amet nibh commodo, dignissim felis non, pretium eros. Vivamus ut leo nec elit vestibulum mollis.
    </p>
    <h3>
      ¿Puedo tener una cuenta internacional?
    </h3>
    <p class="p">
      lobortis nisl in velit feugiat fermentum. Nulla id efficitur erat, ut sollicitudin lectus. Proin finibus gravida leo, nec congue arcu ultrices vitae.
    </p>
    <h3>
      ¿Mis datos estan seguros?
    </h3>
    <p class="p">
      Aenean vel lectus non dolor tempor cursus nec sed erat. Phasellus ut odio semper, ultricies urna in, consectetur nunc. Nunc metus ante, imperdiet in dolor ac, pharetra commodo turpis. Proin ultrices urna at tellus pharetra, vitae lobortis enim blandit. Fusce mi ligula, sodales nec sodales porttitor, fringilla at risus. Curabitur at arcu eget magna dignissim dignissim. Ut elementum orci risus, non rhoncus nibh malesuada sit amet. Pellentesque scelerisque nulla urna, at faucibus sem pellentesque id. Sed justo lectus, mattis in lacus eget, condimentum mattis lacus. Morbi tristique purus in diam posuere pellentesque. Integer blandit varius tellus facilisis commodo. Aliquam ac dui tincidunt, ultricies turpis sit amet, venenatis purus. Maecenas pharetra tempor tempor. Vestibulum convallis tellus vitae luctus vulputate. In condimentum erat sit amet justo iaculis varius ut vitae odio.
    </p>
    <h3>
      ¿Necesito una cuenta de banco para poder tener una en dinamic?
    </h3>
    <p class="p">
      Integer blandit varius tellus facilisis commodo. Aliquam ac dui tincidunt, ultricies turpis sit amet, venenatis purus. Maecenas pharetra tempor tempor. Vestibulum convallis tellus vitae luctus vulputate. In condimentum erat sit amet justo iaculis varius ut vitae odio.
    </p>
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
export default class faq extends Vue {
  back: boolean = false
  mounted () {
    setTimeout(() => {
      this.back = true
    }, 300)
  }

  handleBack () {
    this.back = false
    setTimeout(() => {
      this.$router.push('/login/')
    }, 200)
  }
}
</script>
<style lang="sass">
.faq
  padding: 20px 40px
  width: 100%
  max-height: calc(100vh - 80px)
  overflow: auto
  margin-top: 80px
  .back
    position: absolute
    top: 0px
    left: 0px
    margin: 25px
    opacity: 0
    transition: all .25s ease
    &.active
      opacity: 1
  h3
    padding: 15px 0px
    margin-top: 10px
  p
    font-size: .8rem
// responsive

@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .faq
    margin-top: 40px
    padding-top: 10px
    overflow: hidden
    max-height: none
    padding: 10px 20px
    h3
      font-size: 1rem
</style>
