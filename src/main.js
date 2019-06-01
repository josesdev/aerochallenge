import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import NProgress from 'vue-nprogress'
import ApiService from './services/api.service'
import VueSweetalert2 from 'vue-sweetalert2'
import './global.scss'

import {
  Avatar, Layout, Icon, Radio, Dropdown, Menu,
  Input, Badge, Tooltip,
} from 'ant-design-vue'

Vue.use(Avatar)
Vue.use(Layout)
Vue.use(Icon)
Vue.use(Radio)
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(Input)
Vue.use(Badge)
Vue.use(Tooltip)
Vue.use(VueSweetalert2)
Vue.use(NProgress)

Vue.config.productionTip = false
const nprogress = new NProgress({ parent: 'body' })

ApiService.init()

new Vue({
  router,
  store,
  nprogress,
  render: h => h(App),
}).$mount('#app')
