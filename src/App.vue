<template>
  <div id="app">
    <app-menu/>
    <transition name="fade" mode="out-in" @enter="showPreload()">
      <router-view/>
    </transition>
    <div v-if="switcher.show" class="preload">
      <!-- <h1>keep calm and waiting</h1> -->
      <h1>{{preloader.text}}</h1>
    </div>
  </div>
</template>
<script>
import AppMenu from '@/components/appMenu'
const preloadersList = ['В ж у х', 'Т р у н ь', 'П и у', 'Т ы щ', 'Б а м', 'К ч а у', 'П а у', 'Ч п о н ь к', 'О п - л я', 'К у с ь']
export default {
  data () {
    return {
      switcher: {
        show: false,
        toggle () {
          this.show = !this.show
          setTimeout(() => { this.show = !this.show }, 250)
        }
      },
      preloader: {
        items: preloadersList,
        get text () {
          return this.items[Math.floor(Math.random() * this.items.length)]
        }
      }
    }
  },
  created () {
  },
  methods: {
    showPreload () {
      this.switcher.toggle()
    }
  },
  components: {
    AppMenu
  }
}
</script>
<style lang="stylus">
@require './assets/fonts/fontsBase'
*
  scroll-behavior smooth
body, html
  // font-family 'Avenir', Helvetica, Arial, sans-serif
  font-family 'Montserrat', sans-serif
  margin 0
  padding 0
  height 100%
  width 100%
  overflow hidden
h1, h2, h3, h4
  margin 0
h1, h2, h3, h4, p, a, span
  font-weight 300
a
  text-decoration none
  color inherit
.preload
  position absolute
  top 0
  left 0
  display flex
  height 100%
  width 100%
  h1
    margin auto
    font-weight 100
    font-size 50px
#app
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  width inherit
  height inherit
  overflow-y auto
.fade-enter-active, .fade-leave-active
  transition-property opacity
  transition-duration .4s
.fade-enter-active
  transition-delay .25s
.fade-enter, .fade-leave-active
  opacity 0

// fade с уменьшением
.fade-scale-down-enter-active, .fade-scale-down-leave-active
  transition-property opacity, transform
  transition-duration .4s
.fade-scale-down-enter, .fade-scale-down-leave-active
  opacity 0
  position absolute
  transform scale(1.3)

// fade с увеличением
.fade-scale-up-enter-active, .fade-scale-up-leave-active
  transition-property opacity, transform
  transition-duration .4s
.fade-scale-up-enter, .fade-scale-up-leave-active
  opacity 0
  transform scale(.8)

// работа со списками
.item-list-move
  transition transform .5s
.item-list-enter-active, .item-list-leave-active
  transition-property opacity, transform, filter
  transition-duration .4s
.item-list-enter, .item-list-leave-active
  opacity 0
  filter blur(3px)
  transform scale(.8) 
@keyframes rotation {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// Глушим outline в редакторе
.ProseMirror
  &:focus
    outline none
</style>
