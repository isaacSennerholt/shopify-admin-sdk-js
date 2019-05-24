const axios = require('axios')
const createCrudClient = require('create-crud-client')
const apiErrorProcessor = require('./apiErrorProcessor.js')

module.exports = function(config) {
  if (!config) {
    throw new Error('Shopify api client configuration is missing.')
  }
  const { accessToken = '', apiKey = '', password = '' } = config
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
    adapter: ({ data }) => data,
    headers,
    errorProcessor: ({ response = {} }) => {
      return apiErrorProcessor(response)
    }
  }

  return createCrudClient(axios)(options)
}
