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
                    :state="passwordState.state"
                    :message="passwordState.message"
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
                    :state="passwordState.state"
                    :message="passwordState.message"
                    @input="passwordChanged" />
              </div>
            </div>

            <slot name="after"></slot>

            <button
              type="submit"
              :disabled="loading || !passwordState.valid || !password || !confirmPassword"
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
      submited: false,
      loading: true,
      logging: false,
    }
  },
  created () {
    // initial verifications for activate account
    // and recover password screens
    if (this.$route.name === 'userActivateAccount') {
      this.title = 'Ativação de conta'

      // verify if account is already activated
      this.$api.user.verifyPassword({ email: this.email })
        .then(data => {
          this.loading = false
          if (data.success) {
            if (!data.data.isVerified) {
              // account not verified, ok set password
              this.id = data.data.userId
            } else if (data.data.isVerified) {
              // account verified, send to login
              this.$notify.warning('Sua conta já está ativa, faça o login.')
              this.$router.push({ name: 'login' })
            }
          } else utils.handleApiError(data, 'verificar sua conta')
        })
        .catch(() => { this.loading = false })
    } else {
      this.title = 'Recuperação de senha'

      // verify email and password recover token
      this.$api.verifyPasswordToken({
        email: this.email,
        token: this.recoverPasswordToken
      })
        .then(data => {
          // invalid token / email, return to login
          if (!data.success) this.$router.push('/login')
        })
    }
  },
  methods: {
    updatePassword () {
      this.submited = true
      const formData = {
        id: this.id,
        password: this.password,
        confirmPassword: this.confirmPassword
      }
      if (this.$route.name === 'userPasswordRecover') {
        formData.token = this.recoverPasswordToken
      }

      this.$api.user.updatePassword(formData)
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
  computed: {
    passwordState () {
      const state = {
        valid: false,
        state: null,
        message: null
      }

      state.valid = this.password &&
        this.confirmPassword &&
        this.password === this.confirmPassword

      if (this.submited) {
        if (!this.password || !this.confirmPassword) {
          state.valid = false
          return state
        } else if (this.password !== this.confirmPassword) {
          state.valid = false
          state.state = 'error'
          state.message = 'A senha digitada não confere'
        } else {
          state.valid = true
          state.state = 'success'
          state.message = null
        }
      }

      return state
    }
  },
  components: {
    Input
  }
}
</script>
