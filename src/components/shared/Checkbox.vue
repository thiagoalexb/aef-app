<template lang="html">
  <div class="checkbox">
    <label>
      <input
        type="checkbox"
        :value="value"
        :disabled="disabled"
        @change="changed">
      {{label}}
    </label>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: [ Boolean, Array ],
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    changed (event) {
      if (Array.isArray(this.checked)) {
        event.target.checked
          ? this.$emit('change', this.checked.concat([ this.value ]))
          : this.$emit('change', this.checked.filter(c => c !== this.value))
      } else {
        this.$emit('change', event.target.checked)
      }
    }
  }
}
</script>
