<template>
  <div class="row">

    <div class="col-md-8 col-md-offset-2">
      <div class="card">
        <div class="card-header" data-background-color="blue">
          <h4 class="title">{{isAdd ? 'Adicionar aula' : 'Atualizar aula'}}</h4>
          <p class="category">Formulário de {{isAdd ? 'inclusão' : 'alteração'}} de aula</p>
          <b v-show="loading">Carregando...</b>
          <b v-show="saving">Salvando...</b>
        </div>

        <div class="card-content">
          <form @submit.prevent="isAdd ? add() : update()">

            <div class="row">
              <div class="col-md-2">
                <Input
                  label="Código aula"
                  type="number"
                  :disabled="loading || saving"
                  v-model="model.code"
                  v-validation="validation.code" />
              </div>
              <div class="col-md-4">
                <Input
                  label="Título aula"
                  :disabled="loading || saving"
                  v-model="model.title"
                  v-validation="validation.title" />
              </div>
              <div class="col-md-6">
                <Input
                  label="Subtítulo aula"
                  :disabled="loading || saving"
                  v-model="model.subTitle"
                  v-validation="validation.subTitle" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group label-floating form-info"
                  v-validation="validation.description">
                  <label class="control-label">Descrição aula</label>
                  <textarea
                    class="form-control"
                    :disabled="loading || saving"
                    v-model="model.description">
                  </textarea>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <label>Tipo de vínculo aula:</label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <Radio
                  label="Fase"
                  :disabled="loading || saving"
                  value="fase"
                  v-model="model.relation" />
              </div>
              <div class="col-md-4">
                <Radio
                  label="Semana especial"
                  :disabled="loading || saving"
                  value="specialWeek"
                  v-model="model.relation" />
              </div>
              <div class="col-md-4">
                <Radio
                  label="Nenhum"
                  :disabled="loading || saving"
                  value="none"
                  v-model="model.relation" />
              </div>
            </div>

            <section v-show="model.relation === 'fase'">
              <div class="row">
                <div class="col-md-6">
                  <Input
                    label="Nome módulo"
                    :disabled="loading || saving"
                    v-model="model.module.name"
                    v-validation="validation.module.name" />
                </div>
                <div class="col-md-6">
                  <Input
                    label="Nome fase"
                    :disabled="loading || saving"
                    v-model="model.fase.name"
                    v-validation="validation.fase.name" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group label-floating form-info"
                    v-validation="validation.module.description">
                    <label class="control-label">Descrição módulo</label>
                    <textarea
                      class="form-control"
                      :disabled="loading || saving"
                      v-model="model.module.description">
                    </textarea>
                  </div>
                </div>
              </div>
            </section>

            <section v-show="model.relation === 'specialWeek'">
              <div class="row">
                <div class="col-md-6">
                  <Input
                    label="Título semana especial"
                    :disabled="loading || saving"
                    v-model="model.specialWeek.title"
                    v-validation="validation.specialWeek.title" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group label-floating form-info"
                    v-validation="validation.specialWeek.description">
                    <label class="control-label">Descrição semana especial</label>
                    <textarea
                      class="form-control"
                      :disabled="loading || saving"
                      v-model="model.specialWeek.description">
                    </textarea>
                  </div>
                </div>
              </div>
            </section>

            <button
              type="submit"
              class="btn btn-success pull-right"
              :disabled="loading || saving">
              {{isAdd ? 'Adicionar' : 'Atualizar' }}
            </button>
            <router-link :to="{ name: 'class' }" class="btn btn-link pull-right">Voltar</router-link>

            <div class="clearfix"></div>

          </form>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import Input from '@/components/shared/Input'
import Radio from '@/components/shared/Radio'

import validation from '@/shared/validationDirective'

import utils from '@/shared/utils'

export default {
  name: 'ClassEdit',
  props: {
    id: {
      type: String,
      default: null
    },
    lesson: {
      type: Object,
      default: () => ({ relation: 'none', fase: {}, module: {}, specialWeek: {} })
    }
  },
  data () {
    return {
      isAdd: false,
      loading: false,
      saving: false,
      model: this.lesson,
      validation: { fase: {}, module: {}, specialWeek: {} }
    }
  },
  created () {
    this.isAdd = this.$route.name === 'classAdd'

    if (this.model.id) {
      utils.convertDateInObject(this.model)
      this.defineRelation()
    } else if (this.id) {
      this.loading = true
      this.$api.lesson.getById({ id: this.id })
        .then(data => {
          this.loading = false
          if (data.success) {
            this.model = utils.convertDateInObject(data.data)
            this.defineRelation()
          } else utils.handleApiError(data, 'buscar aula')
        })
        .catch(() => { this.loading = false })
    }
  },
  methods: {
    defineRelation () {
      if (this.model.moduleId) this.model.relation = 'fase'
      else if (this.model.specialWeekId) this.model.relation = 'specialWeek'
      else this.model.relation = 'none'
    },
    add () {
      this.saving = true
      this.$api.lesson.add(this.model)
        .then(data => {
          this.saving = false
          if (data.success) {
            this.$notify.success('Aula salva com sucesso')
            this.$router.push({ name: 'class' })
          } else utils.handleApiError(data, 'salvar aula')
        })
        .catch(() => { this.saving = false })
    },
    update () {
      this.saving = true
      this.$api.lesson.update(this.model)
        .then(data => {
          this.saving = false
          if (data.success) {
            this.$notify.success('Aula salva com sucesso')
            this.$router.push({ name: 'class' })
          } else utils.handleApiError(data, 'salvar aula')
        })
        .catch(() => { this.saving = false })
    }
  },
  components: {
    Input,
    Radio
  },
  directives: {
    validation
  }
}
</script>
