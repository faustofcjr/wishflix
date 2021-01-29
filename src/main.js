import App from './App.vue'
import Vue from 'vue'

import '@babel/polyfill'
import 'mutationobserver-shim'
import './registerServiceWorker'

import './plugins/axios'
import './plugins/bootstrap-vue'
import './plugins/fontawesome'


import router from './router'
import store from './store'
import i18n from './i18n'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
