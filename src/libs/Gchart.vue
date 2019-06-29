<template>
  <div class="content">
    <span class="refresh" ref="refresh" @click="refreshForm()"></span>
    <div class="table">
      <div class="rows">
        <div class="column" v-for="day in cols" :key="day">
          {{day + '.06.19'}}
        </div>
      </div>
      <div class="rows" v-for="row in rows" :key="row">
        <div class="column" v-for="column in cols" :key="column + row">
          <vex v-if="row === column" :r="row" :c="column"></vex>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vex from './Vex'
export default {
  name: 'DragDrop',
  data () {
    return {
      rows: 30,
      cols: 30
    }
  },
  mounted () {
    setTimeout(() => {
      this.rotate()
    }, 500)
  },
  methods: {
    refreshForm () {
      window.navigator.vibrate(30)
      this.rows = 0
      this.rotate()
      setTimeout(() => {
        this.rows = 30
      }, 200)
    },
    rotate () {
      let el = this.$refs.refresh
      el.style.animation = 'rotation 1.5s infinite'
      setTimeout(() => {
        el.style.animation = ''
      }, 1500)
    }
  },
  components: {
    Vex
  }
}
</script>
<style lang="stylus" scoped>
.rows
  display inline-flex
  border-bottom 1px solid #e0e0e0
  overflow hidden
  &:first-child
    position sticky
    top 0
    left 0
    background-color white
    font-size 14px
    color grey
    z-index 2
  .column
    border-right 1px solid #e0e0e0
    padding 10px
    height 20px
    display flex
    justify-content center
    min-width 50px
    max-width 50px
    position relative
.refresh
  position fixed
  bottom 30px
  right 30px
  width 60px
  height 60px
  border-radius 50%
  z-index 3
  background-image url('../assets/icons/refresh.svg')
  background-size 60px
  cursor pointer
.table
  border-left 1px solid #e0e0e0
  border-top 1px solid #e0e0e0
  overflow auto
  height 100%
.content
  padding-top 50px
  height calc(100% - 50px)
  overflow auto
  display flex
  flex-direction column
  flex-basis 500px
</style>
