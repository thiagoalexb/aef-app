export const date = (value) => {
  const dt = new Date(value)
  return `${dt.getDate().toString().padStart(2, 0)}/${(dt.getMonth() + 1).toString().padStart(2, 0)}/${dt.getFullYear()}`
}

export const datetime = (value) => {
  const dt = new Date(value)
  return `${dt.getDate().toString().padStart(2, 0)}/${(dt.getMonth() + 1).toString().padStart(2, 0)}/${dt.getFullYear()} ${dt.getHours().toString().padStart(2, 0)}:${dt.getMinutes().toString().padStart(2, 0)}`
}
