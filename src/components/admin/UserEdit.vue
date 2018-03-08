<template>
  <div class="row">

    <div class="col-md-8 col-md-offset-2">
      <div class="card">
        <div class="card-header" data-background-color="blue">
          <h4 class="title">{{isAdd ? 'Cadastrar usuário' : 'Alterar usuário'}}</h4>
          <p class="category">Formulário de {{isAdd ? 'inclusão' : 'alteração'}} de usuário</p>
          <b v-show="loading">Carregando...</b>
          <b v-show="saving">Salvando...</b>
        </div>

        <div class="card-content">
          <form @submit="isAdd ? add() : update()">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group label-floating">
                  <label class="control-label">E-mail</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="user.email"
                    :disabled="loading || saving">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="form-group label-floating">
                  <label class="control-label">Nome</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.firstName"
                    :disabled="loading || saving">
                </div>
              </div>
              <div class="col-md-8">
                <div class="form-group label-floating">
                  <label class="control-label">Sobrenome</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.lastName"
                    :disabled="loading || saving">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8">
                <div class="form-group label-floating">
                  <label class="control-label">Data de Nascimento</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="user.dateOfBirth"
                    :disabled="loading || saving">
                </div>
              </div>
              <div class="col-md-2"></div>
              <div class="col-md-2">
                <div class="form-group label-floating">
                  <label class="control-label">E-mail confirmado</label>
                  <input
                    type="checkbox"
                    class="form-control"
                    disabled
                    v-model="user.isVerified">
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-success pull-right"
              :disabled="loading || saving">
              {{isAdd ? 'Cadastrar' : 'Atualizar' }}
            </button>
            <router-link to="/user" class="btn btn-link pull-right">Voltar</router-link>

            <div class="clearfix"></div>
          </form>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import utils from '@/shared/utils'

export default {
  name: 'UserEdit',
  props: {
    id: {
      type: String,
      default: null
    },
    user: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isAdd: false,
      loading: false,
      saving: false
    }
  },
  created () {
    if (this.$attrs.add) this.isAdd = this.$attrs.add
    if (this.user.id) utils.convertDateInObject(this.user)
    else if (this.id) {
      this.loading = true
      this.$api.user.getById({ id: this.id })
        .then(data => {
          this.loading = false
          if (data.success) this.user = data.data
          else utils.handleApiError(data, 'buscar usuário')
        })
        .catch(() => { this.loading = false })
    }
  },
  methods: {
    add () {
      this.saving = true
      this.$api.user.add(this.user)
        .then(data => {
          this.saving = false
          if (data.success) {
            this.$notify.success('Usuário salvo com sucesso')
            this.$router.push('/user')
          } else utils.handleApiError(data, 'salvar usuário')
        })
        .catch(() => { this.saving = false })
    },
    update () {
      this.$api.user.update(this.user)
        .then(data => {
          this.saving = false
          if (data.success) {
            this.$notify.success('Usuário salvo com sucesso')
            this.$router.push('/user')
          } else utils.handleApiError(data, 'salvar usuário')
        })
        .catch(() => { this.saving = false })
    }
  }
}
</script>

<style scoped>
</style>
