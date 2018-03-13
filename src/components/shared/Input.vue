<template lang="html">
  <div ref="container" :class="containerClasses">
    <label class="control-label">{{label}}</label>
    <input
      ref="input"
      :type="type"
      class="form-control"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :disabled="disabled"
      :autofocus="autofocus">
    <span v-show="stateFeedbackIcon" class="form-control-feedback">
      <i class="material-icons">{{stateFeedbackIcon}}</i>
    </span>
    <span v-show="message" class="help-block">{{message}}</span>
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
    },
    state: {
      type: String,
      validator: (value) => [ 'error', 'success', 'info', 'warning' ].includes(value)
    },
    // material-icons
    // set null to not show icon
    stateFeedback: {
      type: String,
      default: undefined
    },
    message: {
      type: String
    },
    autofocus: {
      type: Boolean
    }
  },
  data () {
    return {
      unwatch: null
    }
  },
  computed: {
    stateFeedbackIcon () {
      if (this.stateFeedback || this.stateFeedback === null) return this.stateFeedback

      switch (this.state) {
        case 'error':
          return 'clear'
        case 'success':
          return 'done'
        case 'info':
          return 'info_outline'
        case 'warning':
          return 'warning'
        default:
          return null
      }
    },
    containerClasses () {
      const classes = [
        'form-group',
        'form-info',
        'label-floating'
      ]

      if (this.state) classes.push(`has-${this.state}`)
      return classes
    }
  },
  methods: {
    focus () {
      this.$refs.input.focus()
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
