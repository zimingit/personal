import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import News from './views/News.vue'
import About from './views/About.vue'
import Projects from './views/Projects.vue'
import Forbidden from './views/Forbidden.vue'
import Draggable from './libs/DragDrop.vue'
import Gchart from './libs/Gchart.vue'
import Notesy from './libs/notesy/Notesy.vue'
import NotesyCreate from './libs/notesy/NotesyCreate.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    // Стартовая страница
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Contacts',
      name: 'Contacts',
      component: Home
    },
    {
      path: '/About',
      name: 'About',
      component: About
    },
    {
      path: '/Projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/News',
      name: 'News',
      component: News
    },
    {
      path: '*',
      name: 'Not Found',
      component: Forbidden
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
    },
    {
      path: '/Projects/Notesy/:userName',
      name: 'Notesy',
      component: Notesy,
      props: true
    },
    {
      path: '/Projects/Notesy',
      name: 'NotesyCreate',
      component: NotesyCreate
    }
  ]
})
