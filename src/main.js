import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import { httpRequest, httpAuthRequest } from './helpers/http'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
window.moment = require('moment')
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import './assets/scss/global.scss'

Vue.config.performance = true
Vue.component('v-icon', Icon)
Vue.use(CoreuiVue)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.prototype.$log = console.log.bind(console)

Vue.prototype.$http = httpRequest
Vue.prototype.$authHttp = httpAuthRequest

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
