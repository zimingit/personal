<template>
  <div class="menu_layout">
    <div class="opener">
      <div class="red" @click="showMenu('red')"></div>
      <div class="yellow" @click="showMenu('yellow')"></div>
      <div class="green" @click="showMenu('green')"></div>
      <div class="blue" @click="showMenu('blue')"></div>
    </div>
    <div class="menu" :class="[{'_show': isOpen}]" :style="{'background-color': colorComputed}" @click="closeMenu()">
      <div :class="['menu_items_layout', {'__scale': powerOffDialog}]">
        <div class="closer">
          <img src="../assets/menu/close.svg" alt="Close">
        </div>
        <router-link to="/About"><h1>About</h1></router-link>
        <router-link to="/Contacts"><h1>Contacts</h1></router-link>
        <router-link to="/Projects"><h1>Projects</h1></router-link>
        <router-link to="/News"><h1>News</h1></router-link>
      </div>
    </div>
    <div v-if="isOpen" class="power_off">
      <transition name="fade-power">
        <span v-if="!powerOffDialog" @click="powerOff()">OUT</span>
        <poff v-else :color="colorComputed" @click.native="powerOff()"></poff>
      </transition>
    </div>
  </div>
</template>

<script>
import appPowerOff from './appPowerOff.vue'
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
      isOpen: false,
      colors: colors,
      powerOffDialog: false
    }
  },
  created () {
  },
  methods: {
    closeMenu () {
      this.isOpen = false
      this.vibrate(40)
    },
    showMenu (color) {
      this.colors.active = color
      this.isOpen = true
      this.vibrate(40)
    },
    powerOff () {
      this.powerOffDialog = !this.powerOffDialog
      this.vibrate(40)
    },
    vibrate (duration) {
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(duration)
      }
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
  margin-left 5px
  cursor pointer
  .red, .yellow, .green, .blue
    cursor pointer
    width 10px
    height 40px
    background-repeat no-repeat
    background-size contain
    transition all .3s
    &:hover
      transform scale(1.2)
  .red
    background-image url('../assets/menu/red.svg')
  .yellow
    background-image url('../assets/menu/yellow.svg')
  .green
    background-image url('../assets/menu/green.svg')
  .blue
    background-image url('../assets/menu/blue.svg')
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
  transition all .2s
  will-change transform
  &.__scale
    transform scale(0, 0)

.fade-power-enter-active, .fade-power-leave-active
  transition all .2s

.fade-power-enter, .fade-power-leave-to
  opacity 0
  transform scale(1.2, 1.2)
</style>
