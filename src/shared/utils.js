import notify from './notify'

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
      message += messages.length > 1
        ? `Ocorram alguns problemas ao ${attemptedAction}`
        : `Ocorreu um problema ao ${attemptedAction}`
      message += '<ul>'
      messages.forEach(m => {
        message += `<li>${m}</li>`
      })
      message = '</ul>'
    } else if (error) message = error
    else if (!message) message = `Ocorreu um problema ao ${attemptedAction}`

    notify.danger(message)
  }
}
