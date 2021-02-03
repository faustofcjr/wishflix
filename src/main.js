import App from './App.vue'
import Vue from 'vue'

import '@babel/polyfill'
import 'mutationobserver-shim'
import './registerServiceWorker'

import './plugins/axios'
import './plugins/bootstrap-vue'
import './plugins/firebase'
import './plugins/fontawesome'
import './plugins/loading-vue'
import './plugins/lodash-vue'
import './plugins/uuid-vue'

import router from './router'
import store from './store'
import i18n from './i18n'

Vue.config.productionTip = false


Vue.prototype.$toast = function (title, message, variant) {
  this.$root.$bvToast.toast(message, {
    title: title,
    variant: variant,
    solid: true,
    toaster: 'b-toaster-top-right',
  });
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
