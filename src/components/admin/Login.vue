<template>
  <div class="row">

    <div class="col-md-4 col-md-offset-3">
      <div class="card">
        <div class="card-header" :data-background-color="color">
          <h4 class="title">Login</h4>
          <p class="category">Informe seu login para acessar o sistema</p>
        </div>

        <div class="card-content">
          <form @submit="login">

            <div class="row">
              <div class="col-md-12">
                <div class="form-group label-floating">
                  <label class="control-label">E-mail</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="user.email">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group label-floating">
                  <label class="control-label">Senha</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="user.password">
                </div>
              </div>
            </div>

            <button type="submit" :class="['btn', `btn-${color2}`, 'pull-right']">
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
      color: utils.randomAefColors()
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
      this.$api.login.login(this.user)
        .then(data => {
          if (data && data.authenticated) {
            // set user info
            data.email = this.user.email
            // get user id
            this.$api.user.verifyPassword({email: this.user.email})
              .then(userVerified => {
                if (userVerified.success) {
                  data.id = userVerified.data.userId
                  authentication.setUser(data)
                } else {
                  this.error(data)
                }
              })
            this.$router.push({ name: 'Home' })
          } else {
            this.error(data)
          }
        })
    },
    error (data) {
      let { message } = data
      if (!message) message = 'Ocorreu um problema ao fazer o login'
      this.$notify.danger(message)
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
