import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/admin/Home'
import Calendar from '@/components/admin/Calendar'
import Book from '@/components/admin/Book'
import Lesson from '@/components/admin/Lesson'
import LessonEdit from '@/components/admin/LessonEdit'
import Post from '@/components/admin/Post'
import User from '@/components/admin/User'
import UserEdit from '@/components/admin/UserEdit'
import UserPasswordChange from '@/components/admin/UserPasswordChange'
import Login from '@/components/admin/Login'
import LoginHome from '@/components/admin/LoginHome'
import LoginForgotPassword from '@/components/admin/LoginForgotPassword'

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
      name: 'lesson',
      component: Lesson,
      meta: {
        title: 'Aulas',
        icon: 'tv',
        show: true
      }
    },
    {
      path: '/aula/adicionar',
      name: 'lessonAdd',
      component: LessonEdit,
      props: { type: 'aula' },
      meta: {
        title: 'Adicionar Aula',
        show: false
      }
    },
    {
      path: '/aula/atualizar/:type/:id',
      name: 'lessonEdit',
      component: LessonEdit,
      props: true,
      meta: {
        title: 'Atualizar Aula',
        show: false
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
      component: UserPasswordChange,
      props: true,
      meta: {
        title: 'Ativar conta',
        show: false
      }
    },
    {
      path: '/usuario/recuperar-senha/:email/:recoverPasswordToken',
      name: 'userPasswordRecover',
      component: UserPasswordChange,
      props: true,
      meta: {
        title: 'Recuperar senha',
        show: false
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: 'Login',
        icon: 'vpn_key',
        show: false
      },
      children: [
        {
          path: '',
          name: 'login',
          component: LoginHome,
          meta: {
            title: 'Login',
            subTitle: 'Informe seu login para acessar o sistema',
            show: false
          }
        },
        {
          path: '/esqueci-minha-senha',
          name: 'forgotPassword',
          component: LoginForgotPassword,
          meta: {
            title: 'Esqueci a senha',
            subTitle: 'Informe seu e-mail para receber mais instruções de alteração de senha',
            show: false
          }
        }
      ]
    },
    {
      path: '/logoff',
      name: 'logoff',
      component: Login
    }
  ]
})
