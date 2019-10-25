<template>
  <div class="color_picker">
    <div class="color_opener"  @click="toggleShow()">
      <icon v-if="!activeColor" name="color" invert="0" size="normal"/>
      <span v-else-if="figure !== 'hexagon'"
        class="color_selected"
        :class="figure"
        :style="{'background-color': activeColor}"></span>
      <NotesyLogo v-else-if="figure === 'hexagon'"
        :backgroundColor="activeColor"
        size="baby"
        :class="figure">
      </NotesyLogo>
    </div>
    <transition name="fade-scale-up">
      <div class="color_list" v-if="showList && figure !== 'hexagon'">
        <span v-for="(color, i) in colorListComputed" :key="color + i"
          @click="setColor(color)"
          :class="figure"
          :style="{'background-color': color}">
        </span>
      </div>
      <!-- Если требуются шестиугольники -->
      <div class="color_list" v-else-if="showList && figure === 'hexagon'">
        <NotesyLogo v-for="(color, i) in colorListComputed" :key="color + i"
          @click.native="setColor(color)"
          :backgroundColor="color || '#f4f4f4'"
          size="baby"
          :class="figure">
        </NotesyLogo>
      </div>
    </transition>
  </div>
</template>
<script>
import Icon from './Icon'
import NotesyLogo from './notesy/NotesyLogo'
export default {
  name: 'ColorPicker',
  props: {
    colors: {
      type: Array,
      default: () => {
        return []
      }
    },
    // Текущий выбранный цвет
    color: {
      type: String,
      default: ''
    },
    // hexagon, square, circle
    figure: {
      type: String,
      default: 'square'
    }
  },
  data () {
    return {
      defaultColors: ['', '#ea4335', '#fbbc05', '#4285f4', '#34a853', '#00bcd4', '#9c27b0', '#795548'],
      showList: false,
      activeColor: this.color
    }
  },
  components: {
    Icon,
    NotesyLogo
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
    colorListComputed () {
      return this.defaultColors.concat(this.colors.filter(color => this.defaultColors.indexOf(color) < 0))
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
    @media (orientation: portrait)
      cursor default
  .color_selected
    display block
    cursor pointer
    width 2rem
    height 2rem
    &.square
      border-radius 0
    &.circle
      border-radius 50%
    @media (orientation: portrait)
      cursor default
  .color_list
    position absolute
    top 115%
    right -50%
    z-index 30
    padding 10px
    background white
    box-shadow 0px 0px 5px #bdbdbd
    border-radius 10px
    width 40px
    max-height 90vh
    overflow-y auto
    &::-webkit-scrollbar
      width 5px
      height 5px
    &::-webkit-scrollbar-track
      background transparent
    &::-webkit-scrollbar-thumb
      background #80CBC4
      border-radius 2.5px
    .hexagon
      transition opacity .3s
      cursor pointer
      float left
      margin 4px
      @media (orientation: portrait)
        cursor default
    span
      float left
      width 30px
      height 30px
      margin 4px
      transition opacity .3s
      cursor pointer
      border .5px solid #e0e0e0
      &.square
        border-radius 0
      &.circle
        border-radius 50%
      &:hover
        opacity .6
      @media (orientation: portrait)
        cursor default
</style>
