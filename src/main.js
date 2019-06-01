import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker.js'
import qs from './plugins/queryService.js'

Vue.config.productionTip = false
Vue.use(qs)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
