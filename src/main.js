import Vue from 'vue'
import Main from './components/Main'
import router from './route'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(Main),
}).$mount('#app')
