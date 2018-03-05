<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header" data-background-color="blue">
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
              v-for='user in users'
              :key="user.id"
              :title="user.isVerified ? null : 'Email ainda não verificado!'"
              :class="{'danger': !user.isVerified}"
              v-if="users.length">
              <td>{{`${user.firstName} ${user.lastName}`}}</td>
              <td>{{user.email}}</td>
              <td>{{user.dateOfBith}}</td>
              <td>
                <router-link
                  :to="{ path: '/user/edit/', params: { id: user.id } }"
                  class="btn">
                  <i class="material-icons">edit</i>
                </router-link>
                <button class="btn btn-warning">
                  <i class="material-icons">trash</i>
                </button>
              </td>
            </tr>

            <tr
              v-else>
              <td colspan="4">Nenhum usuário cadastrado</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      users: []
    }
  },
  created () {
    this.$api.user.getAll().then(data => {
      this.users = data
    })
  }
}
</script>

<style scoped>
</style>
