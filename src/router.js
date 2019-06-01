import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Projects from './views/Projects.vue'
import Forbidden from './views/Forbidden.vue'
import Draggable from './libs/DragDrop.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Home',
      name: 'About',
      component: Home
    },
    {
      path: '/Contacts',
      name: 'Contacts',
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
    }
  ]
})
