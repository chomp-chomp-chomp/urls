/**
 * Helper functions for the URL shortener
 */

/**
 * Generate a random short code
 * @param {number} length - Length of the short code
 * @returns {string} Random short code
 */
export function generateShortCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
export function isValidUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (e) {
    return false;
  }
}

/**
 * Check if password matches
 * @param {string} password - Password to check
 * @param {string} correctPassword - Correct password
 * @returns {boolean} True if passwords match
 */
export function checkPassword(password, correctPassword) {
  return password === correctPassword;
}

/**
 * Verify API key
 * @param {string} apiKey - API key to verify
 * @param {string} correctApiKey - Correct API key
 * @returns {boolean} True if API key is valid
 */
export function verifyApiKey(apiKey, correctApiKey) {
  return apiKey && correctApiKey && apiKey === correctApiKey;
}

/**
 * Create JSON response
 * @param {Object} data - Data to return
 * @param {number} status - HTTP status code
 * @returns {Response} JSON response
 */
export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
    },
  });
}

/**
 * Create HTML response
 * @param {string} html - HTML content
 * @param {number} status - HTTP status code
 * @returns {Response} HTML response
 */
export function htmlResponse(html, status = 200) {
  return new Response(html, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
