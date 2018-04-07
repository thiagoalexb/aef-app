'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_URL: '"https://aefapi.azurewebsites.net/api/"'
  API_URL: '"http://localhost:5000/api/"'
})
