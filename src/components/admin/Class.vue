<template>
  <div class="col-md-12">

    <div class="card">
      <div class="card-header" data-background-color="red">
        <router-link :to="{ name: 'classAdd' }" class="pull-right">
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
              <th>Aula</th>
              <th>Descrição</th>
              <th>Fase / semana</th>
              <th>Módulo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>

            <tr
              v-for="c in classes"
              :key="c.id"
              v-show="classes && classes.length">
              <td>{{c | formatClass}}</td>
              <td>{{c.description}}</td>
              <td>{{c.fase ? c.fase.name : (c.specialWeek ? c.specialWeek.title : null)}}</td>
              <td>{{c.module ? c.name : null}}</td>
              <td>
                <router-link
                  :to="{ name: 'classEdit', params: { id: c.id, lesson: c } }"
                  class="btn btn-simple">
                  <i class="material-icons">edit</i>
                </router-link>
                <button
                  type="button"
                  class="btn btn-danger btn-simple"
                  @click="remove(c)">
                  <i class="material-icons">delete</i>
                </button>
              </td>
            </tr>

            <tr
              class="text-center"
              v-show="!classes">
                <td colspan="4">Carregando...</td>
              </tr>

            <tr
              class="text-center"
              v-show="classes && !classes.length">
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
  name: 'Class',
  data () {
    return {
      classes: null,
      removing: false
    }
  },
  created () {
    this.$api.lesson.getAll()
      .then(data => {
        this.classes = data
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
            this.model = this.classes.filter(u => u.id !== model.id)
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
            this.classes.push(model)
            this.$notify.success('Aula restaurada com sucesso!')
          } else utils.handleApiError(data, 'restaurar aula')
        })
    }
  },
  filters: {
    formatClass (model) {
      return `${model.code} - ${model.title}${model.subTitle ? ' - ' : ''}${model.subTitle}`
    }
  }
}
</script>
