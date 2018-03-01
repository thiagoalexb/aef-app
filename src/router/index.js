import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Calendar from '@/components/Calendar'
import Books from '@/components/Books'
import Event from '@/components/Event'
import Post from '@/components/Post'
import User from '@/components/User'
import Login from '@/components/Login'

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
      path: '/books',
      name: 'Books',
      component: Books
    },
    {
      path: '/event',
      name: 'Event',
      component: Event
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
