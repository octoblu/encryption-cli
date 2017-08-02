crypto = require('crypto')

function encryptAes256Sync(input, options) {
  const cipher = crypto.createCipher('aes256', options.key)

  let encrypted = cipher.update(JSON.stringify(input), 'utf8', 'base64')
  encrypted += cipher.final('base64')
  return encrypted
}

function encryptAes256(input, options, callback) {
  try {
    const encrypted = encryptAes256Sync(input, options)
    if (callback) return callback(null, encrypted)
    return encrypted
  } catch (error) {
    if (callback) return callback(error)
    throw error
  }
}

module.exports = encryptAes256
