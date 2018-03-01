import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Calendar from '@/components/Calendar'
import MissingClasses from '@/components/MissingClasses'
import Books from '@/components/Books'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/missing-classes',
      name: 'MissingClasses',
      component: MissingClasses
    },
    {
      path: '/books',
      name: 'Books',
      component: Books
    }
  ]
})
