import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/admin/Home'
import Calendar from '@/components/admin/Calendar'
import Books from '@/components/admin/Books'
import Event from '@/components/admin/Event'
import Post from '@/components/admin/Post'
import User from '@/components/admin/User'
import UserEdit from '@/components/admin/UserEdit'
import Login from '@/components/admin/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Início',
        icon: 'dashboard',
        show: true
      }
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar,
      meta: {
        title: 'Calendário',
        icon: 'date_range',
        show: true
      }
    },
    {
      path: '/books',
      name: 'Books',
      component: Books,
      meta: {
        title: 'Livros',
        icon: 'book',
        show: true
      }
    },
    {
      path: '/event',
      name: 'Event',
      component: Event,
      meta: {
        title: 'Eventos',
        icon: 'event',
        show: true
      }
    },
    {
      path: '/post',
      name: 'Post',
      component: Post,
      meta: {
        title: 'Postagens',
        icon: 'new_releases',
        show: true
      }
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        title: 'Usuários',
        icon: 'person',
        show: true
      }
    },
    {
      path: '/user/add',
      name: 'UserAdd',
      component: UserEdit,
      props: { add: true },
      meta: {
        title: 'Cadastro de usuário',
        show: false
      }
    },
    {
      path: '/user/edit/:id',
      name: 'UserEdit',
      component: UserEdit,
      props: true,
      meta: {
        title: 'Alteração de usuário',
        show: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Login',
        icon: 'vpn_key',
        show: false
      }
    },
    {
      path: '/logoff',
      name: 'Logoff',
      component: Login
    }
  ]
})
