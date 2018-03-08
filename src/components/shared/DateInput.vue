<template lang="html">
  <Input
    type="date"
    :label="label"
    :disabled="disabled"
    v-model="date" />
</template>

<script>
import Input from '@/components/shared/Input'

export default {
  props: {
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Date,
      default: null
    }
  },
  computed: {
    date: {
      get () {
        return this.value ? this.value.toJSON().substring(0, 10) : this.value
      },
      set (value) {
        this.$emit('input', new Date(value))
      }
    }
  },
  components: {
    Input
  }
}
</script>

<style lang="css">
</style>
