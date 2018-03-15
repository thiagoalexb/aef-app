import notify from './notify'
import { fromObject } from './changeCase'

export default {
  convertDateInObject (obj) {
    for (let key in obj) {
      let prop = obj[key]
      if (typeof prop === 'string' &&
        // eslint-disable-next-line
        /\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}/.test(obj[key])) {
        obj[key] = new Date(prop)
      }
    }
    return obj
  },
  convertDateInArray (arr) {
    for (let obj of arr) {
      this.convertDateInObject(obj)
    }
    return arr
  },
  randomBetween (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },
  randomAefColors () {
    return ['red', 'orange', 'blue'][this.randomBetween(0, 2)]
  },
  handleApiError (data, attemptedAction = 'executar uma requisição ao servidor') {
    let { message, messages, error, errors } = data

    if (messages || errors) {
      if (errors && errors.length) messages = errors
      else if (errors && typeof errors === 'object' && errors.defaultError) messages = [errors.defaultError]
      else if (errors && typeof errors === 'object') return fromObject(errors)// submited validation object error, need to be threat
      message = messages.length > 1
        ? `Ocorreram alguns problemas ao ${attemptedAction}:`
        : `Ocorreu um problema ao ${attemptedAction}:`
      message += '<ul>'
      messages.forEach(m => {
        message += `<li>${m}</li>`
      })
      message += '</ul>'

      if (errors.defaultError && Object.keys(errors).length > 1) return fromObject(errors)
    } else if (error) message = error
    else if (!message) message = `Ocorreu um problema ao ${attemptedAction}`

    notify.danger(message)
    return null
  }
}
