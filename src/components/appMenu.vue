<template>
  <div class="menu_layout">
    <div class="opener">
      <img src="../assets/menu/red.svg" alt="Menu" @click="showMenu('red')">
      <img src="../assets/menu/yellow.svg" alt="Menu" @click="showMenu('yellow')">
      <img src="../assets/menu/green.svg" alt="Menu" @click="showMenu('green')">
      <img src="../assets/menu/blue.svg" alt="Menu" @click="showMenu('blue')">
    </div>
    <div class="menu" :class="[{'_show': openMenu}]" :style="{'background-color': colorComputed}" @click="openMenu = !openMenu">
      <div :class="['menu_items_layout', {'__blur': powerOffDialog}]">
        <div class="closer">
          <img src="../assets/menu/close.svg" alt="Close">
        </div>
        <router-link to="/About"><h1>About</h1></router-link>
        <router-link to="/Contacts"><h1>Contacts</h1></router-link>
        <router-link to="/Projects"><h1>Projects</h1></router-link>
        <router-link to="/News"><h1>News</h1></router-link>
      </div>
    </div>
    <transition name="fade-power">
      <div v-if="openMenu" class="power_off">
        <transition name="fade-power">
          <span v-if="!powerOffDialog" @click="powerOff()">OUT</span>
          <poff v-else :color="colorComputed" @click.native="powerOff()"></poff>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import appPowerOff from './appPowerOff.vue';
const colors = {
  red: '#ea4335',
  yellow: '#fbbc05',
  blue: '#4285f4',
  green: '#34a853',
  value: 'green',
  set active (color) {
    this.value = color
  },
  get active () {
    return this.value
  }
}
export default {
  name: 'App-Menu',
  data () {
    return {
      openMenu: false,
      colors: colors,
      powerOffDialog: false
    }
  },
  created () {
  },
  methods: {
    showMenu (color) {
      window.navigator.vibrate(30)
      this.colors.active = color
      this.openMenu = !this.openMenu
    },
    powerOff () {
      window.navigator.vibrate(30)
      this.powerOffDialog = !this.powerOffDialog
    }
  },
  computed: {
    colorComputed () {
      return this.colors[this.colors.active]
    }
  },
  components: {
    'poff': appPowerOff
  }
}
</script>
<style lang="stylus" scoped>
.power_off
  position fixed
  bottom 10px
  left 10px
  font-size 15px
  color white
  cursor pointer
  &:after
    content ''
    display block
    position absolite
    bottom 0
    left 50%
    height 1px
    background white
    width 0
    transition all .3s
  &:hover
    &:after
      width 100%
      left 0

.closer
  transition transform .5s
  cursor pointer
  &:hover
    transform rotate(360deg)
    opacity .8
  img
    width 50px
.opener
  display flex
  align-items flex-start
  justify-content space-between
  width 60px
  cursor pointer
  margin-left 5px
  img
    width 10px
    transition all .3s
    &:hover
      transform scale(1.5)
.menu_layout
  position absolute
  z-index 90000
.menu
  overflow-y auto
  position fixed
  top 0
  left 0
  width 100vw
  height 100vh
  background-color red
  transition transform .5s
  transform translateX(-100%)
  will-change transform
  display flex
  flex-direction column
  align-items center
  &._show
    transform translateX(0%)
  h1
    color white
    font-size 3em
    margin 20px
    cursor pointer
    transition all .2s
    &:hover
      transform scale(1.1)
    &:active
      transform scale(1, 0)

.menu_items_layout
  transition all .3s
  will-change transform
  filter blur(0px)
  &.__blur
    filter blur(5px)
    transform scale(1.5, 1.5)

.fade-power
  will-change transform
  transition all .5s

.fade-power-enter, .fade-power-leave-to
  opacity 0
  transform scale(1.7, 1.7)
</style>
