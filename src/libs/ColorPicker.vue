<template>
  <div class="color_picker">
    <div class="color_opener"  @click="toggleShow()">
      <icon v-if="!activeColor" name="color" invert="0" size="normal"/>
      <span v-else
        class="color_selected"
        :class="figure"
        :style="{'background-color': activeColor}"></span>
    </div>
    <transition name="fade-scale-up">
      <div class="color_list" v-if="showList">
        <span v-for="(color, i) in colorListComputed" :key="color + i"
          @click="setColor(color)"
          :class="figure"
          :style="{'background-color': color}">
        </span>
      </div>
    </transition>
  </div>
</template>
<script>
import Icon from './Icon'
export default {
  name: 'ColorPicker',
  props: {
    colors: {
      type: Array,
      default: () => {
        return []
      }
    },
    figure: {
      type: String,
      default: 'square'
    }
  },
  data () {
    return {
      defaultColors: ['', '#ea4335', '#fbbc05', '#4285f4', '#34a853', '#00bcd4', '#9c27b0', '#795548'],
      showList: false,
      activeColor: ''
    }
  },
  components: {
    Icon
  },
  methods: {
    toggleShow () {
      this.showList = !this.showList
    },
    setColor (color) {
      this.activeColor = color
      this.toggleShow()
      this.$emit('change', color)
    }
  },
  computed: {
    //TODO добавить вырезание повторяющихся цветов
    colorListComputed () {
      return this.defaultColors.concat(this.colors)
    }
  }
}
</script>
<style lang="stylus" scoped>
.color_picker
  display flex
  position relative
  .color_opener
    align-self flex-end
    cursor pointer
  .color_selected
    display block
    cursor pointer
    width 2rem
    height 2rem
    &.square
      border-radius 0
    &.circle
      border-radius 50%
  .color_list
    position absolute
    top 100%
    right 0
    z-index 30
    padding 10px
    background white
    box-shadow 0px 0px 5px #bdbdbd
    border-radius 10px
    max-width 60vw
    min-width 300px
    max-height 50vh
    overflow-y auto
    &::-webkit-scrollbar
      width 5px
      height 5px
    &::-webkit-scrollbar-track
      background transparent
    &::-webkit-scrollbar-thumb
      background #80CBC4
      border-radius 2.5px
    span
      float left
      width 30px
      height 30px
      margin 3px
      transition opacity .3s
      cursor pointer
      border .5px solid #e0e0e0
      &.square
        border-radius 0
      &.circle
        border-radius 50%
      &:hover
        opacity .6
</style>
