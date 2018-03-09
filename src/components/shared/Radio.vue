<template lang="html">
  <div class="radio">
    <label>
      <input
        type="radio"
        :value="value"
        :disabled="disabled"
        :checked="checked === value"
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
    checked: {
      required: true
    },
    value: {
      required: true
    }
  },
  methods: {
    changed (event) {
      this.$emit('change', event.target.value)
    }
  }
}

</script>
