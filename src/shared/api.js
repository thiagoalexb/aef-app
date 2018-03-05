import axios from 'axios'

const user = JSON.parse(localStorage.user ? localStorage.user : null)

const httpConfig = {
  baseURL: process.env.API_URL
}

if (user && user.token) {
  httpConfig.headers = {
    Authorization: `Bearer ${user.token}`
  }
}

export const http = axios.create(httpConfig)

const apiCommonRoutes = [
  'book',
  'event',
  'post',
  'tag',
  'user'
]

const apiCommonSubRoutes = {
  getAll: {
    path: 'get-all',
    verb: 'get'
  },
  getById: {
    path: 'get-by-id',
    verb: 'get'
  },
  add: {
    path: 'add',
    verb: 'post'
  },
  update: {
    path: 'update',
    verb: 'put'
  },
  delete: {
    path: 'delete',
    verb: 'delete'
  }
}

const api = {}

// mount api common routes
// ex.: api.book.getAll() (returns a promise)
for (let route of apiCommonRoutes) {
  api[route] = {}
  for (let keySubRoute in apiCommonSubRoutes) {
    const subRoute = apiCommonSubRoutes[keySubRoute]
    api[route][keySubRoute] = param => {
      let promise = null
      if (param) {
        if (subRoute.verb === 'get') param = { params: param }
        else param = { data: param }

        promise = http[subRoute.verb](`${route}/${subRoute.path}`, param)
      } else {
        promise = http[subRoute.verb](`${route}/${subRoute.path}`)
      }

      return promise.then(res => res && res.data ? res.data : res)
    }
  }
}

// mount uncommon routes
api.user.verifyPassword = param => http.get('user/verify-password', param)
api.user.updatePassword = param => http.post('user/update-password', param)

api.login = {}
api.login.login = param => http.post('login/login', param)

export { api }
