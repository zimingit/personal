<template>
  <div id="app">
    <app-menu/>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>
<script>
import AppMenu from '@/components/appMenu'
export default {
  data () {
    return {
    }
  },
  created () {
    // let issues = this.$qs.getIssues()
    // console.log(issues)
  },
  methods: {
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
#app
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  width inherit
  height inherit
.fade-enter-active, .fade-leave-active
  transition-property opacity
  transition-duration .25s
.fade-enter-active
  transition-delay .25s
.fade-enter, .fade-leave-active
  opacity 0
</style>
