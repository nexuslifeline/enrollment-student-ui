import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
//import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import { httpRequest, httpAuthRequest } from './helpers/http'
import { BootstrapVue } from 'bootstrap-vue'
//window.moment = require('moment')
import 'vue-awesome/icons/arrow-right'
import 'vue-awesome/icons/chart-pie'
import 'vue-awesome/icons/shipping-fast'
import 'vue-awesome/icons/paper-plane'
import 'vue-awesome/icons/chart-line'
import 'vue-awesome/icons/images'
import 'vue-awesome/icons/times-circle'
import 'vue-awesome/icons/spinner'
import 'vue-awesome/icons/check'
import 'vue-awesome/icons/plus'
import 'vue-awesome/icons/plus-circle'
import 'vue-awesome/icons/sync'
import 'vue-awesome/icons/trash'
import 'vue-awesome/icons/file-upload'
import 'vue-awesome/icons/greater-than'
import 'vue-awesome/icons/file-pdf'
import 'vue-awesome/icons/file-image'
import 'vue-awesome/icons/search'
import 'vue-awesome/icons/trash'
import Icon from 'vue-awesome/components/Icon'
import './assets/scss/global.scss'

Vue.config.performance = true
Vue.component('v-icon', Icon)
Vue.use(CoreuiVue)
Vue.use(BootstrapVue)
Vue.component('vue-autonumeric', require('vue-autonumeric'))
//Vue.use(IconsPlugin)
Vue.prototype.$log = console.log.bind(console)

Vue.prototype.$http = httpRequest
Vue.prototype.$authHttp = httpAuthRequest

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
