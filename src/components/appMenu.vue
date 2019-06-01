<template>
  <div class="menu_layout">
    <div class="opener">
      <img src="../assets/menu/red.svg" alt="Menu" @click="showMenu('red')">
      <img src="../assets/menu/yellow.svg" alt="Menu" @click="showMenu('yellow')">
      <img src="../assets/menu/green.svg" alt="Menu" @click="showMenu('green')">
      <img src="../assets/menu/blue.svg" alt="Menu" @click="showMenu('blue')">
    </div>
    <div class="menu" :class="{'_show': openMenu}" :style="{'background-color': colorComputed}" @click="openMenu = !openMenu">
      <div class="closer">
        <img src="../assets/menu/close.svg" alt="Close">
      </div>
      <router-link to="/Home"><h1>About</h1></router-link>
      <router-link to="/Contacts"><h1>Contacts</h1></router-link>
      <router-link to="/Projects"><h1>Projects</h1></router-link>
      <router-link to="/News"><h1>News</h1></router-link>
    </div>
  </div>
</template>

<script>
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
      colors: colors
    }
  },
  created () {
  },
  methods: {
    showMenu (color) {
      this.colors.active = color
      this.openMenu = !this.openMenu
    }
  },
  computed: {
    colorComputed () {
      return this.colors[this.colors.active]
    }
  }
}
</script>
<style lang="stylus" scoped>
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
</style>
