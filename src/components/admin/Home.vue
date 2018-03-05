<template>
  <div>
    <h1>{{ msg }}</h1>

    <h2>Demonstração de mensagens</h2>
    <button
      type="button"
      class="btn btn-success"
      @click="notify.success('sucesso <i class=\'material-icons\'>thumb_up</i>')">
      sucesso!</button>
    <button
      type="button"
      class="btn btn-warning"
      @click="notify.warning('atenção')">
      atenção
    </button>
    <button
      type="button"
      class="btn btn-info"
      @click="notify.info('informação')">
      informação
    </button>
    <button
      type="button"
      class="btn btn-danger"
      @click="notify.danger('erro <i class=\'material-icons\'>thumb_down</i>')">
      erro!
    </button>
    <button
      type="button"
      class="btn btn-default"
      @click="outro">
      outro
    </button>
     <button
      type="button"
      class="btn btn-primary"
      @click="novo">
      novo uso
    </button>
  </div>
</template>

<script>
import notify from '@/shared/notify'

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to our Vue.js AEF Curitiba App',
      notify
    }
  },
  methods: {
    outro () {
      notify.other(
        '<h4>hello <b>world</b>!</h4><i class="material-icons">language</i>',
        undefined, // icon (leave default using undefined)
        10000 // time
      )
      console.log(notify)
    },
    novo () {
      this.$notify.success('novo <b>uso!</b> :)')
    }
  }
}
</script>

<style scoped>
</style>
