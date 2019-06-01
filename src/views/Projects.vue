<template>
  <div class="projects_layout">
    <div  v-for="project in projects" :key="project.name" class="project_item">
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
  }
]
export default {
  name: 'Projects',
  props: {
  },
  data () {
    return {
      projects: projectsConstList
    }
  },
  methods: {
  },
  components: {
  }
}
</script>
<style lang="stylus" scoped>
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
    border-radius 10px
    .button_show
      background-color #80808014
      padding 10px 15px
      border-radius 20px
      cursor pointer
      transition all .3s
      &:hover
        box-shadow 0px 0px 6px #34a85394
      &:active
        box-shadow inset 0px 0px 6px #34a85394
        opacity .8
</style>
