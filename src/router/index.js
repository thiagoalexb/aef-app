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
      component: Home,
      meta: {
        description: 'Início',
        icon: 'dashboard'
      }
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar,
      meta: {
        description: 'Calendário',
        icon: 'date_range'
      }
    },
    {
      path: '/books',
      name: 'Books',
      component: Books,
      meta: {
        description: 'Livros',
        icon: 'book'
      }
    },
    {
      path: '/event',
      name: 'Event',
      component: Event,
      meta: {
        description: 'Eventos',
        icon: 'event'
      }
    },
    {
      path: '/post',
      name: 'Post',
      component: Post,
      meta: {
        description: 'Postagens',
        icon: 'new_releases'
      }
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        description: 'Usuários',
        icon: 'person'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        description: 'Login',
        icon: 'vpn_key'
      }
    }
  ]
})
