<template>
  <div id="app" class="wrapper">

    <div class="sidebar" data-color="purple" :data-image="sidebarBg">
        <div class="logo">
            <a href="http://aefcuritiba.com.br" class="simple-text">
                <img :src="logo" class="logo" />
                AEF Curitiba
            </a>
        </div>
        <div class="sidebar-wrapper">
            <ul class="nav">

                <li
                    v-for="(route, index) in routes"
                    :key="index"
                    :class="sidebarItemClasses(route.isActive, index)">
                  <router-link :to="route.path">
                    <i class="material-icons">{{route.icon}}</i>
                    <p>{{route.title}}</p>
                  </router-link>
                </li>

            </ul>
        </div>
    </div>
    <div class="main-panel">
        <nav class="navbar navbar-transparent navbar-absolute">
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
                        <li>
                            <a href="#pablo" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="material-icons">dashboard</i>
                                <p class="hidden-lg hidden-md">Dashboard</p>
                            </a>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="material-icons">notifications</i>
                                <span class="notification">5</span>
                                <p class="hidden-lg hidden-md">Notifications</p>
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="#">Mike John responded to your email</a>
                                </li>
                                <li>
                                    <a href="#">You have 5 new tasks</a>
                                </li>
                                <li>
                                    <a href="#">You're now friend with Andrew</a>
                                </li>
                                <li>
                                    <a href="#">Another Notification</a>
                                </li>
                                <li>
                                    <a href="#">Another One</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#pablo" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="material-icons">person</i>
                                <p class="hidden-lg hidden-md">Profile</p>
                            </a>
                        </li>
                    </ul>
                    <form class="navbar-form navbar-right" role="search">
                        <div class="form-group  is-empty">
                            <input type="text" class="form-control" placeholder="Search">
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

              <router-view/>

            </div>
        </div>
        <footer class="footer">
            <div class="container-fluid">
                <nav class="pull-left">
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
import logo from './assets/img/aef-logo.png'
import sidebarBg from './assets/img/sidebar-1.jpg'

let i = 0
const sidebarColors = [
  'red',
  'orange',
  'blue'
]

export default {
  name: 'App',
  data: () => ({
    sidebarBg,
    logo
  }),
  computed: {
    routes () {
      return this.$router.options.routes.map(r => ({
        path: r.path,
        icon: r.meta.icon,
        title: r.meta.title,
        isActive: this.$route.path === r.path
      })
      )
    },
    year () {
      return new Date().getFullYear()
    }
  },
  methods: {
    sidebarItemClasses (isActive, index) {
      return [{
        active: isActive
      },
      sidebarColors[index % 3]
      ]
    },
    getSidebarColor () {
      if (i === 3) i = 0
      return sidebarColors[i++]
    }
  }
}
</script>

<style lang="sass">
@import ./assets/scss/_colors

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

footer ul li.active
  color: #9c27b0
</style>
