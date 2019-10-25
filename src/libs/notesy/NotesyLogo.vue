<template>
<div class="notesy_logo" :class="[size, action]">
    <span class="logo v_line" :class="size" :style="linesStyleComputed"></span>
    <span class="logo h_line" :class="size" :style="linesStyleComputed"></span>
    <span class="logo d_line" :class="size" :style="linesStyleComputed"></span>
    <div class="label" :class="size">
      <slot name="icon"></slot>
      <p :class="size" :style="labelStyleComputed" v-show="label">{{label}}</p>
    </div>
</div>
</template>
<script>

export default {
  name: 'NotesyLogo',
  props: {
    // baby, small, medium, large, extra-large
    size: {
      type: String,
      default: 'small'
    },
    label: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: 'white'
    },
    labelColor: {
      type: String,
      default: 'black'
    },
    animation: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: 'active'
    }
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    linesStyleComputed () {
      return [ { 'background': this.backgroundColor } ]
    },
    labelStyleComputed () {
      return [ { 'color': this.labelColor } ]
    }
  }
}
</script>
<style lang="stylus" scoped>
.notesy_logo
  display flex
  justify-content center
  align-items center
  position relative
  border-radius 50%
  &.active
    cursor pointer
  &.passive
    cursor default
    pointer-events none
  &.baby
    width 31px
    height 31px
  &.small
    width 50px
    height 56px
  &.medium
    width 100px
    height 113px
  &.large
    width 150px
    height 170px
  &.extra-large
    width 200px
    height 225px

.label
  z-index 1
  pointer-events none
  display flex
  align-items center
  justify-content center
  p
    font-weight bold
  &::selection
    background transparent
  &.baby
    font-size 0
  &.small
    font-size 13px
  &.medium
    font-size 25px
  &.large
    font-size 40px
  &.extra-large
    font-size 50px

.logo
  width 65px
  height 100px
  background red
  display block
  position absolute
  border-radius 10px
  pointer-events none
  &.v_line
    transform rotate(-30deg)
  &.d_line
    transform rotate(30deg)
  &.h_line
    transform rotate(90deg)

// Модификаторы размера
.logo
  &.baby
    width 20px
    height 30px
    border-radius 5px
  &.small
    width 33px
    height 50px
    border-radius 6px
  &.medium
    width 65px
    height 100px
    border-radius 10px
  &.large
    width 99px
    height 150px
    border-radius 15px
  &.extra-large
    width 130px
    height 200px
    border-radius 20px
</style>
