import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker.js'
// import qs from './plugins/queryService.js'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

Vue.config.productionTip = false
// Vue.use(qs)
firebase.initializeApp({
  projectId: 'personal-3b8f4',
  databaseURL: 'https://personal-3b8f4.firebaseio.com'
})
Vue.prototype.$db = firebase.firestore()
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
