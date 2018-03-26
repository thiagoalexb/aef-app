<template lang="html">
  <div ref="container" class="form-group label-floating form-info dropdown">
    <label class="control-label">{{label}}</label>
    <div class="input-group">
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
            @blur="unfocus"
            @input="list.length ? found() : notFound()" />
      <div
        class="input-group-addon"
        data-toggle="dropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
        ref="btnDropdown"
        @click="$emit('input', {}); focus()">
          <i class="material-icons">clear</i>
      </div>
    </div>
        <ul class="dropdown-menu col-md-12" ref="dropdown">
      <li
        v-for="i in list"
        :key="i[itemId]"
        :class="{ active: index === list.indexOf(i) }">
        <a
          href="#"
          @mousedown="select(i)"
          v-html="$options.filters.matched(i[itemLabel], search)">
        </a>
      </li>
      <li
        v-show="!list.length && notFoundLabel">
        {{notFoundLabel}}
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
    },
    itemId: {
      type: String,
      default: 'id'
    },
    itemLabel: {
      type: String,
      default: 'text'
    },
    notFoundLabel: {
      type: String,
      default: 'Nenhum resultado encontrado'
    },
    selectNotFound: {
      type: Boolean,
      default: false
    },
    selectNotFoundImmediate: {
      type: Boolean,
      default: true
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
        i[this.itemLabel].toLowerCase().indexOf(this.search.toLowerCase()) > -1
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
        this.search = val[this.itemLabel]
      }
    })
  },
  methods: {
    select (item) {
      if (item) {
        this.selected = item
        this.$emit('input', item)
        this.search = item[this.itemLabel]
      }

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
      this.$refs.input.focus()
    },
    unfocus () {
      // reset index selection
      this.index = -1
      // close drop down
      this.$refs.container.classList.remove('open')

      // set search text
      if (this.selected && !this.selectNotFound) {
        this.search = this.selected[this.itemLabel]
      } else if (!this.selectNotFound) {
        this.search = ''
      } else if (this.selectNotFound && this.search && !this.list.length) {
        this.$emit('input', { [this.itemId]: null, [this.itemLabel]: this.search })
      } else if (this.value && this.value[this.itemLabel]) {
        this.search = this.value[this.itemLabel]
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
    },
    found () {
      if (this.selectNotFound &&
          this.selectNotFoundImmediate &&
          (!this.selected ||
            (this.selected && this.selected.id === null))) {
        this.$emit('input', {})
      }
    },
    notFound () {
      if (this.selectNotFound && this.selectNotFoundImmediate) {
        this.$emit('input', { [this.itemId]: null, [this.itemLabel]: this.search })
      }
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
ul li:hover,  .form-group.dropdown span.form-control-feedback:hover {
  cursor: pointer;
}
</style>
