<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      :class="openButtonClass"
      data-toggle="modal"
      :data-target="id"
      @click="show"
      v-if="openButton">
      {{openButtonTitle}}
      <slot name="open-button"></slot>
    </button>

    <!-- Modal -->
    <div class="modal fade" :id="id" tabindex="-1" role="dialog" :aria-labelledby="id">
      <div :class="modalClass" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" v-if="title">{{title}}</h4>
            <slot name="header"></slot>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div :class="{'modal-footer': true, 'text-center': footerCenter}">
            <slot name="footer"></slot>
            <button
              type="button"
              class="btn btn-default"
              data-dismiss="modal"
              v-if="closeButton">
              {{closeButtonText}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Modal',
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    closeButton: {
      type: Boolean,
      default: true
    },
    closeButtonText: {
      type: String,
      default: 'Fechar'
    },
    openButton: {
      type: Boolean,
      default: false
    },
    openButtonClass: {
      type: [Array, Object, String],
      default: () => ['btn', 'btn-default']
    },
    openButtonTitle: {
      type: String,
      default: 'Abrir Modal'
    },
    footerCenter: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'normal' // small | sm, normal | *anything else*, large | lg
    }
  },
  created () {
    this.modalClass = [ 'modal-dialog' ]
    switch (this.size) {
      case 'small':
        this.modalClass.push('modal-sm')
        break
      case 'sm':
        this.modalClass.push('modal-sm')
        break
      case 'large':
        this.modalClass.push('modal-lg')
        break
      case 'lg':
        this.modalClass.push('modal-sm')
        break
    }
  },
  methods: {
    show () {
      $(this.$el.lastElementChild).modal('show')
    },
    hide () {
      $(this.$el.lastElementChild).modal('hide')
    }
  }
}
</script>
