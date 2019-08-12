<template>
  <div class="projects_layout">
    <div  v-for="(project, i) in projects" :key="project.name" class="project_item"
    :style="getBackground(i, project)">
      <span class="pseudo top"></span>
      <span class="pseudo bot"></span>
      <div class="avatar_wrapper">
        <div class="symbol"
            :style="[{'color': project.personalColor || colors[i]},
                     {'box-shadow': `inset 3px 3px ${volume}px 15px ${project.personalColor || colors[i]}`}]">
          <p>{{project.name[0].toUpperCase()}}</p>
          <span>{{project.name[1].toLowerCase()}}</span>
        </div>
        <div class="circle pulse" v-for="ind in 4" :key="ind" :style="[{'animation-delay': `${ind - 1}s`}, {'background': project.personalColor || colors[i]}]"></div>
        <div class="circle"></div>
      </div>
      <h1>{{project.name}}</h1>
      <p class="description">{{project.description}}</p>
      <router-link :to="project.link">
        <span class="button_show" :style="{'background': project.personalColor || colors[i]}">Хочу посмотреть</span>
      </router-link>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
const projectsConstList = [
  {
    name: 'Draggable',
    description: 'Плагин для работы с перетаскиваемыми элементами.',
    link: '/Projects/Draggable',
    showDescription: false
  },
  {
    name: 'Observer',
    description: 'Плагин для отслеживания изменения размеров блока (Chrome).',
    link: '/Projects/Observer',
    showDescription: false
  },
  {
    name: 'Tooltip',
    description: 'Компонент для вывода подсказок.',
    link: '/Projects/Tooltip',
    showDescription: false
  },
  {
    name: 'Chart',
    description: 'Простая отрисовка диаграммы Гантта.',
    link: '/Projects/Gchart',
    showDescription: false
  },
  {
    name: 'Notesy',
    description: 'Простой блокнот для заметок.',
    link: '/Projects/Notesy',
    showDescription: false,
    personalColor: '#80CBC4'
  }
]
const colors = ['#ea4335', '#fbbc05', '#4285f4', '#34a853', '#00bcd4', '#9c27b0', '#795548']
export default {
  name: 'Projects',
  props: {
  },
  data () {
    return {
      projects: _.shuffle(projectsConstList),
      colors: _.shuffle(colors),
      recorder: '',
      volume: 50
    }
  },
  methods: {
    getBackground (i, project) {
      let c = project.personalColor || this.colors[i]
      return `background: linear-gradient(220deg, ${c + '0b'} 0%, ${c + '0b'} 50%, ${c + '05'} 50%, ${c + '05'} 100%)`
    }
  },
  components: {
  }
}
</script>
<style lang="stylus" scoped>
$borderColor = #616161
.projects_layout
  padding-top 50px
  max-height calc(100% - 50px)
  height calc(100% - 50px)
  overflow-y auto
  display flex
  flex-wrap wrap
  flex-grow 1
  justify-content space-evenly
  .project_item
    padding 20px
    margin 1%
    margin 20px
    flex-basis 350px
    flex-grow 1
    box-shadow 0px 0px 9px #0000001a
    border-radius 5px
    position relative
    display flex
    flex-direction column
    justify-content space-evenly
    align-items center
    will-change transform
    transition all .2s
    &:hover
      // transform scale(.02, .02)
      margin 10px
      .pulse
        animation pulse 4s infinite cubic-bezier(.36, .11, .89, .32)
      .circle
        opacity .8
    .avatar_wrapper
      position relative
      width 100px
      height 100px
    .symbol
      width 100px
      height 100px
      position absolute
      border-radius 50%
      font-size 100px
      overflow visible
      display flex
      z-index 100
      justify-content center
      align-items center
      box-shadow inset 3px 3px 10px 0px #34a853
      p
        padding 0
        margin 0
        font-weight bold
        flex-basis 0
        margin-left -50%
        margin-top -40%
        text-shadow 7px 12px 15px #1e1e1e
      span
        margin-bottom -40%
        margin-right -50%
        text-shadow 7px 12px 15px #1e1e1e
    h1
      font-size 45px
      padding 20px
    .description
      font-size 18px
    a
      margin 20px
    .button_show
      color white
      font-weight 800
      box-shadow 0px 2px 0px #cdcaca
      padding 10px 15px
      border-radius 3px
      cursor pointer
      transition all .3s
      position relative
      &:after
        content ''
        display block
        position absolute
        pointer-events none
        top 0
        transform translateX(-100%)
        width 100%
        height 100%
        transition transform .3s
      &:hover
        &:after
          background linear-gradient(220deg, transparent 0%, transparent 50%, #ffffff15 50%, #ffffff15 100%)
          transform translateX(0)
      &:active
        &:after
          background linear-gradient(220deg, transparent 0%, transparent 50%, #ffffff15 50%, #ffffff15 100%)
          transform translateX(100%)
        opacity .8
.circle
  position absolute
  top 0
  width 100%
  height 100%
  border-radius 50%
  background white
  opacity 0

.pseudo
  position absolute
  display block
  width 100%
  left 0
  &.top
    top 0
    &:after
      content ''
      display block
      position absolute
      top 10px
      left 10px
      width 10px
      height 10px
      border-top 1px solid $borderColor
      border-left 1px solid $borderColor
    &:before
      content ''
      display block
      position absolute
      top 10px
      right 10px
      width 10px
      height 10px
      border-top 1px solid $borderColor
      border-right 1px solid $borderColor
  &.bot
    bottom 0
    &:after
      content ''
      display block
      position absolute
      bottom 10px
      left 10px
      width 10px
      height 10px
      border-bottom 1px solid $borderColor
      border-left 1px solid $borderColor
    &:before
      content ''
      display block
      position absolute
      bottom 10px
      right 10px
      width 10px
      height 10px
      border-bottom 1px solid $borderColor
      border-right 1px solid $borderColor

@keyframes pulse {
  from {
    opacity .2
    transform scale(.7)
  }
  to {
    opacity 0
    transform scale(2.5)
  }
}
</style>
