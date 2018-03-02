<template>
  <div>
    <h1>{{ msg }}</h1>

    <h2>Demonstração de mensagens</h2>
    <button type="button" @click="notify.success('sucesso <i class=\'material-icons\'>thumb_up</i>')">sucesso!</button>
    <button type="button" @click="notify.warning('atenção')">atenção</button>
    <button type="button" @click="notify.info('informação')">informação</button>
    <button type="button" @click="notify.danger('erro')">erro!</button>
    <button type="button" @click="outro">outro</button>
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
    }
  }
}
</script>

<style scoped>
</style>
