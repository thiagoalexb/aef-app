<template>
  <div class="col-md-12">

    <div class="card">
      <div class="card-header" data-background-color="red">
        <router-link :to="{ name: 'lessonAdd' }" class="pull-right">
          <i class="material-icons">add</i>
        </router-link>

        <h4 class="title">Aulas</h4>
        <p class="category">
          Aulas e relações com níveis, módulos ou semanas especiais
          usadas na montagem do calendário
        </p>
      </div>
      <div class="card-content table-responsive">
        <table class="table">
          <thead class="text-primary">
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>

            <tr
              v-for="l in lessons"
              :key="l.id"
              v-show="lessons && lessons.length">
              <td>
                <i
                  class="material-icons info"
                  :title="l.typeDescription"
                  rel="tooltip"
                  data-placement="top">info</i>
                &nbsp;
                {{l | formatLesson}}
                <i v-if="l.type === 'aula' && l.subTitle">
                  <small>| {{l.subTitle}}</small>
                </i>
              </td>
              <td>{{l.description}}</td>
              <td class="td-actions">
                <button
                  type="button"
                  class="btn btn-simple"
                  v-show="['fase', 'semana-especial', 'modulo'].includes(l.type)">
                  <i class="material-icons">arrow_drop_down</i>
                </button>
                <router-link
                  :to="{ name: 'lessonEdit', params: { id: l.id, type: l.type, lesson: l } }"
                  class="btn btn-simple">
                  <i class="material-icons">edit</i>
                </router-link>
                <button
                  type="button"
                  class="btn btn-danger btn-simple"
                  @click="remove(l)">
                  <i class="material-icons">delete</i>
                </button>
              </td>
            </tr>

            <tr
              class="text-center"
              v-show="!lessons">
                <td colspan="4">Carregando...</td>
              </tr>

            <tr
              class="text-center"
              v-show="lessons && !lessons.length">
              <td colspan="4">Nenhum usuário cadastrado</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/shared/utils'

export default {
  name: 'Lesson',
  data () {
    return {
      lessons: null,
      removing: false
    }
  },
  created () {
    this.$api.lesson.getAll()
      .then(data => {
        this.lessons = data
        this.lessons.forEach(l => this.setType(l))
      })
  },
  methods: {
    remove (model) {
      this.removing = true
      this.$notify.info(`Excluindo ${model.name} ${model.lastName}...`)
      this.$api.lesson.delete({ id: model.id })
        .then(data => {
          this.removing = false
          if (data.success) {
            this.model = this.lessons.filter(u => u.id !== model.id)
            this.$notify.success('Aula excluída com sucesso')
            this.$notify.undo('Aula excluida!', this.restore.bind(this, model))
          } else utils.handleApiError(data, 'excluir aula')
        })
        .catch(() => { this.removing = false })
    },
    restore (model) {
      this.$notify.info('Restaurando aula...')
      this.$api.lesson.restore({ id: model.id })
        .then(data => {
          if (data.success) {
            this.lessons.push(model)
            this.$notify.success('Aula restaurada com sucesso!')
          } else utils.handleApiError(data, 'restaurar aula')
        })
    },
    setType (model) {
      if ('name' in model) {
        model.type = 'fase'
        model.typeDescription = 'Fase'
      } else if ('code' in model) {
        model.type = 'aula'
        model.typeDescription = 'Aula'
      } else if ('faseId' in model) {
        model.type = 'modulo'
        model.typeDescription = 'Módulo'
      } else {
        model.type = 'semana-especial'
        model.typeDescription = 'Semana especial'
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.lessons === null) { // loading
      this.$api.cancel.lesson.getAll()
    }
    next()
  },
  filters: {
    formatLesson (model) {
      if (!model) return null
      else if (model.type === 'fase') return model.name
      else if (model.type === 'semana-especial') return model.title
      // lesson
      else return `${model.code} - ${model.title}`
    }
  }
}
</script>

<style lang="sass" scoped>
@import ../../assets/scss/_colors.scss

table td i.info
  vertical-align: bottom
  color: $blue
  cursor: help
</style>
