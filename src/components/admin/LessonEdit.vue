<template>
  <div class="row">

    <div class="col-md-8 col-md-offset-2">
      <div class="card">
        <div class="card-header" data-background-color="red">
          <h4 class="title">{{isAdd ? 'Adicionar aula' : 'Atualizar aula'}}</h4>
          <p class="category">Formulário de {{isAdd ? 'inclusão' : 'alteração'}} de aula</p>
          <b v-show="loading">Carregando...</b>
          <b v-show="saving">Salvando...</b>
        </div>

        <div class="card-content">
          <form @submit.prevent="isAdd ? add() : update()">

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
                  v-model="relation" />
              </div>
              <div class="col-md-4">
                <Radio
                  label="Semana especial"
                  :disabled="loading || saving"
                  value="specialWeek"
                  v-model="relation" />
              </div>
              <div class="col-md-4">
                <Radio
                  label="Nenhum"
                  :disabled="loading || saving"
                  value="none"
                  v-model="relation" />
              </div>
            </div>

            <section v-show="relation === 'fase'">
              <div class="row">
                <div :class="model.fase.id === null ? 'col-md-5' : 'col-md-6'">
                  <Autocomplete
                    label="Nome fase"
                    :disabled="loading || saving"
                    v-model="model.fase"
                    :items="fases"
                    item-label="name"
                    :select-not-found="true"
                    v-validation="validation.fase.name || localValidation.fase.name"
                    v-validation.warning.icon-add="model.fase.id === null ? `Fase \'${model.fase.name}\' não existe!`: false" />
                </div>
                <div class="col-md-1" v-show="model.fase.id === null">
                  <button
                    type="button"
                    class="btn btn-xs btn-just-icon btn-round btn-success"
                    rel="tooltip"
                    data-placement="top"
                    title="Adicionar"
                    :disabled="saving">
                    <i class="material-icons">add</i>
                  </button>
                </div>
                <div :class="model.module.id === null ? 'col-md-5' : 'col-md-6'">
                  <Autocomplete
                    label="Nome módulo"
                    :disabled="loading || saving"
                    v-model="model.module"
                    :items="modules"
                    item-label="name"
                    :select-not-found="true"
                    v-validation="validation.module.name || localValidation.module.name"
                    v-validation.warning.icon-add="model.module.id === null ? `Módulo \'${model.module.name}\' não existe!`: false" />
                </div>
                <div class="col-md-1" v-show="model.module.id === null">
                  <button
                    type="button"
                    class="btn btn-xs btn-just-icon btn-round btn-success"
                    rel="tooltip"
                    data-placement="top"
                    title="Adicionar"
                    :disabled="saving">
                    <i class="material-icons">add</i>
                  </button>
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

            <section v-show="relation === 'specialWeek'">
              <div class="row">
                <div class="col-md-10">
                  <Autocomplete
                    label="Título semana especial"
                    :disabled="loading || saving"
                    v-model="model.specialWeek"
                    :items="specialWeeks"
                    item-label="title"
                    :select-not-found="true"
                    v-validation="validation.specialWeek.title || localValidation.specialWeek.title"
                    v-validation.warning.icon-add="model.specialWeek.id === null ? `Semana especial \'${model.specialWeek.title}\' não existe!`: false" />
                </div>
                <div class="col-md-1" v-show="model.specialWeek.id === null">
                  <button
                    type="button"
                    class="btn btn-xs btn-just-icon btn-round btn-success"
                    rel="tooltip"
                    data-placement="top"
                    title="Adicionar"
                    :disabled="saving">
                    <i class="material-icons">add</i>
                  </button>
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
              <div class="col-md-9">
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

              <div class="col-md-3">
                <button
                  type="submit"
                  class="btn btn-success pull-right"
                  :disabled="loading || saving || !relationValid">
                  {{isAdd ? 'Adicionar' : 'Atualizar' }}
                </button>
              </div>

            </div>

            <div v-show="!(relation === 'none')" class="col-md-12">
              <div class="card">
                <div class="card-header" data-background-color="red">
                  <h4>Aulas {{relation === 'fase' ? 'do módulo' : 'da semana especial'}}</h4>
                  <!-- <p class="category"></p> -->
                </div>
                <div class="card-content table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Título</th>
                        <th>Subtítulo</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="l in lessons"
                        :key="l.id">
                        <td>{{l.code}}</td>
                        <td>{{l.title}}</td>
                        <td>{{l.subTitle}}</td>
                        <td class="td-actions">
                          <button
                            type="button"
                            @click="updateLesson(l)"
                            class="btn btn-simple btn-warning btn-sm btn-xs">
                            <i class="material-icons">edit</i>
                          </button>
                          <button
                            type="button"
                            @click="removeLesson(l)"
                            class="btn btn-simple btn-danger btn-sm btn-xs">
                            <i class="material-icons">delete</i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <router-link
              :to="{ name: 'lesson' }"
              class="btn btn-simple pull-left">
              <i class="material-icons">chevron_left</i>
              Voltar
            </router-link>

          </form>

          <div class="clearfix"></div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import Input from '@/components/shared/Input'
