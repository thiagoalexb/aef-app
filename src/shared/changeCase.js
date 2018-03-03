export const fromObject = (obj) => {
  const newObj = {}

  for (let key in obj) {
    newObj[key[0].toLowerCase() + key.slice(1)] = obj[key]
    if (typeof obj[key] === 'object') {
      newObj[key] = fromObject(newObj[key])
    }
  }

  return newObj
}

export const fromArray = (arr) => {
  arr.forEach((obj, idx) => {
    arr[idx] = fromObject(obj)
  })
}
