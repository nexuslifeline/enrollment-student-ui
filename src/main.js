import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
//import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import { httpRequest, httpAuthRequest } from './helpers/http'
import { BootstrapVue } from 'bootstrap-vue'

import MainContainer from './views/components/LayoutContainers/MainContainer';
import Tabs from './views/components/Tabs/Tabs';
import BillingRecap from './views/components/BillingRecap/BillingRecap';
import GradeCards from './views/components/GradeCards/List';
import AvatarMaker from './views/components/AvatarMaker';
import BulletedContent from './views/components/BulletedContent/BulletedContent';
import AvatarGroup from './views/components/AvatarGroup/AvatarGroup';

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
import 'vue-awesome/icons/chevron-right'
import 'vue-awesome/icons/times'
import 'vue-awesome/icons/check-circle'
import 'vue-awesome/icons/print'
import 'vue-awesome/icons/th-large'
import 'vue-awesome/icons/folder'
import 'vue-awesome/icons/receipt'
import 'vue-awesome/icons/credit-card'
import 'vue-awesome/icons/list-ol'
import 'vue-awesome/icons/address-card'
import 'vue-awesome/icons/bookmark'
import 'vue-awesome/icons/file'
import 'vue-awesome/icons/check'
import 'vue-awesome/icons/times'
import 'vue-awesome/icons/compress'
import 'vue-awesome/icons/caret-down'
import 'vue-awesome/icons/chevron-down'
import 'vue-awesome/icons/chevron-left'
import 'vue-awesome/icons/chevron-right'
import 'vue-awesome/icons/ellipsis-v'
import 'vue-awesome/icons/clock'
import 'vue-awesome/icons/info'
import 'vue-awesome/icons/info-circle'
import Icon from 'vue-awesome/components/Icon'
import './assets/scss/global.scss'

import {
  BIconFolderSymlink,
  BIconAlarm,
  BIconArrowRightCircle,
  BIconArrowLeftCircle,
  BIconPaperclip,
  BIconCloudDownload,
  BIconCheckCircle,
  BIconEnvelope,
  BIconGeoAlt,
  BIconCaretDownFill,
  BIconCaretUpFill,
  BProgress,
  BIconLayers,
  BIconPersonCheck
} from 'bootstrap-vue'

Vue.component('Tabs', Tabs);
Vue.component('MainContainer', MainContainer);
Vue.component('BIconPersonCheck', BIconPersonCheck);
Vue.component('BIconLayers', BIconLayers);
Vue.component('BIconFolderSymlink', BIconFolderSymlink);
// Vue.component('BIconFolder2Open', BIconFolder2Open);
Vue.component('BIconAlarm', BIconAlarm);
Vue.component('BIconArrowRightCircle', BIconArrowRightCircle);
Vue.component('BIconArrowLeftCircle', BIconArrowLeftCircle);
Vue.component('BIconPaperclip', BIconPaperclip);
Vue.component('BIconCloudDownload', BIconCloudDownload);
Vue.component('BIconCheckCircle', BIconCheckCircle);
Vue.component('BIconEnvelope', BIconEnvelope);
// Vue.component('BIconPersonBadge', BIconPersonBadge);
Vue.component('BIconGeoAlt', BIconGeoAlt);
// Vue.component('BIconCalendar2Week', BIconCalendar2Week);
Vue.component('BIconCaretDownFill', BIconCaretDownFill);
Vue.component('BIconCaretUpFill', BIconCaretUpFill);
Vue.component('BProgress', BProgress);
Vue.component('BillingRecap', BillingRecap);
Vue.component('GradeCards', GradeCards);
Vue.component('AvatarMaker', AvatarMaker);
Vue.component('BulletedContent', BulletedContent);
Vue.component('AvatarGroup', AvatarGroup);

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
