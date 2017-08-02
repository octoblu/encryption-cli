const crypto = require('crypto')

function decryptAes256Sync(input, options) {
  const cipher = crypto.createDecipher('aes256', options.key)

  let decrypted = cipher.update(input, 'base64', 'utf8')
  decrypted += cipher.final('utf8')
  return JSON.parse(decrypted)
}

function decryptAes256(input, options, callback) {
  try {
    const decrypted = decryptAes256Sync(input, options)
    if (callback) return callback(null, decrypted)
    return decrypted
  } catch (error) {
    if (callback) return callback(error)
    throw error
  }
}

module.exports = decryptAes256
