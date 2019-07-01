<template>
  <div class="projects_layout">
    <div  v-for="(project, i) in projects" :key="project.name" class="project_item">
      <span class="pseudo top"></span>
      <span class="pseudo bot"></span>
      <div class="symbol" 
           :style="[{'color': colors[i]},
                    {'box-shadow': `inset 3px 3px 1${volume}px 0px ${colors[i]}`}]">
        <p>{{project.name[0].toUpperCase()}}</p>
        <span>{{project.name[1].toLowerCase()}}</span>
      </div>
      <h1>{{project.name}}</h1>
      <p>{{project.description}}</p>
      <router-link :to="project.link"><span class="button_show">Хочу посмотреть</span></router-link>
    </div>
  </div>
</template>
<script>
const projectsConstList = [
  {
    name: 'Draggable',
    description: 'Плагин для работы с перетаскиваемыми элементами.',
    link: '/Projects/Draggable'
  },
  {
    name: 'Observer',
    description: 'Плагин для отслеживания изменения размеров блока (Chrome).',
    link: '/Projects/Observer'
  },
  {
    name: 'Tooltip',
    description: 'Компонент для вывода подсказок.',
    link: '/Projects/Tooltip'
  },
  {
    name: 'Chart',
    description: 'Простая отрисовка диаграммы Гантта.',
    link: '/Projects/Gchart'
  }
]
import _ from 'lodash'
const colors = ['#ea4335', '#fbbc05', '#4285f4', '#34a853', '#00bcd4', '#9c27b0', '#795548']
export default {
  name: 'Projects',
  props: {
  },
  data () {
    return {
      projects: projectsConstList,
      colors: _.shuffle(colors),
      recorder: '',
      volume: 10
    }
  },
  created () {
    let vm = this
    navigator.mediaDevices.getUserMedia({
      audio: true
    })
    .then(stream => {
      this.recorder = new MediaRecorder(stream)
      this.recorder.ondataavailable = function(e) {
        let v = '' + e.data.size
        vm.volume = v[3]
      }
      setInterval(() => {
        this.recorder.start()
        setTimeout(() => {
          this.recorder.stop()
        }, 490)
      }, 500)
    })
  },
  methods: {
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
  overflow-y auto
  display flex
  flex-wrap wrap
  flex-grow 1
  justify-content space-around
  .project_item
    padding 20px
    margin 1%
    margin 20px
    flex-basis 400px
    flex-grow 1
    box-shadow 0px 0px 9px #0000001a
    border-radius 5px
    position relative
    display flex
    flex-direction column
    align-items center
    .symbol
      width 100px
      height 100px
      border-radius 50%
      font-size 100px
      overflow visible
      display flex
      justify-content center
      align-items center
      transition box-shadow .5s
      will-change box-shadow
      box-shadow inset 3px 3px 10px 0px #34a853
      p
        padding 0
        margin 0
        font-weight bold
        flex-basis 0
        margin-left -50%
        margin-top -40%
      span
        margin-bottom -40%
        margin-right -50%
    h1
      font-size 40px
      padding 20px
    a
      margin 20px
    .button_show
      background-color #80808014
      padding 10px 15px
      border-radius 3px
      cursor pointer
      transition all .3s
      &:hover
        box-shadow 0px 0px 6px #34a85394
      &:active
        box-shadow inset 0px 0px 6px #34a85394
        opacity .8

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
</style>
