<template>
  <div class="row">

    <div class="col-md-4 col-md-offset-3">
      <div class="card">
        <div class="card-header" :data-background-color="color">
          <img
            src="@/../static/favicon64.png"
            alt="aef logo"
            style="width: 64px; margin-right: 15px;"
            class="pull-left">
            <b class="pull-right" v-show="loading">{{loadingText}}</b>
            <h4 class="title">{{$route.meta.title}}</h4>
            <p class="category">{{$route.meta.subTitle}}</p>
        </div>

        <div class="card-content">

          <router-view></router-view>

          <div class="clearfix"></div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import utils from '@/shared/utils'
import * as authentication from '@/shared/authentication'

export default {
  name: 'Login',
  data () {
    return {
      color: utils.randomAefColors(),
      loading: false,
      loadingText: null
    }
  },
  computed: {
    buttonColor () {
      let c2 = utils.randomAefColors()
      while (this.color === c2) {
        c2 = utils.randomAefColors()
      }
      return ({ orange: 'warning', blue: 'info', red: 'danger' })[c2]
    }
  },
  created () {
    if (this.$route.path === '/logoff') {
      authentication.logoff()
      this.$router.push('/login')
    }

    this.$on('loading', (loading, text) => {
      this.loading = loading
      this.loadingText = text
    })
  }
}
</script>

<style scoped>
</style>
