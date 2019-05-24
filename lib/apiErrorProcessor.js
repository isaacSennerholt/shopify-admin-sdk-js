const {
  ForeignAuthenticationError,
  ForeignRequestBodyError,
  ForeignConflictError
} = require('./errorTypes.js')

module.exports = function({ status, data }) {
  if (status == 400) {
    const message = 'Invalid request body sent to Shopify api.'
    throw new ForeignRequestBodyError(400, data, message)
  }
  if (status == 401) {
    const message = 'Invalid Shopify api key or access token.'
    throw new ForeignAuthenticationError(status, data, message)
  }
  if (status == 422) {
    const message = 'Invalid request body sent to Shopify api.'
    throw new ForeignConflictError(409, data, message)
  }

  throw new Error('Request to shopify was unsuccessful due to unknown reason.')
}
