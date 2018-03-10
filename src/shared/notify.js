// configure default notify
import * as $ from 'jquery'

const notifyDefaultTime = 3000

const _notify = (type, msg, icon, timer, from = 'top', align = 'right', onClose = null) => {
  $.notify({
    icon,
    message: msg
  }, {
    type,
    timer,
    onClose,
    placement: {
      from,
      align
    }
  })
}

let undoId = 0

// export const notify = {
export default {
  info (msg, icon = 'info', time = notifyDefaultTime) {
    _notify('info', msg, icon, time)
  },
  success (msg, icon = 'check', time = notifyDefaultTime) {
    _notify('success', msg, icon, time)
  },
  warning (msg, icon = 'warning', time = notifyDefaultTime) {
    _notify('warning', msg, icon, time)
  },
  danger (msg, icon = 'error', time = notifyDefaultTime) {
    _notify('danger', msg, icon, time)
  },
  other (msg, icon = 'notifications', time = notifyDefaultTime) {
    _notify('', msg, icon, time)
  },
  undo (msg, callBack, icon = null, time = notifyDefaultTime, undoButton = { show: true, text: 'Desfazer' }) {
    const functionKey = 'callUndo' + (undoId++)

    if (undoButton.show) {
      msg += `
        <button
          type="button"
          class="pull-right btn btn-sm btn-simple btn-warning"
          onclick="${functionKey}()">
          ${undoButton.text}
        </button>`
      window[functionKey] = () => callBack()
    }
    _notify('undo', msg, icon, time, 'bottom', 'center', () => { delete window[functionKey] })
  },
  destroyUndos () {
    for (let i = 0; i < undoId; i++) {
      let key = 'callUndo' + i
      if (window[key]) {
        delete window[key]
      }
    }
  }
}
