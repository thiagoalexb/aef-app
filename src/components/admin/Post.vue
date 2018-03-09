<template>
  <div>
    <h1>Postagens</h1>

    <div class="col-md-4">
      <Checkbox
        label="Teste um só"
        v-model="umSoh" />
      Um só: {{umSoh}}
      <br>
      <br>
      <Checkbox
        label="João"
        value="João"
        v-model="names" />
      <Checkbox
        label="José"
        value="José"
        v-model="names" />
      <Checkbox
        label="Maria"
        value="Maria"
        v-model="names" />
      Selected: {{names}}
      <br>
      <br>

      <label>
      <input
        type="checkbox"
        value="besta"
        v-model="coisas" />
        besta
      </label>
      <br>
      <label>
      <input
        type="checkbox"
        value="beliche"
        v-model="coisas" />
        beliche
      </label>
      <br>
      <label>
      <input
        type="checkbox"
        value="coisa"
        v-model="coisas" />
        coisa
      </label>
      <br>
      Selected: {{coisas}}
      <br>
      <br>

      <Radio
        label="1"
        value="1"
        v-model="numbers" />
      <Radio
        label="2"
        value="2"
        v-model="numbers" />
      <Radio
        label="3"
        value="3"
        v-model="numbers" />
      <Radio
        label="4"
        value="4"
        v-model="numbers" />
      Numbers: {{numbers}}
      <br>
      <br>

      <label>
        <input type="radio" value="1" v-model="nums">
        1
      </label>
      <br>
      <label>
        <input type="radio" value="2" v-model="nums">
        2
      </label>
      <br>
      <label>
        <input type="radio" value="3" v-model="nums">
        3
      </label>
      <br>
      Nums: {{nums}}
    </div>

    <div class="col-md-6">
      <div class="row">
        <Input
          state="error"
          label="Input with error"
          v-model="errorInput"
          message="oh no! there's an error!" />
      </div>
      <div class="row">
        <Input
          state="success"
          label="Input with success"
          v-model="successInput"
          message="owww right!" />
      </div>
      <div class="row">
        <Input
          state="info"
          label="Input with info"
          v-model="infoInput"
          message="read the information, it's very important" />
      </div>
      <div class="row">
        <Input
          state="warning"
          label="Input with warning"
          v-model="warningInput"
          message="Caution! Warning! Watch out mein!" />
      </div>
    </div>
  </div>
</template>

<script>
import Input from '@/components/shared/Input'
import Checkbox from '@/components/shared/Checkbox'
import Radio from '@/components/shared/Radio'

export default {
  name: 'Post',
  data () {
    return {
      names: [],
      coisas: [],
      numbers: null,
      nums: null,
      umSoh: false,
      errorInput: null,
      infoInput: null,
      warningInput: null,
      successInput: null
    }
  },
  components: {
    Input,
    Checkbox,
    Radio
  }
}
</script>

<style scoped>
</style>
