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
    return ['red', 'yellow', 'blue'][this.randomBetween(0, 2)]
  }
}
