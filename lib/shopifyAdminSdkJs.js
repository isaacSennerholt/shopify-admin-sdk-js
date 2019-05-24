const instApiClient = require('./instApiClient.js')
const instAdminApi = require('./instAdminApi.js')

function instAdminApis(apiClient) {
  return {
    adminApi: instAdminApi(apiClient)
  }
}

module.exports = {
  instApiClient,
  instAdminApis,
  instAdminApi
}
