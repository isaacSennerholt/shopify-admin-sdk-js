module.exports = function(domain, apiClient) {
  if (!domain) {
    throw new Error(
      'A shop domain is required to initialize shopify admin api.'
    )
  }

  if (!apiClient) {
    throw new Error(
      'A configured api client is required to initialize shopify admin api.'
    )
  }

  const shopAdminUrl = `https://${domain}/admin`

  // Shop resource
  function getShop() {
    return apiClient.get(`${shopAdminUrl}/shop.json`)
  }

  // Price rule resource
  function createPriceRule(payload) {
    return apiClient.post(`${shopAdminUrl}/price_rules.json`, {
      data: { price_rule: payload }
    })
  }

  function replacePriceRuleById(priceRuleId, payload) {
    return apiClient.put(`${shopAdminUrl}/price_rules/${priceRuleId}.json`, {
      data: { price_rule: payload }
    })
  }

  function deletePriceRuleById(priceRuleId) {
    return apiClient.delete(`${shopAdminUrl}/price_rules/${priceRuleId}.json`)
  }

  // Discount code resource
  function createDiscountCode(priceRuleId, payload) {
    return apiClient.post(
      `${shopAdminUrl}/price_rules/${priceRuleId}/discount_codes.json`,
      { data: payload }
    )
  }

  function replaceDiscountCodeById(priceRuleId, discountCodeId, payload) {
    return apiClient.put(
      `${shopAdminUrl}/price_rules/${priceRuleId}/discount_codes/${discountCodeId}.json`,
      { data: payload }
    )
  }

  function deleteDiscountCodeById(priceRuleId, discountCodeId) {
    return apiClient.delete(
      `${shopAdminUrl}/price_rules/${priceRuleId}/discount_codes/${discountCodeId}.json`
    )
  }

  // Product resource
  function getProducts() {
    return apiClient.get(`${shopAdminUrl}/products.json`)
  }

  // Order resource
  function createOrder(payload) {
    return apiClient.post(`${shopAdminUrl}/orders.json`, { data: payload })
  }

  // Webhook resource
  function createWebhook(payload) {
    return apiClient.post(`${shopAdminUrl}/webhooks.json`, {
      data: payload
    })
  }

  return {
    getShop,
    createPriceRule,
    replacePriceRuleById,
    deletePriceRuleById,
    createDiscountCode,
    replaceDiscountCodeById,
    deleteDiscountCodeById,
    getProducts,
    createOrder,
    createWebhook
  }
}
