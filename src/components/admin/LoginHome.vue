<template lang="html">
  <form @submit.prevent="login">

    <div class="row">
      <div class="col-md-12">
        <Input
          type="email"
          label="E-mail"
          v-model="user.email"
          ref="email"
          :state="state"
          :disabled="logging"
          :autofocus="true" />
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <Input
          type="password"
          label="Senha"
          v-model="user.password"
          :state="state"
          :disabled="logging" />
      </div>
    </div>

    <button
      type="submit"
      :disabled="logging || !user.email || !user.password"
      :class="`btn btn-${buttonColor} pull-right`">
      <i class="material-icons" style="margin-right: 5px">vpn_key</i>Login
    </button>

    <div class="row">
      <div class="col-md-12">
        <router-link
          class="pull-right"
          :to="{name: 'forgotPassword'}">
          Esqueci a senha
        </router-link>
      </div>
    </div>

  </form>
</template>

<script>
import * as authentication from '@/shared/authentication'
import utils from '@/shared/utils'

import Input from '@/components/shared/Input'

export default {
  name: 'LoginHome',
  data () {
    return {
      user: {},
      logging: false,
      buttonColor: this.$parent.buttonColor,
      state: null
    }
  },
  methods: {
    login () {
      this.loadingSet(true)
      this.$api.login.login(this.user)
        .then(data => {
          this.loadingSet(false)
          if (data && data.authenticated) {
            // set user info
            data.user.email = this.user.email

            authentication.setUser(data)
            this.$store.user = authentication.getUser()
            this.$router.push({ name: 'home' })
          } else {
            this.state = 'error'
            utils.handleApiError(data, 'fazer login')
            this.$nextTick(() => this.$refs.email.focus())
          }
        })
        .catch(() => {
          this.loadingSet(false)
          this.$refs.email.focus()
        })
    },
    loadingSet (value) {
      this.logging = value
      this.$parent.$emit('loading', value, 'Logando...')
    }
  },
  components: {
    Input
  }
}
</script>
