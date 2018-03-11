import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/admin/Home'
import Calendar from '@/components/admin/Calendar'
import Book from '@/components/admin/Book'
import Class from '@/components/admin/Class'
import Post from '@/components/admin/Post'
import User from '@/components/admin/User'
import UserEdit from '@/components/admin/UserEdit'
import UserChangePassword from '@/components/admin/UserChangePassword'
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
      name: 'home',
      component: Home,
      meta: {
        title: 'Início',
        icon: 'dashboard',
        show: true
      }
    },
    {
      path: '/calendario',
      name: 'calendar',
      component: Calendar,
      meta: {
        title: 'Calendário',
        icon: 'date_range',
        show: true
      }
    },
    {
      path: '/livro',
      name: 'book',
      component: Book,
      meta: {
        title: 'Livros',
        icon: 'book',
        show: true
      }
    },
    {
      path: '/aula',
      name: 'class',
      component: Class,
      meta: {
        title: 'Aulas',
        icon: 'class',
        show: true
      }
    },
    {
      path: '/post',
      name: 'post',
      component: Post,
      meta: {
        title: 'Postagens',
        icon: 'new_releases',
        show: true
      }
    },
    {
      path: '/usuario',
      name: 'user',
      component: User,
      meta: {
        title: 'Usuários',
        icon: 'person',
        show: true
      }
    },
    {
      path: '/usuario/adicionar',
      name: 'userAdd',
      component: UserEdit,
      props: { add: true },
      meta: {
        title: 'Adicionar usuário',
        show: false
      }
    },
    {
      path: '/usuario/atualizar/:id',
      name: 'userEdit',
      component: UserEdit,
      props: true,
      meta: {
        title: 'Atualização de usuário',
        show: false
      }
    },
    {
      path: '/usuario/ativar-conta/:email',
      name: 'userActivateAccount',
      component: UserChangePassword,
      props: true,
      meta: {
        title: 'Ativar conta',
        show: false
      }
    },
    {
      path: '/usuario/recuperar-senha/:email/:recoverPasswordToken',
      name: 'userPasswordRecover',
      component: UserChangePassword,
      props: true,
      meta: {
        title: 'Recuperar senha',
        show: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: 'Login',
        icon: 'vpn_key',
        show: false
      }
    },
    {
      path: '/logoff',
      name: 'logoff',
      component: Login
    }
  ]
})
