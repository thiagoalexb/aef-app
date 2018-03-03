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

export default axios.create(httpConfig)
