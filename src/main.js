// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { api, http } from './shared/api'
import { getUser } from './shared/authentication'
import notify from './shared/notify'

// styles and icons
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/material-dashboard.css'
import 'font-awesome/css/font-awesome.css'
import 'material-design-icons/iconfont/material-icons.css'

// template libraries
// jquery imported on build step
import 'bootstrap'
import './assets/js/material.min'
import './assets/js/material-dashboard'
import './assets/js/bootstrap-notify'
import './assets/js/arrive.min'

// simple store for logged user
const store = {
  user: getUser()
}

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$http = http
Vue.prototype.$notify = notify
Vue.prototype.$store = store

const initialTitle = document.title

router.beforeEach((to, from, next) => {
  // send to login page if necessary
  store.user = getUser()
  if ((!store.user || !store.user.accessToken) && to.name !== 'Login') next('/login')
  // change page title when component router is changed
  document.title = `${initialTitle} - ${to.meta.title}`
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