import Radio from '@/components/shared/Radio'
import Autocomplete from '@/components/shared/Autocomplete'

import _ from 'lodash'

import validation from '@/shared/validationDirective'

import utils from '@/shared/utils'

const emptyLessonModel = { fase: {}, module: {}, specialWeek: {} }

export default {
  name: 'LessonEdit',
  props: {
    id: {
      type: String,
      default: null
    },
    type: {
      type: String,
      validator: value => [
        'fase',
        'modulo',
        'semana-especial',
        'aula'
      ].includes(value)
    },
    lesson: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      isAdd: false,
      submited: false,
      loading: false,
      saving: false,
      relation: 'none',
      model: _.clone(emptyLessonModel),
      validation: _.clone(emptyLessonModel),
      modules: [],
      fases: [],
      specialWeeks: [],
      lessons: []
    }
  },
  created () {
    for (let i = 1; i <= 10; i++) {
      this.modules.push({ id: i, name: `module ${i}` })
      this.fases.push({ id: i, name: `fase ${i}` })
      this.specialWeeks.push({ id: i, title: `special week ${i}` })
      if (i < 4) this.lessons.push({ id: i, title: `aula ${i}` })
    }

    this.isAdd = this.$route.name === 'lessonAdd'

    // define relation
    switch (this.type) {
      case 'modulo':
        this.relation = 'fase'
        break
      case 'semana-especial':
        this.relation = 'specialWeek'
        break
      case 'fase':
        this.relation = 'fase'
        break
    }

    const populateModel = lesson => {
      const autocompleteId = _.pick(lesson, 'id')
      switch (this.type) {
        case 'aula':
          lesson.fase = {}
          lesson.module = {}
          lesson.specialWeek = {}
          this.model = lesson

          if (this.type === 'aula') {
            if (this.model.faseId) this.relation = 'fase'
            else if (this.model.specialWeekId) this.relation = 'specialWeek'
            else this.relation = 'none'
          }
          break
        case 'modulo':
          this.model.module = autocompleteId
          break
        case 'semana-especial':
          this.model.specialWeek = autocompleteId
          break
        case 'fase':
          this.model.fase = autocompleteId
          break
      }
    }

    if (this.lesson && this.lesson.id) {
      populateModel(this.lesson)

      utils.convertDateInObject(this.model)
    } else if (this.type === 'aula' && this.id) {
      this.loading = true
      this.$api.lesson.getById({ id: this.id })
        .then(data => {
          this.loading = false
          if (data.success) {
            data.data = utils.convertDateInObject(data.data)
            populateModel(data.data)
          } else utils.handleApiError(data, 'buscar aula')
        })
        .catch(() => { this.loading = false })
    }
  },
  methods: {
    add () {
      this.submited = true
      this.saving = true
      this.$api.lesson.add(this.model)
        .then(data => {
          this.saving = false
          if (data.success) {
            this.$notify.success('Aula salva com sucesso')
            this.$router.push({ name: 'lesson' })
          } else utils.handleApiError(data, 'salvar aula')
        })
        .catch(() => { this.saving = false })
    },
    update () {
      this.submited = true
      this.saving = true
      this.$api.lesson.update(this.model)
        .then(data => {
          this.saving = false
          if (data.success) {
            this.$notify.success('Aula salva com sucesso')
            this.$router.push({ name: 'lesson' })
          } else utils.handleApiError(data, 'salvar aula')
        })
        .catch(() => { this.saving = false })
    },
    updateLesson (c) {
      this.model = c
    },
    removeLesson (c) {
      this.saving = true
      this.$api.lesson.delete({ id: c.id })
        .then(data => {
          if (data.success) {
            this.$notify.undo('Aula removida', this.restoreLesson.bind(this, c))
            this.lessons = this.lessons.filter(cl => cl.id !== c.id)
          } else utils.handleApiError(data, 'remover aula')
        })
    }
  },
  computed: {
    relationValid () {
      if (!this.submited) return true

      switch (this.relation) {
        case 'fase':
          return !!this.model.fase.id && !!this.model.module.id
        case 'specialWeek':
          return !!this.model.specialWeek.id
        default:
          return true
      }
    },
    localValidation () {
      const validation = { fase: {}, module: {}, specialWeek: {} }

      if (!this.submited) return validation

      validation.fase.name = this.model.fase.id !== null ? 'Selecione uma fase!' : ''
      validation.module.name = this.model.module.id !== null ? 'Selecione um módulo!' : ''
      validation.specialWeek.title = this.model.specialWeek.id !== null ? 'Selecione uma semana especial!' : ''

      return validation
    }
  },
  components: {
    Input,
    Radio,
    Autocomplete
  },
  directives: {
    validation
  }
}
</script>
