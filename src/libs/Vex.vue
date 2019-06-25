<template>
  <span :style="[{'transform': `scale(${factor[r - 1]}, 1`}, {'background-color': color[Math.trunc(r / 4)]}]"></span>
</template>
<script>
const factorMartix = [4, 3, 4, 3, 6, 2, 8, 3, 4, 6, 2, 1, 5, 4, 1, 3, 2, 2, 4, 1, 3, 4, 7, 4, 5, 3, 2, 2, 1, 0.5]
const colorMartix = ['#4285f4', '#34a853', '#fbbc05', '#ea4335', '#00bcd4', '#9c27b0', '#795548']

export default {
  name: 'DragDrop',
  props: {
    c: {
      type: Number
    },
    r: {
      type: Number
    }
  },
  data () {
    return {
      factor: [],
      color: colorMartix
    }
  },
  mounted () {
    setTimeout(() => {
      this.factor = factorMartix
    }, 100)
  }
}
</script>
<style lang="stylus" scoped>
span
  position absolute
  height 20px
  left 5px
  width 50px
  background-color #34a853
  z-index 1
  transition all 1s
  transform-origin left
</style>
