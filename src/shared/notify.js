// configure default notify
import * as $ from 'jquery'

const notifyDefaultTime = 3000

const _notify = (type, msg, icon, time) => {
  $.notify({
    icon: icon,
    message: msg
  }, {
    type: type,
    timer: time,
    placement: {
      from: 'top',
      align: 'right'
    }
  })
}

// export const notify = {
export default {
  info (msg, icon = 'info', time = notifyDefaultTime) {
    _notify('info', msg, icon, time)
  },
  success (msg, icon = 'check', time = 3000) {
    _notify('success', msg, icon, time)
  },
  warning (msg, icon = 'warning', time = 3000) {
    _notify('warning', msg, icon, time)
  },
  danger (msg, icon = 'error', time = 3000) {
    _notify('danger', msg, icon, time)
  },
  other (msg, icon = 'notifications', time = 3000) {
    _notify('', msg, icon, time)
  }
}
