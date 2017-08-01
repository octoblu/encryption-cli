crypto = require('crypto')

function encryptAes256(input, options) {
  const cipher = crypto.createCipher('aes256', options.key)

  let encrypted = cipher.update(JSON.stringify(input), 'utf8', 'base64')
  encrypted += cipher.final('base64')
  return encrypted
}

module.exports = encryptAes256
