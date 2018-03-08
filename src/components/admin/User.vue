<template>
  <div class="col-md-12">
    <Modal
      id="remove-user"
      size="sm"
      closeButtonText="Não"
      :footerCenter="true"
      ref="modalRemove">
      <h4 slot="header" class="modal-title">{{removing ? 'Removendo...' : 'Remover usuário'}}</h4>
      <button
        slot="footer"
        class="btn btn-danger"
        :disabled="removing"
        @click="remove">
        Sim
      </button>
    </Modal>

    <div class="card">
      <div class="card-header" data-background-color="blue">
        <router-link to="/user/add" class="pull-right">
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
                  :to="{ name: 'UserEdit', params: { id: user.id, user: user } }"
                  class="btn">
                  <i class="material-icons">edit</i>
                </router-link>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="removeId = user.id; $refs.modalRemove.show()">
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
import Modal from '@/components/shared/Modal'

export default {
  name: 'User',
  data () {
    return {
      users: null,
      removeId: null,
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
    remove () {
      this.removing = true
      this.$api.user.delete({ id: this.removeId })
        .then(data => {
          this.removing = false
          if (data.success) {
            this.users = this.users.filter(u => u.id !== this.removeId)
            this.$notify.success('Usuário excluído com sucesso')
            this.$refs.modalRemove.hide()
          } else utils.handleApiError(data, 'excluir usuário')
        })
        .catch(() => { this.removing = false })
    }
  },
  components: {
    Modal
  },
  filters: {
    date
  }
}
</script>

<style scoped>
</style>
