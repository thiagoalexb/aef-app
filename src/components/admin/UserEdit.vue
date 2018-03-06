<template>
  <div class="row">

    <div class="col-md-8">
      <div class="card">

        <div class="card-header" data-background-color="purple">
          <h4 class="title">Edit Profile</h4>
          <p class="category">Complete your profile</p>
        </div>

        <div class="card-content">
          <form>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group label-floating">
                  <label class="control-label">Id</label>
                  <span>{{user.id}}</span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="form-group label-floating">
                  <label class="control-label">Login</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.username">
                </div>
              </div>
            <div class="col-md-8">
                <div class="form-group label-floating">
                  <label class="control-label">E-mail</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="user.email">
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
                    v-model="user.firstName">
                </div>
              </div>
              <div class="col-md-8">
                <div class="form-group label-floating">
                  <label class="control-label">Sobrenome</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.lastName">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8">
                <div class="form-group label-floating">
                  <label class="control-label">Data de Nascimento</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.dateOfBirth">
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

            <button type="submit" class="btn btn-primary pull-right">
              Update Profile
            </button>

            <div class="clearfix"></div>
          </form>
        </div>

      </div>
    </div>

    <div class="col-md-4">
      <div class="card card-profile">
        <div class="card-avatar">
          <a href="#pablo">
            <img class="img" />
          </a>
        </div>
        <div class="content">
          <h6 class="category text-gray">CEO / Co-Founder</h6>
          <h4 class="card-title">Alec Thompson</h4>
          <p class="card-content">
            Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
          </p>
          <a href="#pablo" class="btn btn-primary btn-round">Follow</a>
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
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  created () {
    utils.convertDateInObject(this.user)
  }
}
</script>

<style scoped>
</style>
