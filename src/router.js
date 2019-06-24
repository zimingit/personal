import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Projects from './views/Projects.vue'
import Forbidden from './views/Forbidden.vue'
import Draggable from './libs/DragDrop.vue'
import Gchart from './libs/Gchart.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '*',
      name: 'Not Found',
      component: Forbidden
    },
    {
      path: '/Projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/Projects/Draggable',
      name: 'Draggable',
      component: Draggable
    },
    {
      path: '/Projects/Gchart',
      name: 'Gchart',
      component: Gchart
    }
  ]
})
