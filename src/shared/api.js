import axios from 'axios'
import notify from './notify'

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

// todo: handle error properly
const apiHandleError = (err, route) => {
  console.log(err)
  notify.danger('Houve um erro no servidor')
  throw Error(`Server error at ${route.verb} ${route.route}/${route.path}`)
}

const api = {}

// mount api common routes
// ex.: api.book.getAll() (returns a promise)
for (let route of apiCommonRoutes) {
  api[route] = {}
  for (let keySubRoute in apiCommonSubRoutes) {
    const subRoute = apiCommonSubRoutes[keySubRoute]
    const { path, verb } = subRoute

    api[route][keySubRoute] = (param, handleError = true) => {
      let promise = null
      if (param) {
        if (verb === 'get') param = { params: param }
        else if (verb === 'delete') param = { data: param }

        promise = http[verb](`${route}/${path}`, param)
      } else {
        promise = http[verb](`${route}/${path}`)
      }

      return promise
        .then(res => {
          if (res && res.data) {
            if ('success' in res.data) {
              if (res.data.success) {
                return res.data.data
              } else if (handleError) {
                apiHandleError(res.data.data, {
                  route,
                  path,
                  verb
                })
              }
            }
            return res.data
          } else {
            return res
          }
        })
        .catch((err, a, b, c, d) => {
          if (handleError) {
            console.log(err)
            apiHandleError(err, {
              route,
              path,
              verb
            })
          }
        })
    }
  }
}

// mount uncommon routes
api.user.verifyPassword = param => http.get('user/verify-password', param)
api.user.updatePassword = param => http.post('user/update-password', param)

api.login = {}
api.login.login = param => http.post('login/login', param)

export { api }
