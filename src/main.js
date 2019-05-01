import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import 'vuetify/dist/vuetify.min.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8081'
Vue.$http = axios

Vue.use(Vuetify)
Vue.use(VeeValidate)

Vue.config.productionTip = false

axios.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('auth_token')
  if (authToken) {
    config.headers.Authorization = authToken
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
