<template>
  <div class="content-page contacts">
    <Popup v-model="addUser">
      <h2 class="h2">
        Agregar Usuario
      </h2>

      <cInput gray bold not-margin placeholder="Buscar Usuario" />
      <div class="con-users all">
        <div class="sec all">
          <div
            v-for="(user, index) in 2"
            :key="index"
            class="user"
          >
            <div class="avatar-p">
              <Avatar :src="`avatars/avatar-${user}.png`" />
              <p>
                <b>
                  Jessica Flores
                </b>
                <span>
                  S/. 11200,00
                </span>
              </p>
            </div>

            <div class="interactions">
              <Button icon transparent>
                <i class="bx bxs-star yellow" />
              </Button>
              <Button icon transparent>
                <i class="bx bx-dots-horizontal-rounded" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Popup>
    <div class="con">
      <header class="header">
        <h2>
          Contactos Favoritos
        </h2>

        <div class="con-input-btn">
          <cInput gray bold not-margin placeholder="Buscar" />
          <Button class="btn-add" gradient @click="addUser = true">
            Agregar <i class="bx bx-plus" />
          </Button>
          <Button white icon>
            <i class="bx bx-slider-alt" />
          </Button>
        </div>
      </header>

      <div class="con-users">
        <div class="sec-1 sec">
          <div
            v-for="(user, index) in 7"
            :key="index"
            class="user"
          >
            <div class="avatar-p">
              <Avatar :src="`avatars/avatar-${user}.png`" />
              <p>
                <b>
                  Jessica Flores
                </b>
                <span>
                  S/. 11200,00
                </span>
              </p>
            </div>

            <div class="interactions">
              <Button icon transparent>
                <i class="bx bxs-star yellow" />
              </Button>
              <Button icon transparent>
                <i class="bx bx-dots-horizontal-rounded" />
              </Button>
            </div>
          </div>
        </div>
        <div class="sec-2 sec">
          <div
            v-for="(user, index) in 3"
            :key="index"
            class="user"
          >
            <div class="avatar-p">
              <Avatar :src="`avatars/avatar-${7 + user}.png`" />
              <p>
                <b>
                  Jessica Flores
                </b>
                <span>
                  S/. 11200,00
                </span>
              </p>
            </div>

            <div class="interactions">
              <Button icon transparent>
                <i class="bx bx-star" />
              </Button>
              <Button icon transparent>
                <i class="bx bx-dots-horizontal-rounded" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import cInput from '@/components/common/input.vue'
import Button from '@/components/common/button.vue'
import Avatar from '@/components/common/avatar.vue'
import Popup from '@/components/common/popup.vue'
@Component({
  middleware: 'authenticated',
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
  components: {
    cInput,
    Button,
    Avatar,
    Popup
  }
})
export default class contacts extends Vue {
  addUser: boolean = false
}
</script>
<style lang="sass" scoped>
.h2
  padding: 20px
  padding-top: 0px
.con
  width: 100%
  max-width: 800px
  .header
    display: flex
    align-items: center
    justify-content: space-between
    padding: 10px
    h2
      font-size: 1.1rem
    .con-input-btn
      display: flex
      align-items: center
      justify-content: flex-end
      .btn-add
        padding: 0px 30px
      .button
        display: flex
        align-items: center
        justify-content: center
.con-users
  background: -color('bg')
  padding: 20px
  border-radius: 20px
  display: flex
  align-items: flex-start
  justify-content: center
  &.all
    padding: 10px 0px
  .sec
    width: 50%
    &.all
      width: 100%
    &.sec-1
      padding-right: 10px
      border-right: 2px solid -color('color', .05)
    &.sec-2
      padding-left: 15px
    .user
      display: flex
      align-items: center
      justify-content: space-between
      width: 100%
      padding: 10px
      cursor: pointer
      transition: all .25s ease
      border-radius: 15px
      .yellow
        color: #fcce45
      &:hover
        background: -color('bg-2')
      .avatar-p
        display: flex
        align-items: center
        justify-content: center
        p
          display: flex
          align-items: flex-start
          justify-content: center
          flex-direction: column
          padding-left: 12px
          font-size: .8rem
          b
            font-weight: bold
          span
            opacity: .6
      .interactions
        display: flex
        align-items: center
        justify-content: center

// responsive
.content-mobile
  .contacts
    padding-top: 60px
@media (max-width: 812px), (pointer:none), (pointer:coarse)
  .con
    .header
      h2
        display: none
      .con-input-btn
        width: 100%
      .con-input
        width: 100%
@media (max-width: 600px)
  .con
    .con-users
      display: block
      .sec
        width: 100%
        &.sec-1
          border-right: 0px
          padding-right: 0px
        &.sec-2
          padding-left: 0px
          padding-bottom: 70px
</style>
