<template>
  <div id="app" class="wrapper">

    <div v-show="!isLogin" class="sidebar" data-color="purple" :data-image="sidebarBg">
      <div class="logo">
        <a href="http://aefcuritiba.com.br" class="simple-text">
          <img src="./assets/img/aef-logo-sidebar.png" class="logo" />
          AEF Curitiba
        </a>
      </div>
      <div class="sidebar-wrapper">
        <ul class="nav">

          <li
              v-for="(route, index) in routes"
              :key="index"
              :class="sidebarItemClasses(route.isActive, index)">
            <router-link :to="route.path" v-if="route.show">
              <i class="material-icons">{{route.icon}}</i>
              <p>{{route.title}}</p>
            </router-link>
          </li>

        </ul>
      </div>
    </div>

    <div class="main-panel">
      <nav v-if="!isLogin" class="navbar navbar-transparent navbar-absolute">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Associação de estudos filosóficos de Curitiba - {{$route.meta.title}}</a>
          </div>
          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="material-icons">notifications</i>
                  <span class="notification">2</span>
                  <p class="hidden-lg hidden-md">Notifications</p>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a href="#">Um exemplo de notificação</a>
                  </li>
                  <li>
                    <a href="#">Outro exemplo de notificação</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#pablo" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="material-icons">person</i>
                  <p class="hidden-lg hidden-md">Profile</p>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <router-link :to="{ name: 'userEdit', params: { id: userId }}">
                      Visualizar perfil
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/logoff">
                      <i class="material-icons">lock_open</i>
                      Deslogar-se
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
            <form
              @submit.prevent="buscar"
              class="navbar-form navbar-right"
              role="search">
              <div class="form-group  is-empty">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Busca"
                  v-model="busca">
                <span class="material-input"></span>
              </div>
              <button type="submit" class="btn btn-white btn-round btn-just-icon">
                <i class="material-icons">search</i>
                <div class="ripple-container"></div>
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div class="content">
          <div class="container-fluid">

            <router-view />

          </div>
      </div>

      <footer class="footer">
        <div class="container-fluid">
          <nav v-if="!isLogin" class="pull-left">
            <ul>

              <li
                v-for="(route, index) in routes"
                :key="index"
                :class="{active: route.isActive}">
                <router-link :to="route.path">
                  <p>{{route.title}}</p>
                  <!-- <i class="material-icons">{{route.icon}}</i> -->
                </router-link>
              </li>

            </ul>
          </nav>
          <p class="copyright pull-right">
            &copy;
            {{year}}
            Desenvolvido por <a href="http://www.quitallabs.com">Quintal Labs</a>.
          </p>
        </div>
      </footer>

    </div>

  </div>
</template>

<script>
import sidebarBg from './assets/img/sidebar-1.jpg'

const sidebarColors = [
  'red',
  'orange',
  'blue'
]

export default {
  name: 'App',
  data: () => ({
    sidebarBg,
    busca: ''
  }),
  computed: {
    routes () {
      return this.$router.options.routes.map(r => ({
        path: r.path,
        icon: r.meta ? r.meta.icon : null,
        title: r.meta ? r.meta.title : null,
        isActive: this.$route.path === r.path,
        show: r.meta ? r.meta.show : null
      })).reduce((prev, curr) => {
        if (curr.show) prev.push(curr)
        return prev
      }, [])
    },
    year () {
      return new Date().getFullYear()
    },
    isLogin () {
      return this.$store.loginFreeRoutes.includes(this.$route.name)
    },
    userId: () => this.$store && this.$store.user
      ? this.$store.user.id
      : null
  },
  methods: {
    sidebarItemClasses (isActive, index) {
      return [{
        active: isActive
      },
      sidebarColors[index % 3]
      ]
    },
    buscar () {
      this.$notify.info(`Não implementado ainda... Você digitou: ${this.busca}`)
      this.busca = ''
    }
  }
}
</script>

<style lang="sass">
@import ./assets/scss/_colors.scss
@import ./assets/scss/app.sass

.sidebar-wrapper ul.nav
  li.active.orange a
    background-color: $orange
  li.active.red a
    background-color: $red
  li.active.blue a
    background-color: $blue

img.logo
  display: block
  min-width: 80px
  max-width: 230px
  max-height: 100px
  min-height: 50px
  margin: 0 auto

footer ul li.active
  color: #9c27b0
</style>
