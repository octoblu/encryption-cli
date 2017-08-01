const crypto = require('crypto')

function decryptAes256(input, options) {
  const cipher = crypto.createDecipher('aes256', options.key)

  let decrypted = cipher.update(input, 'base64', 'utf8')
  decrypted += cipher.final('utf8')
  return decrypted
}

module.exports = decryptAes256
