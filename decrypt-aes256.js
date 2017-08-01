#!/usr/bin/env node

const crypto = require('crypto')
const OctoDash = require('octodash')

const CLI_OPTIONS = [{
  names: ['key', 'k'],
  type: 'string',
  required: true,
  help: 'decryption key',
  helpArg: 'KEY',
}]

class Command {
  constructor({ argv }) {
    const { key } = new OctoDash({
      argv,
      name: 'decrypt-aes256',
      version: '-∞',
      cliOptions: CLI_OPTIONS,
    }).parseOptions()

    this.key = key
  }

  run() {
    this.readAllFromStdIn((error, input) => {
      if (error) throw error

      console.log(this.decrypt(input).toString('utf8')) // eslint-disable-line no-console
    })
  }

  decrypt(input) {
    const cipher = crypto.createDecipher('aes256', this.key)

    let decrypted = cipher.update(input, 'base64', 'utf8')
    decrypted += cipher.final('utf8')
    return decrypted
  }

  readAllFromStdIn(callback) {
    let input = new Buffer([])

    process.stdin.on('data', (data) => {
      input = Buffer.concat([input, data])
    })

    process.stdin.on('error', callback)

    process.stdin.on('end', () => {
      callback(null, input.toString('utf8'))
    })
  }
}

const command = new Command({ argv: process.argv })
command.run()
