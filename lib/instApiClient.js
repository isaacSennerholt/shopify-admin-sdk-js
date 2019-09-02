const axios = require('axios')
const assertObjectShape = require('assert-object-shape')
const createCrudClient = require('create-crud-client')

module.exports = function(config = {}) {
  let requiredConfigurations = []
  const {
    accessToken,
    apiKey,
    password,
    responseAdapter,
    errorAdapter
  } = config

  if (apiKey) {
    requiredConfigurations = [...requiredConfigurations, 'apiKey', 'password']
  }

  if (!accessToken && !apiKey) {
    requiredConfigurations = [...requiredConfigurations, 'accessToken']
  }

  assertObjectShape(config, requiredConfigurations)

  let headers = {}

  if (accessToken) {
    headers = { ...headers, 'X-Shopify-Access-Token': accessToken }
  }
  if (apiKey && password) {
    headers = {
      ...headers,
      Authorization: `Basic ${new Buffer(`${apiKey}:${password}`).toString(
        'base64'
      )}`
    }
  }

  const options = {
    adapter: ({ data }) => {
      if (responseAdapter) return responseAdapter(data)
      return data
    },
    headers,
    errorProcessor: ({ response = {} }) => {
      if (errorAdapter) return errorAdapter(response)
      return response
    }
  }

  return createCrudClient(axios)(options)
}
