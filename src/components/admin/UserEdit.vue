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
          <form @submit.prevent="isAdd ? add() : update()">
            <div class="row">
              <div class="col-md-6">
                <Input
                  label="E-mail"
                  type="email"
                  :disabled="loading || saving"
                  v-model="model.email" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <Input
                  label="Nome"
                  :disabled="loading || saving"
                  v-model="model.firstName" />
              </div>
              <div class="col-md-8">
                <Input
                  label="Sobrenome"
                  :disabled="loading || saving"
                  v-model="model.lastName" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-8">
                <div class="form-group label-floating">
                  <DateInput
                    label="Data de nascimento"
                    type="date"
                    :disabled="loading || saving"
                    v-model="model.dateOfBirth" />
                </div>
              </div>
              <div class="col-md-1"></div>
              <div class="col-md-3">
                <Checkbox
                  label="E-mail confirmado"
                  disabled
                  v-model="model.isVerified" />
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
import Input from '@/components/shared/Input'
import DateInput from '@/components/shared/DateInput'
import Checkbox from '@/components/shared/Checkbox'
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
      saving: false,
      model: this.user
    }
  },
  created () {
    if (this.$attrs.add) this.isAdd = this.$attrs.add
    if (this.model.id) utils.convertDateInObject(this.model)
    else if (this.id) {
      this.loading = true
      this.$api.user.getById({ id: this.id })
        .then(data => {
          this.loading = false
          if (data.success) this.model = utils.convertDateInObject(data.data)
          else utils.handleApiError(data, 'buscar usuário')
        })
        .catch(() => { this.loading = false })
    }
  },
  methods: {
    add () {
      this.saving = true
      this.$api.user.add(this.model)
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
      this.saving = true
      this.$api.user.update(this.model)
        .then(data => {
          this.saving = false
          if (data.success) {
            this.$notify.success('Usuário salvo com sucesso')
            this.$router.push('/user')
          } else utils.handleApiError(data, 'salvar usuário')
        })
        .catch(() => { this.saving = false })
    }
  },
  components: {
    Input,
    Checkbox,
    DateInput
  }
}
</script>

<style scoped>
</style>
