<template>
  <div id="app">
    <app-menu/>
    <transition name="fade" mode="out-in" @enter="showPreload()">
      <router-view/>
    </transition>
    <div v-if="switcher.show" class="preload">
      <!-- <h1>keep calm and waiting</h1> -->
      <h1>В ж у х</h1>
    </div>
  </div>
</template>
<script>
import AppMenu from '@/components/appMenu'
export default {
  data () {
    return {
      switcher: {
        show: false,
        toggle () {
          this.show = !this.show
          setTimeout(() => { this.show = !this.show }, 150)
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
body, html
  font-family 'Avenir', Helvetica, Arial, sans-serif
  margin 0
  padding 0
  height 100%
  width 100%
  overflow hidden
h1, h2, h3, h4
  margin 0
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
.fade-enter-active, .fade-leave-active
  transition-property opacity
  transition-duration .4s
.fade-enter-active
  transition-delay .25s
.fade-enter, .fade-leave-active
  opacity 0
</style>
