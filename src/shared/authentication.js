export const getUser = () => {
  const user = JSON.parse(localStorage.user ? localStorage.user : null)
  if (user) {
    user.expiration = new Date(user.expiration)

    if ((new Date()) >= user.expiration) return logoff()
    else return user
  } else {
    return user
  }
}

export const setUser = (data) => {
  localStorage.user = JSON.stringify({
    id: data.id,
    email: data.email,
    created: new Date(data.created),
    expiration: new Date(data.expiration),
    accessToken: data.accessToken
  })
}

// eslint-disable-next-line
export const logoff = () => localStorage.user = null
