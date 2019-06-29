<template>
  <div class="layout">
      <div class="border">
        <h3>ACTION COULD NOT<br> BE COMPLETED</h3>
        <div>
          <h2>ZIMIN IS <span :style="{'background': color}">ALWAYS</span></h2>
          <h1>IN</h1>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'appPowerOff',
  props: ['color'],
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  },
  computed: {
  }
}
</script>
<style lang="stylus" scoped>
.layout
  position fixed
  top 0
  left 0
  width 100vw
  height 100vh
  background #ffffffb8
  color black
  .border
    border 15px solid white
    margin 50px
    height calc(100% - 130px)
    display flex
    flex-direction column
    justify-content space-around
  h1
    font-weight bold
    font-size 280px
    line-height 0.75
  h2
    font-size 30px
    span
      padding 0px 10px
      color white
  h3
    font-size 30px
    margin 30px
@media (orientation: portrait)
  h1
    font-size 200px !important
  h2, h3
    font-size 20px !important
</style>
