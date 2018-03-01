<template>
  <div id="app">
    <img src="./assets/logo.png">
    <br />
    <router-link to="/">Início</router-link>
    <router-link to="calendar">Calendário</router-link>
    <router-link to="books">Livros</router-link>
    <router-link to="post">Post</router-link>
    <router-link to="event">Event</router-link>
    <router-link to="user">Usuário</router-link>
    <router-link to="login">Login</router-link>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a {
  margin: 5px;
  text-decoration: none;
}

a.router-link-exact-active {
  color: #42b983;
}
</style>
