<template lang="html">
  <div class="radio">
    <label>
      <input
        type="radio"
        :name="name"
        :checked="checked"
        @change="$emit('change', $event.target.value)"
        :value="value"
        :disabled="disabled">
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
    checked: Boolean,
    value: {
      type: String,
      default: ''
    },
    name: String
  }
}
</script>
