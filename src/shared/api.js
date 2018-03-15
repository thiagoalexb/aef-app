import axios from 'axios'
import notify from './notify'
import { kebabToCamelCase } from './changeCase'

/*
Mounted routes:

common:
GET    book/get-all   as api.book.getAll()
GET    book/get-by-id as api.book.getById()
PUT    book/update    as api.book.update()
POST   book/add       as api.book.add()
DELETE book/delete    as api.book.delete()

mounted the same for:
event
post
tag
user

Uncommon routes:
GET  user/verify-password as api.user.verifyPassword()
POST user/update-password as api.user.updatePassword()
POST login/login          as api.login.login()

and for all routes there are a method for cancel request:
ex.:              api.user.getAll()
method to cancel: api.cancel.user.getAll()

ex.:              api.book.add()
method to cancel: api.cancel.book.add()
*/

export let http = null

export function mountHttp () {
  const user = JSON.parse(localStorage.user ? localStorage.user : null)

  const httpConfig = {
    baseURL: process.env.API_URL
  }

  if (user && user.accessToken) {
    httpConfig.headers = {
      Authorization: `Bearer ${user.accessToken}`
    }
  }

  http = axios.create(httpConfig)
}

mountHttp()

const apiCommonRoutes = [
  'book',
  'event',
  'post',
  'tag',
  'user',
  'lesson',
  'fase',
  'module',
  'specialWeek'
]

const apiCommonSubRoutes = [
  {
    path: 'get-all',
    verb: 'get'
  },
  {
    path: 'get-by-id',
    verb: 'get'
  },
  {
    path: 'add',
    verb: 'post'
  },
  {
    path: 'update',
    verb: 'put'
  },
  {
    path: 'delete',
    verb: 'delete'
  },
  {
    path: 'restore',
    verb: 'patch'
  }
]

const apiRoutes = []

// mount api common routes
// ex.: api.book.getAll() (returns a promise)
for (let route of apiCommonRoutes) {
  for (let subRoute of apiCommonSubRoutes) {
    const { path, verb } = subRoute
    apiRoutes.push(`${verb} ${route}/${path}`)
  }
}

// mount uncommon routes
apiRoutes.push('get user/verify-password')
apiRoutes.push('post user/update-password')
apiRoutes.push('get user/recover-password')
apiRoutes.push('get user/verify-password-token')
apiRoutes.push('post login/login')

function routeExtractDetails (route) {
  const origin = route
  route = route.split(' ')
  const path = route[1].split('/')
  return {
    origin,
    verb: route[0],
    route: path[0],
    path: route[1],
    pathSubRoute: path[1],
    subRoute: kebabToCamelCase(path[1])
  }
}

const api = { cancel: {} }

// create all route methods
for (let pathRoute of apiRoutes) {
  let route = routeExtractDetails(pathRoute)

  if (!(route.route in api.cancel)) {
    api.cancel[route.route] = {}
  }
  api.cancel[route.route][route.subRoute] = null

  if (!(route.route in api)) {
    api[route.route] = {}
  }
  api[route.route][route.subRoute] = requestHandler.bind(route)
}

// todo: handle error properly
function apiHandleError (err, route) {
  if (!axios.isCancel(err)) {
    console.error(err)
    notify.danger('Houve um erro no servidor')
    throw Error(`Server error at ${route.verb} ${route.route}/${route.path}`)
  }
}

// request handler
function requestHandler (param, handleError = true) {
  const { path, verb, route, subRoute } = this
  const cancelSource = axios.CancelToken.source()
  const options = { cancelToken: cancelSource.token }

  api.cancel[route][subRoute] = cancelSource.cancel

  if (param) {
    if (verb === 'get') param = { params: param }
    else if (verb === 'delete') param = { data: param }
  }

  return http[verb](path, param, options)
    .then(res => {
      if (res && res.data) {
        return res.data
      } else {
        return res
      }
    })
    .catch((err) => {
      if (err.response && 'success' in err.response) return err.response
      else if (err.response && err.response.data &&
        'success' in err.response.data) return err.response.data
      else if (handleError) {
        apiHandleError(err, this)
      }
    })
}

export { api }
