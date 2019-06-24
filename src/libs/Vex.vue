<template>
  <span :style="{transform: `scale(${factor[r - 1]}, 1`}"></span>
</template>
<script>
const factorMartix = [4, 3, 4, 3, 6, 2, 8, 3, 4, 6, 2, 1, 5, 4, 1, 3, 2, 2, 4, 1, 3, 4, 3, 4, 1, 2, 1, 2, 1, .5]
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
      factor: []
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
