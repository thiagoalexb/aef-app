<template lang="html">
  <div ref="container" class="form-group form-info label-floating">
    <label class="control-label">{{label}}</label>
    <input
      :type="type"
      class="form-control"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :disabled="disabled">
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      unwatch: null
    }
  },
  created () {
    this.unwatch = this.$watch('value', (val, oldVal) => {
      if (oldVal === undefined &&
        val &&
        this.$refs.container.className.indexOf('is-empty') > -1) {
        this.$refs.container.classList.remove('is-empty')
        this.$nextTick(() => this.unwatch())
      }
    })
  }
}
</script>
