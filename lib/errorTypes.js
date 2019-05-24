/**
 * a ForeignRequestBodyError is thrown when an operation failed, or,
 * ought to discontinue due to an invalid request body sent to foreign system
 */
function ForeignRequestBodyError(status, errors, message) {
  this.name = 'ForeignRequestBodyError'
  this.status = status || null
  this.errors = errors || []
  this.message = message || 'No message provided'
  this.stack = new Error().stack
}

/**
 * a ForeignAuthenticationError is thrown when an operation failed, or,
 * ought to discontinue due to an unauthenticated request to foreign system
 */
function ForeignAuthenticationError(status, errors, message) {
  this.name = 'ForeignAuthenticationError'
  this.status = status || null
  this.errors = errors || []
  this.message = message || 'No message provided'
  this.stack = new Error().stack
}

/**
 * a ForeignConflictError is thrown when an operation failed, or,
 * ought to discontinue due to a request body sent to foreign system causing conflict
 */
function ForeignConflictError(status, errors, message) {
  this.name = 'ForeignConflictError'
  this.status = status || null
  this.errors = errors || []
  this.message = message || 'No message provided'
  this.stack = new Error().stack
}

module.exports = {
  ForeignRequestBodyError,
  ForeignAuthenticationError,
  ForeignConflictError
}
