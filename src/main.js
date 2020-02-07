import Vue from 'vue'
import Main from './components/Main'
import router from './route'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import { store } from './store/store'
Vue.use(VueMaterial)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Main),
}).$mount('#app')
