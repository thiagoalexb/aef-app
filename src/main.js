// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { api, http } from './shared/api'
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

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$http = http
Vue.prototype.$notify = notify

const initialTitle = document.title

// change page title when component router is changed
router.beforeEach((to, from, next) => {
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
