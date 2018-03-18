<template lang="html">
  <div ref="container" class="form-group label-floating form-info dropdown">
    <label class="control-label">{{label}}</label>
    <input
      type="text"
      class="form-control"
      ref="input"
      v-model="search"
      :disabled="disabled"
      :autofocus="autofocus"
      @keydown.up="up"
      @keydown.down="down"
      @keydown.enter.prevent="select(list[index])"
      @focus="focus"
      @blur="unfocus" />
    <span
      class="form-control-feedback"
      data-toggle="dropdown"
      role="button"
      aria-haspopup="true"
      aria-expanded="false"
      ref="btnDropdown">
        <i class="material-icons">arrow_drop_down</i>
    </span>
    <ul class="dropdown-menu" ref="dropdown">
      <li
        v-for="i in list"
        :key="i.id"
        :class="{ active: index === list.indexOf(i) }">
        <a
          href="#"
          @mousedown="select(i)"
          v-html="$options.filters.matched(i.text, search)">
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Object
    },
    disabled: {
      type: Boolean
    },
    autofocus: {
      default: false
    },
    items: {
      type: Array,
      required: true // object: { id: String, text: String }
    }
  },
  data () {
    return {
      search: '',
      index: null,
      selected: null
    }
  },
  computed: {
    list () {
      // filter and take just 10
      return this.items.filter(i =>
        i.text.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      ).slice(0, 10)
    }
  },
  created () {
    this.unwatch = this.$watch('value', (val, oldVal) => {
      if (oldVal === undefined &&
        val &&
        this.$refs.container.className.indexOf('is-empty') > -1) {
        this.$refs.container.classList.remove('is-empty')
        this.$nextTick(() => this.unwatch())
        this.search = val.text
      }
    })
  },
  methods: {
    select (item) {
      this.selected = item
      this.$emit('input', item)
      this.search = item.text

      // select next input
      let next = false
      Array.from(document.querySelectorAll('input, textarea, select')).every(e => {
        if (e === this.$refs.input) next = true
        else if (next === true) {
          console.log('focused ', e)
          this.$nextTick(() => e.focus())
          return false
        }

        return true
      })
    },
    focus () {
      this.search = ''
      this.$refs.container.classList.add('open')
    },
    unfocus () {
      // reset index selection
      this.index = -1
      // close drop down
      this.$refs.container.classList.remove('open')

      // set search text
      if (this.selected) {
        this.search = this.selected.text
      } else {
        this.search = ''
      }

      // remove is-empty if necessary
      if (this.search && this.$refs.container.className.indexOf('is-empty') > -1) {
        this.$refs.container.classList.remove('is-empty')
      } else if (!this.search && this.$refs.container.className.indexOf('is-empty') === -1) {
        this.$refs.container.classList.add('is-empty')
      }
    },
    up () {
      if (this.index > 0) this.index--
    },
    down () {
      if (this.index < (this.list.length - 1)) this.index++
    }
  },
  filters: {
    matched (val, search) {
      if (!search) return val
      else {
        const r = new RegExp(search, 'i')
        const str = val.match(r)[0]
        return val.replace(r, `<b>${str}</b>`)
      }
    }
  }
}
</script>

<style scoped>
ul li:hover {
  cursor: pointer;
}
</style>