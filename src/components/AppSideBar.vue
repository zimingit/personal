<template>
  <transition name="side-bounce" mode="out-in">
    <div v-if="show" class="sidebar_layout" :style="{'background': background}">
      <slot name="content"/>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'AppSideBar',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    background: {
      type: String,
      default: 'white'
    }
  },
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
  },
  computed: {
  }
}
</script>
<style lang="stylus" scoped>
.sidebar_layout
  display block
  width 100%
  height 100%
  position absolute
  z-index 2
  right 0
  top 0
.side-bounce-enter-active, .side-bounce-leave-active
  transition-property opacity, transform
  transition-duration .3s
.side-bounce-enter, .side-bounce-leave-active
  opacity 0
  transform translateX(100%)
</style>
