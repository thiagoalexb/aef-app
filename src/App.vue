<template>
  <div id="app" class="wrapper">
    
    <div class="sidebar" data-color="purple" data-image="../assets/img/sidebar-1.jpg">
        <div class="logo">
            <a href="http://www.creative-tim.com" class="simple-text">
                Creative Tim
            </a>
        </div>
        <div class="sidebar-wrapper">
            <ul class="nav">

                <li class="active">
                  <router-link to="/">
                    <i class="material-icons">dashboard</i>
                    <p>Início</p>
                  </router-link>
                </li>
                <li>
                  <router-link to="calendar">
                    <i class="material-icons">date_range</i>
                    <p>Calendário</p>
                  </router-link>
                </li>
                <li>
                  <router-link to="books">
                    <i class="material-icons">book</i>
                    <p>Livros</p>
                  </router-link>
                </li>
                <li>
                  <router-link to="post">
                    <i class="material-icons">new_releases</i>
                    <p>Postagens</p>
                  </router-link>
                </li>
                <li>
                  <router-link to="event">
                    <i class="material-icons">event</i>
                    <p>Eventos</p>
                  </router-link>
                </li>
                <li>
                  <router-link to="user">
                    <i class="material-icons">person</i>
                    <p>Usuário</p>
                  </router-link>
                </li>
                <li>
                  <router-link to="login">
                    <i class="material-icons">vpn_key</i>
                    <p>Login</p>
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
                    <a class="navbar-brand" href="#"> Material Dashboard </a>
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
                        <li>
                            <a href="#">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                Company
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                Portfolio
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                Blog
                            </a>
                        </li>
                    </ul>
                </nav>
                <p class="copyright pull-right">
                    &copy;
                    2018
                    <a href="http://www.creative-tim.com">Creative Tim</a>, made with love for a better web
                </p>
            </div>
        </footer>
    </div>

  </div>
</template>

<script>
// import './assets/css/bootstrap.min.css'
// import '../static/assets/css/material-dashboad'
// import '../static/assets/css/font-awesome.min'
// import '../static/assets/css/material-icons-roboto'

export default {
  name: 'App'
}
</script>

<style>
</style>
