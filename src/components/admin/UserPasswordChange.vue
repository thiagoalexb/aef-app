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
                    autofocus
                    ref="password"
                    :disabled="loading"
                    v-validation.error="validation.password"
                    v-validation.success="validation.valid" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                  <Input
                    type="password"
                    v-model="confirmPassword"
                    label="Confirme a senha"
                    :disabled="loading"
                    v-validation.error="validation.confirmPassword"
                    v-validation.success="validation.valid" />
              </div>
            </div>

            <button
              type="submit"
              :disabled="loading"
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

import validation from '@/shared/validationDirective'

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
      serverValidation: null
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
              this.$refs.password.focus()
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
      this.$api.user.verifyPasswordToken({
        email: this.email,
        token: this.recoverPasswordToken
      })
        .then(data => {
          this.loading = false
          if (data.success) {
            this.id = data.data.userId
            this.$refs.password.focus()
          } else if (!data.success) {
            utils.handleApiError(data, 'verificar requisição de alteração de senha')
            // invalid token / email, return to login
            this.$router.push('/login')
          }
        })
        .catch(() => { this.loading = false })
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
          } else this.serverValidation = utils.handleApiError(data, 'atualizar senha')
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
    validation () {
      const state = {
        valid: false,
        password: null,
        confirmPassword: null
      }

      state.valid = this.submited &&
        this.password &&
        this.confirmPassword &&
        this.password === this.confirmPassword

      if (this.serverValidation) {
        // server validation
        state.password = this.serverValidation.password
        state.confirmPassword = this.serverValidation.confirmPassword
      } else if (this.submited) {
        // client validation
        const passwordEqual = this.password === this.confirmPassword
        if (!this.password) state.password = 'Obrigatório'
        if (!this.confirmPassword) state.confirmPassword = 'Obrigatório'

        if (!passwordEqual && !state.password) state.password = 'A senha digitada não confere'
        if (!passwordEqual && !state.confirmPassword) state.confirmPassword = 'A senha digitada não confere'
      }

      return state
    }
  },
  components: {
    Input
  },
  directives: {
    validation
  }
}
</script>
