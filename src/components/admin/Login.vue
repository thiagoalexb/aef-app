<template>
  <div class="row">

    <div class="col-md-4 col-md-offset-3">
      <div class="card">
        <div class="card-header" :data-background-color="color">
          <img
            src="@/../static/favicon64.png"
            alt="aef logo"
            style="width: 64px; margin-right: 15px;"
            class="pull-left">
            <b class="pull-right" v-show="logging">logando...</b>
            <h4 class="title">Login</h4>
            <p class="category">informe seu login para acessar o sistema</p>
        </div>

        <div class="card-content">
          <form @submit.prevent="login">

            <div class="row">
              <div class="col-md-12">
                <div class="form-group label-floating form-info">
                  <label class="control-label">E-mail</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="user.email"
                    ref="email"
                    :disabled="logging"
                    autofocus>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group label-floating form-info">
                  <label class="control-label">Senha</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="user.password"
                    :disabled="logging">
                </div>
              </div>
            </div>

            <button
              type="submit"
              :disabled="logging || !user.email || !user.password"
              :class="['btn', `btn-${color2}`, 'pull-right']">
              <i class="material-icons" style="margin-right: 5px">vpn_key</i>Login
            </button>

            <div class="clearfix"></div>
          </form>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import utils from '@/shared/utils'
import * as authentication from '@/shared/authentication'

export default {
  name: 'Login',
  data () {
    return {
      user: {},
      color: utils.randomAefColors(),
      logging: false
    }
  },
  computed: {
    color2 () {
      let c2 = utils.randomAefColors()
      while (this.color === c2) {
        c2 = utils.randomAefColors()
      }
      return ({ orange: 'warning', blue: 'info', red: 'danger' })[c2]
    }
  },
  methods: {
    login () {
      this.logging = true
      this.$api.login.login(this.user)
        .then(data => {
          if (data && data.authenticated) {
            // set user info
            data.email = this.user.email
            // get user id
            this.$api.user.verifyPassword({email: this.user.email})
              .then(userVerified => {
                this.logging = false
                if (userVerified.success) {
                  data.id = userVerified.data.userId
                  authentication.setUser(data)
                  this.$store.user = authentication.getUser()
                  this.$router.push({ name: 'home' })
                } else {
                  this.error(data)
                }
              })
              .catch(() => {
                this.logging = false
              })
          } else {
            this.error(data)
          }
        })
        .catch(() => {
          this.logging = false
          this.$refs.email.focus()
        })
    },
    error (data) {
      this.logging = false
      let { message } = data
      if (!message) message = 'Ocorreu um problema ao fazer o login'
      this.$notify.danger(message)
      this.$nextTick(() => this.$refs.email.focus())
    }
  },
  created () {
    if (this.$route.path === '/logoff') {
      authentication.logoff()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
</style>
