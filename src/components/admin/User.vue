<template>
  <div class="col-md-12">

    <div class="card">
      <div class="card-header" data-background-color="blue">
        <router-link :to="{ name: 'userAdd' }" class="pull-right">
          <i class="material-icons">add</i>
        </router-link>

        <h4 class="title">Usuários</h4>
        <p class="category">Usuário com permissão de acesso ao sistema</p>
      </div>
      <div class="card-content table-responsive">
        <table class="table">
          <thead class="text-primary">
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Data de nascimento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>

            <tr
              v-for="user in users"
              :key="user.id"
              :title="user.isVerified ? null : 'Email ainda não verificado!'"
              :class="{'danger': !user.isVerified}"
              v-show="users && users.length">
              <td>{{`${user.firstName} ${user.lastName}`}}</td>
              <td>{{user.email}}</td>
              <td>{{user.dateOfBirth | date}}</td>
              <td>
                <router-link
                  :to="{ name: 'userEdit', params: { id: user.id, user: user } }"
                  class="btn btn-simple">
                  <i class="material-icons">edit</i>
                </router-link>
                <button
                  type="button"
                  class="btn btn-danger btn-simple"
                  @click="remove(user)">
                  <i class="material-icons">delete</i>
                </button>
              </td>
            </tr>

            <tr
              class="text-center"
              v-show="!users">
                <td colspan="4">Carregando...</td>
              </tr>

            <tr
              class="text-center"
              v-show="users && !users.length">
              <td colspan="4">Nenhum usuário cadastrado</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { date } from '@/shared/filters'
import utils from '@/shared/utils'

export default {
  name: 'User',
  data () {
    return {
      users: null,
      userRemove: null,
      removing: false
    }
  },
  created () {
    this.$api.user.getAll()
      .then(data => {
        this.users = data
      })
  },
  methods: {
    remove (user) {
      this.removing = true
      this.$notify.info(`Excluindo ${user.firstName} ${user.lastName}...`)
      this.$api.user.delete({ id: user.id })
        .then(data => {
          this.removing = false
          if (data.success) {
            this.users = this.users.filter(u => u.id !== this.userRemove.id)
            this.$notify.success('Usuário excluído com sucesso')
            this.$notify.undo('Usuário excluido!', this.restore)
          } else utils.handleApiError(data, 'excluir usuário')
        })
        .catch(() => { this.removing = false })
    },
    restore (id) {
      // this.$api.user.update({ id, deleted: false })
      alert('Deveria restaurar o cara ' + id)
    }
  },
  filters: {
    date
  }
}
</script>
