<template lang="html">

  <div class="row">

    <div class="col-md-4 col-md-offset-3">
      <div class="card">
        <div class="card-header" data-background-color="blue">
            <b class="pull-right" v-show="loading">Carregando...</b>
            <b class="pull-right" v-show="logging">Efetuando login...</b>
            <h4 class="title">{{title}}</h4>
            <p class="category">Digite sua nova senha para ter acesso ao sistema</p>
        </div>

        <div class="card-content">
          <form @submit.prevent="updatePassword">

            <div class="row">
              <div class="col-md-12">
                  <Input
                    type="password"
                    v-model="password"
                    label="Nova senha"
                    :disabled="loading"
                    :state="state.password.state"
                    :message="state.password.message"
                    @input="passwordChanged" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                  <Input
                    type="password"
                    v-model="confirmPassword"
                    label="Confirme a senha"
                    :disabled="loading"
                    :state="state.password.state"
                    :message="state.password.message"
                    @input="passwordChanged" />
              </div>
            </div>

            <slot name="after"></slot>

            <button
              type="submit"
              :disabled="loading || !state.password.valid || !password || !confirmPassword"
              class="pull-right btn btn-success">
              <i class="material-icons" style="margin-right: 5px">check</i>Salvar
            </button>

            <div class="clearfix"></div>
          </form>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
import Input from '@/components/shared/Input'

import utils from '@/shared/utils'
import * as authentication from '@/shared/authentication'

export default {
  name: 'UserChangePassword',
  props: {
    email: {
      type: String,
      required: true
    },
    recoverPasswordToken: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      title: null,
      id: null,
      password: null,
      confirmPassword: null,
      loading: true,
      logging: false,
      state: {
        password: {
          valid: false,
          state: null,
          message: null
        }
      }
    }
  },
  created () {
    if (this.$route.name === 'userActivateAccount') {
      this.title = 'Ativação de conta'
    } else {
      this.title = 'Recuperação de senha'
    }

    this.$api.user.verifyPassword({ email: this.email })
      .then(data => {
        this.loading = false
        if (data.success) {
          if (!data.data.isVerified) {
            // account not verified, ok set password
            this.id = data.data.userId
          } else if (data.data.isVerified && this.$route.name === 'userActivateAccount') {
            // account verified, send to login
            this.$notify.warning('Sua conta já está ativa, faça o login.')
            this.$router.push({ name: 'login' })
          }
        } else utils.handleApiError(data, 'verificar sua conta')
      })
      .catch(() => { this.loading = false })
  },
  methods: {
    passwordChanged () {
      if (!this.password || !this.confirmPassword) {
        this.state.password.valid = false
        this.state.password.state = null
        this.state.password.message = null
      } else if (this.password !== this.confirmPassword) {
        this.state.password.valid = false
        this.state.password.state = 'error'
        this.state.password.message = 'A senha digitada não confere'
      } else {
        this.state.password.valid = true
        this.state.password.state = 'success'
        this.state.password.message = null
      }
    },
    updatePassword () {
      this.$api.user.updatePassword({
        id: this.id,
        password: this.password,
        confirmPassword: this.confirmPassword
      })
        .then(data => {
          if (data.success) {
            this.login()
          } else utils.handleApiError(data, 'atualizar senha')
        })
    },
    login () {
      this.logging = true
      this.$api.login.login({ email: this.email, password: this.password })
        .then(data => {
          this.logging = false
          if (data && data.authenticated) {
            // set user info
            data.user.email = this.email

            authentication.setUser(data)
            this.$store.user = authentication.getUser()
            this.$router.push({ name: 'home' })
          } else utils.handleApiError(data, 'efetuando login com nova senha')
        })
    }
  },
  components: {
    Input
  }
}
</script>
