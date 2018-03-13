<template lang="html">
  <form @submit.prevent="forgotPasswordRequest">
    <div class="row ">
      <div class="col-md-12">
        <Input
          type="email"
          label="E-mail"
          v-model="email" />
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <button
          :class="`btn btn-${buttonColor} pull-right`">
          Enviar
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <router-link
          class="pull-left"
          :to="{ name: 'login' }">
          Voltar
        </router-link>
      </div>
    </div>
  </form>
</template>

<script>
import utils from '@/shared/utils'

import Input from '@/components/shared/Input'

export default {
  name: 'LoginForgotPassword',
  data () {
    return {
      email: null,
      loading: false,
      buttonColor: this.$parent.buttonColor
    }
  },
  methods: {
    forgotPasswordRequest () {
      this.loadingSet(true)
      this.$api.user.recoverPassword({ email: this.email })
        .then(data => {
          this.loadingSet(false)
          if (data.success) {
            this.$notify.info('Verifique seu email para fazer a alteração de senha')
            this.$router.push('/login')
          } else utils.handleApiError(data, 'pedir a alteração de senha')
        })
        .catch(() => { this.loadingSet(false) })
    },
    loadingSet (value) {
      this.loading = value
      this.$parent.$emit('loading', value, 'Enviando...')
    }
  },
  components: {
    Input
  }
}
</script>
