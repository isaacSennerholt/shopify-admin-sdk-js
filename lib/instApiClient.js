const axios = require('axios')
const createCrudClient = require('create-crud-client')

module.exports = function(config) {
  if (!config) {
    throw new Error('Shopify api client configuration is missing.')
  }
  const { accessToken, apiKey, password, adapter, errorAdapter } = config

  let headers = {}

  if (accessToken) {
    headers = { Authorization: { 'X-Shopify-Access-Token': accessToken } }
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
      if (adapter) return adapter(data)
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
